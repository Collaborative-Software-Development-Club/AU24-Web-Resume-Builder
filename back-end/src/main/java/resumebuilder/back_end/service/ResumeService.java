package resumebuilder.back_end.service;

import org.springframework.stereotype.Service;
import resumebuilder.back_end.domain.dto.ResumeDto;
import resumebuilder.back_end.domain.entities.*;
import resumebuilder.back_end.mappers.ResumeMapper;
import resumebuilder.back_end.repository.ResumeRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ResumeService {

    private final ResumeRepository resumeRepository;
    private final ResumeMapper resumeMapper;

    public ResumeService(ResumeRepository resumeRepository, ResumeMapper resumeMapper) {
        this.resumeRepository = resumeRepository;
        this.resumeMapper = resumeMapper;
    }

    public boolean exists(String id) {
        return resumeRepository.existsById(id);
    }

    public ResumeDto save(ResumeDto resumeDto) {
        ResumeEntity resumeEntity = resumeMapper.mapToEntity(resumeDto);
        resumeRepository.save(resumeEntity);
        return resumeMapper.mapToDto(resumeEntity);
    }

    public List<ResumeDto> findAll() {
        List<ResumeEntity> resumes = new ArrayList<>(resumeRepository.findAll());
        return resumes.stream()
                .map(resumeMapper::mapToDto)
                .collect(Collectors.toList());
    }

    public Optional<ResumeDto> findOne(String id) {
        Optional<ResumeEntity> resume = resumeRepository.findById(id);
        return resume.map(resumeMapper::mapToDto);
    }

    public ResumeDto partialUpdate(String id, ResumeDto resumeDto) {
        Optional<ResumeEntity> resumeEntity = resumeRepository.findById(id);
        if (resumeEntity.isPresent()) {
            ResumeDto resume = resumeMapper.mapToDto(resumeEntity.get());
            Optional.ofNullable(resumeDto.getName()).ifPresent(resume::setName);
            Optional.ofNullable(resumeDto.getEducation()).ifPresent(resume::setEducation);
            Optional.ofNullable(resumeDto.getExperience()).ifPresent(resume::setExperience);
            Optional.ofNullable(resumeDto.getContactMethods()).ifPresent(resume::setContactMethods);
            Optional.ofNullable(resumeDto.getSkills()).ifPresent(resume::setSkills);
            Optional.ofNullable(resumeDto.getProjects()).ifPresent(resume::setProjects);
            Optional.ofNullable(resumeDto.getOrderOfSections()).ifPresent(resume::setOrderOfSections);
            ResumeEntity updatedResume = resumeRepository.save(resumeMapper.mapToEntity(resume));
            return resumeMapper.mapToDto(updatedResume);
        } else {
            throw new RuntimeException("Resume does not exist");
        }
    }

    public void delete(String id) {
        resumeRepository.deleteById(id);
    }

}
