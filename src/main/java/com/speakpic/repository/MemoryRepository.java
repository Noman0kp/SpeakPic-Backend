package com.speakpic.repository;

import com.speakpic.entity.Memory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

import com.speakpic.entity.User;



public interface MemoryRepository extends JpaRepository<Memory, Long> {

    List<Memory> findByUser(User user);

    Optional<Memory> findByIdAndUser(Long id, User user);
    
} 
