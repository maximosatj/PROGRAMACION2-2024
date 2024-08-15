package com.example.Exams.Exam;

import com.example.Exams.Client.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/exams")
public class ExamController {

    @Autowired
    private ExamService examService;  // Inyección del servicio ExamService

    @Autowired
    private ClientRepository clientRepository;  // Necesario para validar el cliente

    @GetMapping
    public List<Exam> getAllExams() {
        return examService.getAllExams();  // Usando el servicio para obtener todos los exámenes
    }

    @GetMapping("/{id}")
    public ResponseEntity<Exam> getExamById(@PathVariable Long id) {
        Optional<Exam> exam = examService.getExamById(id);  // Usando el servicio para obtener un examen por ID
        if (exam.isPresent()) {
            return new ResponseEntity<>(exam.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity<Exam> createExam(@RequestBody Exam exam) {
        try {
            Exam createdExam = examService.createExam(exam);
            return new ResponseEntity<>(createdExam, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();  // Imprimir stack trace para depuración
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }



    @PutMapping("/{id}")
    public ResponseEntity<Exam> updateExam(@PathVariable Long id, @RequestBody Exam examDetails) {
        Optional<Exam> existingExam = examService.getExamById(id);  // Usando el servicio para obtener un examen por ID
        if (existingExam.isPresent()) {
            Exam updatedExam = existingExam.get();
            updatedExam.setCompanyName(examDetails.getCompanyName());
            updatedExam.setExamDate(examDetails.getExamDate());
            updatedExam.setPreviousExam(examDetails.isPreviousExam());

            // Verificar y actualizar el cliente si es necesario
            if (examDetails.getClient() != null && examDetails.getClient().getId() != null) {
                if (clientRepository.existsById(examDetails.getClient().getId())) {
                    updatedExam.setClient(examDetails.getClient());
                } else {
                    return new ResponseEntity<>(HttpStatus.BAD_REQUEST);  // Cliente no válido
                }
            }

            examService.createExam(updatedExam);  // Usando el servicio para guardar el examen actualizado
            return new ResponseEntity<>(updatedExam, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteExam(@PathVariable Long id) {
        if (examService.deleteExam(id)) {  // Usando el servicio para eliminar un examen
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
