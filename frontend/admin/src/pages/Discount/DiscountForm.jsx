// pages/admin/discounts/DiscountForm.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
    ArrowLeftIcon,
    CalendarIcon,
    ClockIcon,
    TagIcon,
    CurrencyDollarIcon,
    PercentBadgeIcon,
    InformationCircleIcon,
    CheckCircleIcon,
    FireIcon,
    UsersIcon,
    CubeIcon,
    SparklesIcon,
    ChevronDownIcon,
    ChevronRightIcon,
    PlusIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";

const DiscountForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = !!id;

    const [formData, setFormData] = useState({
        code: "",
        name: "",
        description: "",
        discount_type: "PERCENT",
        discount_value: "",
        max_discount_amount: "",
        min_order_value: "",
        start_date: "",
        end_date: "",
        is_active: true,
        usage_limit: "",
        target_type: "ALL",
        targets: [],
    });

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [showTargetSelector, setShowTargetSelector] = useState(false);

    // Mock data for target selection
    useEffect(() => {
        if (isEditMode) {
            setLoading(true);
            setTimeout(() => {
                setFormData({
                    code: "WELCOME50",
                    name: "Giảm giá chào mừng",
                    description: "Giảm giá cho khách hàng mới",
                    discount_type: "PERCENT",
                    discount_value: 50,
                    max_discount_amount: 500000,
                    min_order_value: 0,
                    start_date: "2024-01-01T00:00",
                    end_date: "2024-12-31T23:59",
                    is_active: true,
                    usage_limit: 1000,
                    target_type: "ALL",
                    targets: [],
                });
                setLoading(false);
            }, 800);
        }

        // Load mock data for targets
        setTimeout(() => {
            setProducts([
                { id: 1, name: "iPhone 15 Pro Max", sku: "IP15PM-256" },
                { id: 2, name: "Samsung Galaxy S24", sku: "SGS24-512" },
                { id: 3, name: "MacBook Air M2", sku: "MBA-M2-16" },
            ]);

            setCategories([
                { id: 1, name: "Điện thoại di động", slug: "dien-thoai" },
                { id: 2, name: "Laptop", slug: "laptop" },
                { id: 3, name: "Phụ kiện", slug: "phu-kien" },
            ]);

            setBrands([
                { id: 1, name: "Apple", slug: "apple" },
                { id: 2, name: "Samsung", slug: "samsung" },
                { id: 3, name: "Xiaomi", slug: "xiaomi" },
            ]);
        }, 500);
    }, [id, isEditMode]);

    const generateRandomCode = () => {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let code = "";
        for (let i = 0; i < 8; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setFormData((prev) => ({ ...prev, code }));
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === "checkbox" ? checked : value;

        setFormData((prev) => ({
            ...prev,
            [name]: newValue,
        }));

        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const handleTargetSelect = (targetType, targetId, targetName) => {
        const newTarget = {
            id: targetId,
            name: targetName,
            type: targetType,
        };

        setFormData((prev) => {
            const exists = prev.targets.some(
                (t) => t.id === targetId && t.type === targetType,
            );
            if (exists) {
                return {
                    ...prev,
                    targets: prev.targets.filter(
                        (t) => !(t.id === targetId && t.type === targetType),
                    ),
                };
            } else {
                return {
                    ...prev,
                    targets: [...prev.targets, newTarget],
                };
            }
        });
    };

    const removeTarget = (targetId, targetType) => {
        setFormData((prev) => ({
            ...prev,
            targets: prev.targets.filter(
                (t) => !(t.id === targetId && t.type === targetType),
            ),
        }));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.code.trim()) {
            newErrors.code = "Mã giảm giá là bắt buộc";
        }

        if (!formData.name.trim()) {
            newErrors.name = "Tên chương trình là bắt buộc";
        }

        if (!formData.discount_value || formData.discount_value <= 0) {
            newErrors.discount_value = "Giá trị giảm giá phải lớn hơn 0";
        }

        if (
            formData.discount_type === "PERCENT" &&
            formData.discount_value > 100
        ) {
            newErrors.discount_value =
                "Phần trăm giảm giá không được vượt quá 100%";
        }

        if (!formData.start_date) {
            newErrors.start_date = "Ngày bắt đầu là bắt buộc";
        }

        if (!formData.end_date) {
            newErrors.end_date = "Ngày kết thúc là bắt buộc";
        }

        if (formData.start_date && formData.end_date) {
            const start = new Date(formData.start_date);
            const end = new Date(formData.end_date);
            if (end <= start) {
                newErrors.end_date = "Ngày kết thúc phải sau ngày bắt đầu";
            }
        }

        if (formData.usage_limit && formData.usage_limit <= 0) {
            newErrors.usage_limit = "Giới hạn sử dụng phải lớn hơn 0";
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
            console.log("Discount saved:", formData);
            navigate("/admin/discounts");
        } catch (error) {
            console.error("Error saving discount:", error);
            alert("Có lỗi xảy ra khi lưu mã giảm giá");
        } finally {
            setLoading(false);
        }
    };

    const TargetSelector = () => {
        const [selectedTab, setSelectedTab] = useState("products");

        return (
            <div className="absolute z-10 mt-2 w-full bg-white rounded-xl border border-gray-200 shadow-2xl">
                <div className="p-4">
                    {/* Tabs */}
                    <div className="flex space-x-1 mb-4">
                        {["products", "categories", "brands"].map((tab) => (
                            <button
                                key={tab}
                                type="button"
                                onClick={() => setSelectedTab(tab)}
                                className={`flex-1 px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                                    selectedTab === tab
                                        ? "bg-blue-100 text-blue-700"
                                        : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                                }`}
                            >
                                {tab === "products" && "Sản phẩm"}
                                {tab === "categories" && "Danh mục"}
                                {tab === "brands" && "Thương hiệu"}
                            </button>
                        ))}
                    </div>

                    {/* Content */}
                    <div className="max-h-60 overflow-y-auto">
                        {selectedTab === "products" &&
                            products.map((product) => (
                                <div
                                    key={product.id}
                                    className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
                                    onClick={() =>
                                        handleTargetSelect(
                                            "PRODUCT",
                                            product.id,
                                            product.name,
                                        )
                                    }
                                >
                                    <div>
                                        <p className="font-medium text-gray-900">
                                            {product.name}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            SKU: {product.sku}
                                        </p>
                                    </div>
                                    <input
                                        type="checkbox"
                                        checked={formData.targets.some(
                                            (t) =>
                                                t.id === product.id &&
                                                t.type === "PRODUCT",
                                        )}
                                        onChange={() =>
                                            handleTargetSelect(
                                                "PRODUCT",
                                                product.id,
                                                product.name,
                                            )
                                        }
                                        className="h-5 w-5 text-blue-600"
                                    />
                                </div>
                            ))}

                        {selectedTab === "categories" &&
                            categories.map((category) => (
                                <div
                                    key={category.id}
                                    className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
                                    onClick={() =>
                                        handleTargetSelect(
                                            "CATEGORY",
                                            category.id,
                                            category.name,
                                        )
                                    }
                                >
                                    <div>
                                        <p className="font-medium text-gray-900">
                                            {category.name}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            /{category.slug}
                                        </p>
                                    </div>
                                    <input
                                        type="checkbox"
                                        checked={formData.targets.some(
                                            (t) =>
                                                t.id === category.id &&
                                                t.type === "CATEGORY",
                                        )}
                                        onChange={() =>
                                            handleTargetSelect(
                                                "CATEGORY",
                                                category.id,
                                                category.name,
                                            )
                                        }
                                        className="h-5 w-5 text-blue-600"
                                    />
                                </div>
                            ))}

                        {selectedTab === "brands" &&
                            brands.map((brand) => (
                                <div
                                    key={brand.id}
                                    className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
                                    onClick={() =>
                                        handleTargetSelect(
                                            "BRAND",
                                            brand.id,
                                            brand.name,
                                        )
                                    }
                                >
                                    <div>
                                        <p className="font-medium text-gray-900">
                                            {brand.name}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            /{brand.slug}
                                        </p>
                                    </div>
                                    <input
                                        type="checkbox"
                                        checked={formData.targets.some(
                                            (t) =>
                                                t.id === brand.id &&
                                                t.type === "BRAND",
                                        )}
                                        onChange={() =>
                                            handleTargetSelect(
                                                "BRAND",
                                                brand.id,
                                                brand.name,
                                            )
                                        }
                                        className="h-5 w-5 text-blue-600"
                                    />
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-purple-50/50 to-gray-50 p-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <Link
                        to="/admin/discounts"
                        className="inline-flex items-center text-purple-600 hover:text-purple-800 mb-4 group"
                    >
                        <ArrowLeftIcon className="h-5 w-5 mr-2 transition-transform group-hover:-translate-x-1" />
                        Quay lại danh sách
                    </Link>
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                {isEditMode
                                    ? "Chỉnh Sửa Mã Giảm Giá"
                                    : "Tạo Mã Giảm Giá Mới"}
                            </h1>
                            <p className="text-gray-600 mt-2">
                                {isEditMode
                                    ? "Cập nhật thông tin mã giảm giá"
                                    : "Thêm mã giảm giá mới vào hệ thống"}
                            </p>
                        </div>
                        <div
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                                formData.is_active
                                    ? "bg-emerald-100 text-emerald-800"
                                    : "bg-rose-100 text-rose-800"
                            }`}
                        >
                            {formData.is_active
                                ? "Đang hoạt động"
                                : "Ngừng hoạt động"}
                        </div>
                    </div>
                </div>

                {loading && isEditMode ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="relative">
                            <div className="w-20 h-20 border-4 border-purple-200 rounded-full"></div>
                            <div className="absolute top-0 left-0 w-20 h-20 border-4 border-purple-500 rounded-full border-t-transparent animate-spin"></div>
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
                                {/* Basic Info Card */}
                                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-6">
                                        Thông tin cơ bản
                                    </h3>

                                    <div className="space-y-6">
                                        {/* Code and Name */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-900 mb-2">
                                                    Mã giảm giá *
                                                </label>
                                                <div className="flex space-x-3">
                                                    <input
                                                        type="text"
                                                        name="code"
                                                        value={formData.code}
                                                        onChange={handleChange}
                                                        className={`block w-full px-4 py-3 bg-gradient-to-r from-gray-50 to-white border-2 rounded-xl focus:ring-2 focus:ring-purple-300 focus:border-purple-400 transition-all ${
                                                            errors.code
                                                                ? "border-rose-300"
                                                                : "border-gray-200"
                                                        }`}
                                                        placeholder="WELCOME50"
                                                        maxLength={20}
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={
                                                            generateRandomCode
                                                        }
                                                        className="px-4 py-3 bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 rounded-xl border border-purple-200 hover:bg-purple-100 transition-all"
                                                    >
                                                        <SparklesIcon className="h-5 w-5" />
                                                    </button>
                                                </div>
                                                {errors.code && (
                                                    <p className="mt-2 text-sm text-rose-600 flex items-center">
                                                        <InformationCircleIcon className="h-4 w-4 mr-1" />
                                                        {errors.code}
                                                    </p>
                                                )}
                                                <p className="mt-2 text-sm text-gray-500">
                                                    Mã sẽ hiển thị cho khách
                                                    hàng
                                                </p>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-900 mb-2">
                                                    Tên chương trình *
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    className={`block w-full px-4 py-3 bg-gradient-to-r from-gray-50 to-white border-2 rounded-xl focus:ring-2 focus:ring-purple-300 focus:border-purple-400 transition-all ${
                                                        errors.name
                                                            ? "border-rose-300"
                                                            : "border-gray-200"
                                                    }`}
                                                    placeholder="Giảm giá chào mừng"
                                                />
                                                {errors.name && (
                                                    <p className="mt-2 text-sm text-rose-600 flex items-center">
                                                        <InformationCircleIcon className="h-4 w-4 mr-1" />
                                                        {errors.name}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        {/* Description */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                                Mô tả
                                            </label>
                                            <textarea
                                                name="description"
                                                value={formData.description}
                                                onChange={handleChange}
                                                rows={3}
                                                className="block w-full px-4 py-3 bg-gradient-to-r from-gray-50 to-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-300 focus:border-purple-400 transition-all"
                                                placeholder="Mô tả chi tiết về chương trình giảm giá..."
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Discount Settings Card */}
                                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-6">
                                        Thiết lập giảm giá
                                    </h3>

                                    <div className="space-y-6">
                                        {/* Discount Type */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-900 mb-4">
                                                Loại giảm giá
                                            </label>
                                            <div className="grid grid-cols-2 gap-4">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setFormData((prev) => ({
                                                            ...prev,
                                                            discount_type:
                                                                "PERCENT",
                                                        }))
                                                    }
                                                    className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center ${
                                                        formData.discount_type ===
                                                        "PERCENT"
                                                            ? "border-purple-400 bg-purple-50"
                                                            : "border-gray-200 hover:border-gray-300"
                                                    }`}
                                                >
                                                    <PercentBadgeIcon
                                                        className={`h-8 w-8 mb-2 ${
                                                            formData.discount_type ===
                                                            "PERCENT"
                                                                ? "text-purple-600"
                                                                : "text-gray-400"
                                                        }`}
                                                    />
                                                    <span
                                                        className={`font-medium ${
                                                            formData.discount_type ===
                                                            "PERCENT"
                                                                ? "text-purple-700"
                                                                : "text-gray-700"
                                                        }`}
                                                    >
                                                        Phần trăm
                                                    </span>
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setFormData((prev) => ({
                                                            ...prev,
                                                            discount_type:
                                                                "FIXED_AMOUNT",
                                                        }))
                                                    }
                                                    className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center ${
                                                        formData.discount_type ===
                                                        "FIXED_AMOUNT"
                                                            ? "border-emerald-400 bg-emerald-50"
                                                            : "border-gray-200 hover:border-gray-300"
                                                    }`}
                                                >
                                                    <CurrencyDollarIcon
                                                        className={`h-8 w-8 mb-2 ${
                                                            formData.discount_type ===
                                                            "FIXED_AMOUNT"
                                                                ? "text-emerald-600"
                                                                : "text-gray-400"
                                                        }`}
                                                    />
                                                    <span
                                                        className={`font-medium ${
                                                            formData.discount_type ===
                                                            "FIXED_AMOUNT"
                                                                ? "text-emerald-700"
                                                                : "text-gray-700"
                                                        }`}
                                                    >
                                                        Số tiền cố định
                                                    </span>
                                                </button>
                                            </div>
                                        </div>

                                        {/* Discount Value */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-900 mb-2">
                                                    {formData.discount_type ===
                                                    "PERCENT"
                                                        ? "Phần trăm giảm giá *"
                                                        : "Số tiền giảm *"}
                                                </label>
                                                <div className="relative">
                                                    <input
                                                        type="number"
                                                        name="discount_value"
                                                        value={
                                                            formData.discount_value
                                                        }
                                                        onChange={handleChange}
                                                        min="0"
                                                        max={
                                                            formData.discount_type ===
                                                            "PERCENT"
                                                                ? 100
                                                                : undefined
                                                        }
                                                        className={`block w-full px-4 py-3 bg-gradient-to-r from-gray-50 to-white border-2 rounded-xl focus:ring-2 focus:ring-purple-300 focus:border-purple-400 transition-all ${
                                                            errors.discount_value
                                                                ? "border-rose-300"
                                                                : "border-gray-200"
                                                        }`}
                                                        placeholder={
                                                            formData.discount_type ===
                                                            "PERCENT"
                                                                ? "10"
                                                                : "100000"
                                                        }
                                                    />
                                                    <div className="absolute right-3 top-3 text-gray-500">
                                                        {formData.discount_type ===
                                                        "PERCENT"
                                                            ? "%"
                                                            : "đ"}
                                                    </div>
                                                </div>
                                                {errors.discount_value && (
                                                    <p className="mt-2 text-sm text-rose-600 flex items-center">
                                                        <InformationCircleIcon className="h-4 w-4 mr-1" />
                                                        {errors.discount_value}
                                                    </p>
                                                )}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-900 mb-2">
                                                    Giảm tối đa
                                                </label>
                                                <input
                                                    type="number"
                                                    name="max_discount_amount"
                                                    value={
                                                        formData.max_discount_amount
                                                    }
                                                    onChange={handleChange}
                                                    min="0"
                                                    className="block w-full px-4 py-3 bg-gradient-to-r from-gray-50 to-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-300 focus:border-purple-400 transition-all"
                                                    placeholder="500000"
                                                />
                                                <p className="mt-2 text-sm text-gray-500">
                                                    Để trống nếu không giới hạn
                                                </p>
                                            </div>
                                        </div>

                                        {/* Minimum Order Value */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                                Giá trị đơn hàng tối thiểu
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="number"
                                                    name="min_order_value"
                                                    value={
                                                        formData.min_order_value
                                                    }
                                                    onChange={handleChange}
                                                    min="0"
                                                    className="block w-full px-4 py-3 bg-gradient-to-r from-gray-50 to-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-300 focus:border-purple-400 transition-all"
                                                    placeholder="0"
                                                />
                                                <div className="absolute right-3 top-3 text-gray-500">
                                                    đ
                                                </div>
                                            </div>
                                            <p className="mt-2 text-sm text-gray-500">
                                                Đơn hàng phải đạt giá trị này để
                                                áp dụng mã
                                            </p>
                                        </div>

                                        {/* Usage Limit */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                                Giới hạn sử dụng
                                            </label>
                                            <input
                                                type="number"
                                                name="usage_limit"
                                                value={formData.usage_limit}
                                                onChange={handleChange}
                                                min="0"
                                                className={`block w-full px-4 py-3 bg-gradient-to-r from-gray-50 to-white border-2 rounded-xl focus:ring-2 focus:ring-purple-300 focus:border-purple-400 transition-all ${
                                                    errors.usage_limit
                                                        ? "border-rose-300"
                                                        : "border-gray-200"
                                                }`}
                                                placeholder="1000"
                                            />
                                            {errors.usage_limit && (
                                                <p className="mt-2 text-sm text-rose-600 flex items-center">
                                                    <InformationCircleIcon className="h-4 w-4 mr-1" />
                                                    {errors.usage_limit}
                                                </p>
                                            )}
                                            <p className="mt-2 text-sm text-gray-500">
                                                Để trống nếu không giới hạn
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Target Selection Card */}
                                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-6">
                                        Áp dụng cho
                                    </h3>

                                    <div className="space-y-6">
                                        {/* Target Type */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-900 mb-4">
                                                Đối tượng áp dụng
                                            </label>
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                                {[
                                                    {
                                                        value: "ALL",
                                                        label: "Tất cả",
                                                        icon: "🌐",
                                                    },
                                                    {
                                                        value: "PRODUCT",
                                                        label: "Sản phẩm",
                                                        icon: "📱",
                                                    },
                                                    {
                                                        value: "CATEGORY",
                                                        label: "Danh mục",
                                                        icon: "📂",
                                                    },
                                                    {
                                                        value: "BRAND",
                                                        label: "Thương hiệu",
                                                        icon: "🏷️",
                                                    },
                                                ].map((option) => (
                                                    <button
                                                        key={option.value}
                                                        type="button"
                                                        onClick={() =>
                                                            setFormData(
                                                                (prev) => ({
                                                                    ...prev,
                                                                    target_type:
                                                                        option.value,
                                                                }),
                                                            )
                                                        }
                                                        className={`p-3 rounded-lg border transition-all flex flex-col items-center ${
                                                            formData.target_type ===
                                                            option.value
                                                                ? "border-purple-400 bg-purple-50"
                                                                : "border-gray-200 hover:border-gray-300"
                                                        }`}
                                                    >
                                                        <span className="text-2xl mb-1">
                                                            {option.icon}
                                                        </span>
                                                        <span
                                                            className={`text-sm font-medium ${
                                                                formData.target_type ===
                                                                option.value
                                                                    ? "text-purple-700"
                                                                    : "text-gray-700"
                                                            }`}
                                                        >
                                                            {option.label}
                                                        </span>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Target Selector */}
                                        {formData.target_type !== "ALL" && (
                                            <div className="relative">
                                                <label className="block text-sm font-medium text-gray-900 mb-2">
                                                    Chọn{" "}
                                                    {formData.target_type ===
                                                    "PRODUCT"
                                                        ? "sản phẩm"
                                                        : formData.target_type ===
                                                            "CATEGORY"
                                                          ? "danh mục"
                                                          : "thương hiệu"}
                                                </label>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setShowTargetSelector(
                                                            !showTargetSelector,
                                                        )
                                                    }
                                                    className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white border-2 border-gray-200 rounded-xl hover:border-purple-300 transition-all"
                                                >
                                                    <div className="flex items-center">
                                                        <CubeIcon className="h-5 w-5 text-gray-400 mr-3" />
                                                        <span className="text-gray-700">
                                                            {formData.targets
                                                                .length === 0
                                                                ? `Chọn ${
                                                                      formData.target_type ===
                                                                      "PRODUCT"
                                                                          ? "sản phẩm"
                                                                          : formData.target_type ===
                                                                              "CATEGORY"
                                                                            ? "danh mục"
                                                                            : "thương hiệu"
                                                                  }`
                                                                : `${formData.targets.length} mục đã chọn`}
                                                        </span>
                                                    </div>
                                                    <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                                                </button>

                                                {showTargetSelector && (
                                                    <TargetSelector />
                                                )}

                                                {/* Selected Targets */}
                                                {formData.targets.length >
                                                    0 && (
                                                    <div className="mt-4 space-y-2">
                                                        {formData.targets.map(
                                                            (target) => (
                                                                <div
                                                                    key={`${target.type}-${target.id}`}
                                                                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                                                                >
                                                                    <div className="flex items-center">
                                                                        <span className="text-gray-900 font-medium">
                                                                            {
                                                                                target.name
                                                                            }
                                                                        </span>
                                                                        <span className="ml-2 px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded">
                                                                            {
                                                                                target.type
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                    <button
                                                                        type="button"
                                                                        onClick={() =>
                                                                            removeTarget(
                                                                                target.id,
                                                                                target.type,
                                                                            )
                                                                        }
                                                                        className="text-gray-400 hover:text-rose-500"
                                                                    >
                                                                        <XMarkIcon className="h-5 w-5" />
                                                                    </button>
                                                                </div>
                                                            ),
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Date & Actions */}
                            <div className="space-y-6">
                                {/* Date Range Card */}
                                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-6">
                                        Thời gian hiệu lực
                                    </h3>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                                Ngày bắt đầu *
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="datetime-local"
                                                    name="start_date"
                                                    value={formData.start_date}
                                                    onChange={handleChange}
                                                    className={`block w-full px-4 py-3 bg-gradient-to-r from-gray-50 to-white border-2 rounded-xl focus:ring-2 focus:ring-purple-300 focus:border-purple-400 transition-all ${
                                                        errors.start_date
                                                            ? "border-rose-300"
                                                            : "border-gray-200"
                                                    }`}
                                                />
                                                <div className="absolute right-3 top-3 text-gray-400">
                                                    <CalendarIcon className="h-5 w-5" />
                                                </div>
                                            </div>
                                            {errors.start_date && (
                                                <p className="mt-2 text-sm text-rose-600 flex items-center">
                                                    <InformationCircleIcon className="h-4 w-4 mr-1" />
                                                    {errors.start_date}
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                                Ngày kết thúc *
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="datetime-local"
                                                    name="end_date"
                                                    value={formData.end_date}
                                                    onChange={handleChange}
                                                    className={`block w-full px-4 py-3 bg-gradient-to-r from-gray-50 to-white border-2 rounded-xl focus:ring-2 focus:ring-purple-300 focus:border-purple-400 transition-all ${
                                                        errors.end_date
                                                            ? "border-rose-300"
                                                            : "border-gray-200"
                                                    }`}
                                                />
                                                <div className="absolute right-3 top-3 text-gray-400">
                                                    <CalendarIcon className="h-5 w-5" />
                                                </div>
                                            </div>
                                            {errors.end_date && (
                                                <p className="mt-2 text-sm text-rose-600 flex items-center">
                                                    <InformationCircleIcon className="h-4 w-4 mr-1" />
                                                    {errors.end_date}
                                                </p>
                                            )}
                                        </div>

                                        {/* Duration Preview */}
                                        {formData.start_date &&
                                            formData.end_date && (
                                                <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                                                    <p className="text-sm font-medium text-blue-900">
                                                        Thời gian hiệu lực:
                                                    </p>
                                                    <p className="text-lg font-bold text-blue-700 mt-1">
                                                        {Math.ceil(
                                                            (new Date(
                                                                formData.end_date,
                                                            ) -
                                                                new Date(
                                                                    formData.start_date,
                                                                )) /
                                                                (1000 *
                                                                    60 *
                                                                    60 *
                                                                    24),
                                                        )}{" "}
                                                        ngày
                                                    </p>
                                                </div>
                                            )}
                                    </div>
                                </div>

                                {/* Status Card */}
                                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                                        Trạng thái
                                    </h3>

                                    <div className="space-y-4">
                                        <label className="flex items-center p-3 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                name="is_active"
                                                checked={formData.is_active}
                                                onChange={handleChange}
                                                className="h-5 w-5 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                                            />
                                            <span className="ml-3">
                                                <span className="block text-sm font-medium text-gray-900">
                                                    Kích hoạt mã giảm giá
                                                </span>
                                                <span className="block text-sm text-gray-500">
                                                    Mã sẽ có hiệu lực ngay sau
                                                    khi lưu
                                                </span>
                                            </span>
                                        </label>

                                        <div className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-100">
                                            <div className="flex items-center mb-2">
                                                <FireIcon className="h-5 w-5 text-emerald-600 mr-2" />
                                                <h4 className="text-sm font-medium text-emerald-900">
                                                    Preview Code
                                                </h4>
                                            </div>
                                            {formData.code ? (
                                                <div className="mt-2">
                                                    <code className="font-mono text-lg font-bold text-emerald-700">
                                                        {formData.code}
                                                    </code>
                                                    <p className="text-sm text-emerald-600 mt-1">
                                                        {formData.discount_type ===
                                                        "PERCENT"
                                                            ? `Giảm ${formData.discount_value}%`
                                                            : `Giảm ${Number(formData.discount_value).toLocaleString()}đ`}
                                                    </p>
                                                </div>
                                            ) : (
                                                <p className="text-sm text-emerald-600">
                                                    Nhập mã để xem preview
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Actions Card */}
                                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-100 p-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                                        Thao tác
                                    </h3>

                                    <div className="space-y-3">
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full flex items-center justify-center px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:-translate-y-0.5"
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
                                                        ? "Cập nhật mã giảm giá"
                                                        : "Tạo mã giảm giá"}
                                                </>
                                            )}
                                        </button>

                                        <Link
                                            to="/admin/discounts"
                                            className="w-full block text-center px-6 py-3 bg-white text-gray-700 border-2 border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all"
                                        >
                                            Hủy bỏ
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default DiscountForm;
