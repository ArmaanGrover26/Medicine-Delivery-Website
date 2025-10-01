package com.MedicineDelivery.Backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.MedicineDelivery.Backend.dto.LoginRequest;
import com.MedicineDelivery.Backend.dto.LoginResponse; // Import the new LoginResponse DTO
import com.MedicineDelivery.Backend.model.User;
import com.MedicineDelivery.Backend.security.CustomUserDetails; // Import CustomUserDetails
import com.MedicineDelivery.Backend.security.JwtTokenProvider; // Import the new JwtTokenProvider
import com.MedicineDelivery.Backend.service.UserService;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class UserController {

    @Autowired
    private UserService userService;

    // --- NEWLY INJECTED DEPENDENCIES FOR AUTHENTICATION ---
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    // Endpoint to get all users
    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    // Endpoint to get a single user by ID
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        return userService.getUserById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Endpoint to create a new user (Signup)
    @PostMapping
    public User createUser(@RequestBody User user) {
        return userService.createUser(user);
    }

    /**
     * --- UPDATED LOGIN ENDPOINT ---
     * Endpoint for user login. It now authenticates and returns a JWT token.
     * @param loginRequest DTO containing the user's email and password.
     * @return A LoginResponse object containing the User details and the JWT token.
     */
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> loginUser(@RequestBody LoginRequest loginRequest) {
        // Step 1: Authenticate the user with Spring Security
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                loginRequest.getEmail(),
                loginRequest.getPassword()
            )
        );

        // Step 2: If authentication is successful, set it in the security context
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // Step 3: Get the UserDetails object from the authentication
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        
        // Step 4: Generate the JWT token
        String token = jwtTokenProvider.createToken(userDetails);
        
        // Step 5: Get the full User object to return to the frontend
        User user = userService.getUserByEmail(loginRequest.getEmail());

        // Step 6: Return the new LoginResponse containing the user and the token
        return ResponseEntity.ok(new LoginResponse(user, token));
    }
}

    
