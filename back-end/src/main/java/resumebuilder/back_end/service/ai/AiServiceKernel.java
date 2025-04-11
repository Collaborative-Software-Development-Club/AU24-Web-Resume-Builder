package resumebuilder.back_end.service.ai;

import java.util.Map;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

public abstract class AiServiceKernel implements AiService {

    public String enhanceResumeBulletPoints(String initialText) {
        String llmResponse = this.callLLM(createResumeBulletPointsPrompt(initialText));
        String parsedText = llmResponse.replaceAll("\n- ", "\n");
        parsedText = parsedText.replaceAll("- ", "");
        parsedText = parsedText.replaceAll("-", "");
        parsedText = parsedText.replaceAll("\n•", "\n");
        parsedText = parsedText.replaceAll("• ", "");
        parsedText = parsedText.replaceAll("•", " ");
        return parsedText;
    }

    public Map<String, Object> scanResumeToJSON(String resume) throws JsonProcessingException {
        String llmResponse = this.callLLM(createResumeScanPrompt(resume, resume_JSON_Format));
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Object> map = objectMapper.readValue(llmResponse,
                new TypeReference<Map<String, Object>>() {
                });
        return map;
    }

    protected abstract String callLLM(String prompt);

    private String createResumeBulletPointsPrompt(String initialText) {
        return "You are an expert in helping create resumes for job applicants." + //
                "You are an AI endpoint in a resume builder application. You will receive a description of a project or experience and enhance it."
                + //
                "You will take in a description of a position or project " + //
                "and output a revised version in bullet point considering the provided guidelines.\n" +
                "Guidelines:\n" +
                "1- Use the following action verbs at the start of the bullet points: " + ACTION_VERBS + "\n" + //
                "2- Follow the instructions for the XYZ method: " + XYZ_METHOD + "\n" + //
                "Apply changes to the following description: " + initialText + "\n" + //
                "Return only the improved description and nothing more." + //
                "Please return only the final text without any other stuff." + //
                "Do not add formatting to the bullet points. Just separate them with a new line.";
    }

    private String createResumeScanPrompt(String resume, String format) {
        return "You are to transcribe a given resume into a given json format, filling out each " + //
                "json category according to information from the resume. If no relevant information" + //
                " is found, you are free to leave that category blank. Examples are provided in the " + //
                "sample json format. Return your response as a json string.\nHere is the sample json format: " + format
                + ",\n\nHere is the" + //
                "resume you are to transcribe: " + resume;
    }

