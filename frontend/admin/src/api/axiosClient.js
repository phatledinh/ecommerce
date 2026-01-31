import axios from "axios";

const axiosClient = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

axiosClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error),
);

axiosClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const res = await axiosClient.get("/auth/refresh");

                if (res.data && res.data.accessToken) {
                    const newAccessToken = res.data.accessToken;

                    localStorage.setItem("accessToken", newAccessToken);

                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    return axiosClient(originalRequest);
                }
            } catch (refreshError) {
                console.error("Refresh token failed:", refreshError);

                localStorage.removeItem("accessToken");
                localStorage.removeItem("user");
                window.location.href = "/admin/login";
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    },
);

export default axiosClient;
