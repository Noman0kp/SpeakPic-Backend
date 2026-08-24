package com.speakpic.dto;

import java.time.LocalDateTime;

public class MemoryResponse {

    private Long id;
    private String title;
    private String imageUrl;
    private String audioUrl;
    private LocalDateTime createdAt;

    public MemoryResponse() {

    }

    public MemoryResponse(
        Long id,
        String title,
        String imageUrl,
        String audioUrl,
        LocalDateTime createdAt
    ) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.audioUrl = audioUrl;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getAudioUrl() {
        return audioUrl;
    }

    public void setAudioUrl(String audioUrl) {
        this.audioUrl = audioUrl;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    
    
}
