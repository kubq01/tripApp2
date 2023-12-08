package com.example.demo.chat;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatRepository extends JpaRepository<ChatMessage, Long> {
    List<ChatMessage> findByTripIdOrderByTimestampAsc(Long tripId);
}
