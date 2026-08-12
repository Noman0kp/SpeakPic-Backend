package com.speakpic.dto;

import java.time.LocalDateTime;

public class UserResponse {

    private long id;
    private String name;
    private String email;
    private LocalDateTime createdAt;

    public UserResponse() {

    }

    public UserResponse(long id, String name, String email, LocalDateTime createdAt) {

        this.id = id;
        this.name = name;
        this.email = email;
        this.createdAt = createdAt;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    
}
