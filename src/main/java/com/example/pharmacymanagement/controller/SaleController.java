package com.example.pharmacymanagement.controller;

import com.example.pharmacymanagement.dto.SaleRequestDto;
import com.example.pharmacymanagement.model.Sale;
import com.example.pharmacymanagement.service.SaleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/sales")
public class SaleController {

    @Autowired
    private SaleService saleService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('PHARMACIST') or hasRole('CASHIER')")
    public ResponseEntity<Sale> createSale(
            @Valid @RequestBody SaleRequestDto saleRequestDto,
            @AuthenticationPrincipal UserDetails userDetails) {
        // Get user ID from UserDetails (you'll need to implement this)
        Long userId = getUserIdFromUserDetails(userDetails);
        return ResponseEntity.ok(saleService.createSale(saleRequestDto, userId));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('PHARMACIST')")
    public ResponseEntity<Sale> getSaleById(@PathVariable Long id) {
        return ResponseEntity.ok(saleService.findById(id));
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('PHARMACIST')")
    public ResponseEntity<List<Sale>> getAllSales() {
        return ResponseEntity.ok(saleService.findAll());
    }

    @GetMapping("/user/{userId}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('PHARMACIST')")
    public ResponseEntity<List<Sale>> getSalesByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(saleService.findByUserId(userId));
    }

    @GetMapping("/date-range")
    @PreAuthorize("hasRole('ADMIN') or hasRole('PHARMACIST')")
    public ResponseEntity<List<Sale>> getSalesByDateRange(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate) {
        return ResponseEntity.ok(saleService.findByDateRange(startDate, endDate));
    }

    @GetMapping("/total-amount")
    @PreAuthorize("hasRole('ADMIN') or hasRole('PHARMACIST')")
    public ResponseEntity<Double> getTotalSalesAmount(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate) {
        return ResponseEntity.ok(saleService.getTotalSalesAmount(startDate, endDate));
    }

    private Long getUserIdFromUserDetails(UserDetails userDetails) {
        // Implement this method to extract user ID from UserDetails
        // This is a placeholder implementation
        return 1L;
    }
} 