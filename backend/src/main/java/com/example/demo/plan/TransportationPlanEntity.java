package com.example.demo.plan;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.Generated;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Entity
public class TransportationPlanEntity{

    @Id
    @GeneratedValue
    private Long id;

    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private String additionalInfo;
    private BigDecimal pricePerPerson;

    private VechicleType vechicleType;
    private String startAddress;
    private String endAddress;
}
