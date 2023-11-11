package com.example.demo.plan;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.Generated;

@Data
@Entity
public class TransportationPlanEntity extends PlanEntity{
    @Id
    @Generated
    private Long id;
    private VechicleType vechicleType;
    private String startAddress;
    private String endAddress;
}
