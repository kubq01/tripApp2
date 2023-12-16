package com.example.demo.plan;

import com.example.demo.plan.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class PlanControllerTest {

    @Mock
    private PlanService planService;

    @InjectMocks
    private PlanController planController;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetPlansForTrip() {
        // Arrange
        Long tripId = 1L;
        PlanEntity plan1 = PlanEntity.builder()
                .startDate(LocalDateTime.now())
                .description("test1")
                .endDate(LocalDateTime.now())
                .notes("note1")
                .pricePerPerson(BigDecimal.valueOf(12.34))
                .address("ul.vvv 35, Krakow")
                .build();;
        PlanEntity plan2 = PlanEntity.builder()
                .startDate(LocalDateTime.now())
                .description("test2")
                .endDate(LocalDateTime.now())
                .notes("note1")
                .pricePerPerson(BigDecimal.valueOf(12.34))
                .address("ul.vvv 35, Krakow")
                .build();;
        List<PlanEntity> expectedPlans = Arrays.asList(plan1, plan2);

        when(planService.getPlansForTrip(tripId)).thenReturn(expectedPlans);

        // Act
        ResponseEntity<List<PlanEntity>> responseEntity = planController.getPlansForTrip(tripId);

        // Assert
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(expectedPlans, responseEntity.getBody());
    }

    @Test
    void testCreatePlan() {
        // Arrange
        Long tripId = 1L;
        PlanEntity plan = PlanEntity.builder()
                .startDate(LocalDateTime.now())
                .description("test1")
                .endDate(LocalDateTime.now())
                .notes("note1")
                .pricePerPerson(BigDecimal.valueOf(12.34))
                .address("ul.vvv 35, Krakow")
                .build();;

        // Act
        ResponseEntity<String> responseEntity = planController.createPlan(plan, tripId);

        // Assert
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals("new plan created", responseEntity.getBody());
        verify(planService, times(1)).createPlan(plan, tripId);
    }

    @Test
    void testUpdatePlan() {
        // Arrange
        PlanEntity plan = PlanEntity.builder()
                .startDate(LocalDateTime.now())
                .description("test1")
                .endDate(LocalDateTime.now())
                .notes("note1")
                .pricePerPerson(BigDecimal.valueOf(12.34))
                .address("ul.vvv 35, Krakow")
                .build();;

        // Act
        ResponseEntity<String> responseEntity = planController.updatePlan(plan);

        // Assert
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals("plan updated", responseEntity.getBody());
        verify(planService, times(1)).updatePlan(plan);
    }

    @Test
    void testDeletePlan() {
        // Arrange
        Long tripId = 1L;
        PlanEntity plan = PlanEntity.builder()
                .startDate(LocalDateTime.now())
                .description("test1")
                .endDate(LocalDateTime.now())
                .notes("note1")
                .pricePerPerson(BigDecimal.valueOf(12.34))
                .address("ul.vvv 35, Krakow")
                .build();;

        // Act
        ResponseEntity<String> responseEntity = planController.deletePlan(plan, tripId);

        // Assert
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals("plan deleted", responseEntity.getBody());
        verify(planService, times(1)).deletePlan(plan, tripId);
    }
}