package com.speakpic.dto;

import javax.print.DocFlavor.STRING;

public class LoginResponse {

    private String token;

    public LoginResponse() {

    }

    public LoginResponse(String token) {
        this.token = token;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
    
    
}
