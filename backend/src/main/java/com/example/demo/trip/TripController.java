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
    public ResponseEntity<List<TripInvite>> getMyInvites(){
        return ResponseEntity.ok(tripService.findTripInvitesForUser());
    }

    @PostMapping("/new")
    public ResponseEntity<String> createNewTrip(@RequestBody Trip trip){
        tripService.createNewTrip(trip);
        return ResponseEntity.ok("Successfully created new trip");
    }
}