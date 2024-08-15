package com.example.Exams.Exam;

import com.example.Exams.Client.Client;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
@Table(name = "exams")
public class Exam {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String companyName;
    private String examDate;
    private boolean previousExam;

    @ManyToOne
    @JoinColumn(name = "client_id", nullable = true)
    @JsonBackReference // Evitar la recursión infinita
    private Client client;

    // Constructor vacío
    public Exam() {
    }

    // Constructor completo
    public Exam(Long id, String companyName, String examDate, boolean previousExam, Client client) {
        this.id = id;
        this.companyName = companyName;
        this.examDate = examDate;
        this.previousExam = previousExam;
        this.client = client;
    }

    // Getters y Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getExamDate() {
        return examDate;
    }

    public void setExamDate(String examDate) {
        this.examDate = examDate;
    }

    public boolean isPreviousExam() {
        return previousExam;
    }

    public void setPreviousExam(boolean previousExam) {
        this.previousExam = previousExam;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }
}
