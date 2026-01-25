import axiosClient from "./axiosClient";

const productApi = {
    getCategories: () => {
        return axiosClient.get("/api/categories/active");
    },

    getBrands: () => {
        return axiosClient.get("/api/brands/active");
    },

    searchProducts: (params) => {
        return axiosClient.get("/api/products/search", { params });
    },

    getProducts: (params) => {
        return axiosClient.get("/api/products", { params });
    },

    createProduct: (data) => {
        return axiosClient.post("/api/products", data);
    },

    getProductById: (id) => {
        return axiosClient.get(`/api/products/${id}`);
    },

    updateProduct: (id, data) => {
        return axiosClient.put(`/api/products/${id}`, data);
    },

    deleteProduct: (id) => {
        return axiosClient.delete(`/api/products/${id}`);
    },

    getColors: () => {
        return axiosClient.get("/api/product-colors");
    },

    findOrCreateColor: (colorData) => {
        return axiosClient.post(
            "/api/product-colors/find-or-create",
            colorData
        );
    },

    createColor: (colorData) => {
        return axiosClient.post("/api/product-colors", colorData);
    },

    createVariant: (productId, variantData) => {
        return axiosClient.post(
            `/api/products/${productId}/variants`,
            variantData
        );
    },

    createMultipleVariants: (productId, variantsData) => {
        return axiosClient.post(
            `/api/products/${productId}/variants/bulk`,
            variantsData
        );
    },

    linkVariantToColor: (variantId, colorId) => {
        return axiosClient.post(`/api/variants/${variantId}/colors`, {
            color_id: colorId,
        });
    },

    addVariantSpec: (variantId, specData) => {
        return axiosClient.post(`/api/variants/${variantId}/specs`, specData);
    },

    uploadGallery: (productId, galleryData) => {
        return axiosClient.post(
            `/api/products/${productId}/gallery`,
            galleryData
        );
    },

    createBundles: (bundlesData) => {
        return axiosClient.post("/api/product-bundles/bulk", bundlesData);
    },

    generateSKU: (productId, colorName, specValue) => {
        return axiosClient.post(`/api/products/${productId}/generate-sku`, {
            color_name: colorName,
            spec_value: specValue,
        });
    },

    batchCreateVariantsWithColors: (productId, data) => {
        return axiosClient.post(
            `/api/products/${productId}/variants-complete`,
            data
        );
    },
    updateVariants: (productId, variantsData) => {
        // Lưu ý: Backend mong đợi List, không phải Object chứa List
        return axiosClient.put(
            `/api/products/${productId}/variants`,
            variantsData
        );
    },

    updateGallery: (productId, galleryData) => {
        return axiosClient.put(
            `/api/products/${productId}/gallery`,
            galleryData
        );
    },

    updateBundles: (productId, bundlesData) => {
        // Backend mong đợi List
        return axiosClient.put(
            `/api/products/${productId}/bundles`,
            bundlesData
        );
    },
};

export default productApi;
