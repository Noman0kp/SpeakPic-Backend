package com.speakpic.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import jakarta.validation.constraints.Email;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(EmailAlreadyExistsException.class) 
    @ResponseStatus(HttpStatus.CONFLICT)

    public String handleEmailAlreadyExists(EmailAlreadyExistsException exception) {
        return exception.getMessage();
    }
    
    @ExceptionHandler(InvalidCredentialsException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)

    public String handleInvalidCredentials(InvalidCredentialsException exception) {

        return exception.getMessage();
    }
}
