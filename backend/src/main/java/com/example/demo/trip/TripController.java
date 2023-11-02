package com.example.demo.trip;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController()
@RequestMapping("/trip")
@AllArgsConstructor
public class TripController {

    private final TripService tripService;

    @GetMapping("/my_trips")
    public ResponseEntity<List<Trip>> getMyTrips(){
        return ResponseEntity.ok(tripService.findTripsForUser());
    }

    @GetMapping("/my_invites")
    public ResponseEntity<List<Trip>> getMyInvites(){
        return ResponseEntity.ok(tripService.findTripInvitesForUser());
    }

    @PostMapping("/new")
    public ResponseEntity<String> createNewTrip(@RequestBody Trip trip){
        tripService.createNewTrip(trip);
        return ResponseEntity.ok("Successfully created new trip");
    }

    @PostMapping("/invite")
    public ResponseEntity<String> inviteUser(@RequestParam String userEmail, @RequestParam Long tripId){
        return ResponseEntity.ok(tripService.inviteUser(userEmail, tripId));
    }

    @PostMapping("/accept-invite")
    public ResponseEntity<String> acceptInvite(@RequestParam Long inviteId){
        tripService.acceptInvite(inviteId);
        return ResponseEntity.ok("Invite accepted");
    }

    @PostMapping ("/decline-invite")
    public ResponseEntity<String> declineInvite(@RequestParam Long inviteId){
        tripService.declineInvite(inviteId);
        return ResponseEntity.ok("Invite declined");
    }
}
