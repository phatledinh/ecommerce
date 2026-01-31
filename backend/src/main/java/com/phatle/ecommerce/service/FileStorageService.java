package com.phatle.ecommerce.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Slf4j
@Service
public class FileStorageService {

    @Value("${file.upload-dir:uploads}")
    private String uploadDir;

    @Value("${app.url:http://localhost:8080}")
    private String appUrl;

    /**
     * Lưu file và trả về đường dẫn tương đối
     */
    public String storeFile(MultipartFile file, String folder) throws IOException {
        if (file.isEmpty()) {
            throw new IllegalArgumentException("File không được để trống");
        }

        // Validate file type
        String contentType = file.getContentType();
        if (contentType == null || !contentType.startsWith("image/")) {
            throw new IllegalArgumentException("Chỉ chấp nhận file ảnh");
        }

        // Validate file size (max 5MB)
        if (file.getSize() > 5 * 1024 * 1024) {
            throw new IllegalArgumentException("Kích thước file không được vượt quá 5MB");
        }

        // Generate unique filename
        String originalFilename = file.getOriginalFilename();
        String fileExtension = "";
        if (originalFilename != null && originalFilename.contains(".")) {
            fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));
        }
        String filename = UUID.randomUUID().toString() + fileExtension;

        // Create directory if not exists
        Path uploadPath = Paths.get(uploadDir + "/" + folder);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        // Copy file to target location
        Path targetLocation = uploadPath.resolve(filename);
        Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

        return uploadDir + "/" + folder + "/" + filename;
    }

    /**
     * Lấy URL đầy đủ của file
     */
    public String getFileUrl(String filePath) {
        if (filePath == null || filePath.isEmpty()) {
            return null;
        }
        // Nếu đã là URL đầy đủ thì trả về luôn
        if (filePath.startsWith("http://") || filePath.startsWith("https://")) {
            return filePath;
        }
        // Xóa slash đầu nếu có
        if (filePath.startsWith("/")) {
            filePath = filePath.substring(1);
        }
        return appUrl + "/" + filePath;
    }

    /**
     * Xóa file
     */
    public boolean deleteFile(String filePath) throws IOException {
        if (filePath == null || filePath.isEmpty()) {
            return false;
        }

        // Xóa base URL nếu có
        if (filePath.startsWith(appUrl)) {
            filePath = filePath.substring(appUrl.length());
        }

        // Xóa slash đầu nếu có
        if (filePath.startsWith("/")) {
            filePath = filePath.substring(1);
        }

        Path fileToDelete = Paths.get(filePath);
        if (Files.exists(fileToDelete)) {
            Files.delete(fileToDelete);
            return true;
        }
        return false;
    }

    /**
     * Kiểm tra file có tồn tại không
     */
    public boolean fileExists(String filePath) {
        if (filePath == null || filePath.isEmpty()) {
            return false;
        }

        try {
            // Xóa base URL nếu có
            if (filePath.startsWith(appUrl)) {
                filePath = filePath.substring(appUrl.length());
            }

            // Xóa slash đầu nếu có
            if (filePath.startsWith("/")) {
                filePath = filePath.substring(1);
            }

            Path filePathObj = Paths.get(filePath);
            return Files.exists(filePathObj);

        } catch (Exception e) {
            log.error("Error checking file existence: {}", e.getMessage());
            return false;
        }
    }
}