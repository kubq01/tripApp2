package com.example.demo.trip;

import com.example.demo.trip.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class TripControllerTest {

    @Mock
    private TripService tripService;

    @InjectMocks
    private TripController tripController;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetMyTrips() {
        // Arrange
        List<Trip> expectedTrips = Arrays.asList(new Trip(), new Trip());

        when(tripService.findTripsForUser()).thenReturn(expectedTrips);

        // Act
        ResponseEntity<List<Trip>> responseEntity = tripController.getMyTrips();

        // Assert
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(expectedTrips, responseEntity.getBody());
    }

    @Test
    void testGetMyInvites() {
        // Arrange
        List<Trip> expectedInvites = Arrays.asList(new Trip(), new Trip());

        when(tripService.findTripInvitesForUser()).thenReturn(expectedInvites);

        // Act
        ResponseEntity<List<Trip>> responseEntity = tripController.getMyInvites();

        // Assert
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(expectedInvites, responseEntity.getBody());
    }

    @Test
    void testCreateNewTrip() {
        // Arrange
        Trip trip = new Trip();
        Long tripId = 1L;

        when(tripService.createNewTrip(trip)).thenReturn(tripId);

        // Act
        ResponseEntity<Long> responseEntity = tripController.createNewTrip(trip);

        // Assert
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(tripId, responseEntity.getBody());
    }

    @Test
    void testInviteUser() {
        // Arrange
        String userEmail = "test@example.com";
        Long tripId = 1L;

        when(tripService.inviteUser(userEmail, tripId)).thenReturn("User invited");

        // Act
        ResponseEntity<String> responseEntity = tripController.inviteUser(userEmail, tripId);

        // Assert
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals("User invited", responseEntity.getBody());
    }

    @Test
    void testAcceptInvite() {
        // Arrange
        Long inviteId = 1L;

        // Act
        ResponseEntity<String> responseEntity = tripController.acceptInvite(inviteId);

        // Assert
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals("Invite accepted", responseEntity.getBody());
        verify(tripService, times(1)).acceptInvite(inviteId);
    }

    @Test
    void testDeclineInvite() {
        // Arrange
        Long inviteId = 1L;

        // Act
        ResponseEntity<String> responseEntity = tripController.declineInvite(inviteId);

        // Assert
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals("Invite declined", responseEntity.getBody());
        verify(tripService, times(1)).declineInvite(inviteId);
    }

    @Test
    void testDeleteParticipant() {
        // Arrange
        String userEmail = "test@example.com";
        Long tripId = 1L;

        when(tripService.deleteParticipant(userEmail, tripId)).thenReturn("Participant deleted");

        // Act
        ResponseEntity<String> responseEntity = tripController.deleteParticipant(userEmail, tripId);

        // Assert
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals("Participant deleted", responseEntity.getBody());
    }

    @Test
    void testGetTripById() {
        // Arrange
        Long tripId = 1L;
        Trip expectedTrip = new Trip();

        when(tripService.getTripById(tripId)).thenReturn(expectedTrip);

        // Act
        ResponseEntity<Trip> responseEntity = tripController.getTripById(tripId);

        // Assert
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(expectedTrip, responseEntity.getBody());
    }
}