package com.example.pharmacymanagement.service;

import com.example.pharmacymanagement.model.Medicine;
import com.example.pharmacymanagement.model.Sale;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ReportServiceImpl implements ReportService {

    @Autowired
    private SaleService saleService;

    @Autowired
    private MedicineService medicineService;

    @Override
    public byte[] generateSalesReport(LocalDateTime startDate, LocalDateTime endDate) {
        try {
            List<Sale> sales = saleService.findByDateRange(startDate, endDate);
            return createSalesReport(sales, startDate, endDate);
        } catch (Exception e) {
            throw new RuntimeException("Error generating sales report", e);
        }
    }

    @Override
    public byte[] generateInventoryReport() {
        try {
            List<Medicine> medicines = medicineService.findAll();
            return createInventoryReport(medicines);
        } catch (Exception e) {
            throw new RuntimeException("Error generating inventory report", e);
        }
    }

    @Override
    public byte[] generateExpiryReport(LocalDateTime expiryDate) {
        try {
            List<Medicine> medicines = medicineService.findExpiringSoon(expiryDate);
            return createExpiryReport(medicines, expiryDate);
        } catch (Exception e) {
            throw new RuntimeException("Error generating expiry report", e);
        }
    }

    @Override
    public Map<String, Object> getSalesStatistics(LocalDateTime startDate, LocalDateTime endDate) {
        List<Sale> sales = saleService.findByDateRange(startDate, endDate);
        Double totalAmount = saleService.getTotalSalesAmount(startDate, endDate);
        
        Map<String, Object> statistics = new HashMap<>();
        statistics.put("totalSales", sales.size());
        statistics.put("totalAmount", totalAmount);
        statistics.put("averageSaleAmount", totalAmount / sales.size());
        
        Map<String, Long> salesByCategory = sales.stream()
                .flatMap(sale -> sale.getSaleItems().stream())
                .collect(Collectors.groupingBy(
                        item -> item.getMedicine().getCategory(),
                        Collectors.counting()
                ));
        statistics.put("salesByCategory", salesByCategory);
        
        return statistics;
    }

    @Override
    public Map<String, Object> getInventoryStatistics() {
        List<Medicine> medicines = medicineService.findAll();
        
        Map<String, Object> statistics = new HashMap<>();
        statistics.put("totalMedicines", medicines.size());
        statistics.put("totalValue", calculateTotalInventoryValue(medicines));
        
        Map<String, Long> medicinesByCategory = medicines.stream()
                .collect(Collectors.groupingBy(
                        Medicine::getCategory,
                        Collectors.counting()
                ));
        statistics.put("medicinesByCategory", medicinesByCategory);
        
        List<Medicine> lowStockMedicines = medicineService.findLowStock(10);
        statistics.put("lowStockMedicines", lowStockMedicines.size());
        
        return statistics;
    }

    private byte[] createSalesReport(List<Sale> sales, LocalDateTime startDate, LocalDateTime endDate) throws DocumentException {
        Document document = new Document();
        ByteArrayOutputStream out = new ByteArrayOutputStream();

        try {
            PdfWriter.getInstance(document, out);
            document.open();

            // Add title
            Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 18);
            Paragraph title = new Paragraph("Sales Report", titleFont);
            title.setAlignment(Element.ALIGN_CENTER);
            title.setSpacingAfter(20);
            document.add(title);

            // Add date range
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
            Paragraph dateRange = new Paragraph(
                    String.format("Period: %s to %s", 
                            startDate.format(formatter), 
                            endDate.format(formatter))
            );
            dateRange.setSpacingAfter(20);
            document.add(dateRange);

            // Create sales table
            PdfPTable table = new PdfPTable(5);
            table.setWidthPercentage(100);
            
            // Add headers
            String[] headers = {"Invoice #", "Date", "Customer", "Items", "Total Amount"};
            for (String header : headers) {
                table.addCell(new PdfPCell(new Phrase(header)));
            }

            // Add sales data
            for (Sale sale : sales) {
                table.addCell(sale.getInvoiceNumber());
                table.addCell(sale.getCreatedAt().format(formatter));
                table.addCell(sale.getCustomerName());
                table.addCell(String.valueOf(sale.getSaleItems().size()));
                table.addCell(sale.getFinalAmount().toString());
            }

            document.add(table);

            // Add summary
            Paragraph summary = new Paragraph();
            summary.setSpacingBefore(20);
            summary.add(new Phrase("Total Sales: " + sales.size() + "\n"));
            summary.add(new Phrase("Total Amount: " + saleService.getTotalSalesAmount(startDate, endDate)));
            document.add(summary);

        } finally {
            document.close();
        }

        return out.toByteArray();
    }

    private byte[] createInventoryReport(List<Medicine> medicines) throws DocumentException {
        Document document = new Document();
        ByteArrayOutputStream out = new ByteArrayOutputStream();

        try {
            PdfWriter.getInstance(document, out);
            document.open();

            // Add title
            Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 18);
            Paragraph title = new Paragraph("Inventory Report", titleFont);
            title.setAlignment(Element.ALIGN_CENTER);
            title.setSpacingAfter(20);
            document.add(title);

            // Create inventory table
            PdfPTable table = new PdfPTable(6);
            table.setWidthPercentage(100);
            
            // Add headers
            String[] headers = {"Name", "Category", "Quantity", "Price", "Batch #", "Expiry Date"};
            for (String header : headers) {
                table.addCell(new PdfPCell(new Phrase(header)));
            }

            // Add medicine data
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            for (Medicine medicine : medicines) {
                table.addCell(medicine.getName());
                table.addCell(medicine.getCategory());
                table.addCell(String.valueOf(medicine.getQuantity()));
                table.addCell(medicine.getPrice().toString());
                table.addCell(medicine.getBatchNumber());
                table.addCell(medicine.getExpiryDate().format(formatter));
            }

            document.add(table);

            // Add summary
            Paragraph summary = new Paragraph();
            summary.setSpacingBefore(20);
            summary.add(new Phrase("Total Medicines: " + medicines.size() + "\n"));
            summary.add(new Phrase("Total Value: " + calculateTotalInventoryValue(medicines)));
            document.add(summary);

        } finally {
            document.close();
        }

        return out.toByteArray();
    }

    private byte[] createExpiryReport(List<Medicine> medicines, LocalDateTime expiryDate) throws DocumentException {
        Document document = new Document();
        ByteArrayOutputStream out = new ByteArrayOutputStream();

        try {
            PdfWriter.getInstance(document, out);
            document.open();

            // Add title
            Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 18);
            Paragraph title = new Paragraph("Expiring Medicines Report", titleFont);
            title.setAlignment(Element.ALIGN_CENTER);
            title.setSpacingAfter(20);
            document.add(title);

            // Add expiry date
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            Paragraph dateInfo = new Paragraph(
                    String.format("Medicines expiring before: %s", expiryDate.format(formatter))
            );
            dateInfo.setSpacingAfter(20);
            document.add(dateInfo);

            // Create expiry table
            PdfPTable table = new PdfPTable(5);
            table.setWidthPercentage(100);
            
            // Add headers
            String[] headers = {"Name", "Category", "Quantity", "Batch #", "Expiry Date"};
            for (String header : headers) {
                table.addCell(new PdfPCell(new Phrase(header)));
            }

            // Add medicine data
            for (Medicine medicine : medicines) {
                table.addCell(medicine.getName());
                table.addCell(medicine.getCategory());
                table.addCell(String.valueOf(medicine.getQuantity()));
                table.addCell(medicine.getBatchNumber());
                table.addCell(medicine.getExpiryDate().format(formatter));
            }

            document.add(table);

            // Add summary
            Paragraph summary = new Paragraph();
            summary.setSpacingBefore(20);
            summary.add(new Phrase("Total Expiring Medicines: " + medicines.size()));
            document.add(summary);

        } finally {
            document.close();
        }

        return out.toByteArray();
    }

    private BigDecimal calculateTotalInventoryValue(List<Medicine> medicines) {
        return medicines.stream()
                .map(medicine -> medicine.getPrice().multiply(BigDecimal.valueOf(medicine.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }
} 