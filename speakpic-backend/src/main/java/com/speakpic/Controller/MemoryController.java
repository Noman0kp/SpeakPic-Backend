package com.speakpic.Controller;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import com.speakpic.service.MemoryService;
import com.speakpic.storage.FileStorageService;
import com.speakpic.entity.Memory;
import org.springframework.web.bind.annotation.*;
import com.speakpic.dto.MemoryResponse;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import jakarta.validation.Valid;


@RestController
@RequestMapping("/api/memories")
public class MemoryController {

    private final MemoryService memoryService;
    private final FileStorageService fileStorageService;

    public MemoryController(MemoryService memoryService, FileStorageService fileStorageService) {
        this.memoryService = memoryService;
        this.fileStorageService = fileStorageService;
    }

    @PostMapping
    public MemoryResponse createMemory(
       @Valid @RequestBody Memory memory,
        Authentication authentication) {

            String email = authentication.getName();
            return memoryService.createMemory(memory, email);
        }

    @GetMapping
    public List<MemoryResponse> getMemories(Authentication authentication) {

        String email = authentication.getName();

        return memoryService.getUserMemories(email);

    }

    @DeleteMapping("/{id}")
    public String deleteMemory(
            @PathVariable Long id,
            Authentication authentication) {

        String email = authentication.getName();
        memoryService.deleteMemory(id, email);
            
        return "Memory deleted successfully";
    }

    @PostMapping("/upload") 
    public MemoryResponse uploadMemory(
        @RequestParam("title") String title,
        @RequestParam("image") MultipartFile image,
        @RequestParam("audio") MultipartFile audio,
        Authentication authentication) throws IOException {

    String email = authentication.getName();


    // if(image.isEmpty() 
    //     || image.getContentType() == null
    //     || !image.getContentType().startsWith("image/")) {
        
    //     throw new ResponseStatusException(
    //             HttpStatus.BAD_REQUEST,
    //             "Invalid image file"
    //     );
    // }

    //  if(audio.isEmpty() 
    //     || audio.getContentType() == null    
    //     || !audio.getContentType().startsWith("audio/")) {
       
    //     throw new ResponseStatusException(
    //             HttpStatus.BAD_REQUEST,
    //             "Invalid audio file"
    //     );
    // }

    if (image.isEmpty()) {
    throw new ResponseStatusException(
            HttpStatus.BAD_REQUEST,
            "Image file is required"
    );
}

if (audio.isEmpty()) {
    throw new ResponseStatusException(
            HttpStatus.BAD_REQUEST,
            "Audio file is required"
    );
}


    
    String imagePath = fileStorageService.saveFile(image);
    String audioPath = fileStorageService.saveFile(audio);
    
    Memory memory = new Memory();
    memory.setTitle(title);
    memory.setImageUrl(imagePath);
    memory.setAudioUrl(audioPath);

            return memoryService.createMemory(memory, email);

        }
}
