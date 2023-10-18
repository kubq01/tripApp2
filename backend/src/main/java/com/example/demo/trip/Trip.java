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
@RequiredArgsConstructor
@Entity
public class Trip {
    @Id
    @GeneratedValue
    private Long id;
    private String name;
    @ManyToOne
    private User organizer;
}
