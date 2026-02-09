import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axiosClient from "../services/axiosClient";

export const useLogin = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        rememberMe: false,
    });

    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const setField = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: null }));
    };

    const validate = () => {
        const e = {};
        if (!formData.email) e.email = "Email bắt buộc";
        if (!formData.password) e.password = "Mật khẩu bắt buộc";

        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const login = async () => {
        if (!validate()) {
            Swal.fire({
                icon: "warning",
                title: "Thiếu thông tin",
                text: "Vui lòng nhập đầy đủ email và mật khẩu",
            });
            return false;
        }

        setIsLoading(true);

        try {
            const res = await axiosClient.post("/auth/login", {
                email: formData.email,
                password: formData.password,
            });

            const responseData = res.data?.data || res.data;

            const accessToken =
                responseData.accessToken || responseData.access_token;
            const user = responseData.user;

            if (accessToken && user) {
                localStorage.setItem("accessToken", accessToken);
                localStorage.setItem("user", JSON.stringify(user));

                await Swal.fire({
                    icon: "success",
                    title: "Đăng nhập thành công",
                    text: `Xin chào, ${user.fullName}`,
                    timer: 1500,
                    showConfirmButton: false,
                });

                navigate("/admin");
                return true;
            } else {
                throw new Error("Dữ liệu phản hồi không hợp lệ");
            }
        } catch (err) {
            console.error("Login error:", err);
            const message =
                err.response?.data?.message ||
                err.response?.data?.error ||
                "Không thể đăng nhập. Vui lòng kiểm tra lại tài khoản.";

            Swal.fire({
                icon: "error",
                title: "Đăng nhập thất bại",
                text: message,
            });

            return false;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        formData,
        errors,
        isLoading,
        setField,
        login,
    };
};
