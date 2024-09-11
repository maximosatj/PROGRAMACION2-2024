package com.example.Exams.UserAnswer;

import com.example.Exams.Answer.Answer;
import com.example.Exams.Answer.AnswerService;
import com.example.Exams.Exam.Exam;
import com.example.Exams.Exam.ExamService;
import com.example.Exams.Question.Question;
import com.example.Exams.Question.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/user-answers")
public class UserAnswerController {

    @Autowired
    private UserAnswerService userAnswerService;

    @Autowired
    private ExamService examService;

    @Autowired
    private QuestionService questionService;

    @Autowired
    private AnswerService answerService;

    @GetMapping
    public List<UserAnswer> getAllUserAnswers() {
        return userAnswerService.getAllUserAnswers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserAnswer> getUserAnswerById(@PathVariable Long id) {
        Optional<UserAnswer> userAnswer = userAnswerService.getUserAnswerById(id);
        return userAnswer.map(answer -> new ResponseEntity<>(answer, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<?> createUserAnswers(@RequestBody UserAnswerRequest request) {
        try {
            // Verifica si el examen ID y las respuestas están presentes
            if (request.getExamId() == null || request.getResponses() == null) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }

            // Buscar el examen
            Optional<Exam> examOpt = examService.getExamById(request.getExamId());
            if (examOpt.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
            Exam exam = examOpt.get();

            // Procesar cada respuesta
            for (UserAnswerRequest.Response response : request.getResponses()) {
                // Buscar la pregunta
                Optional<Question> questionOpt = questionService.getQuestionById(response.getQuestionId());
                if (questionOpt.isEmpty()) {
                    return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
                }
                Question question = questionOpt.get();

                // Buscar la respuesta
                Optional<Answer> answerOpt = answerService.getAnswerById(response.getAnswerId());
                if (answerOpt.isEmpty()) {
                    return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
                }
                Answer answer = answerOpt.get();

                UserAnswer userAnswer = new UserAnswer();
                userAnswer.setExam(exam);
                userAnswer.setQuestion(question);
                userAnswer.setAnswer(answer);

                userAnswerService.createUserAnswer(userAnswer);
            }

            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();  // Imprime el stack trace para depuración
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserAnswer> updateUserAnswer(@PathVariable Long id, @RequestBody UserAnswer userAnswerDetails) {
        return userAnswerService.updateUserAnswer(id, userAnswerDetails)
                .map(updatedAnswer -> new ResponseEntity<>(updatedAnswer, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteUserAnswer(@PathVariable Long id) {
        return userAnswerService.deleteUserAnswer(id) ?
                new ResponseEntity<>(HttpStatus.NO_CONTENT) :
                new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
