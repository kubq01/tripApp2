package com.example.demo.config;

import com.example.demo.token.Token;
import com.example.demo.token.TokenRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.core.Authentication;

import java.util.Optional;

import static org.mockito.Mockito.*;

class LogoutServiceTest {
    @Mock
    private TokenRepository tokenRepository;

    @Mock
    private HttpServletRequest request;

    @Mock
    private HttpServletResponse response;

    @Mock
    private Authentication authentication;

    @InjectMocks
    private LogoutService logoutService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testLogout() {
        // Arrange
        String jwtToken = "dummyToken";
        when(request.getHeader("Authorization")).thenReturn("Bearer " + jwtToken);
        Token storedToken = new Token();
        when(tokenRepository.findByToken(jwtToken)).thenReturn(Optional.of(storedToken));

        // Act
        logoutService.logout(request, response, authentication);

        // Assert
        verify(tokenRepository, times(1)).findByToken(jwtToken);
        verify(tokenRepository, times(1)).delete(storedToken);
    }

    @Test
    public void testLogoutWithInvalidToken() {
        // Arrange
        when(request.getHeader("Authorization")).thenReturn(null);

        // Act
        logoutService.logout(request, response, authentication);

        // Assert
        verify(tokenRepository, never()).findByToken(any());
        verify(tokenRepository, never()).delete(any());
    }

}