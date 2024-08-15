package com.example.Exams.Exam;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ExamService {

    @Autowired
    private ExamRepository examRepository;

    public List<Exam> getAllExams() {
        return examRepository.findAll();
    }

    public Optional<Exam> getExamById(Long id) {
        return examRepository.findById(id);
    }

    public Exam createExam(Exam exam) {
        return examRepository.save(exam);
    }

    public Optional<Exam> updateExam(Long id, Exam examDetails) {
        return examRepository.findById(id).map(exam -> {
            exam.setCompanyName(examDetails.getCompanyName());
            exam.setExamDate(examDetails.getExamDate());
            exam.setPreviousExam(examDetails.isPreviousExam());
            return examRepository.save(exam);
        });
    }

    public boolean deleteExam(Long id) {
        return examRepository.findById(id).map(exam -> {
            examRepository.delete(exam);
            return true;
        }).orElse(false);
    }
}
