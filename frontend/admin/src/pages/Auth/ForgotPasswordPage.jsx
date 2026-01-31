// pages/auth/ForgotPasswordPage.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    ArrowLeftIcon,
    EnvelopeIcon,
    CheckCircleIcon,
    BuildingStorefrontIcon,
} from "@heroicons/react/24/outline";

const ForgotPasswordPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email.trim()) {
            setError("Vui lòng nhập email");
            return;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            setError("Email không hợp lệ");
            return;
        }

        setIsLoading(true);
        setError("");

        // Simulate API call
        setTimeout(() => {
            console.log("Password reset requested for:", email);
            setIsLoading(false);
            setIsSubmitted(true);
        }, 1500);
    };

    const handleBackToLogin = () => {
        navigate("/admin/login");
    };

    return (
        <div className="min-h-screen bg-gray-900">
            {/* Background Pattern */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 opacity-90"></div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
                <div
                    className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
                    style={{ animationDelay: "1s" }}
                ></div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 flex min-h-screen items-center justify-center p-4">
                <div className="w-full max-w-md">
                    {/* Back Button */}
                    <button
                        onClick={handleBackToLogin}
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
                    >
                        <ArrowLeftIcon className="h-5 w-5" />
                        Quay lại đăng nhập
                    </button>

                    {/* Logo/Brand */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-500/20 backdrop-blur-sm border border-blue-500/30 mb-4">
                            <BuildingStorefrontIcon className="h-8 w-8 text-blue-400" />
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-2">
                            Quên mật khẩu
                        </h1>
                        <p className="text-gray-400">
                            Nhập email để đặt lại mật khẩu
                        </p>
                    </div>

                    {/* Card */}
                    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl overflow-hidden">
                        <div className="p-8 sm:p-10">
                            {!isSubmitted ? (
                                <form
                                    onSubmit={handleSubmit}
                                    className="space-y-6"
                                >
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Email đăng ký tài khoản
                                        </label>
                                        <div
                                            className={`relative rounded-lg border transition-all duration-200 ${error ? "border-red-500/50 bg-red-500/10" : "border-gray-600 bg-black/20 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20"}`}
                                        >
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => {
                                                    setEmail(e.target.value);
                                                    if (error) setError("");
                                                }}
                                                className="block w-full pl-10 pr-3 py-3 bg-transparent text-white placeholder-gray-500 focus:outline-none sm:text-sm"
                                                placeholder="admin@dpshop.com"
                                                disabled={isLoading}
                                            />
                                        </div>
                                        {error && (
                                            <p className="mt-1 text-sm text-red-400">
                                                {error}
                                            </p>
                                        )}
                                        <p className="mt-2 text-sm text-gray-400">
                                            Chúng tôi sẽ gửi link đặt lại mật
                                            khẩu đến email của bạn
                                        </p>
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
                                                <span>Đang xử lý...</span>
                                            </>
                                        ) : (
                                            <>
                                                <span>Gửi yêu cầu</span>
                                            </>
                                        )}
                                    </button>
                                </form>
                            ) : (
                                <div className="text-center space-y-6">
                                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 backdrop-blur-sm border border-green-500/30">
                                        <CheckCircleIcon className="h-8 w-8 text-green-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-white mb-2">
                                            Yêu cầu thành công!
                                        </h3>
                                        <p className="text-gray-300">
                                            Chúng tôi đã gửi link đặt lại mật
                                            khẩu đến:
                                        </p>
                                        <p className="font-medium text-blue-300 mt-1">
                                            {email}
                                        </p>
                                    </div>
                                    <div className="bg-blue-900/20 backdrop-blur-sm rounded-lg border border-blue-500/20 p-4">
                                        <p className="text-sm text-blue-300">
                                            <strong>Lưu ý:</strong> Vui lòng
                                            kiểm tra cả hộp thư spam nếu không
                                            thấy email.
                                        </p>
                                    </div>
                                    <button
                                        onClick={handleBackToLogin}
                                        className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-500 hover:to-purple-500 transition-all duration-200"
                                    >
                                        Quay lại đăng nhập
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-8 text-center">
                        <p className="text-xs text-gray-500">
                            Cần hỗ trợ? Liên hệ:{" "}
                            <span className="text-blue-400">
                                support@dpshop.com
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
