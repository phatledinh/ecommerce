import axiosClient from "./axiosClient";

const BASE_URL = "/admin/attributes";

const attributeService = {
    getAll: async () => {
        const response = await axiosClient.get(BASE_URL);
        return response.data?.data || [];
    },

    getById: async (id) => {
        const response = await axiosClient.get(`${BASE_URL}/${id}`);
        return response.data?.data;
    },

    create: async (data) => {
        const response = await axiosClient.post(BASE_URL, data);
        return response.data?.data;
    },

    update: async (id, data) => {
        const response = await axiosClient.put(`${BASE_URL}/${id}`, data);
        return response.data?.data;
    },

    delete: async (id) => {
        const response = await axiosClient.delete(`${BASE_URL}/${id}`);
        return response.data;
    },
};

export default attributeService;
