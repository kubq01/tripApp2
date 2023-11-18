package com.example.demo.trip;

import com.example.demo.plan.ActivityPlanEntity;
import com.example.demo.plan.PlanEntity;
import com.example.demo.plan.TransportationPlanEntity;
import com.example.demo.user.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class TripEntity {
    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private LocalDate startDay;
    private LocalDate finishDay;
    @ManyToOne
    private User organizer;
    @ManyToMany(fetch = FetchType.EAGER)
    private List<User> participants;
    @OneToMany(fetch = FetchType.EAGER)
    private List<PlanEntity> plans;


    public void addPlan(PlanEntity plan){
        plans.add(plan);
    }
    public void deletePlan(PlanEntity plan){
        plans.remove(plan);
    }

    public void addParticipant(User user){
        participants.add(user);
    }

    public void deleteParticipant(User user){
        participants.remove(user);
    }
    public TripEntity(String name, User organizer) {
        this.name = name;
        this.organizer = organizer;
        this.participants = Collections.emptyList();
        this.plans = Collections.emptyList();
    }

    public TripEntity(String name, User organizer, List<User> participants) {
        this.name = name;
        this.organizer = organizer;
        this.participants = participants;
        this.plans = Collections.emptyList();
    }
}
