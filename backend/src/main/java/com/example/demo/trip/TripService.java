package com.example.demo.trip;

import com.example.demo.user.User;
import com.example.demo.user.UserRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
    List<Trip> findTripInvitesForUser(){
        List<Trip> invites = new ArrayList<>();
        getCurrectUser()
                .getInvites()
                .stream()
                .forEach(invite -> invites.add(TripMapper.INSTANCE.tripEntityToTrip(invite)));

        return invites;
    }

    public Long createNewTrip(Trip trip){
        TripEntity tripEntity = new TripEntity(trip.getName(), getCurrectUser(), List.of(getCurrectUser()));
        tripRepository.save(tripEntity);
        User currentUser = getCurrectUser();
        currentUser.addTrip(tripEntity);
        userRepository.save(currentUser);
        return tripEntity.getId();

    }

    private User getCurrectUser(){
        return (User) SecurityContextHolder.getContext()
                .getAuthentication()
                .getPrincipal();
    }

    public String inviteUser(String userEmail, Long id) {
        Optional<User> userOptional = userRepository.findByEmail(userEmail);
        Optional<TripEntity> tripOptional = tripRepository.findById(id);
        if(userOptional.isPresent() && tripOptional.isPresent() &&
                tripOptional.get().getOrganizer().getEmail().equals(getCurrectUser().getEmail())) {
            User user = userOptional.get();
            TripEntity trip = tripOptional.get();
            if(user.getInvites().stream().anyMatch(userInvite -> userInvite.getId().equals(trip.getId())))
                return "User already invited";
            if(user.getTrips().stream().anyMatch(userTrip -> userTrip.getId().equals(trip.getId())))
                return "User already in trip";

            user.invite(trip);
            userRepository.save(user);

            return "User invited";
        }
        return "User or trip not found";
    }

    @Transactional
    public void acceptInvite(Long inviteId) {
        User user = getCurrectUser();
        user.acceptInvite(inviteId);

        Optional<TripEntity> tripOptional = tripRepository.findById(inviteId);
        if(tripOptional.isPresent()){
            TripEntity trip = tripOptional.get();
            trip.addParticipant(user);
            tripRepository.save(trip);
            userRepository.save(user);
        }
    }

    public void declineInvite(Long inviteId) {
        User user = getCurrectUser();
        user.declineInvite(inviteId);
        userRepository.save(user);
    }

    @Transactional
    public String deleteParticipant(String userEmail, Long tripId) {
        Optional<User> userOptional = userRepository.findByEmail(userEmail);
        Optional<TripEntity> tripOptional = tripRepository.findById(tripId);
        if(userOptional.isPresent() && tripOptional.isPresent() &&
                tripOptional.get().getOrganizer().getEmail().equals(getCurrectUser().getEmail())) {
            User user = userOptional.get();
            TripEntity trip = tripOptional.get();
            if(user.getTrips().stream().noneMatch(userTrip -> userTrip.getId().equals(trip.getId())))
                return "User not in trip";

            user.deleteFromTrip(trip);
            trip.deleteParticipant(user);
            userRepository.save(user);
            tripRepository.save(trip);

            return "User deleted";
        }
        return "User or trip not found";
    }

    public Trip getTripById(Long id) {
        return TripMapper.INSTANCE.tripEntityToTrip(
                tripRepository.findById(id)
                .orElseGet(() -> new TripEntity()));
    }
}
