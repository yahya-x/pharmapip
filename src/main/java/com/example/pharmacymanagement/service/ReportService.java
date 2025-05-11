package com.example.pharmacymanagement.service;

import java.time.LocalDateTime;
import java.util.Map;

public interface ReportService {
    byte[] generateSalesReport(LocalDateTime startDate, LocalDateTime endDate);
    byte[] generateInventoryReport();
    byte[] generateExpiryReport(LocalDateTime expiryDate);
    Map<String, Object> getSalesStatistics(LocalDateTime startDate, LocalDateTime endDate);
    Map<String, Object> getInventoryStatistics();
} 