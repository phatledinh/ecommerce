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
        if (
            config.url.includes("/auth/login") ||
            config.url.includes("/auth/register")
        ) {
            return config;
        }

        const token = localStorage.getItem("accessToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error),
);

axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        const hasToken = localStorage.getItem("accessToken");

        if (
            !hasToken ||
            originalRequest.url.includes("/auth/login") ||
            originalRequest.url.includes("/auth/refresh")
        ) {
            return Promise.reject(error);
        }

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const res = await axiosClient.get("/auth/refresh");

                const newAccessToken =
                    res.data?.data?.access_token || res.data?.access_token;

                if (newAccessToken) {
                    localStorage.setItem("accessToken", newAccessToken);

                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    return axiosClient(originalRequest);
                }
            } catch (refreshError) {
                console.error("Refresh token failed", refreshError);
                localStorage.clear();
                window.location.href = "/admin/login";
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    },
);

export default axiosClient;
