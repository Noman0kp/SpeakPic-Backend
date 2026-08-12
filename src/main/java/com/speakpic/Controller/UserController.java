package com.speakpic.Controller;

import com.speakpic.entity.User;
import com.speakpic.service.UserService;
import org.springframework.web.bind.annotation.*;

import com.speakpic.dto.LoginRequest;
import com.speakpic.dto.UserResponse;

import com.speakpic.dto.LoginResponse;


@RestController
@RequestMapping("/api/auth")

public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public UserResponse register(@RequestBody User user) {
        return userService.registerUser(user);
    }

    @PostMapping("/login")
public LoginResponse login(@RequestBody LoginRequest request) {

   String token = userService.loginUser(request);

    return new LoginResponse(token);
}
    
}
