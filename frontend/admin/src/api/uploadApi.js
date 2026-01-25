import axiosClient from "./axiosClient";

const uploadApi = {
    uploadImage: (file, type = "general") => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("type", type);

        return axiosClient.post("/api/upload/image", formData);
    },

    uploadMultipleImages: (files, type = "general") => {
        const formData = new FormData();
        Array.from(files).forEach((file) => {
            formData.append("files", file);
        });
        formData.append("type", type);

        return axiosClient.post("/api/upload/multiple", formData);
    },

    uploadForProduct: (file, productId) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("entityType", "PRODUCT");
        formData.append("entityId", productId);

        return axiosClient.post("/api/upload", formData);
    },
};

export default uploadApi;
