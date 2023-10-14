package com.example.demo.auth;

import com.example.demo.token.Token;
import com.example.demo.token.TokenRepository;
import com.example.demo.user.Role;
import com.example.demo.user.User;
import com.example.demo.user.UserRepository;
import com.example.demo.user.UsernameTakenException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.Assert.assertThrows;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class AuthenticationServiceTest {
    @Mock
    private UserRepository userRepository;

    @Mock
    private TokenRepository tokenRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtService jwtService;

    @Mock
    private AuthenticationManager authenticationManager;

    @InjectMocks
    private AuthenticationService authenticationService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testRegister() throws UsernameTakenException {
        // Arrange
        RegisterRequest request = new RegisterRequest("John", "Doe", "john.doe@example.com", "password", Role.USER);
        User user = new User(1,"John", "Doe", "john.doe@example.com", "password", Role.USER);
        when(passwordEncoder.encode(request.getPassword())).thenReturn("encodedPassword");
        when(userRepository.save(ArgumentMatchers.any())).thenReturn(user);
        when(jwtService.generateToken(anyMap(), ArgumentMatchers.any())).thenReturn("jwtToken");

        // Act
        AuthenticationResponse response = authenticationService.register(request);

        // Assert
        verify(userRepository, times(1)).save(any(User.class));
        verify(tokenRepository, times(1)).save(any(Token.class));
        assertEquals("jwtToken", response.getAccessToken());
    }

    @Test
    public void testAuthenticate() {
        // Arrange
        AuthenticationRequest request = new AuthenticationRequest("john.doe@example.com", "password");
        User user = new User(1,"John", "Doe", "john.doe@example.com", "password", Role.USER);
        when(userRepository.findByEmail(request.getEmail())).thenReturn(Optional.of(user));
        when(jwtService.generateToken(anyMap(), any(User.class))).thenReturn("jwtToken");

        // Act
        AuthenticationResponse response = authenticationService.authenticate(request);

        // Assert
        verify(authenticationManager, times(1)).authenticate(any());
        verify(tokenRepository, times(1)).save(any(Token.class));
        assertEquals("jwtToken", response.getAccessToken());
    }

    @Test
    public void testRegisterUsernameTaken() {
        // Arrange
        RegisterRequest request = new RegisterRequest("John", "Doe", "existing@example.com", "password", Role.USER);
        when(userRepository.findByEmail("existing@example.com")).thenReturn(Optional.of(new User()));

        // Act & Assert
        assertThrows(UsernameTakenException.class, () -> {
            authenticationService.register(request);
        });
    }

}