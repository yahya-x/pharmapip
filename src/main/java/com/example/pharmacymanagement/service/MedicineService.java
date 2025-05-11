package com.example.pharmacymanagement.service;

import com.example.pharmacymanagement.dto.MedicineDto;
import com.example.pharmacymanagement.model.Medicine;

import java.time.LocalDateTime;
import java.util.List;

public interface MedicineService {
    Medicine createMedicine(MedicineDto medicineDto);
    Medicine updateMedicine(Long id, MedicineDto medicineDto);
    void deleteMedicine(Long id);
    Medicine findById(Long id);
    List<Medicine> findAll();
    List<Medicine> findByCategory(String category);
    List<Medicine> findLowStock(int threshold);
    List<Medicine> findExpiringSoon(LocalDateTime date);
    List<Medicine> searchMedicines(String keyword);
    boolean existsByBatchNumber(String batchNumber);
} 