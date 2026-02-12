import axiosClient from "./axiosClient";

const categoryService = {
    // Lấy toàn bộ danh mục cho trang danh sách
    getAll: async () => {
        const response = await axiosClient.get("/admin/categories");
        return response.data.data;
    },

    // Lấy chi tiết danh mục (bao gồm cả mảng attributes)
    getById: async (id) => {
        const response = await axiosClient.get(`/admin/categories/${id}`);
        return response.data.data;
    },

    // Tạo mới danh mục với dữ liệu camelCase
    create: async (data) => {
        const response = await axiosClient.post("/admin/categories", data);
        return response.data.data;
    },

    // Cập nhật danh mục
    update: async (id, data) => {
        const response = await axiosClient.put(`/admin/categories/${id}`, data);
        return response.data.data;
    },

    // Xóa danh mục
    delete: async (id) => {
        const response = await axiosClient.delete(`/admin/categories/${id}`);
        return response.data.data;
    },

    // Bật/tắt trạng thái hiển thị (isActive)
    toggleStatus: async (id) => {
        const response = await axiosClient.patch(
            `/admin/categories/${id}/toggle`,
        );
        return response.data.data;
    },

    // Xử lý hàng loạt (Xóa, Kích hoạt, Vô hiệu hóa)
    bulkAction: async (action, ids) => {
        const response = await axiosClient.post(
            "/admin/categories/bulk-action",
            {
                action,
                ids,
            },
        );
        return response.data.data;
    },
};

export default categoryService;
