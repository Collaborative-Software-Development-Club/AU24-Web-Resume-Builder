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

    private final String resume_JSON_Format = "{\n" + //
            "  \"name\": \"Lorenzo Mion\",\n" + //
            "  \"contactMethods\": [\n" + //
            "    \"lorenzodfmion@gmail.com\"\n" + //
            "  ],\n" + //
            "  \"education\": {\n" + //
            "    \"visible\": true,\n" + //
            "    \"content\": {\n" + //
            "      \"institution\": \"The Ohio State University\",\n" + //
            "      \"location\": \"Columbus, OH\",\n" + //
            "      \"degree\": \"Computer Science and Engineering, Specialization in Software Engineering\",\n" + //
            "      \"graduationDate\": {\n" + //
            "        \"month\": 5,\n" + //
            "        \"year\": 2026\n" + //
            "      },\n" + //
            "      \"specialization\": \"\",\n" + //
            "      \"minor\": \"\",\n" + //
            "      \"gpa\": \"3.8\",\n" + //
            "      \"honors\": \"4x Dean’s List, 2x Scholar-Athlete Award, Academic All-Big Ten, USFCA All-Academic Team 23-24\"\n"
            + //
            "    }\n" + //
            "  },\n" + //
            "  \"experience\": {\n" + //
            "    \"visible\": true,\n" + //
            "    \"content\": [\n" + //
            "      {\n" + //
            "        \"6\": {},\n" + //
            "        \"7\": {},\n" + //
            "        \"id\": 0,\n" + //
            "        \"visible\": true,\n" + //
            "        \"company\": \"OSU Wexner Medical Center - IT Department\",\n" + //
            "        \"description\": \"Worked on Vitals, the proprietary digital platform used by Ohio State’s 750 medical students and 3,400+ academic staff\\n"
            + //
            "Wrote R scripts to create SQL queries to upload data from 200+ new matriculants to the Vitals MySQL database\\n"
            + //
            "Used Angular with Kendo UI and Bootstrap to streamline the Vitals user interface, making it more responsive on mobile devices\\n"
            + //
            "Participated professional development sessions twice a week to further develop communication, leadership, and organizational skills\",\n"
            + //
            "        \"location\": \"\",\n" + //
            "        \"position\": \"Software Engineering Intern\",\n" + //
            "        \"startDate\": {\n" + //
            "          \"month\": 6,\n" + //
            "          \"year\": 2024\n" + //
            "        },\n" + //
            "        \"endDate\": {\n" + //
            "          \"month\": 7,\n" + //
            "          \"year\": 2024\n" + //
            "        }\n" + //
            "      },\n" + //
            "      {\n" + //
            "        \"1\": {},\n" + //
            "        \"startDate\": {\n" + //
            "          \"month\": 1,\n" + //
            "          \"year\": \"2024\"\n" + //
            "        },\n" + //
            "        \"endDate\": {\n" + //
            "          \"month\": 0\n" + //
            "        },\n" + //
            "        \"location\": \"Columbus, OH\",\n" + //
            "        \"position\": \"Web Project Lead\",\n" + //
            "        \"company\": \"Collaborative Software Development Club at Ohio State\",\n" + //
            "        \"description\": \"Manage and teach 18 students in weekly meetings to develop a Full-Stack (React.js + Spring Boot) AI Resume Builder\\n"
            + //
            " Designed a REST API with Spring Boot using the Controller, Service Repository pattern to manage resumes and resume contents\\n"
            + //
            " Incorporated MongoDB Atlas NoSQL database with Spring Boot and developed a non-relational schema to store resume information\\n"
            + //
            " Developed a resume builder interface with React.js, Vite, Taiwind, Shadcn UI to handle user input for creation of formatted resumes\\n"
            + //
            " Led a team of 5 students through the creation of a Full-Stack blog application using Express.js, React.js, MongoDB Atlas\\n"
            + //
            " Redesigned the club website with better UI design using Next.js, TypeScript, and CSS, attracting ~70 students to the first fall meeting\\n"
            + //
            " Created a custom CMS using the Notion API and Next.js SSG (Static Site Generation) to facilitate changes to the club website\"\n"
            + //
            "      }\n" + //
            "    ]\n" + //
            "  },\n" + //
            "  \"projects\": {\n" + //
            "    \"visible\": true,\n" + //
            "    \"content\": [\n" + //
            "      {\n" + //
            "        \"id\": 0,\n" + //
            "        \"visible\": true,\n" + //
            "        \"organization\": \"\",\n" + //
            "        \"description\": \"Co-founded and developed a centralized platform for results and stats of NCAA fencing results and meets using TypeScript and Next.js\\n"
            + //
            " Created Python scripts using Pandas and BeautifulSoup to get data from 1300+ matches, 250+ athletes from CSV and HTML files\\n"
            + //
            " Reduced page loading time and improved SEO by leveraging Static Site Generation (SSG) to create pages for over 80+ teams\\n"
            + //
            " Increased development speed and reduced code duplication by creating reusable UI components based on ShadcnUI and Tailwind CSS\",\n"
            + //
            "        \"location\": \"\",\n" + //
            "        \"title\": \"NonStop Fencing Web App\",\n" + //
            "        \"startDate\": {\n" + //
            "          \"year\": null\n" + //
            "        },\n" + //
            "        \"endDate\": {\n" + //
            "          \"month\": 2,\n" + //
            "          \"year\": 2024\n" + //
            "        },\n" + //
            "        \"startYear\": \"2024\",\n" + //
            "        \"technologies\": \"TypeScript, Next.js, React.js, Python, Pandas, BeautifulSoup\",\n" + //
            "        \"link\": \"https://github.com/ldfMion/FEH_Robot_A\"\n" + //
            "      },\n" + //
            "      {\n" + //
            "        \"startDate\": {\n" + //
            "          \"month\": 1,\n" + //
            "          \"year\": 2023\n" + //
            "        },\n" + //
            "        \"endDate\": {\n" + //
            "          \"month\": 4,\n" + //
            "          \"year\": 2024\n" + //
            "        },\n" + //
            "        \"location\": \"\",\n" + //
            "        \"title\": \"Robot Competition - Fundamentals of Engineering Honors \",\n" + //
            "        \"description\": \"Coordinated a team of 3 people to prototype, fabricate, and program a robot for the FEH robotics course competition\\n"
            + //
            " Utilized C++ and SolidWorks to program the FEH microcontroller and fabricate essential robot components\\n"
            + //
            " Accelerated development by creating a C++ library that abstracted encoder counts and the Robot Positioning System\",\n"
            + //
            "        \"technologies\": \"\",\n" + //
            "        \"link\": \"https://github.com/ldfMion/FEH_Robot_A\",\n" + //
            "        \"organization\": \"\",\n" + //
            "        \"startYear\": \"2023\",\n" + //
            "        \"endMonth\": {\n" + //
            "          \"month\": 4\n" + //
            "        },\n" + //
            "        \"endYear\": {\n" + //
            "          \"year\": 20235\n" + //
            "        }\n" + //
            "      },\n" + //
            "      {\n" + //
            "        \"startDate\": {},\n" + //
            "        \"endDate\": {\n" + //
            "          \"month\": 0\n" + //
            "        },\n" + //
            "        \"location\": \"\",\n" + //
            "        \"title\": \"Instant Fencing Web App\",\n" + //
            "        \"description\": \"Developed a web app using Next.js that allows fencers to create mock competitions without having to do calculations by hand\\n"
            + //
            "Incorporated Firebase Authentication and Firestore, allowing for real-time collaboration between users\\n"
            + //
            " Formalized a non-relational (NoSQL) data modeling schema within Firestore for managing users, events, results, and bouts\\n"
            + //
            " Designed a custom user interface (UI) in Figma and CSS modules to allow for easy visualization of results and tables\\n"
            + //
            " Developed an automated end-to-end (E2E) testing suite for the user interface using the Cypress testing library, increasing bug detectio\",\n"
            + //
            "        \"technologies\": \"JavaScript, Next.js React.js, Firebase, CSS, Figma, Cypress\",\n" + //
            "        \"link\": \"github.com\",\n" + //
            "        \"organization\": \"\",\n" + //
            "        \"startYear\": \"2024\"\n" + //
            "      }\n" + //
            "    ]\n" + //
            "  },\n" + //
            "  \"skills\": {\n" + //
            "    \"visible\": true,\n" + //
            "    \"content\": [\n" + //
            "      \"JavaScript\",\n" + //
            "      \"React.js\"\n" + //
            "    ]\n" + //
            "  },\n" + //
            "  \"orderOfSections\": [\n" + //
            "    \"EDUCATION\",\n" + //
            "    \"SKILLS\",\n" + //
            "    \"EXPERIENCE\",\n" + //
            "    \"PROJECTS\"\n" + //
            "  ],\n" + //
            "  \"description\": \"<Enter something that identifies this resume, like the kind of role it is used for. Keep in around 2 to 3 words.>\"\n"
            + //
            "}";
}