    private final String ACTION_VERBS = "LEADERSHIP\t\t\t\t\t\t\t\n" + //
            "Accomplished\tAchieved\tAdministered\tAnalyzed\tAssigned\tAttained\tChaired\tConsolidated\n" + //
            "Contracted\tCoordinated\tDelegated\tDeveloped\tDirected\tEarned\tEvaluated\tExecuted\n" + //
            "Handled\tHeaded\tImpacted\tImproved\tIncreased\tLed\tMastered\tOrchestrated\n" + //
            "Organized\tOversaw\tPlanned\tPredicted\tPrioritized\tProduced\tProved\tRecommended\n" + //
            "Regulated\tReorganized\tReviewed\tScheduled\tSpearheaded\tStrengthened\tSupervised\tSurpassed\n" + //
            "COMMUNICATION\t\t\t\t\t\t\t\n" + //
            "Addressed\tArbitrated\tArranged\tAuthored\tCollaborated\tConvinced\tCorresponded\tDelivered\n" + //
            "Developed\tDirected\tDocumented\tDrafted\tEdited\tEnergized\tEnlisted\tFormulated\n" + //
            "Influenced\tInterpreted\tLectured\tLiaised\tMediated\tModerated\tNegotiated\tPersuaded\n" + //
            "Presented\tPromoted\tPublicized\tReconciled\tRecruited\tReported\tRewrote\tSpoke\n" + //
            "Suggested\tSynthesized\tTranslated\tVerbalized\tWrote\t\t\t\n" + //
            "RESEARCH\t\t\t\t\t\t\t\n" + //
            "Clarified\tCollected\tConcluded\tConducted\tConstructed\tCritiqued\tDerived\tDetermined\n" + //
            "Diagnosed\tDiscovered\tEvaluated\tExamined\tExtracted\tFormed\tIdentified\tInspected\n" + //
            "Interpreted\tInterviewed\tInvestigated\tModeled\tOrganized\tResolved\tReviewed\tSummarized\n" + //
            "Surveyed\tSystematized\tTested\t\t\t\t\t\n" + //
            "TECHNICAL\t\t\t\t\t\t\t\n" + //
            "Assembled\tBuilt\tCalculated\tComputed\tDesigned\tDevised\tEngineered\tFabricated\n" + //
            "Installed\tMaintained\tOperated\tOptimized\tOverhauled\tProgrammed\tRemodeled\tRepaired\n" + //
            "Solved\tStandardized\tStreamlined\tUpgraded\t\t\t\t\n" + //
            "TEACHING\t\t\t\t\t\t\t\n" + //
            "Adapted\tAdvised\tClarified\tCoached\tCommunicated\tCoordinated\tDemystified\tDeveloped\n" + //
            "Enabled\tEncouraged\tEvaluated\tExplained\tFacilitated\tGuided\tInformed\tInstructed\n" + //
            "Persuaded\tSet Goals\tStimulated\tStudied\tTaught\tTrained\t\t\n" + //
            "QUANTITATIVE\t\t\t\t\t\t\t\n" + //
            "Administered\tAllocated\tAnalyzed\tAppraised\tAudited\tBalanced\tBudgeted\tCalculated\n" + //
            "Computed\tDeveloped\tForecasted\tManaged\tMarketed\tMaximized\tMinimized\tPlanned\n" + //
            "Projected\tResearched\t\t\t\t\t\t\n" + //
            "CREATIVE\t\t\t\t\t\t\t\n" + //
            "Acted\tComposed\tConceived\tConceptualized\tCreated\tCustomized\tDesigned\tDeveloped\n" + //
            "Directed\tEstablished\tFashioned\tFounded\tIllustrated\tInitiated\tInstituted\tIntegrated\n" + //
            "Introduced\tInvented\tOriginated\tPerformed\tPlanned\tPublished\tRedesigned\tRevised\n" + //
            "Revitalized\tShaped\tVisualized\t\t\t\t\t\n" + //
            "HELPING\t\t\t\t\t\t\t\n" + //
            "Assessed\tAssisted\tClarified\tCoached\tCounseled\tDemonstrated\tDiagnosed\tEducated\n" + //
            "Enhanced\tExpedited\tFacilitated\tFamiliarized\tGuided\tMotivated\tParticipated\tProposed\n" + //
            "Provided\tReferred\tRehabilitated\tRepresented\tServed\tSupported\t\t\n" + //
            "ORGANIZATIONAL\t\t\t\t\t\t\t\n" + //
            "Approved\tAccelerated\tAdded\tArranged\tBroadened\tCataloged\tCentralized\tChanged\n" + //
            "Classified\tCollected\tCompiled\tCompleted\tControlled\tDefined\tDispatched\tExecuted\n" + //
            "Expanded\tGained\tGathered\tGenerated\tImplemented\tInspected\tLaunched\tMonitored\n" + //
            "Operated\tOrganized\tPrepared\tProcessed\tPurchased\tRecorded\tReduced\tReinforced\n" + //
            "Retrieved\tScreened\tSelected\tSimplified\tSold\tSpecified\tSteered\tStructured\n" + //
            "Systematized\tTabulated\tUnified\tUpdated\tUtilized\tValidated\tVerified\t";

