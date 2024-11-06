package resumebuilder.back_end.domain.model;

public abstract class VisibleElement {
    private boolean visible;

    public VisibleElement() {
        this.visible = true;
    }

    public boolean getVisible() {
        return this.visible;
    }

    public void setVisible(boolean visible) {
        this.visible = visible;
    }
}
