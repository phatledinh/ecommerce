import axiosClient from "./axiosClient";

const brandApi = {
    getAll: (params) => {
        return axiosClient.get("/api/brands", { params });
    },

    getActive: () => {
        return axiosClient.get("/api/brands/active");
    },

    getBySlug: (slug) => {
        return axiosClient.get(`/api/brands/${slug}`);
    },

    create: (data) => {
        let formData = data;
        if (!(data instanceof FormData)) {
            formData = new FormData();
            Object.keys(data).forEach((key) => {
                if (data[key] !== null && data[key] !== undefined) {
                    formData.append(key, data[key]);
                }
            });
        }

        return axiosClient.post("/api/brands", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    },

    update: (slug, data) => {
        let formData = data;
        if (!(data instanceof FormData)) {
            formData = new FormData();
            Object.keys(data).forEach((key) => {
                if (data[key] !== null && data[key] !== undefined) {
                    formData.append(key, data[key]);
                }
            });
        }

        return axiosClient.put(`/api/brands/${slug}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    },

    delete: (slug) => {
        return axiosClient.delete(`/api/brands/${slug}`);
    },
};

export default brandApi;
