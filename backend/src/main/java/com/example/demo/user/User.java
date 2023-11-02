package com.example.demo.user;

import com.example.demo.trip.TripEntity;
import com.example.demo.trip.TripInvite;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "_user")
public class User implements UserDetails {
    @Id
    @GeneratedValue
    private Integer id;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private Role role;

    @ManyToMany(fetch = FetchType.EAGER)
    @ToString.Exclude
    private List<TripEntity> trips = new ArrayList<>();

    @ManyToMany(fetch = FetchType.EAGER)
    @ToString.Exclude
    private List<TripEntity> invites = new ArrayList<>();

    public void addTrip(TripEntity trip){
        trips.add(trip);
    }

    public void invite(TripEntity trip){
        invites.add(trip);
    }

    public void deleteFromTrip(TripEntity trip){
        trips.remove(trip);
    }

    public void acceptInvite(Long inviteId){
        Optional<TripEntity> inviteOptional = invites.stream()
                .filter(invites -> invites.getId().equals(inviteId))
                .findAny();

        if(inviteOptional.isPresent()){
            TripEntity invite = inviteOptional.get();
            addTrip(invite);
            invites.remove(invite);
        }

    }

    public void declineInvite(Long inviteId){
        Optional<TripEntity> inviteOptional = invites.stream()
                .filter(invites -> invites.getId().equals(inviteId))
                .findAny();
        if(inviteOptional.isPresent()){
            TripEntity invite = inviteOptional.get();
            invites.remove(invite);
        }
    }
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singleton(new SimpleGrantedAuthority("ROLE_" + role.name()));
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
