package com.example.Exams.Exam;

import com.example.Exams.Client.Client;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "exams")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
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
}
