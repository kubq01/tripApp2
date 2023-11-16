package com.example.demo.plan;

import com.example.demo.trip.TripEntity;
import com.example.demo.trip.TripRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TransportationPlanService {
    /*

    private final TransportationPlanRepository repository;
    private final TripRepository tripRepository;

    @Transactional
    public void createPlan(TransportationPlanEntity transportationPlan, Long tripId) {
        //repository.save(transportationPlan);
        TripEntity trip = tripRepository.findById(tripId).orElseThrow();
        if(trip.getStartDay() == null){
            trip.setStartDay(transportationPlan.getStartDate().toLocalDate());
            if(transportationPlan.getEndDate() != null)
                trip.setFinishDay(transportationPlan.getEndDate().toLocalDate());
            else
                trip.setFinishDay(transportationPlan.getStartDate().toLocalDate());
        }else{
            if(trip.getStartDay().isAfter(transportationPlan.getStartDate().toLocalDate()))
                trip.setStartDay(transportationPlan.getStartDate().toLocalDate());
            if(transportationPlan.getEndDate() != null && transportationPlan.getEndDate().toLocalDate().isAfter(trip.getFinishDay())){
                trip.setFinishDay(transportationPlan.getEndDate().toLocalDate());
            } else if (transportationPlan.getStartDate().toLocalDate().isAfter(trip.getFinishDay())){
                trip.setFinishDay(transportationPlan.getStartDate().toLocalDate());
            }
        }
        trip.addPlan(transportationPlan);
        tripRepository.save(trip);
    }

    public void updatePlan(TransportationPlanEntity transportationPlan) {
        repository.save(transportationPlan);
    }

    public void deletePlan(TransportationPlanEntity transportationPlan) {
        repository.delete(transportationPlan);
    }

     */
}
