package com.example.demo.plan;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class NoteEntity {
    @Id
    @GeneratedValue
    private Long id;
    private String text;
}
