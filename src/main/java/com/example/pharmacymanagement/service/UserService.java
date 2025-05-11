package com.example.pharmacymanagement.service;

import com.example.pharmacymanagement.dto.UserRegistrationDto;
import com.example.pharmacymanagement.model.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    User registerUser(UserRegistrationDto registrationDto);
    Optional<User> findByEmail(String email);
    List<User> findAll();
    User findById(Long id);
    User updateUser(Long id, UserRegistrationDto userDto);
    void deleteUser(Long id);
    boolean existsByEmail(String email);
} 