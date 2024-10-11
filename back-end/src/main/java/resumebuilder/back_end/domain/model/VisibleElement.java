package resumebuilder.back_end.domain.model;

public abstract class VisibleElement {
    private boolean visibility;

    public VisibleElement() {
        this.visibility = true;
    }

    public boolean getVisibility() {
        return this.visibility;
    }

    public void setVisibility(boolean visibility) {
        this.visibility = visibility;
    }
}
