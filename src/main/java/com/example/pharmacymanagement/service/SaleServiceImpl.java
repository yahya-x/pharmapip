package com.example.pharmacymanagement.service;

import com.example.pharmacymanagement.dto.SaleRequestDto;
import com.example.pharmacymanagement.model.Medicine;
import com.example.pharmacymanagement.model.Sale;
import com.example.pharmacymanagement.model.SaleItem;
import com.example.pharmacymanagement.model.User;
import com.example.pharmacymanagement.repository.SaleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@Transactional
public class SaleServiceImpl implements SaleService {

    @Autowired
    private SaleRepository saleRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private MedicineService medicineService;

    @Override
    public Sale createSale(SaleRequestDto saleRequestDto, Long userId) {
        User user = userService.findById(userId);
        Sale sale = new Sale();
        sale.setUser(user);
        sale.setInvoiceNumber(generateInvoiceNumber());
        sale.setCustomerName(saleRequestDto.getCustomerName());
        sale.setCustomerPhone(saleRequestDto.getCustomerPhone());
        sale.setPrescriptionNumber(saleRequestDto.getPrescriptionNumber());
        sale.setDiscount(saleRequestDto.getDiscount());

        BigDecimal totalAmount = BigDecimal.ZERO;
        for (SaleRequestDto.SaleItemDto itemDto : saleRequestDto.getItems()) {
            Medicine medicine = medicineService.findById(itemDto.getMedicineId());
            
            if (medicine.getQuantity() < itemDto.getQuantity()) {
                throw new IllegalArgumentException("Insufficient stock for medicine: " + medicine.getName());
            }

            SaleItem saleItem = new SaleItem();
            saleItem.setSale(sale);
            saleItem.setMedicine(medicine);
            saleItem.setQuantity(itemDto.getQuantity());
            saleItem.setUnitPrice(medicine.getPrice());
            saleItem.setTotalPrice(medicine.getPrice().multiply(BigDecimal.valueOf(itemDto.getQuantity())));
            
            totalAmount = totalAmount.add(saleItem.getTotalPrice());
            
            // Update medicine quantity
            medicine.setQuantity(medicine.getQuantity() - itemDto.getQuantity());
            medicineService.updateMedicine(medicine.getId(), convertToDto(medicine));
            
            sale.getSaleItems().add(saleItem);
        }

        sale.setTotalAmount(totalAmount);
        sale.setFinalAmount(totalAmount.subtract(saleRequestDto.getDiscount()));
        
        return saleRepository.save(sale);
    }

    @Override
    public Sale findById(Long id) {
        return saleRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Sale not found with id: " + id));
    }

    @Override
    public List<Sale> findAll() {
        return saleRepository.findAll();
    }

    @Override
    public List<Sale> findByUserId(Long userId) {
        return saleRepository.findByUser_Id(userId);
    }

    @Override
    public List<Sale> findByDateRange(LocalDateTime startDate, LocalDateTime endDate) {
        return saleRepository.findByDateRange(startDate, endDate);
    }

    @Override
    public Double getTotalSalesAmount(LocalDateTime startDate, LocalDateTime endDate) {
        return saleRepository.getTotalSalesAmount(startDate, endDate);
    }

    @Override
    public boolean existsByInvoiceNumber(String invoiceNumber) {
        return saleRepository.existsByInvoiceNumber(invoiceNumber);
    }

    private String generateInvoiceNumber() {
        return "INV-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    }

    private com.example.pharmacymanagement.dto.MedicineDto convertToDto(Medicine medicine) {
        com.example.pharmacymanagement.dto.MedicineDto dto = new com.example.pharmacymanagement.dto.MedicineDto();
        dto.setId(medicine.getId());
        dto.setName(medicine.getName());
        dto.setDescription(medicine.getDescription());
        dto.setCategory(medicine.getCategory());
        dto.setManufacturer(medicine.getManufacturer());
        dto.setPrice(medicine.getPrice());
        dto.setQuantity(medicine.getQuantity());
        dto.setBatchNumber(medicine.getBatchNumber());
        dto.setExpiryDate(medicine.getExpiryDate());
        dto.setImageUrl(medicine.getImageUrl());
        dto.setRequiresPrescription(medicine.isRequiresPrescription());
        return dto;
    }
} 