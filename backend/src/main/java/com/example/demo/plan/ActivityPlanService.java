package com.example.demo.plan;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ActivityPlanService {

    private final ActivityPlanRepository repository;
    private final NoteRepository noteRepository;
}
