package com.speakpic.service;

import com.speakpic.dto.MemoryResponse;
import com.speakpic.entity.Memory;
import com.speakpic.entity.User;
import com.speakpic.repository.MemoryRepository;
import com.speakpic.repository.UserRepository;

import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

import com.speakpic.storage.FileStorageService;
@Service
public class MemoryService {

    private final MemoryRepository memoryRepository;
    private final UserRepository userRepository;
    private final FileStorageService fileStorageService;

    public MemoryService(MemoryRepository memoryRepository, UserRepository userRepository, FileStorageService fileStorageService) {
        this.memoryRepository = memoryRepository;
        this.userRepository = userRepository;
        this.fileStorageService = fileStorageService;
    }

    public MemoryResponse createMemory(Memory memory, String email) {

        User user = userRepository.findByEmail(email)
        .orElseThrow(() -> new RuntimeException("User not found"));

        memory.setUser(user);
        memory.setCreatedAt(LocalDateTime.now());

        Memory savedMemory = memoryRepository.save(memory);

        return new MemoryResponse(
            savedMemory.getId(),
            savedMemory.getTitle(),
            "http://localhost:8080/" + savedMemory.getImageUrl().replace("\\", "/"),
            "http://localhost:8080/" + savedMemory.getAudioUrl().replace("\\", "/"),
            savedMemory.getCreatedAt()
        );
    }

    public List<MemoryResponse> getUserMemories(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Memory> memories = memoryRepository.findByUser(user);

        return memories.stream()
                .map(memory -> new MemoryResponse(

                    memory.getId(),
                    memory.getTitle(),
                    "http://localhost:8080/" + memory.getImageUrl().replace("\\", "/"),
                    "http://localhost:8080/" + memory.getAudioUrl().replace("\\", "/"),
                    memory.getCreatedAt()
                ))
                    .toList();
    }

    // Delete Logic :-
    
    public void deleteMemory(Long id, String email) {
        
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
            
        Memory memory = memoryRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new RuntimeException("Memory not found"));

       try {
            fileStorageService.deleteFile(memory.getImageUrl());
            fileStorageService.deleteFile(memory.getAudioUrl());

            memoryRepository.delete(memory);

       } catch (IOException e) {
            throw new RuntimeException("Failed to delete memory files", e);
       }
    
    }   

}
