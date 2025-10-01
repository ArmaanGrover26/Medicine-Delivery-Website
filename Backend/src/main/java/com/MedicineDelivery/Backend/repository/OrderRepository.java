package com.MedicineDelivery.Backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.MedicineDelivery.Backend.model.Order;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    // This custom method will find all orders belonging to a specific user
    List<Order> findByUserId(Long userId);
}

