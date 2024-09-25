package com.example.Exams.UserAnswer;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserAnswerRepository extends JpaRepository<UserAnswer, Long> {
    // Nuevo método para obtener respuestas por examen
    List<UserAnswer> findByExamId(Long examId);
}
