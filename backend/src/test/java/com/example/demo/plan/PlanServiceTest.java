package com.example.demo.plan;

import com.example.demo.plan.*;
import com.example.demo.trip.TripEntity;
import com.example.demo.trip.TripRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class PlanServiceTest {

    @Mock
    private PlanRepository planRepository;

    @Mock
    private TripRepository tripRepository;

    @Mock
    private NoteRepository noteRepository;

    @InjectMocks
    private PlanService planService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testCreatePlan() {
        // Arrange
        Long tripId = 1L;
        TripEntity trip = new TripEntity();
        trip.setPlans(new ArrayList<>());
        trip.setId(tripId);
        when(tripRepository.findById(tripId)).thenReturn(java.util.Optional.of(trip));

        PlanEntity plan = new PlanEntity();
        plan.setStartDate(LocalDateTime.now().plusDays(1));
        plan.setEndDate(LocalDateTime.now().plusDays(2));

        // Act
        planService.createPlan(plan, tripId);

        // Assert
        verify(tripRepository, times(1)).save(trip);
        verify(planRepository, times(1)).save(plan);
        assertEquals(trip.getStartDay(), plan.getStartDate().toLocalDate());
        assertEquals(trip.getFinishDay(), plan.getEndDate().toLocalDate());
    }

    @Test
    void testUpdatePlan() {
        // Arrange
        PlanEntity plan = new PlanEntity();

        // Act
        planService.updatePlan(plan);

        // Assert
        verify(planRepository, times(1)).save(plan);
    }

    @Test
    void testDeletePlan() {
        // Arrange
        Long tripId = 1L;
        PlanEntity plan = new PlanEntity();
        TripEntity trip = new TripEntity();
        trip.setId(tripId);
        trip.setPlans(new ArrayList<>());
        trip.addPlan(plan);
        when(tripRepository.findById(tripId)).thenReturn(java.util.Optional.of(trip));

        // Act
        planService.deletePlan(plan, tripId);

        // Assert
        verify(tripRepository, times(1)).save(trip);
        verify(planRepository, times(1)).delete(plan);
    }

    @Test
    void testGetPlansForTrip() {
        // Arrange
        Long tripId = 1L;
        List<PlanEntity> expectedPlans = Arrays.asList(new PlanEntity(), new PlanEntity());
        TripEntity trip = new TripEntity();
        trip.setId(tripId);
        trip.setPlans(expectedPlans);
        when(tripRepository.findById(tripId)).thenReturn(java.util.Optional.of(trip));

        // Act
        List<PlanEntity> result = planService.getPlansForTrip(tripId);

        // Assert
        assertEquals(expectedPlans, result);
    }
}
