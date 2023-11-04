package com.example.demo.trip;

import com.example.demo.user.UserSimplified;
import lombok.*;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Trip {

    @Generated
    private Long id;
    private String name;
    private UserSimplified organizer;

    private List<UserSimplified> participants;
}
