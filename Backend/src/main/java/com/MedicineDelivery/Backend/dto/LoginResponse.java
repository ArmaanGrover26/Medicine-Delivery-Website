package com.MedicineDelivery.Backend.dto;

import com.MedicineDelivery.Backend.model.User;

public class LoginResponse {
    private User user;
    private String token;

    public LoginResponse(User user, String token) {
        this.user = user;
        this.token = token;
    }

    // Getters and Setters
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
}

