package com.MedicineDelivery.Backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.MedicineDelivery.Backend.model.Address;
import com.MedicineDelivery.Backend.model.User;
import com.MedicineDelivery.Backend.repository.AddressRepository;
import com.MedicineDelivery.Backend.repository.UserRepository;

@Service
public class AddressService {

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private UserRepository userRepository;

    /**
     * Finds all addresses belonging to a specific user.
     * @param userId The ID of the user.
     * @return A list of addresses.
     */
    public List<Address> getAddressesByUserId(Long userId) {
        return addressRepository.findByUserId(userId);
    }

    /**
     * Saves a new address and links it to a user.
     * @param userId The ID of the user who owns the address.
     * @param address The new address object to save.
     * @return The saved address with its new ID.
     */
    public Address addAddress(Long userId, Address address) {
        // Find the user first, or throw an error if the user doesn't exist
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
        
        // Set the user on the address object to create the link
        address.setUser(user);
        
        // Save the new address to the database
        return addressRepository.save(address);
    }
}


