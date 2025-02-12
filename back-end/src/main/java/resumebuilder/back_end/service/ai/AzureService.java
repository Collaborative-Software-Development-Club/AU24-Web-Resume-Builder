package resumebuilder.back_end.service.ai;
import org.springframework.ai.azure.openai.AzureOpenAiChatModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service
@Qualifier("Azure")
public class AzureService extends AiServiceKernel {

    private final AzureOpenAiChatModel chatModel;

    @Autowired
    public AzureService(AzureOpenAiChatModel chatModel) {
        this.chatModel = chatModel;
    }

    @Override
    public String callLLM(String prompt) {
        System.out.println("calling azure");
        String generatedText = this.chatModel.call(prompt);
        return generatedText;
    }

}
