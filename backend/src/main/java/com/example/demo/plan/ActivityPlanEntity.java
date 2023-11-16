package com.example.demo.plan;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Generated;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
public class ActivityPlanEntity{

    @Id
    @GeneratedValue
    private Long id;
    private String description;

    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private String additionalInfo;
    private BigDecimal pricePerPerson;


    private String address;
    @OneToMany
    private List<NoteEntity> notes;
}
