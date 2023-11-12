package com.example.demo.plan;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Generated;

import java.util.List;

@Data
@Entity
@DiscriminatorValue("Activity")
public class ActivityPlanEntity extends PlanEntity{

    private String address;
    @OneToMany
    private List<NoteEntity> notes;
}
