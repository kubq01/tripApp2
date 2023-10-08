package com.example.demo.user;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController()
@RequestMapping("/user")
public class UserController {

    @GetMapping("/my_profile" )
    public ResponseEntity<UserSimplified> getUser(){
        User user = (User) SecurityContextHolder.getContext()
                .getAuthentication()
                .getPrincipal();
        System.out.println(user.toString());
        System.out.println(UserSimplifiedMapper.INSTANCE.userToSimplifiedUser(user).toString());
        return ResponseEntity.ok(UserSimplifiedMapper.INSTANCE.userToSimplifiedUser(user));
    }
}
