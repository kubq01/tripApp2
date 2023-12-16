package com.example.demo.chat;

import com.example.demo.chat.*;
import com.example.demo.user.Role;
import com.example.demo.user.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class ChatControllerTest {

    @Mock
    private ChatRepository chatRepository;

    @InjectMocks
    private ChatController chatController;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetChatHistory() {
        // Arrange
        Long tripId = 1L;
        ChatEntity chat1 = new ChatEntity(1L, "Hello", "User1", tripId, LocalDateTime.now());
        ChatEntity chat2 = new ChatEntity(2L, "Hi", "User2", tripId, LocalDateTime.now());
        List<ChatEntity> expectedChatHistory = Arrays.asList(chat1, chat2);

        when(chatRepository.findByTripIdOrderByTimestampAsc(tripId)).thenReturn(expectedChatHistory);

        // Act
        List<ChatEntity> result = chatController.getChatHistory(tripId);

        // Assert
        assertEquals(expectedChatHistory, result);
    }

    @Test
    void testPostMessage() {
        // Arrange
        Long tripId = 1L;
        ChatMessage message = new ChatMessage("New message");
        User mockUser = new User(1, "TestUser", "LastName", "test@example.com", "password", Role.USER, new ArrayList<>(), new ArrayList<>());
        SecurityContextHolder.getContext().setAuthentication(new UsernamePasswordAuthenticationToken(mockUser, null));

        // Act
        chatController.postMessage(tripId, message);

        // Assert
        verify(chatRepository, times(1)).save(any(ChatEntity.class));
    }

    @Test
    void testPostMessageCurrentUser() {
        // Arrange
        Long tripId = 1L;
        ChatMessage message = new ChatMessage("New message");
        User mockUser = new User(1, "TestUser", "LastName", "test@example.com", "password",  Role.USER, new ArrayList<>(), new ArrayList<>());
        SecurityContextHolder.getContext().setAuthentication(new UsernamePasswordAuthenticationToken(mockUser, null));

        // Act
        chatController.postMessage(tripId, message);

        // Assert
        ArgumentCaptor<ChatEntity> argumentCaptor = ArgumentCaptor.forClass(ChatEntity.class);
        verify(chatRepository).save(argumentCaptor.capture());
        assertEquals(mockUser.getFirstName(), argumentCaptor.getValue().getSender());
    }
}