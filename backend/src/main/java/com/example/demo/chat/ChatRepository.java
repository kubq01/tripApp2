package com.example.demo.chat;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatRepository extends JpaRepository<ChatEntity, Long> {
    @Query(value = "SELECT * FROM chat_entity WHERE trip_id = :tripId ORDER BY timestamp ASC", nativeQuery = true)
    List<ChatEntity> findByTripIdOrderByTimestampAsc(@Param("tripId") Long tripId);
}
