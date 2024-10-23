package resumebuilder.back_end.domain.entities;

import java.util.ArrayList;
import java.util.List;

public class User {
    private Integer id;
   
    private List<Integer> resumesId;

    public User(int id) {
        this.id = id;
        this.resumesId = new ArrayList<>();

    }
    public Integer getId(){
        return id;
    }
    public void setId(Integer id){
        this.id = id;
    }
    public List<Integer> getResumes(){
        return resumesId;
    }
    public void setResumes(List<Integer> resumesId) {
        this.resumesId = resumesId;
    }

    public void addResume(Integer resumeId) {
        this.resumesId.add(resumeId);
    }

    public void removeResume(Integer resumeId) {
        this.resumesId.remove(resumeId);
    }
}


// id
// resumes: list of resumes
// UserController (/users)
// GET
// POST
// UserService