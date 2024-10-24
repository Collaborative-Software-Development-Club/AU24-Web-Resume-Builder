package resumebuilder.back_end.domain.model;

public abstract class VisibleElement {
    private boolean visible;

    public VisibleElement() {
        this.visible = true;
    }

    public boolean getVisibile() {
        return this.visible;
    }

    public void setVisibile(boolean visible) {
        this.visible = visible;
    }
}
