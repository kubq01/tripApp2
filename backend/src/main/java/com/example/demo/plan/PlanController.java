package com.example.demo.plan;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/plan")
public class PlanController {
    private final ActivityPlanService activityPlanService;
    private final TransportationPlanRepository transportationPlanRepository;
}
