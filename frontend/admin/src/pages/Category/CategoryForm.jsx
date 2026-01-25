// pages/admin/categories/CategoryForm.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import CategoryAttributes from "./CategoryAttributes";
import {
    ArrowLeftIcon,
    PhotoIcon,
    LinkIcon,
    CheckCircleIcon,
    SparklesIcon,
    CloudArrowUpIcon,
    InformationCircleIcon,
    TagIcon,
    EyeIcon,
    EyeSlashIcon,
    CubeIcon,
    XMarkIcon,
    PlusIcon,
} from "@heroicons/react/24/outline";

const CategoryForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = !!id;

    const [formData, setFormData] = useState({
        name: "",
        slug: "",
        parent_id: "",
        description: "",
        thumbnail: "",
        is_active: true,
        meta_title: "",
        meta_description: "",
        color: "#3B82F6",
        icon: "📱",
        sort_order: 0,
        show_in_menu: true,
        attributes: [],
    });

    const [parentCategories, setParentCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [previewImage, setPreviewImage] = useState("");
    const [activeTab, setActiveTab] = useState("basic");

    const colorOptions = [
        { name: "Xanh Dương", value: "#3B82F6", bg: "bg-blue-500" },
        { name: "Tím", value: "#8B5CF6", bg: "bg-purple-500" },
        { name: "Hồng", value: "#EC4899", bg: "bg-pink-500" },
        { name: "Xanh Lá", value: "#10B981", bg: "bg-emerald-500" },
        { name: "Cam", value: "#F97316", bg: "bg-orange-500" },
        { name: "Vàng", value: "#F59E0B", bg: "bg-amber-500" },
    ];

    const iconOptions = [
        "📱",
        "💻",
        "⌚",
        "🎧",
        "🖥️",
        "📷",
        "🎮",
        "🔌",
        "⚡",
        "🌈",
    ];

    useEffect(() => {
        const fetchParentCategories = async () => {
            const data = [
                { id: 1, name: "Điện Thoại & Máy Tính Bảng" },
                { id: 2, name: "Laptop & Máy Tính" },
                { id: 3, name: "Phụ Kiện Công Nghệ" },
            ];
            setParentCategories(data);
        };

        if (isEditMode) {
            setLoading(true);
            setTimeout(() => {
                setFormData({
                    name: "Điện Thoại & Máy Tính Bảng",
                    slug: "dien-thoai-may-tinh-bang",
                    parent_id: "",
                    description:
                        "Danh mục điện thoại và máy tính bảng các loại",
                    thumbnail:
                        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=400&fit=crop",
                    is_active: true,
                    meta_title: "Điện thoại & Máy tính bảng giá tốt",
                    meta_description:
                        "Mua điện thoại và máy tính bảng chính hãng giá tốt",
                    color: "#3B82F6",
                    icon: "📱",
                    sort_order: 1,
                    show_in_menu: true,
                    attributes: [
                        {
                            id: 1,
                            name: "Màu sắc",
                            type: "select",
                            options: ["Đen", "Trắng", "Xanh", "Đỏ"],
                            isRequired: true,
                            isFilterable: true,
                        },
                        {
                            id: 2,
                            name: "Dung lượng RAM",
                            type: "select",
                            options: ["4GB", "8GB", "12GB", "16GB"],
                            isRequired: true,
                            isFilterable: true,
                        },
                        {
                            id: 3,
                            name: "Kích thước màn hình",
                            type: "select",
                            options: [
                                "6.1 inch",
                                "6.7 inch",
                                "7.9 inch",
                                "10.2 inch",
                            ],
                            isRequired: false,
                            isFilterable: true,
                        },
                    ],
                });
                setPreviewImage(
                    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=400&fit=crop",
                );
                setLoading(false);
            }, 800);
        }

        fetchParentCategories();
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
                setFormData((prev) => ({ ...prev, thumbnail: imageUrl }));
                setPreviewImage(imageUrl);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageUrl = (url) => {
        setFormData((prev) => ({ ...prev, thumbnail: url }));
        setPreviewImage(url);
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Tên danh mục là bắt buộc";
        }

        if (!formData.slug.trim()) {
            newErrors.slug = "Slug là bắt buộc";
        } else if (!/^[a-z0-9-]+$/.test(formData.slug)) {
            newErrors.slug = "Slug chỉ chứa chữ thường, số và dấu gạch ngang";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleAttributesChange = (newAttributes) => {
        setFormData((prev) => ({
            ...prev,
            attributes: newAttributes,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            // Gửi tất cả dữ liệu (bao gồm cả attributes) tới backend
            const dataToSave = {
                ...formData,
                // Backend sẽ xử lý transaction: lưu danh mục và attributes cùng lúc
            };

            console.log("Category saved with attributes:", dataToSave);

            await new Promise((resolve) => setTimeout(resolve, 1000));
            navigate("/admin/categories");
        } catch (error) {
            console.error("Error saving category:", error);
            alert("Có lỗi xảy ra khi lưu danh mục");
        } finally {
            setLoading(false);
        }
    };

    const generateMetaTags = () => {
        if (!formData.name) return;

        const metaTitle = `${formData.name} - DPShop | Chất lượng, giá tốt`;
        const metaDescription = `Mua ${formData.name.toLowerCase()} chính hãng, giá tốt tại DPShop. Giao hàng nhanh, bảo hành dài hạn.`;

        setFormData((prev) => ({
            ...prev,
            meta_title: metaTitle,
            meta_description: metaDescription,
        }));
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50/50 to-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <Link
                        to="/admin/categories"
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4 group"
                    >
                        <ArrowLeftIcon className="h-5 w-5 mr-2 transition-transform group-hover:-translate-x-1" />
                        Quay lại danh sách
                    </Link>
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                {isEditMode
                                    ? "Chỉnh Sửa Danh Mục"
                                    : "Tạo Danh Mục Mới"}
                            </h1>
                            <p className="text-gray-600 mt-2">
                                {isEditMode
                                    ? "Cập nhật thông tin danh mục sản phẩm"
                                    : "Thêm danh mục sản phẩm mới vào hệ thống"}
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
                                {/* Tab Navigation */}
                                <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                                    <div className="border-b border-gray-200">
                                        <nav
                                            className="flex space-x-1 px-6"
                                            aria-label="Tabs"
                                        >
                                            {["basic", "attributes"].map(
                                                (tab) => (
                                                    <button
                                                        key={tab}
                                                        type="button"
                                                        onClick={() =>
                                                            setActiveTab(tab)
                                                        }
                                                        className={`px-4 py-3 text-sm font-medium rounded-lg transition-all ${
                                                            activeTab === tab
                                                                ? "bg-blue-100 text-blue-700"
                                                                : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                                                        }`}
                                                    >
                                                        {tab === "basic" &&
                                                            "Thông tin cơ bản"}
                                                        {tab ===
                                                            "attributes" && (
                                                            <span className="flex items-center">
                                                                <CubeIcon className="h-4 w-4 mr-2" />
                                                                Thuộc tính
                                                                {formData
                                                                    .attributes
                                                                    .length >
                                                                    0 && (
                                                                    <span className="ml-2 bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full">
                                                                        {
                                                                            formData
                                                                                .attributes
                                                                                .length
                                                                        }
                                                                    </span>
                                                                )}
                                                            </span>
                                                        )}
                                                    </button>
                                                ),
                                            )}
                                        </nav>
                                    </div>

                                    <div className="p-6">
                                        {/* Basic Info Tab */}
                                        {activeTab === "basic" && (
                                            <div className="space-y-6">
                                                {/* Name */}
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-900 mb-2">
                                                        Tên danh mục *
                                                    </label>
                                                    <div className="relative">
                                                        <input
                                                            type="text"
                                                            name="name"
                                                            value={
                                                                formData.name
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            className={`block w-full px-4 py-3 bg-gradient-to-r from-gray-50 to-white border-2 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all ${
                                                                errors.name
                                                                    ? "border-rose-300"
                                                                    : "border-gray-200"
                                                            }`}
                                                            placeholder="Ví dụ: Điện thoại di động cao cấp"
                                                        />
                                                        <div className="absolute right-3 top-3">
                                                            <TagIcon className="h-5 w-5 text-gray-400" />
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
                                                            /
                                                        </span>
                                                        <input
                                                            type="text"
                                                            name="slug"
                                                            value={
                                                                formData.slug
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            className={`flex-1 px-4 py-3 bg-gradient-to-r from-gray-50 to-white border-2 border-l-0 rounded-r-xl focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all ${
                                                                errors.slug
                                                                    ? "border-rose-300"
                                                                    : "border-gray-200"
                                                            }`}
                                                            placeholder="dien-thoai-cao-cap"
                                                        />
                                                    </div>
                                                    {errors.slug && (
                                                        <p className="mt-2 text-sm text-rose-600 flex items-center">
                                                            <InformationCircleIcon className="h-4 w-4 mr-1" />
                                                            {errors.slug}
                                                        </p>
                                                    )}
                                                    <p className="mt-2 text-sm text-gray-500">
                                                        Đường dẫn SEO cho danh
                                                        mục. Sẽ tự động tạo từ
                                                        tên.
                                                    </p>
                                                </div>

                                                {/* Parent Category */}
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-900 mb-2">
                                                        Danh mục cha
                                                    </label>
                                                    <select
                                                        name="parent_id"
                                                        value={
                                                            formData.parent_id
                                                        }
                                                        onChange={handleChange}
                                                        className="block w-full px-4 py-3 bg-gradient-to-r from-gray-50 to-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all"
                                                    >
                                                        <option value="">
                                                            -- Không có (Danh
                                                            mục cha) --
                                                        </option>
                                                        {parentCategories.map(
                                                            (cat) => (
                                                                <option
                                                                    key={cat.id}
                                                                    value={
                                                                        cat.id
                                                                    }
                                                                >
                                                                    {cat.name}
                                                                </option>
                                                            ),
                                                        )}
                                                    </select>
                                                    <p className="mt-2 text-sm text-gray-500">
                                                        Chọn danh mục cha nếu
                                                        đây là danh mục con
                                                    </p>
                                                </div>

                                                {/* Description */}
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-900 mb-2">
                                                        Mô tả chi tiết
                                                    </label>
                                                    <textarea
                                                        name="description"
                                                        value={
                                                            formData.description
                                                        }
                                                        onChange={handleChange}
                                                        rows={4}
                                                        className="block w-full px-4 py-3 bg-gradient-to-r from-gray-50 to-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all"
                                                        placeholder="Mô tả chi tiết về danh mục này..."
                                                    />
                                                    <p className="mt-2 text-sm text-gray-500">
                                                        Mô tả sẽ hiển thị trên
                                                        trang danh mục
                                                    </p>
                                                </div>

                                                {/* Color and Icon Selection */}
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    {/* Color Selection */}
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-900 mb-3">
                                                            Màu sắc danh mục
                                                        </label>
                                                        <div className="flex flex-wrap gap-3">
                                                            {colorOptions.map(
                                                                (color) => (
                                                                    <button
                                                                        key={
                                                                            color.value
                                                                        }
                                                                        type="button"
                                                                        onClick={() =>
                                                                            setFormData(
                                                                                (
                                                                                    prev,
                                                                                ) => ({
                                                                                    ...prev,
                                                                                    color: color.value,
                                                                                }),
                                                                            )
                                                                        }
                                                                        className={`flex flex-col items-center justify-center w-16 h-16 rounded-xl border-2 transition-all ${
                                                                            formData.color ===
                                                                            color.value
                                                                                ? "border-blue-500 bg-white shadow-md"
                                                                                : "border-gray-200 bg-white hover:border-gray-300"
                                                                        }`}
                                                                    >
                                                                        <div
                                                                            className={`w-8 h-8 rounded-full ${color.bg} mb-2`}
                                                                        ></div>
                                                                        <span className="text-xs text-gray-700">
                                                                            {
                                                                                color.name
                                                                            }
                                                                        </span>
                                                                    </button>
                                                                ),
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* Icon Selection */}
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-900 mb-3">
                                                            Biểu tượng
                                                        </label>
                                                        <div className="flex flex-wrap gap-3">
                                                            {iconOptions.map(
                                                                (icon) => (
                                                                    <button
                                                                        key={
                                                                            icon
                                                                        }
                                                                        type="button"
                                                                        onClick={() =>
                                                                            setFormData(
                                                                                (
                                                                                    prev,
                                                                                ) => ({
                                                                                    ...prev,
                                                                                    icon,
                                                                                }),
                                                                            )
                                                                        }
                                                                        className={`flex items-center justify-center w-12 h-12 text-2xl rounded-xl border-2 transition-all ${
                                                                            formData.icon ===
                                                                            icon
                                                                                ? "border-blue-500 bg-blue-50 shadow-md"
                                                                                : "border-gray-200 bg-white hover:border-gray-300"
                                                                        }`}
                                                                    >
                                                                        {icon}
                                                                    </button>
                                                                ),
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Sort Order and Visibility */}
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-200">
                                                    {/* Sort Order */}
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-900 mb-2">
                                                            Thứ tự hiển thị
                                                        </label>
                                                        <div className="flex items-center space-x-4">
                                                            <input
                                                                type="range"
                                                                name="sort_order"
                                                                value={
                                                                    formData.sort_order
                                                                }
                                                                onChange={
                                                                    handleChange
                                                                }
                                                                min="0"
                                                                max="100"
                                                                className="flex-1 h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer"
                                                            />
                                                            <span className="text-lg font-bold text-blue-600 min-w-[3rem]">
                                                                {
                                                                    formData.sort_order
                                                                }
                                                            </span>
                                                        </div>
                                                        <p className="mt-2 text-sm text-gray-500">
                                                            Số nhỏ hiển thị
                                                            trước
                                                        </p>
                                                    </div>

                                                    {/* Visibility Options */}
                                                    <div className="space-y-4">
                                                        <label className="flex items-center p-3 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200">
                                                            <input
                                                                type="checkbox"
                                                                name="is_active"
                                                                checked={
                                                                    formData.is_active
                                                                }
                                                                onChange={
                                                                    handleChange
                                                                }
                                                                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                            />
                                                            <span className="ml-3">
                                                                <span className="block text-sm font-medium text-gray-900">
                                                                    Hiển thị
                                                                    danh mục
                                                                </span>
                                                                <span className="block text-sm text-gray-500">
                                                                    Danh mục sẽ
                                                                    hiển thị
                                                                    trên website
                                                                </span>
                                                            </span>
                                                        </label>

                                                        <label className="flex items-center p-3 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200">
                                                            <input
                                                                type="checkbox"
                                                                name="show_in_menu"
                                                                checked={
                                                                    formData.show_in_menu
                                                                }
                                                                onChange={
                                                                    handleChange
                                                                }
                                                                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                            />
                                                            <span className="ml-3">
                                                                <span className="block text-sm font-medium text-gray-900">
                                                                    Hiển thị
                                                                    trong menu
                                                                </span>
                                                                <span className="block text-sm text-gray-500">
                                                                    Hiển thị
                                                                    trong menu
                                                                    điều hướng
                                                                    chính
                                                                </span>
                                                            </span>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Attributes Tab */}
                                        {activeTab === "attributes" && (
                                            <div className="space-y-6">
                                                <div className="mb-6">
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <h3 className="text-lg font-medium text-gray-900">
                                                                Quản lý thuộc
                                                                tính
                                                            </h3>
                                                            <p className="text-sm text-gray-500 mt-1">
                                                                {isEditMode
                                                                    ? "Thêm các thuộc tính riêng cho danh mục này"
                                                                    : "Bạn có thể thêm thuộc tính ngay bây giờ. Tất cả sẽ được lưu cùng với danh mục."}
                                                            </p>
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={
                                                                generateMetaTags
                                                            }
                                                            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 rounded-lg hover:from-blue-100 hover:to-blue-200 transition-all"
                                                        >
                                                            <SparklesIcon className="h-4 w-4 mr-2" />
                                                            Tạo meta tự động
                                                        </button>
                                                    </div>

                                                    {/* Thông báo khi chưa có tên danh mục */}
                                                    {!formData.name && (
                                                        <div className="mt-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-100 p-4">
                                                            <div className="flex items-center">
                                                                <InformationCircleIcon className="h-5 w-5 text-amber-600 mr-3 flex-shrink-0" />
                                                                <div>
                                                                    <h4 className="text-sm font-medium text-amber-900">
                                                                        Lưu ý về
                                                                        thuộc
                                                                        tính
                                                                    </h4>
                                                                    <p className="text-sm text-amber-700 mt-1">
                                                                        Vui lòng
                                                                        nhập tên
                                                                        danh mục
                                                                        trước để
                                                                        hệ thống
                                                                        có thể
                                                                        tạo slug
                                                                        tự động.
                                                                        Bạn vẫn
                                                                        có thể
                                                                        thêm
                                                                        thuộc
                                                                        tính
                                                                        ngay bây
                                                                        giờ và
                                                                        tất cả
                                                                        sẽ được
                                                                        lưu khi
                                                                        bạn nhấn
                                                                        "Tạo
                                                                        danh mục
                                                                        mới".
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Sử dụng CategoryAttributes component với controlled props */}
                                                <CategoryAttributes
                                                    attributes={
                                                        formData.attributes
                                                    }
                                                    onAttributesChange={
                                                        handleAttributesChange
                                                    }
                                                    readOnly={false}
                                                    isCategorySaved={isEditMode}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Preview & Actions */}
                            <div className="space-y-6">
                                {/* Preview Card */}
                                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                                        Xem trước
                                    </h3>
                                    <div className="space-y-4">
                                        <div
                                            className={`rounded-xl overflow-hidden ${
                                                formData.thumbnail
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
                                                    <PhotoIcon className="h-12 w-12 text-gray-400" />
                                                </div>
                                            )}
                                            <div className="p-4">
                                                <div className="flex items-center mb-2">
                                                    <span
                                                        className="text-2xl mr-3"
                                                        style={{
                                                            color: formData.color,
                                                        }}
                                                    >
                                                        {formData.icon}
                                                    </span>
                                                    <h4 className="text-lg font-bold text-gray-900 truncate">
                                                        {formData.name ||
                                                            "Tên danh mục"}
                                                    </h4>
                                                </div>
                                                <p className="text-sm text-gray-600 line-clamp-2">
                                                    {formData.description ||
                                                        "Mô tả danh mục sẽ hiển thị tại đây"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Image Upload */}
                                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                                        Hình ảnh
                                    </h3>
                                    <div className="space-y-4">
                                        {/* Image URL */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                                URL hình ảnh
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.thumbnail}
                                                onChange={(e) =>
                                                    handleImageUrl(
                                                        e.target.value,
                                                    )
                                                }
                                                className="w-full px-4 py-3 bg-gradient-to-r from-gray-50 to-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all"
                                                placeholder="https://example.com/image.jpg"
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
                                                        PNG, JPG, GIF tối đa 5MB
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* SEO Fields */}
                                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                                        <SparklesIcon className="h-5 w-5 mr-2 text-blue-500" />
                                        SEO & Meta Tags
                                    </h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                                Meta Title
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    name="meta_title"
                                                    value={formData.meta_title}
                                                    onChange={handleChange}
                                                    className="block w-full px-4 py-3 bg-gradient-to-r from-gray-50 to-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all"
                                                    placeholder="Tối đa 60 ký tự"
                                                    maxLength={60}
                                                />
                                                <div className="absolute right-3 top-3 text-xs text-gray-500">
                                                    {formData.meta_title.length}
                                                    /60
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                                Meta Description
                                            </label>
                                            <div className="relative">
                                                <textarea
                                                    name="meta_description"
                                                    value={
                                                        formData.meta_description
                                                    }
                                                    onChange={handleChange}
                                                    rows={3}
                                                    className="block w-full px-4 py-3 bg-gradient-to-r from-gray-50 to-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all"
                                                    placeholder="Tối đa 160 ký tự"
                                                    maxLength={160}
                                                />
                                                <div className="absolute right-3 top-3 text-xs text-gray-500">
                                                    {
                                                        formData
                                                            .meta_description
                                                            .length
                                                    }
                                                    /160
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
                                                        ? "Cập nhật danh mục"
                                                        : "Tạo danh mục mới"}
                                                </>
                                            )}
                                        </button>

                                        <Link
                                            to="/admin/categories"
                                            className="w-full block text-center px-6 py-3 bg-white text-gray-700 border-2 border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all"
                                        >
                                            Hủy bỏ
                                        </Link>
                                    </div>
                                </div>

                                {/* Live Preview */}
                                {formData.name && (
                                    <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100 p-6">
                                        <div className="flex items-center mb-3">
                                            <SparklesIcon className="h-5 w-5 text-emerald-600 mr-2" />
                                            <h3 className="text-lg font-medium text-emerald-900">
                                                Xem trước trực tiếp
                                            </h3>
                                        </div>
                                        <div className="text-sm text-emerald-700">
                                            Danh mục sẽ hiển thị với các thông
                                            tin bạn đã nhập
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default CategoryForm;
