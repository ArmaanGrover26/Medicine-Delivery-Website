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

import com.MedicineDelivery.Backend.model.Order;
import com.MedicineDelivery.Backend.security.CustomUserDetails;
import com.MedicineDelivery.Backend.service.OrderService;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class OrderController {

    @Autowired
    private OrderService orderService;

    /**
     * --- NEW SECURE ENDPOINT (FIXES THE ERROR) ---
     * Creates a new order for the currently authenticated user.
     * @param userDetails The details of the logged-in user.
     * @param order The order details from the request body.
     * @return The newly created order.
     */
    @PostMapping
    public ResponseEntity<Order> createMyOrder(@AuthenticationPrincipal UserDetails userDetails, @RequestBody Order order) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        Long userId = ((CustomUserDetails) userDetails).getId();
        Order createdOrder = orderService.createOrder(userId, order);
        return new ResponseEntity<>(createdOrder, HttpStatus.CREATED);
    }

    /**
     * --- SECURE ENDPOINT ---
     * Fetches all orders for the currently authenticated user.
     * @param userDetails The details of the logged-in user, provided by Spring Security.
     * @return A list of the user's orders.
     */
    @GetMapping
    public ResponseEntity<List<Order>> getMyOrders(@AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        
        Long userId = ((CustomUserDetails) userDetails).getId();
        
        List<Order> orders = orderService.getOrdersForUser(userId);
        return ResponseEntity.ok(orders);
    }
}
