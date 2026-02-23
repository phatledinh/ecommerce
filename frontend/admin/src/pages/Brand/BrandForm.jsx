import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
    ArrowLeftIcon,
    BuildingLibraryIcon,
    EyeIcon,
    EyeSlashIcon,
} from "@heroicons/react/24/outline";
import { useBrand } from "../../hooks/useBrand";

const BrandForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = !!id;

    const { createBrand, updateBrand, getBrand, loading } = useBrand();

    const [formData, setFormData] = useState({
        name: "",
        slug: "",
        description: "",
        logo: "",
        logoFile: null,
        isActive: true,
    });

    const [errors, setErrors] = useState({});
    const [previewImage, setPreviewImage] = useState("");

    useEffect(() => {
        const loadData = async () => {
            if (isEditMode) {
                const brand = await getBrand(id);
                if (brand) {
                    setFormData({
                        name: brand.name,
                        slug: brand.slug,
                        description: brand.description || "",
                        logo: brand.logo || "",
                        logoFile: null,
                        isActive: brand.isActive,
                    });
                    setPreviewImage(brand.logo);
                } else {
                    alert("Không tìm thấy thương hiệu!");
                    navigate("/admin/brands");
                }
            }
        };
        loadData();
    }, [id, isEditMode, navigate]);

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
            setFormData((prev) => ({ ...prev, logoFile: file }));

            const objectUrl = URL.createObjectURL(file);
            setPreviewImage(objectUrl);

            return () => URL.revokeObjectURL(objectUrl);
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim())
            newErrors.name = "Tên thương hiệu là bắt buộc";
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
        if (!validateForm()) return;

        let result;
        if (isEditMode) {
            result = await updateBrand(id, formData);
        } else {
            result = await createBrand(formData);
        }

        if (result.success) {
            navigate("/admin/brands");
        } else {
            alert("Lỗi: " + result.error);
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
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            {isEditMode
                                ? "Chỉnh Sửa Thương Hiệu"
                                : "Tạo Thương Hiệu Mới"}
                        </h1>
                        <div
                            className={`px-3 py-1 rounded-full text-sm font-medium ${formData.isActive ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"}`}
                        >
                            {formData.isActive ? (
                                <span className="flex items-center">
                                    <EyeIcon className="h-4 w-4 mr-1" /> Hiển
                                    thị
                                </span>
                            ) : (
                                <span className="flex items-center">
                                    <EyeSlashIcon className="h-4 w-4 mr-1" /> Ẩn
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {loading && isEditMode ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="w-12 h-12 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Left Column */}
                            <div className="lg:col-span-2 space-y-8">
                                <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-900 mb-2">
                                            Tên thương hiệu *
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="block w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0"
                                        />
                                        {errors.name && (
                                            <p className="text-rose-600 text-sm mt-1">
                                                {errors.name}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-900 mb-2">
                                            Slug *
                                        </label>
                                        <input
                                            type="text"
                                            name="slug"
                                            value={formData.slug}
                                            onChange={handleChange}
                                            className="block w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0"
                                        />
                                        {errors.slug && (
                                            <p className="text-rose-600 text-sm mt-1">
                                                {errors.slug}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-900 mb-2">
                                            Mô tả
                                        </label>
                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                            rows={6}
                                            className="block w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0"
                                        />
                                    </div>

                                    <div className="pt-6 border-t border-gray-200">
                                        <label className="flex items-center p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                name="isActive"
                                                checked={formData.isActive}
                                                onChange={handleChange}
                                                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                            />
                                            <span className="ml-3 block text-sm font-medium text-gray-900">
                                                Hiển thị thương hiệu
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="space-y-6">
                                {/* Preview Card */}
                                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                                        Logo
                                    </h3>
                                    <div className="rounded-xl overflow-hidden bg-gray-50 border border-gray-100 mb-4">
                                        {previewImage ? (
                                            <img
                                                src={previewImage}
                                                alt="Preview"
                                                className="w-full h-48 object-contain p-2"
                                            />
                                        ) : (
                                            <div className="h-48 flex items-center justify-center">
                                                <BuildingLibraryIcon className="h-12 w-12 text-gray-300" />
                                            </div>
                                        )}
                                    </div>

                                    <label className="block w-full text-center px-4 py-2 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-500 hover:text-blue-500 transition-colors">
                                        <span>Chọn file ảnh</span>
                                        <input
                                            type="file"
                                            onChange={handleImageUpload}
                                            className="hidden"
                                            accept="image/*"
                                        />
                                    </label>
                                    <p className="text-xs text-gray-500 mt-2 text-center">
                                        PNG, JPG, GIF tối đa 2MB
                                    </p>
                                </div>

                                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {loading
                                            ? "Đang xử lý..."
                                            : isEditMode
                                              ? "Lưu Thay Đổi"
                                              : "Tạo Thương Hiệu"}
                                    </button>
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
