package resumebuilder.back_end.api.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AiController {

    @PostMapping("/enhance-text")
    public ResponseEntity<String> enhanceText(@RequestBody String inputText) {
        return new ResponseEntity<>("Enhancing: " + inputText, HttpStatus.OK);
    }

}
