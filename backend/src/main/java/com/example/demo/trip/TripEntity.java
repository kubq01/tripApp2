package com.example.demo.trip;

import com.example.demo.plan.ActivityPlanEntity;
import com.example.demo.plan.PlanEntity;
import com.example.demo.plan.TransportationPlanEntity;
import com.example.demo.user.User;
import jakarta.persistence.*;
import lombok.*;

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
    @ManyToOne
    private User organizer;
    @ManyToMany(fetch = FetchType.EAGER)
    private List<User> participants;
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "parent_id")
    private List<PlanEntity> plans;

    public void addPlan(ActivityPlanEntity activityPlan){
        plans.add(activityPlan);
    }

    public void addPlan(TransportationPlanEntity transportationPlan){
        plans.add(transportationPlan);
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
