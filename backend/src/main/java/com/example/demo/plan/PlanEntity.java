package com.example.demo.plan;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.Generated;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Optional;

@Data
public abstract class PlanEntity {

    private LocalDateTime startDate;
    private PlanType type;
    private Optional<LocalDateTime> endDate;
    private String additionalInfo;
    private BigDecimal pricePerPerson;
}
