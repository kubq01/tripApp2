package com.example.demo.plan;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ActivityPlanRepository extends JpaRepository<ActivityPlanEntity,Long> {
}
