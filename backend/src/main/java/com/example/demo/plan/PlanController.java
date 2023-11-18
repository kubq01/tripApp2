package com.example.demo.plan;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/plan")
public class PlanController {
    private final PlanService planService;

    @GetMapping
    public ResponseEntity<List<PlanEntity>> getPlansForTrip(@RequestParam Long tripId){
        return ResponseEntity.ok(planService.getPlansForTrip(tripId));
    }

    @PostMapping("/new")
    public ResponseEntity<String> createPlan(@RequestBody PlanEntity activityPlan, @RequestParam Long tripId){
        planService.createPlan(activityPlan, tripId);
        return ResponseEntity.ok("new plan created");
    }

    @PostMapping("/update")
    public ResponseEntity<String> updatePlan(@RequestBody PlanEntity activityPlan){
        planService.updatePlan(activityPlan);
        return ResponseEntity.ok("plan updated");
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deletePlan(@RequestBody PlanEntity activityPlan, @RequestParam Long tripId){
        planService.deletePlan(activityPlan, tripId);
        return ResponseEntity.ok("plan deleted");
    }
}
