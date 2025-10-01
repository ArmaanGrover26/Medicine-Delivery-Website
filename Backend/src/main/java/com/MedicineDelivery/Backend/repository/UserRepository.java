package com.MedicineDelivery.Backend.repository;

import java.util.Optional; // Make sure this is imported

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.MedicineDelivery.Backend.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // --- THIS IS THE FIX ---
    // Add this method. It allows Spring Security to find users by their email address.
    Optional<User> findByEmail(String email);

}
