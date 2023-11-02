package com.example.demo.trip;

import com.example.demo.user.User;
import jakarta.persistence.*;
import lombok.*;

import java.util.Collections;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class TripEntity {
    @Id
    @GeneratedValue
    private Long id;
    private String name;
    @ManyToOne
    private User organizer;
    @ManyToMany(fetch = FetchType.EAGER)
    private List<User> participants;
    public TripEntity(String name, User organizer) {
        this.name = name;
        this.organizer = organizer;
        this.participants = Collections.emptyList();
    }
}
