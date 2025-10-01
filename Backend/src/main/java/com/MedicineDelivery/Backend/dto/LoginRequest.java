package com.MedicineDelivery.Backend.dto;


public class LoginRequest {

    private String email;
    private String password;

    // A default no-argument constructor is needed for JSON deserialization
    public LoginRequest() {
    }

    // --- Getters and Setters ---
    // These are essential for Spring to access the fields.

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
