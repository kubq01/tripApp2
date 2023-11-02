package com.example.demo.trip;

import com.example.demo.user.UserSimplified;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Trip {
    private Long id;
    private String name;
    private UserSimplified organizer;

    private List<UserSimplified> participants;
}
