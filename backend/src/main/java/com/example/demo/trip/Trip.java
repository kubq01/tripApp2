package com.example.demo.trip;

import com.example.demo.plan.ActivityPlanEntity;
import com.example.demo.plan.PlanEntity;
import com.example.demo.plan.TransportationPlanEntity;
import com.example.demo.user.UserSimplified;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Trip {

    @Generated
    private Long id;
    private String name;
    private LocalDate startDay;
    private LocalDate finishDay;
    private UserSimplified organizer;

    private List<UserSimplified> participants;
    private List<PlanEntity> plans;
}
