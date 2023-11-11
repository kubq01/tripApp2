package com.example.demo.plan;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Data;
import lombok.Generated;

import java.util.List;

@Data
@Entity
public class ActivityPlanEntity extends PlanEntity{

    @Id
    @Generated
    private Long id;
    private String address;
    @OneToMany
    private List<NoteEntity> notes;
}
