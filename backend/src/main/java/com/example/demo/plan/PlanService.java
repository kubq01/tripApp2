package com.example.demo.plan;

import com.example.demo.trip.TripEntity;
import com.example.demo.trip.TripRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PlanService {

    private final PlanRepository repository;
    private final TripRepository tripRepository;
    private final NoteRepository noteRepository;

    @Transactional
    public void createPlan(PlanEntity plan, Long tripId) {

        TripEntity trip = tripRepository.findById(tripId).orElseThrow();
        if(trip.getStartDay() == null){
            trip.setStartDay(plan.getStartDate().toLocalDate());
            if(plan.getEndDate() != null)
                trip.setFinishDay(plan.getEndDate().toLocalDate());
            else
                trip.setFinishDay(plan.getStartDate().toLocalDate());
        }else{
            if(trip.getStartDay().isAfter(plan.getStartDate().toLocalDate()))
                trip.setStartDay(plan.getStartDate().toLocalDate());
            if(plan.getEndDate() != null && plan.getEndDate().toLocalDate().isAfter(trip.getFinishDay())){
                trip.setFinishDay(plan.getEndDate().toLocalDate());
            } else if (plan.getStartDate().toLocalDate().isAfter(trip.getFinishDay())){
                trip.setFinishDay(plan.getStartDate().toLocalDate());
            }
        }
        trip.addPlan(plan);
        for(NoteEntity noteEntity: plan.getNotes()){
            noteRepository.save(noteEntity);
        }
        repository.save(plan);
        tripRepository.save(trip);
    }

    public void updatePlan(PlanEntity plan) {
        for(NoteEntity noteEntity: plan.getNotes()){
            noteRepository.save(noteEntity);
        }
        repository.save(plan);
    }

    public void deletePlan(PlanEntity plan) {
        for(NoteEntity noteEntity: plan.getNotes()){
            noteRepository.delete(noteEntity);
        }
        repository.delete(plan);
    }

    public List<PlanEntity> getPlansForTrip(Long tripId) {
        return tripRepository.findById(tripId)
                .orElseThrow()
                .getPlans();
    }
}
