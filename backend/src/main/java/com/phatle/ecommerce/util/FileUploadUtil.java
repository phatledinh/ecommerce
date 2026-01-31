package com.phatle.ecommerce.util;

import org.springframework.web.multipart.MultipartFile;

import java.util.Arrays;
import java.util.List;
import java.util.UUID;

public class FileUploadUtil {

    private static final List<String> ALLOWED_IMAGE_TYPES = Arrays.asList(
            "image/jpeg", "image/png", "image/gif", "image/webp", "image/svg+xml"
    );

    private static final long MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

    public static void validateImageFile(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("File không được để trống");
        }

        // Check file size
        if (file.getSize() > MAX_FILE_SIZE) {
            throw new IllegalArgumentException("File quá lớn. Kích thước tối đa: 5MB");
        }

        // Check content type
        String contentType = file.getContentType();
        if (contentType == null || !ALLOWED_IMAGE_TYPES.contains(contentType)) {
            throw new IllegalArgumentException(
                    "Định dạng file không hợp lệ. Chỉ chấp nhận: " +
                            String.join(", ", ALLOWED_IMAGE_TYPES)
            );
        }

        // Check filename
        String fileName = file.getOriginalFilename();
        if (fileName == null || fileName.contains("..")) {
            throw new IllegalArgumentException("Tên file không hợp lệ");
        }
    }

    public static String generateFileName(MultipartFile file) {
        String originalFileName = file.getOriginalFilename();
        String fileExtension = "";

        if (originalFileName != null && originalFileName.contains(".")) {
            fileExtension = originalFileName.substring(originalFileName.lastIndexOf("."));
        }

        return System.currentTimeMillis() + "_" +
                UUID.randomUUID().toString().substring(0, 8) +
                fileExtension;
    }
}