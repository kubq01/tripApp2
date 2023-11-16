package com.example.demo.plan;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Data
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PlanEntity {
    @Id
    @GeneratedValue
    private Long id;

    private LocalDateTime startDate;
    private String description;
    private LocalDateTime endDate;
    private String additionalInfo;
    private BigDecimal pricePerPerson;
    private String address;
    @OneToMany
    private List<NoteEntity> notes;
}
