package com.example.pharmacymanagement.scheduler;

import com.example.pharmacymanagement.model.Medicine;
import com.example.pharmacymanagement.service.EmailService;
import com.example.pharmacymanagement.service.MedicineService;
import com.example.pharmacymanagement.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;
import java.util.StringBuilder;

@Component
public class ReportScheduler {

    @Autowired
    private MedicineService medicineService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private ReportService reportService;

    @Scheduled(cron = "0 0 8 * * ?") // Run at 8 AM every day
    public void sendDailyReports() {
        // Check for low stock medicines
        List<Medicine> lowStockMedicines = medicineService.findLowStock(10);
        if (!lowStockMedicines.isEmpty()) {
            emailService.sendLowStockAlert(lowStockMedicines);
        }

        // Check for expiring medicines (within next 3 months)
        LocalDateTime expiryDate = LocalDateTime.now().plusMonths(3);
        List<Medicine> expiringMedicines = medicineService.findExpiringSoon(expiryDate);
        if (!expiringMedicines.isEmpty()) {
            emailService.sendExpiryAlert(expiringMedicines);
        }

        // Send daily sales report
        LocalDateTime startDate = LocalDateTime.now().minusDays(1);
        LocalDateTime endDate = LocalDateTime.now();
        Map<String, Object> salesStats = reportService.getSalesStatistics(startDate, endDate);
        
        String content = String.format(
            "Daily Sales Report\n\n" +
            "Total Sales: %d\n" +
            "Total Amount: %.2f\n" +
            "Average Sale Amount: %.2f\n\n" +
            "Sales by Category:\n%s",
            salesStats.get("totalSales"),
            salesStats.get("totalAmount"),
            salesStats.get("averageSaleAmount"),
            formatSalesByCategory((Map<String, Long>) salesStats.get("salesByCategory"))
        );

        emailService.sendDailyReport(
            "admin@mypharma.com",
            "Daily Sales Report - " + LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd")),
            content
        );
    }

    private String formatSalesByCategory(Map<String, Long> salesByCategory) {
        StringBuilder sb = new StringBuilder();
        salesByCategory.forEach((category, count) -> 
            sb.append(String.format("%s: %d\n", category, count))
        );
        return sb.toString();
    }
} 