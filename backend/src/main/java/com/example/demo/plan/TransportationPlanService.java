package com.example.demo.plan;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TransportationPlanService {

    private final TransportationPlanRepository repository;
}
