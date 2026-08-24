package com.speakpic.storage;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileStorageService {
    
    private final Path storageLocation = Paths.get("uploads");

    public FileStorageService() throws IOException {
        Files.createDirectories(storageLocation);

    }

    public String saveFile(MultipartFile file) throws IOException {

        String originalFileName = file.getOriginalFilename();

        String fileName = java.util.UUID.randomUUID()
        + "_" + originalFileName;

        Path filePath = storageLocation.resolve(fileName);
        Files.copy(file.getInputStream(), filePath);

        return filePath.toString();  
    }

    public void deleteFile(String filePath) throws IOException {

        if(filePath == null || filePath.isBlank()) {
            return;
        }

        Path path = Paths.get(filePath);
        Files.deleteIfExists(path);
    }

}
