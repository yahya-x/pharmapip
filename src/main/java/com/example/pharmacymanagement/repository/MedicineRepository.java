package com.example.pharmacymanagement.repository;

import com.example.pharmacymanagement.model.Medicine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface MedicineRepository extends JpaRepository<Medicine, Long> {
    List<Medicine> findByActiveTrue();
    List<Medicine> findByCategoryAndActiveTrue(String category);
    List<Medicine> findByQuantityLessThanAndActiveTrue(Integer threshold);
    List<Medicine> findByExpiryDateBeforeAndActiveTrue(LocalDateTime date);
    
    @Query("SELECT m FROM Medicine m WHERE m.name LIKE %:keyword% OR m.description LIKE %:keyword%")
    List<Medicine> searchMedicines(String keyword);
    
    boolean existsByBatchNumber(String batchNumber);
} 