    private final String XYZ_METHOD = "This is the crux of the advice by Laszlo Bock, a former Google senior vice president of personnel operations. You want to adhere to the bullet-point format as we've discussed, and articulate your experience in this specific way.\n"
            + //
            "\n" + //
            "Google describes this as: \"Accomplished [X] as measured by [Y], by doing [Z].\" But just to make it easier to remember, let's shorten it to X-Y-Z.  \n"
            + //
            "\n" + //
            "This means that you want to focus on accomplishments -- quantitative results and the impact that you had as a result. It's probably easiest to explain this by using a few examples from the Google recruiters' YouTube videos themselves.\n"
            + //
            "\n" + //
            "For example, imagine an applicant who wants to make clear that he or she is a member of a prestigious group. Here's the OK way, the better way, and the best way to describe this on a resume, according to Google:\n"
            + //
            "\n" + //
            "OK: \"Member of Leadership for Tomorrow Society\"\n" + //
            "Better: \"Selected as one of 275 for this 12-month professional development program for high-achieving diverse talent.\"\n"
            + //
            "Best: \"Selected as one of 275 participants nationwide for this 12-month professional development program for high-achieving diverse talent based on leadership potential and academic success.\"\n"
            + //
            "Here's another example, this one for a technical position in which the applicant wants to point out that he or she placed second in a hackathon.\n"
            + //
            "\n" + //
            "OK: \"Won second place in hackathon.\"\n" + //
            "Better: \"Won second place out of 50 teams in hackathon.\"\n" + //
            "Best: \"Won second place out of 50 teams in hackathon at NJ Tech by working with two colleagues to develop an app that synchronizes mobile calendars.\n"
            + //
            "(In this case, the last, \"best\" is my own interpretation; Google doesn't actually provide the third suggestion. But I hope the point is clear.)\n"
            + //
            "\n" + //
            "Here's a final example, intended for a business applicant who wants to show how much he or she contributed in a client support role: \n"
            + //
            "\n" + //
            "OK: \"Grew revenue for small and medium business clients.\"\n" + //
            "Better: \"Grew revenue for small and medium business clients by 10% QoQ\"\n" + //
            "Best: \"Grew revenue for 15 small and medium business clients by 10% QoQ by mapping new software features as solutions to their business goals.\"\n"
            + //
            "One point about jargon: Use shorthand like \"QoQ\" (for quarter over quarter) only if you're 100 percent sure that the resume reviewer will know exactly what you mean.";

