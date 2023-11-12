package com.example.demo.plan;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/plan")
public class PlanController {
    private final ActivityPlanService activityPlanService;
    private final TransportationPlanService transportationPlanService;

    @PostMapping
    public ResponseEntity<String> createActivityPlan(@RequestBody ActivityPlanEntity activityPlan, @RequestParam Long tripId){
        activityPlanService.createPlan(activityPlan, tripId);
        return ResponseEntity.ok("new plan created");
    }

    @PostMapping
    public ResponseEntity<String> createTransportationPlan(@RequestBody TransportationPlanEntity transportationPlan , @RequestParam Long tripId){
        transportationPlanService.createPlan(transportationPlan, tripId);
        return ResponseEntity.ok("new plan created");
    }

    @PostMapping
    public ResponseEntity<String> updateActivityPlan(@RequestBody ActivityPlanEntity activityPlan){
        activityPlanService.updatePlan(activityPlan);
        return ResponseEntity.ok("plan updated");
    }

    @PostMapping
    public ResponseEntity<String> updateTransportationPlan(@RequestBody TransportationPlanEntity transportationPlan){
        transportationPlanService.updatePlan(transportationPlan);
        return ResponseEntity.ok("plan updated");
    }

    @DeleteMapping
    public ResponseEntity<String> deleteActivityPlan(@RequestBody ActivityPlanEntity activityPlan){
        activityPlanService.deletePlan(activityPlan);
        return ResponseEntity.ok("plan deleted");
    }

    @DeleteMapping
    public ResponseEntity<String> deleteTransportationPlan(@RequestBody TransportationPlanEntity transportationPlan){
        transportationPlanService.deletePlan(transportationPlan);
        return ResponseEntity.ok("plan deleted");
    }
}
