package com.example.pharmacymanagement.service;

import com.example.pharmacymanagement.model.Medicine;
import com.example.pharmacymanagement.model.Sale;

import java.util.List;

public interface EmailService {
    void sendLowStockAlert(List<Medicine> medicines);
    void sendExpiryAlert(List<Medicine> medicines);
    void sendSaleConfirmation(Sale sale);
    void sendDailyReport(String recipient, String subject, String content);
} 