package com.example.pharmacymanagement.repository;

import com.example.pharmacymanagement.model.Sale;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface SaleRepository extends JpaRepository<Sale, Long> {
    List<Sale> findByUser_Id(Long userId);
    
    @Query("SELECT s FROM Sale s WHERE s.createdAt BETWEEN :startDate AND :endDate")
    List<Sale> findByDateRange(LocalDateTime startDate, LocalDateTime endDate);
    
    @Query("SELECT SUM(s.finalAmount) FROM Sale s WHERE s.createdAt BETWEEN :startDate AND :endDate")
    Double getTotalSalesAmount(LocalDateTime startDate, LocalDateTime endDate);
    
    boolean existsByInvoiceNumber(String invoiceNumber);
} 