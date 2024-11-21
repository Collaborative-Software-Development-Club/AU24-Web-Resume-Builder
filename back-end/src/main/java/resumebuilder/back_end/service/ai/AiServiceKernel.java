package resumebuilder.back_end.service.ai;

public abstract class AiServiceKernel implements AiService {
    public String enhanceResumeBulletPoints(String initialText) {
        return this.callLLM(createResumeBulletPointsPrompt(initialText));
    }
    protected abstract String callLLM(String prompt); 
    private String createResumeBulletPointsPrompt(String initialText) {
       return "You are an expert in helping create resumes for job applicants. You will take in a description of a position or project and output a revised version in bullet point considering the provided guidlines.\n" + //
                "Guidelines: 1- Use the following action verbs at the start of the bullet points: " + ACTION_VERBS + "\n" + //
                "2- Follow the instructions for the XYZ method: " + XYZ_METHOD + "\n" + //
                "Apply changes to the follwing description: " + initialText + "\n" + //
                "Return only the improved description and nothing more. DO NOT OUTPUT ANYTHIGN APART FROM THE BULLET POINTS FOR THE RESUME. Do not add formatting to the bullet points. Just separate the with \\n.";
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
    private final String XYZ_METHOD = "This is the crux of the advice by Laszlo Bock, a former Google senior vice president of personnel operations. You want to adhere to the bullet-point format as we've discussed, and articulate your experience in this specific way.\n" + //
                "\n" + //
                "Google describes this as: \"Accomplished [X] as measured by [Y], by doing [Z].\" But just to make it easier to remember, let's shorten it to X-Y-Z.  \n" + //
                "\n" + //
                "This means that you want to focus on accomplishments -- quantitative results and the impact that you had as a result. It's probably easiest to explain this by using a few examples from the Google recruiters' YouTube videos themselves.\n" + //
                "\n" + //
                "For example, imagine an applicant who wants to make clear that he or she is a member of a prestigious group. Here's the OK way, the better way, and the best way to describe this on a resume, according to Google:\n" + //
                "\n" + //
                "OK: \"Member of Leadership for Tomorrow Society\"\n" + //
                "Better: \"Selected as one of 275 for this 12-month professional development program for high-achieving diverse talent.\"\n" + //
                "Best: \"Selected as one of 275 participants nationwide for this 12-month professional development program for high-achieving diverse talent based on leadership potential and academic success.\"\n" + //
                "Here's another example, this one for a technical position in which the applicant wants to point out that he or she placed second in a hackathon.\n" + //
                "\n" + //
                "OK: \"Won second place in hackathon.\"\n" + //
                "Better: \"Won second place out of 50 teams in hackathon.\"\n" + //
                "Best: \"Won second place out of 50 teams in hackathon at NJ Tech by working with two colleagues to develop an app that synchronizes mobile calendars.\n" + //
                "(In this case, the last, \"best\" is my own interpretation; Google doesn't actually provide the third suggestion. But I hope the point is clear.)\n" + //
                "\n" + //
                "Here's a final example, intended for a business applicant who wants to show how much he or she contributed in a client support role: \n" + //
                "\n" + //
                "OK: \"Grew revenue for small and medium business clients.\"\n" + //
                "Better: \"Grew revenue for small and medium business clients by 10% QoQ\"\n" + //
                "Best: \"Grew revenue for 15 small and medium business clients by 10% QoQ by mapping new software features as solutions to their business goals.\"\n" + //
                "One point about jargon: Use shorthand like \"QoQ\" (for quarter over quarter) only if you're 100 percent sure that the resume reviewer will know exactly what you mean.";
}
