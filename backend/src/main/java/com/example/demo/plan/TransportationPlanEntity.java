package com.example.demo.plan;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.Generated;

@Data
@Entity
@DiscriminatorValue("Transportation")
public class TransportationPlanEntity extends PlanEntity{
    private VechicleType vechicleType;
    private String startAddress;
    private String endAddress;
}
