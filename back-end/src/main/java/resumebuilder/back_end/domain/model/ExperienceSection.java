package resumebuilder.back_end.domain.model;

import resumebuilder.back_end.domain.model.ExperienceItem;
import resumebuilder.back_end.domain.model.VisibleElement;

import java.util.List;
import java.util.Optional;
import java.util.ArrayList;

public class ExperienceSection extends VisibleElement {
    private List<ExperienceItem> experiences;

    public ExperienceSection() {
        this.experiences = new ArrayList<>();
        this.setVisibility(true);
    }

    public ExperienceSection(List<ExperienceItem> experiences) {
        this.experiences = experiences;
        this.setVisibility(true);
    }

    public List<ExperienceItem> getItems() {
        return experiences;
    }

    public void setAll(List<ExperienceItem> experiences) {
        this.experiences = experiences;
    }

    public void add(ExperienceItem newExperience) {
        experiences.add(newExperience);
    }

    public Optional<ExperienceItem> remove(int id) {
        for (ExperienceItem experience : experiences) {
            if (experience.getId() == id) {
                experiences.remove(experience);
                return Optional.of(experience);
            }
        }
        return Optional.empty();
    }
    public Optional<ExperienceItem> get(int id) {
        for (ExperienceItem experience : experiences) {
            if (experience.getId() == id) {
                return Optional.of(experience);
            }
        }
        return Optional.empty();
    }
}
