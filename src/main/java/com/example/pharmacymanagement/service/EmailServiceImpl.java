package com.example.pharmacymanagement.service;

import com.example.pharmacymanagement.model.Medicine;
import com.example.pharmacymanagement.model.Sale;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class EmailServiceImpl implements EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private TemplateEngine templateEngine;

    @Value("${spring.mail.username}")
    private String fromEmail;

    @Override
    public void sendLowStockAlert(List<Medicine> medicines) {
        Context context = new Context();
        context.setVariable("medicines", medicines);
        String content = templateEngine.process("low-stock-alert", context);

        sendDailyReport(
            "admin@mypharma.com",
            "Low Stock Alert",
            content
        );
    }

    @Override
    public void sendExpiryAlert(List<Medicine> medicines) {
        Context context = new Context();
        context.setVariable("medicines", medicines);
        String content = templateEngine.process("expiry-alert", context);

        sendDailyReport(
            "admin@mypharma.com",
            "Expiring Medicines Alert",
            content
        );
    }

    @Override
    public void sendSaleConfirmation(Sale sale) {
        Context context = new Context();
        context.setVariable("sale", sale);
        context.setVariable("items", sale.getSaleItems());
        String content = templateEngine.process("sale-confirmation", context);

        sendDailyReport(
            sale.getCustomerName() + " <" + sale.getCustomerPhone() + ">",
            "Sale Confirmation - " + sale.getInvoiceNumber(),
            content
        );
    }

    @Override
    public void sendDailyReport(String recipient, String subject, String content) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(fromEmail);
            helper.setTo(recipient);
            helper.setSubject(subject);
            helper.setText(content, true);

            mailSender.send(message);
        } catch (MessagingException e) {
            throw new RuntimeException("Error sending email", e);
        }
    }
} 