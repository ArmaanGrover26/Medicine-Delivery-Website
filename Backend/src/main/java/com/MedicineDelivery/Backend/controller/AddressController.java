package com.MedicineDelivery.Backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.MedicineDelivery.Backend.model.Address;
import com.MedicineDelivery.Backend.security.CustomUserDetails; // Make sure to import this
import com.MedicineDelivery.Backend.service.AddressService;

@RestController
@RequestMapping("/api/addresses")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class AddressController {

    @Autowired
    private AddressService addressService;

    /**
     * --- NEW SECURE ENDPOINT ---
     * API endpoint to get all addresses for the currently authenticated user.
     * @param userDetails The details of the logged-in user, provided by Spring Security.
     * @return A list of the user's addresses.
     */
    @GetMapping
    public ResponseEntity<List<Address>> getMyAddresses(@AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        Long userId = ((CustomUserDetails) userDetails).getId();
        List<Address> addresses = addressService.getAddressesByUserId(userId);
        return ResponseEntity.ok(addresses);
    }

    /**
     * --- NEW SECURE ENDPOINT ---
     * API endpoint to add a new address for the currently authenticated user.
     * @param userDetails The details of the logged-in user.
     * @param address The new address data sent from the frontend.
     * @return The newly created Address object.
     */
    @PostMapping
    public ResponseEntity<Address> addMyAddress(@AuthenticationPrincipal UserDetails userDetails, @RequestBody Address address) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        Long userId = ((CustomUserDetails) userDetails).getId();
        Address newAddress = addressService.addAddress(userId, address);
        return ResponseEntity.ok(newAddress);
    }
}
