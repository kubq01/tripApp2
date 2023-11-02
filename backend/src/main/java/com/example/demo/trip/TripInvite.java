package com.example.demo.trip;

import com.example.demo.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class TripInvite {
    @Id
    @GeneratedValue
    private Long id;
    @ManyToOne
    private TripEntity trip;
    @ManyToOne
    private User invitedUser;
}
