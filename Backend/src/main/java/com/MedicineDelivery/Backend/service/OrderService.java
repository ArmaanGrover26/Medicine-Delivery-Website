package com.MedicineDelivery.Backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.MedicineDelivery.Backend.model.Order;
import com.MedicineDelivery.Backend.model.User;
import com.MedicineDelivery.Backend.repository.OrderRepository;
import com.MedicineDelivery.Backend.repository.UserRepository;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    /**
     * Creates and saves a new order for a specific user.
     * @param userId The ID of the user placing the order.
     * @param order The Order object containing items and shipping details.
     * @return The saved Order.
     */
    @Transactional
    public Order createOrder(Long userId, Order order) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found with id: " + userId));

        order.setUser(user);

        if (order.getOrderItems() != null) {
            order.getOrderItems().forEach(item -> item.setOrder(order));
        }

        return orderRepository.save(order);
    }

    /**
     * Retrieves all orders for a specific user.
     * @param userId The ID of the user.
     * @return A list of the user's orders.
     */
    public List<Order> getOrdersForUser(Long userId) {
        return orderRepository.findByUserId(userId);
    }

    // --- NEW METHOD FOR ADMIN ---
    /**
     * Retrieves all orders from the database.
     * @return A list of all orders.
     */
    public List<Order> getAllOrders() {
        // This fetches every order in the system.
        return orderRepository.findAll();
    }

    // --- NEW METHOD FOR ADMIN ---
    /**
     * Updates the status of a specific order.
     * @param orderId The ID of the order to update.
     * @param status The new status string (e.g., "Shipped", "Delivered").
     * @return The updated Order object.
     */
    @Transactional
    public Order updateOrderStatus(Long orderId, String status) {
        // 1. Find the existing order in the database
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Order not found with id: " + orderId));

        // 2. Set the new status
        order.setStatus(status);

        // 3. Save the updated order back to the database
        return orderRepository.save(order);
    }
}
