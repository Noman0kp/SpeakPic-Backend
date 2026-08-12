package com.speakpic.service;

import com.speakpic.exception.GlobalExceptionHandler;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;

@Service
public class JwtService {
    
    private final GlobalExceptionHandler globalExceptionHandler;
    private final SecretKey secretKey = Keys.hmacShaKeyFor("SpeakPicSuperSecretKeyForJWTgeneration123456789".getBytes());

    JwtService(GlobalExceptionHandler globalExceptionHandler) {
        this.globalExceptionHandler = globalExceptionHandler;
    }

    public String generateToken(String email) {

        return Jwts.builder()
                .subject(email)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + 86400000))
                .signWith(secretKey)
                .compact();
    }

    public String extractEmail(String token) {
        
        return Jwts.parser()
            .verifyWith(secretKey)
            .build()
            .parseSignedClaims(token)
            .getPayload()
            .getSubject();
    }

    public boolean isTokenValid(String token) {
        try{
            extractEmail(token);
            return true;
        }

        catch (Exception e) {
            return false;
        }
    }

}
