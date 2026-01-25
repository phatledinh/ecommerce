import axios from "axios";

export const adminApi = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/api",
    timeout: 10000,
    headers: { "Content-Type": "application/json" },
});

adminApi.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("authToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (err) => Promise.reject(err)
);

adminApi.interceptors.response.use(
    (res) => res,
    (err) => {
        if (err?.response?.status === 401) {
            localStorage.removeItem("authToken");
            localStorage.removeItem("authUser");
            if (typeof window !== "undefined") {
                window.location.href = "/login";
            }
        }
        return Promise.reject(err);
    }
);

export const CategoryAPI = {
    list: () => adminApi.get("/categories").then((r) => r.data.data),
    parents: () => adminApi.get("/categories/parents").then((r) => r.data.data),
    children: (parentId) =>
        adminApi.get(`/category/${parentId}/children`).then((r) => r.data.data),
    create: (payload) =>
        adminApi.post("/categories", payload).then((r) => r.data.data),
    update: (id, payload) =>
        adminApi.put(`/categories/${id}`, payload).then((r) => r.data.data),
    remove: (id) => adminApi.delete(`/categories/${id}`),
};
