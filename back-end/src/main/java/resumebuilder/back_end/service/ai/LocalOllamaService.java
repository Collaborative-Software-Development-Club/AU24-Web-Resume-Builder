package resumebuilder.back_end.service.ai;
import org.springframework.ai.openai.OpenAiChatModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

/*
 * This is used to make a call to a local ollmama model installed 
 * in your computer using the openai library.
 * This can be used to test the prompts for the LLM wihout wasting credits of 
 * the actual LLM service/API we are going to use.
 */
@Service
@Qualifier("Local")
public class LocalOllamaService extends AiServiceKernel {

    private final OpenAiChatModel chatModel;

    @Autowired
    public LocalOllamaService(OpenAiChatModel chatModel) {
        this.chatModel = chatModel;
    }

    @Override
    public String callLLM(String prompt) {
        String generatedText = this.chatModel.call(prompt);
        return generatedText;
    }

}
