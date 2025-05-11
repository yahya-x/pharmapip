package com.example.pharmacymanagement.service;

import com.example.pharmacymanagement.dto.MedicineDto;
import com.example.pharmacymanagement.model.Medicine;
import com.example.pharmacymanagement.repository.MedicineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
public class MedicineServiceImpl implements MedicineService {

    @Autowired
    private MedicineRepository medicineRepository;

    @Override
    public Medicine createMedicine(MedicineDto medicineDto) {
        if (existsByBatchNumber(medicineDto.getBatchNumber())) {
            throw new IllegalArgumentException("Batch number already exists");
        }

        Medicine medicine = new Medicine();
        updateMedicineFromDto(medicine, medicineDto);
        return medicineRepository.save(medicine);
    }

    @Override
    public Medicine updateMedicine(Long id, MedicineDto medicineDto) {
        Medicine medicine = findById(id);
        updateMedicineFromDto(medicine, medicineDto);
        return medicineRepository.save(medicine);
    }

    @Override
    public void deleteMedicine(Long id) {
        Medicine medicine = findById(id);
        medicine.setActive(false);
        medicineRepository.save(medicine);
    }

    @Override
    public Medicine findById(Long id) {
        return medicineRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Medicine not found with id: " + id));
    }

    @Override
    public List<Medicine> findAll() {
        return medicineRepository.findByActiveTrue();
    }

    @Override
    public List<Medicine> findByCategory(String category) {
        return medicineRepository.findByCategoryAndActiveTrue(category);
    }

    @Override
    public List<Medicine> findLowStock(int threshold) {
        return medicineRepository.findByQuantityLessThanAndActiveTrue(threshold);
    }

    @Override
    public List<Medicine> findExpiringSoon(LocalDateTime date) {
        return medicineRepository.findByExpiryDateBeforeAndActiveTrue(date);
    }

    @Override
    public List<Medicine> searchMedicines(String keyword) {
        return medicineRepository.searchMedicines(keyword);
    }

    @Override
    public boolean existsByBatchNumber(String batchNumber) {
        return medicineRepository.existsByBatchNumber(batchNumber);
    }

    private void updateMedicineFromDto(Medicine medicine, MedicineDto dto) {
        medicine.setName(dto.getName());
        medicine.setDescription(dto.getDescription());
        medicine.setCategory(dto.getCategory());
        medicine.setManufacturer(dto.getManufacturer());
        medicine.setPrice(dto.getPrice());
        medicine.setQuantity(dto.getQuantity());
        medicine.setBatchNumber(dto.getBatchNumber());
        medicine.setExpiryDate(dto.getExpiryDate());
        medicine.setImageUrl(dto.getImageUrl());
        medicine.setRequiresPrescription(dto.isRequiresPrescription());
    }
} 