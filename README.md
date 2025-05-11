# MyPharma - Pharmacy Management System

A comprehensive pharmacy management system built with Spring Boot and React, designed to streamline pharmacy operations, inventory management, and sales tracking.

## Features

### User Management
- User registration and authentication with JWT
- Role-based access control (Admin, Pharmacist, Cashier)
- User profile management
- Secure password handling

### Inventory Management
- Medicine inventory tracking
- Batch number management
- Expiry date monitoring
- Low stock alerts
- Category-based organization
- Image upload support for medicines

### Sales Management
- Point of Sale (POS) functionality
- Invoice generation
- Sales history tracking
- Customer information management
- Prescription handling

### Reporting
- Sales reports (daily, weekly, monthly)
- Inventory reports
- Expiry reports
- Sales statistics
- Inventory statistics

### Automated Features
- Daily sales reports
- Low stock alerts
- Expiry alerts
- Email notifications

## Technology Stack

### Backend
- Java 11
- Spring Boot 2.7.0
- Spring Security
- Spring Data JPA
- MySQL Database
- JWT Authentication
- iText PDF (for report generation)
- Thymeleaf (for email templates)
- JavaMailSender (for email notifications)

### Frontend (React)
- React.js
- Material-UI
- Redux for state management
- Axios for API calls
- React Router for navigation

## Project Structure

```
pharmacy-management/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── example/
│   │   │           └── pharmacymanagement/
│   │   │               ├── config/           # Configuration classes
│   │   │               ├── controller/       # REST controllers
│   │   │               ├── dto/             # Data Transfer Objects
│   │   │               ├── exception/       # Custom exceptions
│   │   │               ├── model/           # Entity classes
│   │   │               ├── repository/      # JPA repositories
│   │   │               ├── scheduler/       # Scheduled tasks
│   │   │               ├── security/        # Security configuration
│   │   │               ├── service/         # Business logic
│   │   │               └── util/            # Utility classes
│   │   └── resources/
│   │       ├── templates/    # Email templates
│   │       ├── application.properties
│   │       ├── schema.sql    # Database schema
│   │       └── data.sql      # Initial data
│   └── test/                # Test cases
├── frontend/               # React frontend application
├── pom.xml                # Maven configuration
└── README.md
```

## Prerequisites

- Java 11 or higher
- Maven 3.6 or higher
- MySQL 8.0 or higher
- Node.js 14 or higher (for frontend)
- npm or yarn (for frontend)

## Setup and Installation

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/pharmacy-management.git
   cd pharmacy-management
   ```

2. Configure the database:
   - Create a MySQL database named `pharmacy_db`
   - Update `application.properties` with your database credentials:
     ```properties
     spring.datasource.username=your_username
     spring.datasource.password=your_password
     ```

3. Configure email settings:
   - Update email configuration in `application.properties`:
     ```properties
     spring.mail.username=your-email@gmail.com
     spring.mail.password=your-app-specific-password
     ```

4. Build and run the backend:
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

The backend will start on `http://localhost:8080/api`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

The frontend will start on `http://localhost:3000`

## API Documentation

The API documentation is available at:
- Swagger UI: `http://localhost:8080/api/swagger-ui.html`
- OpenAPI JSON: `http://localhost:8080/api/api-docs`

## Key API Endpoints

### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - User login

### Users
- GET `/api/users` - Get all users
- GET `/api/users/{id}` - Get user by ID
- PUT `/api/users/{id}` - Update user
- DELETE `/api/users/{id}` - Delete user

### Medicines
- GET `/api/medicines` - Get all medicines
- POST `/api/medicines` - Create medicine
- GET `/api/medicines/{id}` - Get medicine by ID
- PUT `/api/medicines/{id}` - Update medicine
- DELETE `/api/medicines/{id}` - Delete medicine
- GET `/api/medicines/category/{category}` - Get medicines by category
- GET `/api/medicines/low-stock` - Get low stock medicines
- GET `/api/medicines/expiring` - Get expiring medicines

### Sales
- POST `/api/sales` - Create sale
- GET `/api/sales` - Get all sales
- GET `/api/sales/{id}` - Get sale by ID
- GET `/api/sales/user/{userId}` - Get sales by user
- GET `/api/sales/date-range` - Get sales by date range

### Reports
- GET `/api/reports/sales` - Generate sales report
- GET `/api/reports/inventory` - Generate inventory report
- GET `/api/reports/expiry` - Generate expiry report
- GET `/api/reports/sales/statistics` - Get sales statistics
- GET `/api/reports/inventory/statistics` - Get inventory statistics

## Security

The application uses JWT (JSON Web Token) for authentication. Include the token in the Authorization header for protected endpoints:
```
Authorization: Bearer your_jwt_token
```

## Automated Tasks

The system includes several automated tasks that run daily at 8 AM:
- Low stock alerts
- Expiry alerts
- Daily sales reports

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@mypharma.com or create an issue in the repository. 