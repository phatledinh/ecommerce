// pages/admin/brands/BrandForm.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
    ArrowLeftIcon,
    PhotoIcon,
    LinkIcon,
    CheckCircleIcon,
    SparklesIcon,
    XMarkIcon,
    CloudArrowUpIcon,
    InformationCircleIcon,
    BuildingLibraryIcon,
    EyeIcon,
    EyeSlashIcon,
    DocumentTextIcon,
} from "@heroicons/react/24/outline";

const BrandForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = !!id;

    const [formData, setFormData] = useState({
        name: "",
        slug: "",
        description: "",
        logo: "",
        is_active: true,
    });

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [previewImage, setPreviewImage] = useState("");

    useEffect(() => {
        if (isEditMode) {
            setLoading(true);
            setTimeout(() => {
                setFormData({
                    name: "Apple",
                    slug: "apple",
                    description:
                        "Thương hiệu công nghệ hàng đầu thế giới, chuyên sản xuất iPhone, iPad, Macbook và các thiết bị công nghệ cao cấp.",
                    logo: "https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?w=600&h=400&fit=crop",
                    is_active: true,
                });
                setPreviewImage(
                    "https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?w=600&h=400&fit=crop",
                );
                setLoading(false);
            }, 800);
        }
    }, [id, isEditMode]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === "checkbox" ? checked : value;

        setFormData((prev) => ({
            ...prev,
            [name]: newValue,
        }));

        if (name === "name" && !isEditMode) {
            const slug = value
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/[^a-z0-9\s]/g, "")
                .replace(/\s+/g, "-");
            setFormData((prev) => ({ ...prev, slug }));
        }

        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const imageUrl = reader.result;
                setFormData((prev) => ({ ...prev, logo: imageUrl }));
                setPreviewImage(imageUrl);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageUrl = (url) => {
        setFormData((prev) => ({ ...prev, logo: url }));
        setPreviewImage(url);
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Tên thương hiệu là bắt buộc";
        }

        if (!formData.slug.trim()) {
            newErrors.slug = "Slug là bắt buộc";
        } else if (!/^[a-z0-9-]+$/.test(formData.slug)) {
            newErrors.slug = "Slug chỉ chứa chữ thường, số và dấu gạch ngang";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            console.log("Brand saved:", formData);
            navigate("/admin/brands");
        } catch (error) {
            console.error("Error saving brand:", error);
            alert("Có lỗi xảy ra khi lưu thương hiệu");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50/50 to-gray-50 p-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <Link
                        to="/admin/brands"
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4 group"
                    >
                        <ArrowLeftIcon className="h-5 w-5 mr-2 transition-transform group-hover:-translate-x-1" />
                        Quay lại danh sách
                    </Link>
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                {isEditMode
                                    ? "Chỉnh Sửa Thương Hiệu"
                                    : "Tạo Thương Hiệu Mới"}
                            </h1>
                            <p className="text-gray-600 mt-2">
                                {isEditMode
                                    ? "Cập nhật thông tin thương hiệu"
                                    : "Thêm thương hiệu mới vào hệ thống"}
                            </p>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div
                                className={`px-3 py-1 rounded-full text-sm font-medium ${
                                    formData.is_active
                                        ? "bg-emerald-100 text-emerald-800"
                                        : "bg-rose-100 text-rose-800"
                                }`}
                            >
                                {formData.is_active ? (
                                    <span className="flex items-center">
                                        <EyeIcon className="h-4 w-4 mr-1" />
                                        Hiển thị
                                    </span>
                                ) : (
                                    <span className="flex items-center">
                                        <EyeSlashIcon className="h-4 w-4 mr-1" />
                                        Ẩn
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {loading && isEditMode ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="relative">
                            <div className="w-20 h-20 border-4 border-blue-200 rounded-full"></div>
                            <div className="absolute top-0 left-0 w-20 h-20 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
                        </div>
                        <p className="mt-6 text-lg text-gray-600">
                            Đang tải dữ liệu...
                        </p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Left Column - Form */}
                            <div className="lg:col-span-2 space-y-8">
                                {/* Form Card */}
                                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                                    <div className="space-y-6">
                                        {/* Name */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                                Tên thương hiệu *
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    className={`block w-full px-4 py-3 bg-gradient-to-r from-gray-50 to-white border-2 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all ${
                                                        errors.name
                                                            ? "border-rose-300"
                                                            : "border-gray-200"
                                                    }`}
                                                    placeholder="Ví dụ: Apple Inc."
                                                />
                                                <div className="absolute right-3 top-3">
                                                    <BuildingLibraryIcon className="h-5 w-5 text-gray-400" />
                                                </div>
                                            </div>
                                            {errors.name && (
                                                <p className="mt-2 text-sm text-rose-600 flex items-center">
                                                    <InformationCircleIcon className="h-4 w-4 mr-1" />
                                                    {errors.name}
                                                </p>
                                            )}
                                        </div>

                                        {/* Slug */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                                <LinkIcon className="h-4 w-4 inline mr-1 text-blue-500" />
                                                Slug *
                                            </label>
                                            <div className="flex">
                                                <span className="inline-flex items-center px-4 py-3 bg-gray-100 border-2 border-r-0 border-gray-200 rounded-l-xl text-gray-500">
                                                    /brands/
                                                </span>
                                                <input
                                                    type="text"
                                                    name="slug"
                                                    value={formData.slug}
                                                    onChange={handleChange}
                                                    className={`flex-1 px-4 py-3 bg-gradient-to-r from-gray-50 to-white border-2 border-l-0 rounded-r-xl focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all ${
                                                        errors.slug
                                                            ? "border-rose-300"
                                                            : "border-gray-200"
                                                    }`}
                                                    placeholder="apple"
                                                />
                                            </div>
                                            {errors.slug && (
                                                <p className="mt-2 text-sm text-rose-600 flex items-center">
                                                    <InformationCircleIcon className="h-4 w-4 mr-1" />
                                                    {errors.slug}
                                                </p>
                                            )}
                                            <p className="mt-2 text-sm text-gray-500">
                                                Đường dẫn SEO cho thương hiệu.
                                                Sẽ tự động tạo từ tên.
                                            </p>
                                        </div>

                                        {/* Description */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                                <DocumentTextIcon className="h-4 w-4 inline mr-1 text-blue-500" />
                                                Mô tả thương hiệu
                                            </label>
                                            <textarea
                                                name="description"
                                                value={formData.description}
                                                onChange={handleChange}
                                                rows={6}
                                                className="block w-full px-4 py-3 bg-gradient-to-r from-gray-50 to-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all"
                                                placeholder="Mô tả chi tiết về thương hiệu, lịch sử hình thành, sứ mệnh và tầm nhìn..."
                                            />
                                            <p className="mt-2 text-sm text-gray-500">
                                                Mô tả sẽ hiển thị trên trang
                                                thương hiệu
                                            </p>
                                        </div>

                                        {/* Visibility */}
                                        <div className="pt-6 border-t border-gray-200">
                                            <label className="flex items-center p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200">
                                                <input
                                                    type="checkbox"
                                                    name="is_active"
                                                    checked={formData.is_active}
                                                    onChange={handleChange}
                                                    className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                />
                                                <span className="ml-3">
                                                    <span className="block text-sm font-medium text-gray-900">
                                                        Hiển thị thương hiệu
                                                    </span>
                                                    <span className="block text-sm text-gray-500">
                                                        Thương hiệu sẽ hiển thị
                                                        trên website và trong
                                                        danh sách lựa chọn
                                                    </span>
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Preview & Actions */}
                            <div className="space-y-6">
                                {/* Preview Card */}
                                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                                        Xem trước thương hiệu
                                    </h3>
                                    <div className="space-y-4">
                                        <div
                                            className={`rounded-xl overflow-hidden ${
                                                formData.logo
                                                    ? ""
                                                    : "bg-gradient-to-r from-blue-100 to-purple-100"
                                            }`}
                                        >
                                            {previewImage ? (
                                                <img
                                                    src={previewImage}
                                                    alt="Preview"
                                                    className="w-full h-48 object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-48 flex items-center justify-center">
                                                    <BuildingLibraryIcon className="h-12 w-12 text-gray-400" />
                                                </div>
                                            )}
                                            <div className="p-4">
                                                <h4 className="text-xl font-bold text-gray-900 mb-2">
                                                    {formData.name ||
                                                        "Tên thương hiệu"}
                                                </h4>
                                                <p className="text-sm text-gray-600 line-clamp-3">
                                                    {formData.description ||
                                                        "Mô tả thương hiệu sẽ hiển thị tại đây"}
                                                </p>
                                                <div className="mt-4 flex items-center text-sm text-gray-500">
                                                    <LinkIcon className="h-4 w-4 mr-1" />
                                                    <span>
                                                        /brands/
                                                        {formData.slug ||
                                                            "slug"}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Logo Upload */}
                                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                                        Logo thương hiệu
                                    </h3>
                                    <div className="space-y-4">
                                        {/* Logo URL */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                                URL logo
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.logo}
                                                onChange={(e) =>
                                                    handleImageUrl(
                                                        e.target.value,
                                                    )
                                                }
                                                className="w-full px-4 py-3 bg-gradient-to-r from-gray-50 to-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all"
                                                placeholder="https://example.com/logo.png"
                                            />
                                        </div>

                                        {/* File Upload */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                                Hoặc upload từ máy
                                            </label>
                                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl hover:border-blue-400 transition-colors">
                                                <div className="space-y-1 text-center">
                                                    <CloudArrowUpIcon className="mx-auto h-12 w-12 text-gray-400" />
                                                    <div className="flex text-sm text-gray-600">
                                                        <label className="relative cursor-pointer bg-gradient-to-r from-blue-50 to-blue-100 rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                                                            <span>
                                                                Chọn file
                                                            </span>
                                                            <input
                                                                type="file"
                                                                accept="image/*"
                                                                onChange={
                                                                    handleImageUpload
                                                                }
                                                                className="sr-only"
                                                            />
                                                        </label>
                                                        <p className="pl-1">
                                                            hoặc kéo thả
                                                        </p>
                                                    </div>
                                                    <p className="text-xs text-gray-500">
                                                        PNG, JPG, SVG tối đa 2MB
                                                    </p>
                                                    <p className="text-xs text-gray-400">
                                                        Tỷ lệ khuyến nghị: 1:1
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 p-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                                        Thao tác
                                    </h3>
                                    <div className="space-y-3">
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full flex items-center justify-center px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:-translate-y-0.5"
                                        >
                                            {loading ? (
                                                <>
                                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                                                    Đang xử lý...
                                                </>
                                            ) : (
                                                <>
                                                    <CheckCircleIcon className="h-5 w-5 mr-3" />
                                                    {isEditMode
                                                        ? "Cập nhật thương hiệu"
                                                        : "Tạo thương hiệu mới"}
                                                </>
                                            )}
                                        </button>

                                        <Link
                                            to="/admin/brands"
                                            className="w-full block text-center px-6 py-3 bg-white text-gray-700 border-2 border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all"
                                        >
                                            Hủy bỏ
                                        </Link>
                                    </div>
                                </div>

                                {/* Tips */}
                                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100 p-6">
                                    <div className="flex items-center mb-3">
                                        <SparklesIcon className="h-5 w-5 text-emerald-600 mr-2" />
                                        <h3 className="text-lg font-medium text-emerald-900">
                                            Mẹo tối ưu
                                        </h3>
                                    </div>
                                    <ul className="text-sm text-emerald-700 space-y-2">
                                        <li>
                                            • Tên thương hiệu nên ngắn gọn, dễ
                                            nhớ
                                        </li>
                                        <li>
                                            • Logo chất lượng cao, tỷ lệ 1:1
                                        </li>
                                        <li>
                                            • Mô tả đầy đủ thông tin về thương
                                            hiệu
                                        </li>
                                        <li>
                                            • Slug nên viết thường không dấu
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default BrandForm;
