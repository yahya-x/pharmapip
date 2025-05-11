package com.example.pharmacymanagement.service;

import com.example.pharmacymanagement.dto.MedicineDto;
import com.example.pharmacymanagement.model.Medicine;
import com.example.pharmacymanagement.repository.MedicineRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import javax.persistence.EntityNotFoundException;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class MedicineServiceTest {

    @Mock
    private MedicineRepository medicineRepository;

    @InjectMocks
    private MedicineServiceImpl medicineService;

    private MedicineDto medicineDto;
    private Medicine medicine;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        medicineDto = new MedicineDto();
        medicineDto.setName("Paracetamol");
        medicineDto.setDescription("Pain reliever");
        medicineDto.setCategory("Pain Relief");
        medicineDto.setManufacturer("ABC Pharma");
        medicineDto.setPrice(new BigDecimal("9.99"));
        medicineDto.setQuantity(100);
        medicineDto.setBatchNumber("BATCH001");
        medicineDto.setExpiryDate(LocalDateTime.now().plusYears(1));
        medicineDto.setRequiresPrescription(false);

        medicine = new Medicine();
        medicine.setId(1L);
        medicine.setName(medicineDto.getName());
        medicine.setDescription(medicineDto.getDescription());
        medicine.setCategory(medicineDto.getCategory());
        medicine.setManufacturer(medicineDto.getManufacturer());
        medicine.setPrice(medicineDto.getPrice());
        medicine.setQuantity(medicineDto.getQuantity());
        medicine.setBatchNumber(medicineDto.getBatchNumber());
        medicine.setExpiryDate(medicineDto.getExpiryDate());
        medicine.setRequiresPrescription(medicineDto.isRequiresPrescription());
        medicine.setActive(true);
    }

    @Test
    void createMedicine_Success() {
        when(medicineRepository.existsByBatchNumber(anyString())).thenReturn(false);
        when(medicineRepository.save(any(Medicine.class))).thenReturn(medicine);

        Medicine result = medicineService.createMedicine(medicineDto);

        assertNotNull(result);
        assertEquals(medicineDto.getName(), result.getName());
        assertEquals(medicineDto.getBatchNumber(), result.getBatchNumber());
        verify(medicineRepository).save(any(Medicine.class));
    }

    @Test
    void createMedicine_BatchNumberExists() {
        when(medicineRepository.existsByBatchNumber(anyString())).thenReturn(true);

        assertThrows(IllegalArgumentException.class, () -> medicineService.createMedicine(medicineDto));
        verify(medicineRepository, never()).save(any(Medicine.class));
    }

    @Test
    void findById_Success() {
        when(medicineRepository.findById(1L)).thenReturn(Optional.of(medicine));

        Medicine result = medicineService.findById(1L);

        assertNotNull(result);
        assertEquals(medicine.getId(), result.getId());
    }

    @Test
    void findById_NotFound() {
        when(medicineRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(EntityNotFoundException.class, () -> medicineService.findById(1L));
    }

    @Test
    void findAll_Success() {
        List<Medicine> medicines = Arrays.asList(medicine);
        when(medicineRepository.findByActiveTrue()).thenReturn(medicines);

        List<Medicine> result = medicineService.findAll();

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(medicine.getId(), result.get(0).getId());
    }

    @Test
    void findByCategory_Success() {
        List<Medicine> medicines = Arrays.asList(medicine);
        when(medicineRepository.findByCategoryAndActiveTrue(anyString())).thenReturn(medicines);

        List<Medicine> result = medicineService.findByCategory("Pain Relief");

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(medicine.getCategory(), result.get(0).getCategory());
    }

    @Test
    void findLowStock_Success() {
        List<Medicine> medicines = Arrays.asList(medicine);
        when(medicineRepository.findByQuantityLessThanAndActiveTrue(anyInt())).thenReturn(medicines);

        List<Medicine> result = medicineService.findLowStock(10);

        assertNotNull(result);
        assertEquals(1, result.size());
        assertTrue(result.get(0).getQuantity() < 10);
    }

    @Test
    void findExpiringSoon_Success() {
        List<Medicine> medicines = Arrays.asList(medicine);
        LocalDateTime expiryDate = LocalDateTime.now().plusMonths(3);
        when(medicineRepository.findByExpiryDateBeforeAndActiveTrue(any(LocalDateTime.class))).thenReturn(medicines);

        List<Medicine> result = medicineService.findExpiringSoon(expiryDate);

        assertNotNull(result);
        assertEquals(1, result.size());
    }

    @Test
    void searchMedicines_Success() {
        List<Medicine> medicines = Arrays.asList(medicine);
        when(medicineRepository.searchMedicines(anyString())).thenReturn(medicines);

        List<Medicine> result = medicineService.searchMedicines("Paracetamol");

        assertNotNull(result);
        assertEquals(1, result.size());
        assertTrue(result.get(0).getName().contains("Paracetamol"));
    }
} 