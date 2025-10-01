package com.MedicineDelivery.Backend.security;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.MedicineDelivery.Backend.model.User;
import com.MedicineDelivery.Backend.repository.UserRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // This requires a findByEmail method in your UserRepository.
        // If you don't have it, you'll need to add: Optional<User> findByEmail(String email);
        Optional<User> userOptional = userRepository.findByEmail(email);
        
        User user = userOptional
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
        
        return new CustomUserDetails(user);
    }
}


