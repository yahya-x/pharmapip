package com.example.pharmacymanagement.dto;

import lombok.Data;

import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.util.List;

@Data
public class SaleRequestDto {
    @NotEmpty(message = "Sale items cannot be empty")
    private List<@Valid SaleItemDto> items;

    @NotNull(message = "Discount is required")
    private BigDecimal discount;

    private String customerName;
    private String customerPhone;
    private String prescriptionNumber;

    @Data
    public static class SaleItemDto {
        @NotNull(message = "Medicine ID is required")
        private Long medicineId;

        @NotNull(message = "Quantity is required")
        private Integer quantity;
    }
} 