    private final String resume_JSON_Format = "{\r\n\t\"name\": \"Brutus\",\r\n\t\"contactMethods\": [\r\n\t\t\"buckeye.1@osu.edu\",\r\n\t\t\"614-222-2222\",\r\n\t\t\"100 Ohio State Ave, Columbus OH, 43210\"\r\n\t],\r\n\t\"education\": {\r\n\t\t\"visible\": true,\r\n\t\t\"institution\": \"The Ohio State University\",\r\n\t\t\"location\": \"Columbus, Ohio\",\r\n\t\t\"degree\": \"Bachelor of Science in Business Administration\",\r\n\t\t\"graduationDate\": {\r\n\t\t\t\"month\": 5,\r\n\t\t\t\"year\": 2021\r\n\t\t},\r\n\t\t\"specialization\": \"Finance\",\r\n\t\t\"minor\": \"Business Analytics\",\r\n\t\t\"gpa\": 4.0,\r\n\t\t\"honors\": [\r\n\t\t\t{\r\n\t\t\t\t\"name\": \"Fisher Pacesetter Award\",\r\n\t\t\t\t\"description\": \"Given to the top one percent of students based on academic performance and demonstrated leadership ability\"\r\n\t\t\t},\r\n\t\t\t{\r\n\t\t\t\t\"name\": \"Honors Cohort Program\",\r\n\t\t\t\t\"description\": \"One of 30 students selected to participate in the College of Business’ flagship two-year academic program\"\r\n\t\t\t}\r\n\t\t]\r\n\t},\r\n\t\"experience\": {\r\n\t\t\"visible\": true,\r\n\t\t\"items\": [\r\n\t\t\t{\r\n        \"id\": 0,\r\n\t\t\t\t\"company\": \"The Ohio State University\",\r\n\t\t\t\t\"location\": \"Columbus, Ohio\",\r\n\t\t\t\t\"position\": \"Resident Advisor\",\r\n\t\t\t\t\"startDate\": {\r\n\t\t\t\t\t\"month\": 8,\r\n\t\t\t\t\t\"year\": 2018\r\n\t\t\t\t},\r\n\t\t\t\t\"endDate\": null,\r\n\t\t\t\t\"description\": \"Ensured safety and served as a resource for 65+ residents\\nFacilitated programs to foster the growth and development of undergraduate students\\nAddressed and resolved issues to ensure a quality living experience for all residents in the residence hall\",\r\n\t\t\t\t\"visible\": true\r\n\t\t\t},\r\n\t\t\t{\r\n        \"id\": 1,\r\n\t\t\t\t\"company\": \"L Brands\",\r\n\t\t\t\t\"location\": \"Columbus, Ohio\",\r\n\t\t\t\t\"position\": \"Operations Management Intern\",\r\n\t\t\t\t\"startDate\": {\r\n\t\t\t\t\t\"month\": 5,\r\n\t\t\t\t\t\"year\": 2019\r\n\t\t\t\t},\r\n\t\t\t\t\"endDate\": {\r\n\t\t\t\t\t\"month\": 8,\r\n\t\t\t\t\t\"year\": 2019\r\n\t\t\t\t},\r\n\t\t\t\t\"description\": \"Developed 40+ new standardized operating procedures to improve efficiency, productivity, and employee morale\\nWorked with a team of 10 distribution managers to expand Bath and Body Works operations to a secondary campus\",\r\n\t\t\t\t\"visible\": true\r\n\t\t\t},\r\n\t\t\t{\r\n        \"id\": 2,\r\n\t\t\t\t\"company\": \"The Ohio State University Wexner Medical Center\",\r\n\t\t\t\t\"location\": \"Columbus, Ohio\",\r\n\t\t\t\t\"position\": \"Supply Chain Intern\",\r\n\t\t\t\t\"startDate\": {\r\n\t\t\t\t\t\"month\": 5,\r\n\t\t\t\t\t\"year\": 2018\r\n\t\t\t\t},\r\n\t\t\t\t\"endDate\": {\r\n\t\t\t\t\t\"month\": 8,\r\n\t\t\t\t\t\"year\": 2018\r\n\t\t\t\t},\r\n\t\t\t\t\"description\": \"Collaborated with the purchasing department to develop metrics for tracking department performance\\nResolved several hundred pricing discrepancies\\nFormulated standard operating procedures for future interns\",\r\n\t\t\t\t\"visible\": true\r\n\t\t\t},\r\n\t\t\t{\r\n        \"id\": 3,\r\n\t\t\t\t\"organization\": \"Buckeye Undergraduate Consulting Club\",\r\n\t\t\t\t\"location\": \"Columbus, Ohio\",\r\n\t\t\t\t\"position\": \"VP of Marketing and Communications\",\r\n\t\t\t\t\"startDate\": {\r\n\t\t\t\t\t\"month\": 1,\r\n\t\t\t\t\t\"year\": 2017\r\n\t\t\t\t},\r\n\t\t\t\t\"endDate\": null,\r\n\t\t\t\t\"description\": \"Conducted market research on blockchain technology feasibility for wire transactions\\nDeveloped analytical skills through Power BI and Tableau workshops\\nCompeted in three case competitions\",\r\n\t\t\t\t\"visible\": false\r\n\t\t\t},\r\n\t\t\t{\r\n        \"id\": 4,\r\n\t\t\t\t\"organization\": \"Phi Chi Theta Professional Business Fraternity\",\r\n\t\t\t\t\"location\": \"Columbus, Ohio\",\r\n\t\t\t\t\"position\": \"Professional Development Chair\",\r\n\t\t\t\t\"startDate\": {\r\n\t\t\t\t\t\"month\": 2,\r\n\t\t\t\t\t\"year\": 2018\r\n\t\t\t\t},\r\n\t\t\t\t\"endDate\": null,\r\n\t\t\t\t\"description\": \"Created individualized professional development experiences for new members\\nDeveloped and executed workshops to enrich pledges' understanding of brotherhood, professionalism, and philanthropy\",\r\n\t\t\t\t\"visible\": false\r\n\t\t\t},\r\n\t\t\t{\r\n        \"id\": 5,\r\n\t\t\t\t\"organization\": \"Fisher Emerging Consultants\",\r\n\t\t\t\t\"location\": \"Columbus, Ohio\",\r\n\t\t\t\t\"position\": \"Member\",\r\n\t\t\t\t\"startDate\": {\r\n\t\t\t\t\t\"month\": 2,\r\n\t\t\t\t\t\"year\": 2019\r\n\t\t\t\t},\r\n\t\t\t\t\"endDate\": {\r\n\t\t\t\t\t\"month\": 4,\r\n\t\t\t\t\t\"year\": 2019\r\n\t\t\t\t},\r\n\t\t\t\t\"description\": \"Participated in a consulting career readiness program focusing on problem solving, professionalism, and networking\",\r\n\t\t\t\t\"visible\": false\r\n\t\t\t}\r\n\t\t]\r\n\t},\r\n\t\"projects\": {\r\n\t\t\"visible\": true,\r\n\t\t\"items\": [\r\n\t\t\t{\r\n        \"id\": 0,\r\n\t\t\t\t\"title\": \"Blockchain Feasibility Research\",\r\n\t\t\t\t\"organization\": \"Buckeye Undergraduate Consulting Club\",\r\n\t\t\t\t\"location\": \"Columbus, Ohio\",\r\n\t\t\t\t\"link\": \"Github.com\",\r\n\t\t\t\t\"technologies\": \"React, Express, Node\",\r\n\t\t\t\t\"startDate\": {\r\n\t\t\t\t\t\"month\": 1,\r\n\t\t\t\t\t\"year\": 2018\r\n\t\t\t\t},\r\n\t\t\t\t\"endDate\": {\r\n\t\t\t\t\t\"month\": 3,\r\n\t\t\t\t\t\"year\": 2018\r\n\t\t\t\t},\r\n\t\t\t\t\"description\": \"Conducted in-depth research on the feasibility of incorporating blockchain technology for wire transactions for a local Columbus client.\",\r\n\t\t\t\t\"visible\": true\r\n\t\t\t},\r\n\t\t\t{\r\n        \"id\": 1,\r\n\t\t\t\t\"title\": \"Consumer Insights Case Competition\",\r\n\t\t\t\t\"organization\": \"Phi Chi Theta\",\r\n\t\t\t\t\"location\": \"Columbus, Ohio\",\r\n\t\t\t\t\"startDate\": {\r\n\t\t\t\t\t\"month\": 9,\r\n\t\t\t\t\t\"year\": 2018\r\n\t\t\t\t},\r\n\t\t\t\t\"endDate\": {\r\n\t\t\t\t\t\"month\": 11,\r\n\t\t\t\t\t\"year\": 2018\r\n\t\t\t\t},\r\n\t\t\t\t\"description\": \"Competed and won first place in the Phi Chi Theta-DSP Case Competition, presenting innovative solutions for consumer insights.\",\r\n\t\t\t\t\"visible\": true\r\n\t\t\t},\r\n\t\t\t{\r\n        \"id\": 2,\r\n\t\t\t\t\"title\": \"Johnson & Johnson M&A Case\",\r\n\t\t\t\t\"organization\": \"Ohio State Business Association\",\r\n\t\t\t\t\"location\": \"Columbus, Ohio\",\r\n\t\t\t\t\"startDate\": {\r\n\t\t\t\t\t\"month\": 4,\r\n\t\t\t\t\t\"year\": 2019\r\n\t\t\t\t},\r\n\t\t\t\t\"endDate\": {\r\n\t\t\t\t\t\"month\": 5,\r\n\t\t\t\t\t\"year\": 2019\r\n\t\t\t\t},\r\n\t\t\t\t\"description\": \"Won first place in Johnson & Johnson’s M&A case competition, providing strategic merger recommendations to a panel of executives.\",\r\n\t\t\t\t\"visible\": false\r\n\t\t\t}\r\n\t\t]\r\n\t},\r\n\t\"skills\": {\r\n\t\t\"items\": [\r\n\t\t\t{\r\n\t\t\t\t\"skillName\": \"Excel\"\r\n\t\t\t},\r\n\t\t\t{\r\n\t\t\t\t\"skillName\": \"Tableau\"\r\n\t\t\t}\r\n\t\t]\r\n\t},\r\n\t\"orderOfSections\": [\"EXPERIENCE\", \"PROJECTS\", \"SKILLS\", \"EDUCATION\"]\r\n}\r\n";
}
