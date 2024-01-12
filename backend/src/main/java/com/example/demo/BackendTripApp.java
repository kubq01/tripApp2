package com.example.demo;

import com.example.demo.auth.AuthenticationService;
import com.example.demo.auth.RegisterRequest;
import com.example.demo.plan.NoteEntity;
import com.example.demo.plan.PlanEntity;
import com.example.demo.plan.PlanService;
import com.example.demo.trip.Trip;
import com.example.demo.trip.TripRepository;
import jakarta.persistence.OneToMany;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.http.*;
import org.springframework.web.client.RequestCallback;
import org.springframework.web.client.ResponseExtractor;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Collections;
import java.util.List;

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
            TripRepository tripRepository,
            PlanService planService
    ) {
        return args -> {
            var admin = RegisterRequest.builder()
                    .firstname("Anne")
                    .lastname("Lake")
                    .email("anne@mail.com")
                    .password("password")
                    .role(USER)
                    .build();
            String adminToken = service.register(admin).getAccessToken();
            System.out.println("Admin token: " + adminToken);

            var manager = RegisterRequest.builder()
                    .firstname("Jake")
                    .lastname("Summer")
                    .email("summer98@mail.com")
                    .password("password")
                    .role(USER)
                    .build();
            String userToken = service.register(manager).getAccessToken();
            System.out.println("User token: " + userToken);

            var user = RegisterRequest.builder()
                    .firstname("Alex")
                    .lastname("Smith")
                    .email("a.smith@mail.com")
                    .password("password")
                    .role(USER)
                    .build();
            String userToken2 = service.register(user).getAccessToken();
            System.out.println("Alex token: " + userToken2);


            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(userToken);

            Trip trip = Trip.builder()
                    .id(1L)
                    .name("Cracow trip")
                    .build();

            HttpEntity<Trip> request = new HttpEntity<>(trip, headers);
            RestTemplate restTemplate = new RestTemplate();
            restTemplate.postForEntity("http://localhost:8081/trip/new", request, String.class);

            Trip trip3 = Trip.builder()
                    .id(3L)
                    .name("Ski trip")
                    .build();

            request = new HttpEntity<>(trip3, headers);
            restTemplate.postForEntity("http://localhost:8081/trip/new", request, String.class);

            Trip trip2 = Trip.builder()
                    .id(2L)
                    .name("London trip")
                    .build();

            headers.setBearerAuth(adminToken);
            request = new HttpEntity<>(trip2, headers);
            restTemplate.postForEntity("http://localhost:8081/trip/new", request, String.class);

            Trip tripIdTest = Trip.builder()
                    .name("Trip to Japan")
                    .build();

            headers.setBearerAuth(adminToken);
            request = new HttpEntity<>(tripIdTest, headers);
            restTemplate.postForEntity("http://localhost:8081/trip/new", request, String.class);

            String baseUrl = "http://localhost:8081/trip/invite";
            String userEmail = "summer98@mail.com";
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

            headers.setBearerAuth(userToken);
            userEmail = "anne@mail.com";
            tripId = 1;

            // Create an HttpEntity with headers only (null body)
            requestEntity = new HttpEntity<>(headers);

            // Make the POST request without a request body
            restTemplate.postForEntity(
                    baseUrl + "?userEmail={userEmail}&tripId={tripId}",
                    requestEntity,
                    String.class,
                    userEmail,
                    tripId
            );

            userEmail = "a.smith@mail.com";

            // Create an HttpEntity with headers only (null body)
            requestEntity = new HttpEntity<>(headers);

            // Make the POST request without a request body
            restTemplate.postForEntity(
                    baseUrl + "?userEmail={userEmail}&tripId={tripId}",
                    requestEntity,
                    String.class,
                    userEmail,
                    tripId
            );

            //plans
            String dateString = "2024-03-04 16:00";

            // Define the DateTimeFormatter
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");

            PlanEntity plan = PlanEntity.builder()
                    .startDate(LocalDateTime.parse("2024-03-04 16:00", formatter))
                    .description("Fly to Cracow")
                    .endDate(LocalDateTime.parse("2024-03-04 18:00", formatter))
                    .notes("Tickets are uploaded.")
                    .pricePerPerson(BigDecimal.valueOf(50.00))
                    .address("Birmingham airport")
                    .build();

            planService.createPlan(plan, 1L);

            PlanEntity plan2 = PlanEntity.builder()
                    .startDate(LocalDateTime.parse("2024-03-05 10:00", formatter))
                    .description("Old town and Kazimierz neighborhood")
                    .endDate(LocalDateTime.parse("2024-03-05 18:00", formatter))
fr                    .notes("the prettiest part of the old town was St. Mary's Church.\nThe Kazimierz district has a lot of history and wonderful restaurants")
                    .pricePerPerson(BigDecimal.valueOf(35.00))
                    .address("Cracow old town and Kazimierz")
                    .build();

            planService.createPlan(plan2, 1L);

            PlanEntity plan3 = PlanEntity.builder()
                    .startDate(LocalDateTime.parse("2024-03-06 10:00", formatter))
                    .description("National museum")
                    .endDate(LocalDateTime.parse("2024-03-06 13:00", formatter))
                    .notes("")
                    .pricePerPerson(BigDecimal.valueOf(15.50))
                    .address("al. 3 Maja 1, Cracow")
                    .build();

            planService.createPlan(plan3, 1L);

            PlanEntity plan4 = PlanEntity.builder()
                    .startDate(LocalDateTime.parse("2024-03-06 14:00", formatter))
                    .description("Wawel castle")
                    .endDate(LocalDateTime.parse("2024-03-06 17:00", formatter))
                    .notes("")
                    .pricePerPerson(BigDecimal.valueOf(20.00))
                    .address("Zamek Wawel 5, Cracow")
                    .build();

            planService.createPlan(plan4, 1L);

            PlanEntity plan5 = PlanEntity.builder()
                    .startDate(LocalDateTime.parse("2024-03-07 10:00", formatter))
                    .description("Fly home")
                    .endDate(LocalDateTime.parse("2024-03-07 12:00", formatter))
                    .notes("")
                    .pricePerPerson(BigDecimal.valueOf(12.34))
                    .address("Balice airport")
                    .build();

            planService.createPlan(plan5, 1L);
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
