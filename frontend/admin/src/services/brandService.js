import axiosClient from "./axiosClient";
const BASE_URL = "/admin/brands";

const brandService = {
    getAll: async (params) => {
        const response = await axiosClient.get(BASE_URL, { params });
        return response.data.data;
    },

    getById: async (id) => {
        const response = await axiosClient.get(`${BASE_URL}/${id}`);
        return response.data.data;
    },

    create: async (formData) => {
        const response = await axiosClient.post(BASE_URL, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data.data;
    },

    update: async (id, formData) => {
        const response = await axiosClient.put(`${BASE_URL}/${id}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data.data;
    },

    delete: async (id) => {
        const response = await axiosClient.delete(`${BASE_URL}/${id}`);
        return response.data.data;
    },

    toggleStatus: async (id) => {
        const response = await axiosClient.patch(`${BASE_URL}/${id}/status`);
        return response.data.data;
    },
};

export default brandService;
