import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    EnvelopeIcon,
    EyeIcon,
    EyeSlashIcon,
    LockClosedIcon,
    ShieldCheckIcon,
    ArrowRightIcon,
    BuildingStorefrontIcon,
} from "@heroicons/react/24/outline";
import axiosClient from "../../services/axiosClient";
import Swal from "sweetalert2"; // Đừng quên import Swal

const Login = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        rememberMe: false,
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: null }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.email.trim()) {
            newErrors.email = "Email là bắt buộc";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email không hợp lệ";
        }

        if (!formData.password.trim()) {
            newErrors.password = "Mật khẩu là bắt buộc";
        } else if (formData.password.length < 6) {
            newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);

        try {
            const response = await axiosClient.post("/auth/login", {
                email: formData.email,
                password: formData.password,
            });

            const result = response.data?.data || response.data;

            const accessToken = result?.access_token || result?.accessToken;
            const user = result?.user;

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
            } else {
                throw new Error("Không tìm thấy access_token trong phản hồi");
            }
        } catch (error) {
            console.error("Login failed:", error);
            const errorMessage =
                error.response?.data?.message || "Đăng nhập thất bại.";

            Swal.fire({
                icon: "error",
                title: "Lỗi",
                text: errorMessage,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-gray-900 opacity-90"></div>
                <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
                <div
                    className="absolute top-0 right-0 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
                    style={{ animationDelay: "1s" }}
                ></div>
                <div
                    className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
                    style={{ animationDelay: "2s" }}
                ></div>
                <div
                    className="absolute inset-0 opacity-5"
                    style={{
                        backgroundImage: `linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)`,
                        backgroundSize: "50px 50px",
                    }}
                ></div>
            </div>

            <div className="relative z-10 flex min-h-screen items-center justify-center p-4">
                <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-500/20 backdrop-blur-sm border border-blue-500/30 mb-4">
                            <BuildingStorefrontIcon className="h-8 w-8 text-blue-400" />
                        </div>
                        <h1 className="text-4xl font-bold text-white mb-2">
                            DPShop Admin
                        </h1>
                        <p className="text-gray-400">
                            Đăng nhập để truy cập bảng điều khiển
                        </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl overflow-hidden">
                        <div className="p-8 sm:p-10">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Email
                                    </label>
                                    <div
                                        className={`relative rounded-lg border transition-all duration-200 ${errors.email ? "border-red-500/50 bg-red-500/10" : "border-gray-600 bg-black/20 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20"}`}
                                    >
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "email",
                                                    e.target.value,
                                                )
                                            }
                                            className="block w-full pl-10 pr-3 py-3 bg-transparent text-white placeholder-gray-500 focus:outline-none sm:text-sm"
                                            placeholder="admin@dpshop.com"
                                            disabled={isLoading}
                                        />
                                    </div>
                                    {errors.email && errors.email !== " " && (
                                        <p className="mt-1 text-sm text-red-400">
                                            {errors.email}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Mật khẩu
                                    </label>
                                    <div
                                        className={`relative rounded-lg border transition-all duration-200 ${errors.password ? "border-red-500/50 bg-red-500/10" : "border-gray-600 bg-black/20 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20"}`}
                                    >
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <LockClosedIcon className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            value={formData.password}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "password",
                                                    e.target.value,
                                                )
                                            }
                                            className="block w-full pl-10 pr-12 py-3 bg-transparent text-white placeholder-gray-500 focus:outline-none sm:text-sm"
                                            placeholder="••••••••"
                                            disabled={isLoading}
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white transition-colors"
                                        >
                                            {showPassword ? (
                                                <EyeSlashIcon className="h-5 w-5" />
                                            ) : (
                                                <EyeIcon className="h-5 w-5" />
                                            )}
                                        </button>
                                    </div>
                                    {errors.password &&
                                        errors.password !== " " && (
                                            <p className="mt-1 text-sm text-red-400">
                                                {errors.password}
                                            </p>
                                        )}
                                </div>

                                <div className="flex items-center justify-between">
                                    <label className="flex items-center cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            checked={formData.rememberMe}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "rememberMe",
                                                    e.target.checked,
                                                )
                                            }
                                            className="h-4 w-4 rounded border-gray-600 bg-gray-800 text-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all"
                                            disabled={isLoading}
                                        />
                                        <span className="ml-2 text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                                            Ghi nhớ đăng nhập
                                        </span>
                                    </label>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            navigate("/admin/forgot-password")
                                        }
                                        className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
                                        disabled={isLoading}
                                    >
                                        Quên mật khẩu?
                                    </button>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-semibold text-white shadow-lg transition-all duration-200 ${
                                        isLoading
                                            ? "bg-blue-600/50 cursor-not-allowed"
                                            : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 hover:shadow-xl hover:shadow-blue-500/25 active:scale-[0.98]"
                                    }`}
                                >
                                    {isLoading ? (
                                        <>
                                            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                                            <span>Đang đăng nhập...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Đăng nhập</span>
                                            <ArrowRightIcon className="h-5 w-5" />
                                        </>
                                    )}
                                </button>
                            </form>

                            <div className="mt-8 pt-6 border-t border-white/10">
                                <div className="flex items-center justify-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-4 py-2 backdrop-blur-sm">
                                    <ShieldCheckIcon className="h-4 w-4 text-green-400" />
                                    <span className="text-xs font-medium text-green-400">
                                        Bảo mật 256-bit SSL
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 text-center">
                        <p className="text-xs text-gray-500">
                            © {new Date().getFullYear()} DPShop Inc. All rights
                            reserved.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
