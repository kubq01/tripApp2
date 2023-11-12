package com.example.demo.plan;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Generated;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Optional;

@Data
@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "plan_type", discriminatorType = DiscriminatorType.STRING)
public abstract class PlanEntity {

    private LocalDateTime startDate;
    private PlanType type;
    private LocalDateTime endDate;
    private String additionalInfo;
    private BigDecimal pricePerPerson;
    @Id
    private Long id;

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }
}
