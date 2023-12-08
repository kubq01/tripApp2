package com.example.demo.chat;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.time.LocalDateTime;
import java.util.List;

@Controller
@RequestMapping("/chat")
@RequiredArgsConstructor
public class ChatController {

    private final ChatRepository chatRepository;

    @MessageMapping("/send/{groupId}")
    @SendTo("/topic/group/{groupId}")
    public ChatMessage send(@DestinationVariable Long tripId, @Payload ChatMessage chatMessage) {
        // Zapisz wiadomość w bazie danych z aktualnym czasem
        chatMessage.setTripId(tripId);
        chatMessage.setTimestamp(LocalDateTime.now());
        chatRepository.save(chatMessage);

        // Pobierz wszystkie wcześniejsze wiadomości dla danej grupy
        //List<ChatMessage> previousMessages = chatRepository.findByGroupId(groupId);

        // Wyślij wszystkie wcześniejsze wiadomości do nowo dołączonego użytkownika
        /*
        previousMessages.forEach(previousMessage -> {
            simpMessagingTemplate.convertAndSendToUser(
                    chatMessage.getSender(),
                    "/topic/group/" + groupId,
                    previousMessage
            );
        });

         */

        return chatMessage;
    }

    @GetMapping("/history/{tripId}")
    public List<ChatMessage> getChatHistory(@PathVariable Long tripId) {
        // Pobierz wszystkie wcześniejsze wiadomości dla danej grupy i posortuj po czasie
        return chatRepository.findByTripIdOrderByTimestampAsc(tripId);
    }
}

