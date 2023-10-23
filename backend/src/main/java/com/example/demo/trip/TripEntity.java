package com.example.demo.trip;

import com.example.demo.user.User;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.*;

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
    @ToString.Exclude
    private User organizer;
    public TripEntity(String name, User organizer) {
        this.name = name;
        this.organizer = organizer;
    }
}
