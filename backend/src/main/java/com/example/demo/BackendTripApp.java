package com.example.demo;

import com.example.demo.auth.AuthenticationService;
import com.example.demo.auth.RegisterRequest;
import com.example.demo.trip.Trip;
import com.example.demo.trip.TripRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.http.*;
import org.springframework.web.client.RequestCallback;
import org.springframework.web.client.ResponseExtractor;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import static com.example.demo.user.Role.ADMIN;
import static com.example.demo.user.Role.USER;

@SpringBootApplication
public class BackendTripApp {

    public static void main(String[] args) {
        SpringApplication.run(BackendTripApp.class, args);
    }

    @Bean
    public CommandLineRunner commandLineRunner(
            AuthenticationService service,
            TripRepository tripRepository
    ) {
        return args -> {
            var admin = RegisterRequest.builder()
                    .firstname("Admin")
                    .lastname("Admin")
                    .email("admin@mail.com")
                    .password("password")
                    .role(ADMIN)
                    .build();
            String adminToken = service.register(admin).getAccessToken();
            System.out.println("Admin token: " + adminToken);

            var manager = RegisterRequest.builder()
                    .firstname("User")
                    .lastname("User")
                    .email("user@mail.com")
                    .password("password")
                    .role(USER)
                    .build();
            String userToken = service.register(manager).getAccessToken();
            System.out.println("User token: " + userToken);


            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(userToken);

            Trip trip = Trip.builder()
                    .id(1L)
                    .name("testTripForUser")
                    .build();

            HttpEntity<Trip> request = new HttpEntity<>(trip, headers);
            RestTemplate restTemplate = new RestTemplate();
            restTemplate.postForEntity("http://localhost:8081/trip/new", request, String.class);

            Trip trip3 = Trip.builder()
                    .id(3L)
                    .name("testTripForUser3")
                    .build();

            request = new HttpEntity<>(trip3, headers);
            restTemplate.postForEntity("http://localhost:8081/trip/new", request, String.class);

            Trip trip2 = Trip.builder()
                    .id(2L)
                    .name("testTripForUser2")
                    .build();

            headers.setBearerAuth(adminToken);
            request = new HttpEntity<>(trip2, headers);
            restTemplate.postForEntity("http://localhost:8081/trip/new", request, String.class);

            Trip tripIdTest = Trip.builder()
                    .name("testTripForUser2")
                    .build();

            headers.setBearerAuth(adminToken);
            request = new HttpEntity<>(tripIdTest, headers);
            restTemplate.postForEntity("http://localhost:8081/trip/new", request, String.class);

            String baseUrl = "http://localhost:8081/trip/invite";
            String userEmail = "user@mail.com";
            int tripId = 3;

            // Create an HttpEntity with headers only (null body)
            HttpEntity<?> requestEntity = new HttpEntity<>(headers);

            // Make the POST request without a request body
            restTemplate.postForEntity(
                    baseUrl + "?userEmail={userEmail}&tripId={tripId}",
                    requestEntity,
                    String.class,
                    userEmail,
                    tripId
            );



        };
    }

    /*
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("http://localhost:3000")
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowCredentials(true)
                        .allowedHeaders("*")
                        .exposedHeaders("Access-Control-Allow-Origin","Authorization", "Content-Type"); // Add the exposed header


            }
        };
    }

     */
}
