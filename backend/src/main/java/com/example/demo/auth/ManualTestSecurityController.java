package com.example.demo.auth;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ManualTestSecurityController {

    @GetMapping("/test")
    public String testSecurity(){
        return "Secured endpoint";
    }
}
