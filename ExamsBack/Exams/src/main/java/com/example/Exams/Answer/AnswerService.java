package com.example.Exams.Answer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AnswerService {

    @Autowired
    private AnswerRepository answerRepository;

    // Obtener todas las respuestas
    public List<Answer> getAllAnswers() {
        return answerRepository.findAll();
    }

    // Obtener una respuesta por su ID
    public Optional<Answer> getAnswerById(Long id) {
        return answerRepository.findById(id);
    }

    // Crear una nueva respuesta
    public Answer createAnswer(Answer answer) {
        return answerRepository.save(answer);
    }

    // Actualizar una respuesta existente
    public Optional<Answer> updateAnswer(Long id, Answer answerDetails) {
        return answerRepository.findById(id).map(answer -> {
            answer.setScore(answerDetails.getScore());
            answer.setAnswerText(answerDetails.getAnswerText());
            return answerRepository.save(answer);
        });
    }

    // Eliminar una respuesta
    public boolean deleteAnswer(Long id) {
        return answerRepository.findById(id).map(answer -> {
            answerRepository.delete(answer);
            return true;
        }).orElse(false);
    }
}
