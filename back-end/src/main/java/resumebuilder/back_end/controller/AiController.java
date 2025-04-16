package resumebuilder.back_end.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import resumebuilder.back_end.service.ai.AiService;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;;

@RestController
@RequestMapping("/v1/ai")
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
    public AiController(@Qualifier("Mock") AiService aiService) {
        this.aiService = aiService;
    }

    @GetMapping("/description")
    public ResponseEntity<Map<String, String>> generate(@RequestParam(value = "message") String message)
            throws UnsupportedEncodingException {
        String decodedMessage = URLDecoder.decode(message, "UTF-8");
        return new ResponseEntity<>(Map.of("generation", aiService.enhanceResumeBulletPoints(decodedMessage)),
                HttpStatus.OK);
    }

    @PostMapping("/resume")
    public ResponseEntity<Map<String, Object>> generateResumeJSON(@RequestBody String rawText)
            throws UnsupportedEncodingException, JsonProcessingException {
        // String decodedMessage = URLDecoder.decode(message, "UTF-8");
        Map<String, Object> map = aiService.scanResumeToJSON(rawText);
        return new ResponseEntity<>(map, HttpStatus.OK);
    }

}
