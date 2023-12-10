package com.example.demo.chat;

import com.example.demo.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;

import java.time.LocalDateTime;

@Controller
@RequiredArgsConstructor
public class ChatWebSocketController {

    private final ChatRepository chatRepository;

    @MessageMapping("/send/{tripId}")
    @SendTo("/topic/group/{tripId}")
    public ChatEntity send(@DestinationVariable Long tripId, @Payload ChatMessage chatMessage) {
        // Zapisz wiadomość w bazie danych z aktualnym czasem
        System.out.println("web socket tripId " + tripId);
        System.out.println(chatMessage);
        ChatEntity chatEntity = ChatEntity.builder()
                .content(chatMessage.getContent())
                .sender(getCurrectUser().getFirstName())
                .tripId(tripId)
                .timestamp(LocalDateTime.now())
                .build();
        chatRepository.save(chatEntity);

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

        return chatEntity;
    }

    private User getCurrectUser(){
        return (User) SecurityContextHolder.getContext()
                .getAuthentication()
                .getPrincipal();
    }
}


