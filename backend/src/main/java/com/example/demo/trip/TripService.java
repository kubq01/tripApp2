package com.example.demo.trip;

import com.example.demo.user.User;
import com.example.demo.user.UserRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class TripService {

    TripRepository tripRepository;
    UserRepository userRepository;

    @Transactional
    public List<Trip> findTripsForUser(){
       List<Trip> trips = new ArrayList<>();
       getCurrectUser()
                .getTrips()
                .stream()
                .forEach(trip -> trips.add(TripMapper.INSTANCE.tripEntityToTrip(trip)));

        return trips;
    }

    @Transactional
    List<TripInvite> findTripInvitesForUser(){
        List<TripInvite> invites = new ArrayList<>();
        getCurrectUser()
                .getInvites()
                .stream()
                .forEach(invite -> invites.add(invite));

        return invites;
    }

    public void createNewTrip(Trip trip){
        TripEntity tripEntity = new TripEntity(trip.getName(), getCurrectUser());
        tripRepository.save(tripEntity);
        User currentUser = getCurrectUser();
        currentUser.addTrip(tripEntity);
        userRepository.save(currentUser);

    }

    private User getCurrectUser(){
        return (User) SecurityContextHolder.getContext()
                .getAuthentication()
                .getPrincipal();
    }
}
