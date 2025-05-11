package com.example.pharmacymanagement.service;

import com.example.pharmacymanagement.dto.SaleRequestDto;
import com.example.pharmacymanagement.model.Sale;

import java.time.LocalDateTime;
import java.util.List;

public interface SaleService {
    Sale createSale(SaleRequestDto saleRequestDto, Long userId);
    Sale findById(Long id);
    List<Sale> findAll();
    List<Sale> findByUserId(Long userId);
    List<Sale> findByDateRange(LocalDateTime startDate, LocalDateTime endDate);
    Double getTotalSalesAmount(LocalDateTime startDate, LocalDateTime endDate);
    boolean existsByInvoiceNumber(String invoiceNumber);
} 