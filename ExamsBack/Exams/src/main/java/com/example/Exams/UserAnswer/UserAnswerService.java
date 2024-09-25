package com.example.Exams.UserAnswer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserAnswerService {

    @Autowired
    private UserAnswerRepository userAnswerRepository;

    public List<UserAnswer> getAllUserAnswers() {
        return userAnswerRepository.findAll();
    }

    public Optional<UserAnswer> getUserAnswerById(Long id) {
        return userAnswerRepository.findById(id);
    }

    public UserAnswer createUserAnswer(UserAnswer userAnswer) {
        return userAnswerRepository.save(userAnswer);
    }

    // Nuevo método para obtener respuestas por examen
    public List<UserAnswer> getUserAnswersByExamId(Long examId) {
        return userAnswerRepository.findByExamId(examId);
    }

    public Optional<UserAnswer> updateUserAnswer(Long id, UserAnswer userAnswerDetails) {
        if (userAnswerRepository.existsById(id)) {
            userAnswerDetails.setId(id);
            return Optional.of(userAnswerRepository.save(userAnswerDetails));
        }
        return Optional.empty();
    }

    public boolean deleteUserAnswer(Long id) {
        if (userAnswerRepository.existsById(id)) {
            userAnswerRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
