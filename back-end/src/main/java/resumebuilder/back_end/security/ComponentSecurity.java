package resumebuilder.back_end.security;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import resumebuilder.back_end.domain.dto.ExperienceDto;
import resumebuilder.back_end.domain.dto.ProjectDto;
import resumebuilder.back_end.domain.dto.ResumeDto;
import resumebuilder.back_end.service.ExperienceService;
import resumebuilder.back_end.service.ProjectService;
import resumebuilder.back_end.service.ResumeService;

@Component("componentSecurity")
public class ComponentSecurity {
    private final ResumeService resumeService;
    private final ProjectService projectService;
    private final ExperienceService experienceService;

    public ComponentSecurity(ResumeService resumeService, ProjectService projectService, ExperienceService experienceService) {
        this.resumeService = resumeService;
        this.projectService = projectService;
        this.experienceService = experienceService;
    }

    public boolean hasAccessToResume(Authentication auth, String resumeId) {
        UserPrincipal user = (UserPrincipal) auth.getPrincipal();
        ResumeDto resume = resumeService.findOne(resumeId);
        return resume != null && resume.getUserId().equals(user.getId());
    }

    public boolean hasAccessToProject(Authentication auth, String projectId) {
        UserPrincipal user = (UserPrincipal) auth.getPrincipal();
        ProjectDto project = projectService.findOne(projectId);
        return project != null && project.getUserId().equals(user.getId());
    }

    public boolean hasAccessToExperience(Authentication auth, String experienceId) {
        UserPrincipal user = (UserPrincipal) auth.getPrincipal();
        ExperienceDto experience = experienceService.findOne(experienceId);
        return experience != null && experience.getUserId().equals(user.getId());
    }

    public boolean canAccessUser(Authentication auth, String requestedUserId) {
        UserPrincipal user = (UserPrincipal) auth.getPrincipal();
        return requestedUserId.equals(user.getId());
    }
}
