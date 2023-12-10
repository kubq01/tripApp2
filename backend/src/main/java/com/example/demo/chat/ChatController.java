package com.example.demo.chat;

import com.example.demo.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/chat")
@RequiredArgsConstructor
public class ChatController {

    private final ChatRepository chatRepository;

    @GetMapping("/history/{tripId}")
    public List<ChatEntity> getChatHistory(@PathVariable Long tripId) {
        // Pobierz wszystkie wcześniejsze wiadomości dla danej grupy i posortuj po czasie
        //System.out.println("chat history");
        return chatRepository.findByTripIdOrderByTimestampAsc(tripId);
    }

    @PostMapping("/{tripId}")
    public void postMessage(@PathVariable Long tripId, @RequestBody ChatMessage message){
        ChatEntity chatEntity = ChatEntity.builder()
                .content(message.getContent())
                .sender(getCurrectUser().getFirstName())
                .tripId(tripId)
                .timestamp(LocalDateTime.now())
                .build();
        chatRepository.save(chatEntity);
    }

    private User getCurrectUser(){
        return (User) SecurityContextHolder.getContext()
                .getAuthentication()
                .getPrincipal();
    }
}

