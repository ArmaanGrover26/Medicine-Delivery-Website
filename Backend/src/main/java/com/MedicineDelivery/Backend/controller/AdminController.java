package com.MedicineDelivery.Backend.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.MedicineDelivery.Backend.model.Order;
import com.MedicineDelivery.Backend.model.User;
import com.MedicineDelivery.Backend.service.OrderService;
import com.MedicineDelivery.Backend.service.UserService;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class AdminController {

    @Autowired
    private UserService userService;

    // --- NEWLY INJECTED DEPENDENCY ---
    @Autowired
    private OrderService orderService;

    // Endpoint to get all users
    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    // Endpoint to block or unblock a user
    @PutMapping("/users/{id}/status")
    public ResponseEntity<User> updateUserStatus(
            @PathVariable Long id,
            @RequestBody Map<String, Boolean> statusUpdate) {
        boolean isBlocked = statusUpdate.get("blocked");
        User updatedUser = userService.updateUserBlockedStatus(id, isBlocked);
        return ResponseEntity.ok(updatedUser);
    }

    // --- NEW ENDPOINT FOR ADMIN ---
    /**
     * Fetches all orders from all users.
     * @return A list of all orders in the system.
     */
    @GetMapping("/orders")
    public ResponseEntity<List<Order>> getAllOrders() {
        List<Order> allOrders = orderService.getAllOrders();
        return ResponseEntity.ok(allOrders);
    }

    // --- NEW ENDPOINT FOR ADMIN ---
    /**
     * Updates the status of a specific order.
     * @param id The ID of the order to update.
     * @param statusUpdate A Map containing the new status, e.g., {"status": "Shipped"}
     * @return The updated order.
     */
    @PutMapping("/orders/{id}/status")
    public ResponseEntity<Order> updateOrderStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> statusUpdate) {
        String newStatus = statusUpdate.get("status");
        Order updatedOrder = orderService.updateOrderStatus(id, newStatus);
        return ResponseEntity.ok(updatedOrder);
    }
}
