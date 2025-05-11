-- Insert admin user (password: admin123)
INSERT INTO users (first_name, last_name, email, password, role, phone_number, address, active)
VALUES (
    'Admin',
    'User',
    'admin@mypharma.com',
    '$2a$10$rDkPvvAFV6GgJjXpYWxqUOQZxXxXxXxXxXxXxXxXxXxXxXxXxXxXx', -- This is a placeholder, replace with actual BCrypt hash
    'ADMIN',
    '1234567890',
    'Admin Address',
    true
) ON DUPLICATE KEY UPDATE email = email;

-- Insert sample medicine categories
INSERT INTO medicines (name, description, category, manufacturer, price, quantity, batch_number, expiry_date, requires_prescription, active)
VALUES 
('Paracetamol 500mg', 'Pain reliever and fever reducer', 'Pain Relief', 'ABC Pharma', 5.99, 100, 'BATCH001', DATE_ADD(CURRENT_TIMESTAMP, INTERVAL 1 YEAR), false, true),
('Amoxicillin 250mg', 'Antibiotic for bacterial infections', 'Antibiotics', 'XYZ Pharma', 12.99, 50, 'BATCH002', DATE_ADD(CURRENT_TIMESTAMP, INTERVAL 1 YEAR), true, true),
('Omeprazole 20mg', 'Reduces stomach acid production', 'Gastrointestinal', 'DEF Pharma', 8.99, 75, 'BATCH003', DATE_ADD(CURRENT_TIMESTAMP, INTERVAL 1 YEAR), true, true)
ON DUPLICATE KEY UPDATE batch_number = batch_number; 