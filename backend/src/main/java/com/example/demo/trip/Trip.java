package com.example.demo.trip;

import com.example.demo.user.UserSimplified;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Trip {
    private String name;
    private UserSimplified organizer;
}
