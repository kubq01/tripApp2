package com.example.demo.plan;

import com.example.demo.trip.TripEntity;
import com.example.demo.trip.TripRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ActivityPlanService {

    private final ActivityPlanRepository repository;
    private final NoteRepository noteRepository;
    private final TripRepository tripRepository;

    @Transactional
    public void createPlan(ActivityPlanEntity activityPlan, Long tripId) {
        //repository.save(activityPlan);
        TripEntity trip = tripRepository.findById(tripId).orElseThrow();
        trip.addPlan(activityPlan);
        tripRepository.save(trip);
    }

    public void updatePlan(ActivityPlanEntity activityPlan) {
        repository.save(activityPlan);
    }

    public void deletePlan(ActivityPlanEntity activityPlan) {
        repository.delete(activityPlan);
    }
}
