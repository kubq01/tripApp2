package com.example.demo.plan;

import com.example.demo.trip.TripEntity;
import com.example.demo.trip.TripRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ActivityPlanService {
    /*

    private final ActivityPlanRepository repository;
    private final NoteRepository noteRepository;
    private final TripRepository tripRepository;

    @Transactional
    public void createPlan(ActivityPlanEntity activityPlan, Long tripId) {
        //repository.save(activityPlan);
        TripEntity trip = tripRepository.findById(tripId).orElseThrow();
        if(trip.getStartDay() == null){
            trip.setStartDay(activityPlan.getStartDate().toLocalDate());
            if(activityPlan.getEndDate() != null)
                trip.setFinishDay(activityPlan.getEndDate().toLocalDate());
            else
                trip.setFinishDay(activityPlan.getStartDate().toLocalDate());
        }else{
            if(trip.getStartDay().isAfter(activityPlan.getStartDate().toLocalDate()))
                trip.setStartDay(activityPlan.getStartDate().toLocalDate());
            if(activityPlan.getEndDate() != null && activityPlan.getEndDate().toLocalDate().isAfter(trip.getFinishDay())){
                trip.setFinishDay(activityPlan.getEndDate().toLocalDate());
            } else if (activityPlan.getStartDate().toLocalDate().isAfter(trip.getFinishDay())){
                trip.setFinishDay(activityPlan.getStartDate().toLocalDate());
            }
        }
        trip.addPlan(activityPlan);
        tripRepository.save(trip);
    }

    public void updatePlan(ActivityPlanEntity activityPlan) {
        repository.save(activityPlan);
    }

    public void deletePlan(ActivityPlanEntity activityPlan) {
        repository.delete(activityPlan);
    }

     */
}
