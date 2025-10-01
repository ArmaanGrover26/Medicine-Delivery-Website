package com.MedicineDelivery.Backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.MedicineDelivery.Backend.model.Address;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {
    
    // This custom method will find all addresses associated with a specific user's ID
    List<Address> findByUserId(Long userId);
}


