package resumebuilder.back_end.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.type.MapType;
import com.fasterxml.jackson.databind.util.JSONPObject;
import org.bson.json.JsonObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import resumebuilder.back_end.domain.dto.ResumeDto;
import resumebuilder.back_end.service.ai.AiService;

import java.io.UnsupportedEncodingException;
import java.lang.reflect.Type;
import java.net.URLDecoder;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class AiController {

    private final AiService aiService;

    /*
     * change the @Qualifier modifier to choose the implementation of AiService you
     * want to use
     * - Local: uses a local Ollama model you have to download
     * - Mock: is just a placeholder. Use if you want to test the endpoints without
     * having a local model
     */
    @Autowired
    public AiController(@Qualifier("Azure") AiService aiService) {
        this.aiService = aiService;
    }

    @GetMapping("/enhance-text")
    public Map<String, String> generate(@RequestParam(value = "message") String message)
            throws UnsupportedEncodingException {
        String decodedMessage = URLDecoder.decode(message, "UTF-8");
        return Map.of("generation", aiService.enhanceResumeBulletPoints(decodedMessage));
    }

    @GetMapping("/scan-resume")
    public Map<String, Object> generateResumeJSON(@RequestParam(value = "message") String message)
            throws UnsupportedEncodingException, JsonProcessingException {
        String decodedMessage = URLDecoder.decode(message, "UTF-8");
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Object> map = objectMapper.readValue(aiService.scanResumeToJSON(decodedMessage), new TypeReference<Map<String, Object>>(){});
        return map;
    }

}
