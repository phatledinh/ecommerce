import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Eye,
    EyeOff,
    Mail,
    Lock,
    User,
    Phone,
    Calendar,
    Camera,
    Upload,
    AlertCircle,
    X,
} from "lucide-react";
import Swal from "sweetalert2";
import axiosClient from "../../api/axiosClient";

const Register = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [avatar, setAvatar] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState("");
    const fileInputRef = useRef(null);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        dateOfBirth: "",
        gender: "",
    });
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Họ tên là bắt buộc";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email là bắt buộc";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email không hợp lệ";
        }

        if (!formData.phone.trim()) {
            newErrors.phone = "Số điện thoại là bắt buộc";
        } else if (!/^\d{10,11}$/.test(formData.phone)) {
            newErrors.phone = "Số điện thoại không hợp lệ";
        }

        if (!formData.password) {
            newErrors.password = "Mật khẩu là bắt buộc";
        } else if (formData.password.length < 6) {
            newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Vui lòng xác nhận mật khẩu";
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Mật khẩu xác nhận không khớp";
        }

        if (!formData.dateOfBirth) {
            newErrors.dateOfBirth = "Ngày sinh là bắt buộc";
        } else {
            const birthDate = new Date(formData.dateOfBirth);
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            if (
                monthDiff < 0 ||
                (monthDiff === 0 && today.getDate() < birthDate.getDate())
            ) {
                age--;
            }
            if (age < 16) {
                newErrors.dateOfBirth = "Bạn phải đủ 16 tuổi";
            }
        }

        // Avatar validation (optional)
        if (avatar && avatar.size > 5 * 1024 * 1024) {
            // 5MB
            newErrors.avatar = "Ảnh đại diện không được vượt quá 5MB";
        }

        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }));
        }
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validate file type
        const validTypes = [
            "image/jpeg",
            "image/jpg",
            "image/png",
            "image/gif",
            "image/webp",
        ];
        if (!validTypes.includes(file.type)) {
            setErrors((prev) => ({
                ...prev,
                avatar: "Chỉ chấp nhận file ảnh (JPEG, PNG, GIF, WebP)",
            }));
            return;
        }

        // Validate file size
        if (file.size > 5 * 1024 * 1024) {
            // 5MB
            setErrors((prev) => ({
                ...prev,
                avatar: "Kích thước file không được vượt quá 5MB",
            }));
            return;
        }

        setAvatar(file);

        // Create preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setAvatarPreview(reader.result);
        };
        reader.readAsDataURL(file);

        // Clear error
        if (errors.avatar) {
            setErrors((prev) => ({
                ...prev,
                avatar: "",
            }));
        }
    };

    const handleRemoveAvatar = () => {
        setAvatar(null);
        setAvatarPreview("");
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setLoading(true);

        try {
            const formDataToSend = new FormData();

            // Tạo object register data
            const registerData = {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                phone: formData.phone,
                dateOfBirth: formData.dateOfBirth,
                gender: formData.gender || null,
            };

            // Thêm JSON data
            formDataToSend.append("registerData", JSON.stringify(registerData));

            // Thêm avatar nếu có
            if (avatar) {
                formDataToSend.append("avatar", avatar);
            }

            const response = await axiosClient.post(
                "/api/auth/register-with-avatar",
                formDataToSend,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (response.data) {
                // Lưu token và user info
                localStorage.setItem("accessToken", response.data.accessToken);
                localStorage.setItem(
                    "user",
                    JSON.stringify(response.data.user)
                );

                await Swal.fire({
                    title: "Đăng ký thành công!",
                    html: `<p>Tài khoản của bạn đã được tạo thành công.</p><p>Chào mừng đến với FPT Shop!</p>`,
                    icon: "success",
                    confirmButtonText: "Tiếp tục",
                    customClass: {
                        confirmButton:
                            "bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors",
                    },
                });

                // Redirect based on role
                if (response.data.user.role === "ADMIN") {
                    navigate("/admin");
                } else {
                    navigate("/");
                }
            }
        } catch (error) {
            const errorMessage =
                error.response?.data?.message ||
                "Đăng ký thất bại. Vui lòng thử lại!";

            await Swal.fire({
                title: "Lỗi đăng ký!",
                text: errorMessage,
                icon: "error",
                confirmButtonText: "OK",
                customClass: {
                    confirmButton:
                        "bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors",
                },
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-gray-100 flex items-center justify-center p-4">
            <div className="w-full max-w-4xl">
                {/* Card */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-8">
                        <div className="text-center">
                            <h1 className="text-2xl font-bold text-white mb-2">
                                Tạo tài khoản mới
                            </h1>
                            <p className="text-purple-100">
                                Tham gia cùng chúng tôi ngay hôm nay
                            </p>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="p-6 md:p-8">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Left Column - Avatar */}
                            <div className="lg:col-span-1">
                                <div className="sticky top-8">
                                    {/* Avatar Upload */}
                                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                            <Camera className="h-5 w-5 mr-2 text-purple-600" />
                                            Ảnh đại diện
                                        </h3>

                                        <div className="space-y-4">
                                            {/* Avatar Preview */}
                                            <div className="relative">
                                                <div className="w-40 h-40 mx-auto rounded-full overflow-hidden border-4 border-white shadow-lg bg-gray-100">
                                                    {avatarPreview ? (
                                                        <img
                                                            src={avatarPreview}
                                                            alt="Avatar preview"
                                                            className="w-full h-full object-contain"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300">
                                                            <User className="h-20 w-20 text-gray-400" />
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Remove button */}
                                                {avatarPreview && (
                                                    <button
                                                        type="button"
                                                        onClick={
                                                            handleRemoveAvatar
                                                        }
                                                        className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors"
                                                    >
                                                        <X className="h-4 w-4" />
                                                    </button>
                                                )}
                                            </div>

                                            {/* Upload Area */}
                                            <div className="text-center">
                                                <input
                                                    ref={fileInputRef}
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={
                                                        handleAvatarChange
                                                    }
                                                    className="hidden"
                                                    id="avatar-upload"
                                                />
                                                <label
                                                    htmlFor="avatar-upload"
                                                    className="cursor-pointer inline-flex items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 transform hover:shadow-lg"
                                                >
                                                    <Upload className="h-5 w-5 mr-2" />
                                                    {avatarPreview
                                                        ? "Đổi ảnh"
                                                        : "Tải ảnh lên"}
                                                </label>

                                                <p className="mt-3 text-sm text-gray-500">
                                                    JPG, PNG, GIF, WebP. Tối đa
                                                    5MB
                                                </p>
                                            </div>

                                            {/* Avatar Error */}
                                            {errors.avatar && (
                                                <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                                                    <div className="flex items-center text-red-600 text-sm">
                                                        <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                                                        {errors.avatar}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Tips */}
                                            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                                                <h4 className="font-medium text-blue-800 mb-2">
                                                    Mẹo chọn ảnh đại diện:
                                                </h4>
                                                <ul className="text-sm text-blue-700 space-y-1">
                                                    <li className="flex items-start">
                                                        <div className="h-1.5 w-1.5 bg-blue-500 rounded-full mt-1 mr-2 flex-shrink-0"></div>
                                                        <span>
                                                            Chọn ảnh rõ mặt, ánh
                                                            sáng tốt
                                                        </span>
                                                    </li>
                                                    <li className="flex items-start">
                                                        <div className="h-1.5 w-1.5 bg-blue-500 rounded-full mt-1 mr-2 flex-shrink-0"></div>
                                                        <span>
                                                            Định dạng hình vuông
                                                            để hiển thị đẹp nhất
                                                        </span>
                                                    </li>
                                                    <li className="flex items-start">
                                                        <div className="h-1.5 w-1.5 bg-blue-500 rounded-full mt-1 mr-2 flex-shrink-0"></div>
                                                        <span>
                                                            Ảnh phù hợp với môi
                                                            trường làm việc
                                                        </span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Form Fields */}
                            <div className="lg:col-span-2">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Full Name */}
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Họ và tên *
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <User className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className={`pl-10 w-full border ${
                                                    errors.name
                                                        ? "border-red-300"
                                                        : "border-gray-300"
                                                } rounded-lg px-3 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                                                placeholder="Nguyễn Văn A"
                                            />
                                        </div>
                                        {errors.name && (
                                            <div className="flex items-center mt-2 text-red-600 text-sm">
                                                <AlertCircle className="h-4 w-4 mr-1" />
                                                {errors.name}
                                            </div>
                                        )}
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Email *
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Mail className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className={`pl-10 w-full border ${
                                                    errors.email
                                                        ? "border-red-300"
                                                        : "border-gray-300"
                                                } rounded-lg px-3 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                                                placeholder="you@example.com"
                                            />
                                        </div>
                                        {errors.email && (
                                            <div className="flex items-center mt-2 text-red-600 text-sm">
                                                <AlertCircle className="h-4 w-4 mr-1" />
                                                {errors.email}
                                            </div>
                                        )}
                                    </div>

                                    {/* Phone */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Số điện thoại *
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Phone className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className={`pl-10 w-full border ${
                                                    errors.phone
                                                        ? "border-red-300"
                                                        : "border-gray-300"
                                                } rounded-lg px-3 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                                                placeholder="0123456789"
                                            />
                                        </div>
                                        {errors.phone && (
                                            <div className="flex items-center mt-2 text-red-600 text-sm">
                                                <AlertCircle className="h-4 w-4 mr-1" />
                                                {errors.phone}
                                            </div>
                                        )}
                                    </div>

                                    {/* Password */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Mật khẩu *
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Lock className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                type={
                                                    showPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                className={`pl-10 pr-10 w-full border ${
                                                    errors.password
                                                        ? "border-red-300"
                                                        : "border-gray-300"
                                                } rounded-lg px-3 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                                                placeholder="••••••••"
                                            />
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setShowPassword(
                                                        !showPassword
                                                    )
                                                }
                                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                            >
                                                {showPassword ? (
                                                    <EyeOff className="h-5 w-5 text-gray-400" />
                                                ) : (
                                                    <Eye className="h-5 w-5 text-gray-400" />
                                                )}
                                            </button>
                                        </div>
                                        {errors.password && (
                                            <div className="flex items-center mt-2 text-red-600 text-sm">
                                                <AlertCircle className="h-4 w-4 mr-1" />
                                                {errors.password}
                                            </div>
                                        )}
                                        <p className="mt-1 text-xs text-gray-500">
                                            Mật khẩu phải có ít nhất 6 ký tự
                                        </p>
                                    </div>

                                    {/* Confirm Password */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Xác nhận mật khẩu *
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Lock className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                type={
                                                    showConfirmPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                name="confirmPassword"
                                                value={formData.confirmPassword}
                                                onChange={handleChange}
                                                className={`pl-10 pr-10 w-full border ${
                                                    errors.confirmPassword
                                                        ? "border-red-300"
                                                        : "border-gray-300"
                                                } rounded-lg px-3 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                                                placeholder="••••••••"
                                            />
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setShowConfirmPassword(
                                                        !showConfirmPassword
                                                    )
                                                }
                                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                            >
                                                {showConfirmPassword ? (
                                                    <EyeOff className="h-5 w-5 text-gray-400" />
                                                ) : (
                                                    <Eye className="h-5 w-5 text-gray-400" />
                                                )}
                                            </button>
                                        </div>
                                        {errors.confirmPassword && (
                                            <div className="flex items-center mt-2 text-red-600 text-sm">
                                                <AlertCircle className="h-4 w-4 mr-1" />
                                                {errors.confirmPassword}
                                            </div>
                                        )}
                                    </div>

                                    {/* Date of Birth */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Ngày sinh *
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Calendar className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                type="date"
                                                name="dateOfBirth"
                                                value={formData.dateOfBirth}
                                                onChange={handleChange}
                                                className={`pl-10 w-full border ${
                                                    errors.dateOfBirth
                                                        ? "border-red-300"
                                                        : "border-gray-300"
                                                } rounded-lg px-3 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                                                max={
                                                    new Date()
                                                        .toISOString()
                                                        .split("T")[0]
                                                }
                                            />
                                        </div>
                                        {errors.dateOfBirth && (
                                            <div className="flex items-center mt-2 text-red-600 text-sm">
                                                <AlertCircle className="h-4 w-4 mr-1" />
                                                {errors.dateOfBirth}
                                            </div>
                                        )}
                                    </div>

                                    {/* Gender */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Giới tính
                                        </label>
                                        <div className="grid grid-cols-3 gap-2">
                                            {[
                                                {
                                                    value: "MALE",
                                                    label: "Nam",
                                                    icon: "♂",
                                                },
                                                {
                                                    value: "FEMALE",
                                                    label: "Nữ",
                                                    icon: "♀",
                                                },
                                                {
                                                    value: "OTHER",
                                                    label: "Khác",
                                                    icon: "⚤",
                                                },
                                            ].map((gender) => (
                                                <label
                                                    key={gender.value}
                                                    className={`flex items-center justify-center p-2 border rounded-lg cursor-pointer transition-all ${
                                                        formData.gender ===
                                                        gender.value
                                                            ? "border-purple-500 bg-purple-50 text-purple-700"
                                                            : "border-gray-300 hover:border-gray-400"
                                                    }`}
                                                >
                                                    <input
                                                        type="radio"
                                                        name="gender"
                                                        value={gender.value}
                                                        checked={
                                                            formData.gender ===
                                                            gender.value
                                                        }
                                                        onChange={handleChange}
                                                        className="sr-only"
                                                    />
                                                    <span className="text-lg mb-1">
                                                        {gender.icon}
                                                    </span>
                                                    <span className="text-sm font-medium ms-2">
                                                        {gender.label}
                                                    </span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Terms and Conditions */}
                                <div className="mt-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
                                    <div className="flex items-start">
                                        <input
                                            id="terms"
                                            name="terms"
                                            type="checkbox"
                                            required
                                            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded mt-1"
                                        />
                                        <div className="ml-3">
                                            <label
                                                htmlFor="terms"
                                                className="text-sm font-medium text-gray-900"
                                            >
                                                Tôi đồng ý với các điều khoản
                                                sau:
                                            </label>
                                            <ul className="mt-2 text-sm text-gray-600 space-y-1">
                                                <li className="flex items-start">
                                                    <div className="h-1.5 w-1.5 bg-gray-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                                                    <span>
                                                        Tôi đã đọc và đồng ý với{" "}
                                                        <Link
                                                            to="/terms"
                                                            className="text-purple-600 hover:text-purple-800 font-medium"
                                                        >
                                                            Điều khoản dịch vụ
                                                        </Link>
                                                    </span>
                                                </li>
                                                <li className="flex items-start">
                                                    <div className="h-1.5 w-1.5 bg-gray-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                                                    <span>
                                                        Tôi đã đọc và đồng ý với{" "}
                                                        <Link
                                                            to="/privacy"
                                                            className="text-purple-600 hover:text-purple-800 font-medium"
                                                        >
                                                            Chính sách bảo mật
                                                        </Link>
                                                    </span>
                                                </li>
                                                <li className="flex items-start">
                                                    <div className="h-1.5 w-1.5 bg-gray-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                                                    <span>
                                                        Tôi xác nhận thông tin
                                                        cung cấp là chính xác
                                                    </span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="mt-8">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                                    >
                                        {loading ? (
                                            <>
                                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                                                Đang đăng ký...
                                            </>
                                        ) : (
                                            <>
                                                <User className="h-5 w-5 mr-2" />
                                                Đăng ký tài khoản
                                            </>
                                        )}
                                    </button>
                                </div>

                                {/* Login link */}
                                <div className="mt-8 text-center">
                                    <p className="text-gray-600">
                                        Đã có tài khoản?{" "}
                                        <Link
                                            to="/login"
                                            className="text-purple-600 hover:text-purple-800 font-semibold"
                                        >
                                            Đăng nhập ngay
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Footer */}
                <div className="mt-8 text-center text-gray-500 text-sm">
                    <p>
                        © {new Date().getFullYear()} FPT Shop. Tất cả các quyền
                        được bảo lưu.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
