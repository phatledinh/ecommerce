// pages/admin/brands/BrandList.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    PencilIcon,
    TrashIcon,
    EyeIcon,
    PlusIcon,
    MagnifyingGlassIcon,
    BuildingLibraryIcon,
    CheckCircleIcon,
    XCircleIcon,
    ArrowPathIcon,
    SparklesIcon,
    LinkIcon,
    ChartBarIcon,
} from "@heroicons/react/24/outline";

const BrandList = () => {
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'

    // Mock data với cấu trúc tương tự
    useEffect(() => {
        setTimeout(() => {
            setBrands([
                {
                    id: 1,
                    name: "Apple",
                    slug: "apple",
                    description: "Thương hiệu công nghệ hàng đầu thế giới",
                    logo: "https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?w=300&h=300&fit=crop",
                    is_active: true,
                    product_count: 150,
                    created_at: "2024-01-15T10:30:00Z",
                    created_by: "Admin",
                    color: "bg-gradient-to-r from-gray-800 to-gray-600",
                    icon: "🍎",
                },
                {
                    id: 2,
                    name: "Samsung",
                    slug: "samsung",
                    description: "Tập đoàn điện tử đa quốc gia Hàn Quốc",
                    logo: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=300&h=300&fit=crop",
                    is_active: true,
                    product_count: 200,
                    created_at: "2024-01-10T14:20:00Z",
                    created_by: "Admin",
                    color: "bg-gradient-to-r from-blue-500 to-indigo-400",
                    icon: "📱",
                },
                {
                    id: 3,
                    name: "Xiaomi",
                    slug: "xiaomi",
                    description: "Công ty điện tử và công nghệ Trung Quốc",
                    logo: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=300&h=300&fit=crop",
                    is_active: true,
                    product_count: 120,
                    created_at: "2024-01-05T09:15:00Z",
                    created_by: "Admin",
                    color: "bg-gradient-to-r from-orange-500 to-red-400",
                    icon: "⚡",
                },
                {
                    id: 4,
                    name: "Sony",
                    slug: "sony",
                    description: "Tập đoàn điện tử và giải trí Nhật Bản",
                    logo: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=300&h=300&fit=crop",
                    is_active: false,
                    product_count: 80,
                    created_at: "2024-01-02T11:45:00Z",
                    created_by: "Admin",
                    color: "bg-gradient-to-r from-black to-gray-700",
                    icon: "🎮",
                },
                {
                    id: 5,
                    name: "LG",
                    slug: "lg",
                    description: "Tập đoàn đa quốc gia Hàn Quốc",
                    logo: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=300&h=300&fit=crop",
                    is_active: true,
                    product_count: 75,
                    created_at: "2024-01-01T08:30:00Z",
                    created_by: "Admin",
                    color: "bg-gradient-to-r from-red-500 to-pink-400",
                    icon: "📺",
                },
                {
                    id: 6,
                    name: "Dell",
                    slug: "dell",
                    description: "Công ty công nghệ máy tính Mỹ",
                    logo: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=300&h=300&fit=crop",
                    is_active: true,
                    product_count: 90,
                    created_at: "2023-12-28T16:20:00Z",
                    created_by: "Admin",
                    color: "bg-gradient-to-r from-blue-400 to-cyan-300",
                    icon: "💻",
                },
            ]);
            setLoading(false);
        }, 800);
    }, []);

    const handleDelete = (id) => {
        if (window.confirm("Bạn có chắc muốn xóa thương hiệu này?")) {
            setBrands(brands.filter((brand) => brand.id !== id));
        }
    };

    const handleToggleStatus = (id) => {
        setBrands(
            brands.map((brand) =>
                brand.id === id
                    ? { ...brand, is_active: !brand.is_active }
                    : brand,
            ),
        );
    };

    const toggleSelectBrand = (id) => {
        setSelectedBrands((prev) =>
            prev.includes(id)
                ? prev.filter((brandId) => brandId !== id)
                : [...prev, id],
        );
    };

    const handleBulkAction = (action) => {
        if (selectedBrands.length === 0) {
            alert("Vui lòng chọn ít nhất một thương hiệu");
            return;
        }

        switch (action) {
            case "activate":
                setBrands(
                    brands.map((brand) =>
                        selectedBrands.includes(brand.id)
                            ? { ...brand, is_active: true }
                            : brand,
                    ),
                );
                break;
            case "deactivate":
                setBrands(
                    brands.map((brand) =>
                        selectedBrands.includes(brand.id)
                            ? { ...brand, is_active: false }
                            : brand,
                    ),
                );
                break;
            case "delete":
                if (
                    window.confirm(`Xóa ${selectedBrands.length} thương hiệu?`)
                ) {
                    setBrands(
                        brands.filter(
                            (brand) => !selectedBrands.includes(brand.id),
                        ),
                    );
                    setSelectedBrands([]);
                }
                break;
        }
    };

    const filteredBrands = brands.filter((brand) => {
        return (
            brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            brand.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
            brand.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    const StatsCard = ({ title, value, icon, color }) => (
        <div
            className={`${color} rounded-2xl p-6 text-white shadow-lg transform transition-transform hover:scale-105`}
        >
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm opacity-90">{title}</p>
                    <p className="text-3xl font-bold mt-2">{value}</p>
                </div>
                <div className="text-3xl">{icon}</div>
            </div>
        </div>
    );

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    };

    return (
        <div className="p-6">
            {/* Header with Stats */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Quản Lý Thương Hiệu
                        </h1>
                        <p className="text-gray-600 mt-2">
                            Quản lý các thương hiệu sản phẩm trong hệ thống
                        </p>
                    </div>
                    <Link
                        to="/admin/brands/new"
                        className="inline-flex items-center px-5 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
                    >
                        <PlusIcon className="h-5 w-5 mr-2" />
                        Thêm Thương Hiệu Mới
                    </Link>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <StatsCard
                        title="Tổng Thương Hiệu"
                        value={brands.length}
                        icon="🏢"
                        color="bg-gradient-to-r from-blue-400 to-cyan-400"
                    />
                    <StatsCard
                        title="Đang Hoạt Động"
                        value={brands.filter((b) => b.is_active).length}
                        icon="✅"
                        color="bg-gradient-to-r from-emerald-400 to-teal-400"
                    />
                    <StatsCard
                        title="Tổng Sản Phẩm"
                        value={brands.reduce(
                            (sum, brand) => sum + brand.product_count,
                            0,
                        )}
                        icon="📦"
                        color="bg-gradient-to-r from-purple-400 to-pink-400"
                    />
                    <StatsCard
                        title="Đang Tạm Dừng"
                        value={brands.filter((b) => !b.is_active).length}
                        icon="⏸️"
                        color="bg-gradient-to-r from-amber-400 to-orange-400"
                    />
                </div>
            </div>

            {/* Search and Controls */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 mb-6 border border-blue-100">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                    {/* Search */}
                    <div className="lg:col-span-2">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <MagnifyingGlassIcon className="h-5 w-5 text-blue-500" />
                            </div>
                            <input
                                type="text"
                                placeholder="Tìm kiếm thương hiệu theo tên, slug, mô tả..."
                                className="w-full pl-12 pr-4 py-3 bg-white rounded-xl border border-blue-200 focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* View Mode Toggle */}
                    <div className="flex space-x-2">
                        <button
                            onClick={() => setViewMode("grid")}
                            className={`flex-1 px-4 py-2 rounded-xl border transition-all ${
                                viewMode === "grid"
                                    ? "bg-white border-blue-400 text-blue-600 shadow-sm"
                                    : "bg-gray-100 border-gray-200 text-gray-600 hover:bg-gray-200"
                            }`}
                        >
                            Grid View
                        </button>
                        <button
                            onClick={() => setViewMode("list")}
                            className={`flex-1 px-4 py-2 rounded-xl border transition-all ${
                                viewMode === "list"
                                    ? "bg-white border-blue-400 text-blue-600 shadow-sm"
                                    : "bg-gray-100 border-gray-200 text-gray-600 hover:bg-gray-200"
                            }`}
                        >
                            List View
                        </button>
                    </div>

                    {/* Bulk Actions */}
                    <div>
                        <select
                            onChange={(e) => handleBulkAction(e.target.value)}
                            className="w-full px-4 py-3 bg-white rounded-xl border border-blue-200 focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                            defaultValue=""
                        >
                            <option value="" disabled>
                                Hành động hàng loạt
                            </option>
                            <option value="activate">Kích hoạt đã chọn</option>
                            <option value="deactivate">
                                Vô hiệu hóa đã chọn
                            </option>
                            <option value="delete">Xóa đã chọn</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Loading State */}
            {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                    <div className="relative">
                        <div className="w-20 h-20 border-4 border-blue-200 rounded-full"></div>
                        <div className="absolute top-0 left-0 w-20 h-20 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
                    </div>
                    <p className="mt-6 text-lg text-gray-600">
                        Đang tải thương hiệu...
                    </p>
                    <p className="text-sm text-gray-400">
                        Vui lòng đợi trong giây lát
                    </p>
                </div>
            ) : (
                <>
                    {/* Grid View */}
                    {viewMode === "grid" ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredBrands.map((brand) => (
                                <div
                                    key={brand.id}
                                    className={`bg-white rounded-2xl overflow-hidden border-2 transition-all hover:shadow-xl hover:-translate-y-1 ${
                                        selectedBrands.includes(brand.id)
                                            ? "border-blue-400 ring-2 ring-blue-100"
                                            : "border-gray-100 hover:border-blue-200"
                                    }`}
                                >
                                    <div className="relative">
                                        {/* Logo/Thumbnail */}
                                        <div
                                            className={`h-40 relative overflow-hidden ${brand.color}`}
                                        >
                                            <img
                                                src={brand.logo}
                                                alt={brand.name}
                                                className="w-full h-full object-cover opacity-90"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

                                            {/* Selection Checkbox */}
                                            <div className="absolute top-4 left-4">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedBrands.includes(
                                                        brand.id,
                                                    )}
                                                    onChange={() =>
                                                        toggleSelectBrand(
                                                            brand.id,
                                                        )
                                                    }
                                                    className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                                />
                                            </div>

                                            {/* Status Badge */}
                                            <div className="absolute top-4 right-4">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                        brand.is_active
                                                            ? "bg-emerald-100 text-emerald-800"
                                                            : "bg-rose-100 text-rose-800"
                                                    }`}
                                                >
                                                    {brand.is_active
                                                        ? "Đang hoạt động"
                                                        : "Ngừng hoạt động"}
                                                </span>
                                            </div>

                                            {/* Brand Icon */}
                                            <div className="absolute bottom-4 left-4">
                                                <span className="text-3xl bg-white/20 backdrop-blur-sm p-2 rounded-lg">
                                                    {brand.icon}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-5">
                                            <div className="flex items-start justify-between mb-3">
                                                <div>
                                                    <div className="flex items-center space-x-2 mb-1">
                                                        <BuildingLibraryIcon className="h-5 w-5 text-gray-400" />
                                                        <h3 className="text-lg font-bold text-gray-900">
                                                            {brand.name}
                                                        </h3>
                                                    </div>
                                                    <div className="flex items-center text-sm text-gray-500">
                                                        <LinkIcon className="h-4 w-4 mr-1" />
                                                        <span>
                                                            /{brand.slug}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Description */}
                                            <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                                                {brand.description}
                                            </p>

                                            {/* Stats */}
                                            <div className="grid grid-cols-2 gap-3 mb-4">
                                                <div className="bg-blue-50 rounded-lg p-3">
                                                    <p className="text-xs text-blue-600">
                                                        Sản phẩm
                                                    </p>
                                                    <p className="text-lg font-bold text-gray-900">
                                                        {brand.product_count}
                                                    </p>
                                                </div>
                                                <div className="bg-purple-50 rounded-lg p-3">
                                                    <p className="text-xs text-purple-600">
                                                        Ngày tạo
                                                    </p>
                                                    <p className="text-sm font-bold text-gray-900">
                                                        {formatDate(
                                                            brand.created_at,
                                                        )}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Actions */}
                                            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                                <div className="flex space-x-2">
                                                    <Link
                                                        to={`/admin/brands/${brand.id}`}
                                                        className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                        title="Xem chi tiết"
                                                    >
                                                        <EyeIcon className="h-5 w-5" />
                                                    </Link>
                                                    <Link
                                                        to={`/admin/brands/${brand.id}/edit`}
                                                        className="p-2 text-gray-600 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                                                        title="Chỉnh sửa"
                                                    >
                                                        <PencilIcon className="h-5 w-5" />
                                                    </Link>
                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                brand.id,
                                                            )
                                                        }
                                                        className="p-2 text-gray-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                                                        title="Xóa"
                                                    >
                                                        <TrashIcon className="h-5 w-5" />
                                                    </button>
                                                </div>
                                                <button
                                                    onClick={() =>
                                                        handleToggleStatus(
                                                            brand.id,
                                                        )
                                                    }
                                                    className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                                                        brand.is_active
                                                            ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                                    }`}
                                                >
                                                    {brand.is_active
                                                        ? "Vô hiệu hóa"
                                                        : "Kích hoạt"}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        /* List View */
                        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gradient-to-r from-blue-50 to-indigo-50">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">
                                                <input
                                                    type="checkbox"
                                                    className="h-4 w-4 rounded border-gray-300 text-blue-600"
                                                />
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">
                                                THƯƠNG HIỆU
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">
                                                SLUG
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">
                                                MÔ TẢ
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">
                                                SẢN PHẨM
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">
                                                TRẠNG THÁI
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">
                                                THAO TÁC
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {filteredBrands.map((brand) => (
                                            <tr
                                                key={brand.id}
                                                className="hover:bg-blue-50/50 transition-colors"
                                            >
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedBrands.includes(
                                                            brand.id,
                                                        )}
                                                        onChange={() =>
                                                            toggleSelectBrand(
                                                                brand.id,
                                                            )
                                                        }
                                                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                                    />
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center">
                                                        <div className="h-10 w-10 rounded-lg overflow-hidden mr-3">
                                                            <img
                                                                src={brand.logo}
                                                                alt={brand.name}
                                                                className="h-full w-full object-cover"
                                                            />
                                                        </div>
                                                        <div>
                                                            <div className="font-medium text-gray-900">
                                                                {brand.name}
                                                            </div>
                                                            <div className="text-sm text-gray-500">
                                                                {formatDate(
                                                                    brand.created_at,
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center text-gray-600">
                                                        <LinkIcon className="h-4 w-4 mr-2" />
                                                        /{brand.slug}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <p className="text-sm text-gray-600 line-clamp-2 max-w-xs">
                                                        {brand.description}
                                                    </p>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                                                            {
                                                                brand.product_count
                                                            }{" "}
                                                            sản phẩm
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div
                                                            className={`flex items-center ${brand.is_active ? "text-emerald-600" : "text-rose-600"}`}
                                                        >
                                                            {brand.is_active ? (
                                                                <>
                                                                    <CheckCircleIcon className="h-5 w-5 mr-2" />
                                                                    <span className="font-medium">
                                                                        Hoạt
                                                                        động
                                                                    </span>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <XCircleIcon className="h-5 w-5 mr-2" />
                                                                    <span className="font-medium">
                                                                        Ngừng
                                                                    </span>
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center space-x-3">
                                                        <Link
                                                            to={`/admin/brands/${brand.id}`}
                                                            className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-100 rounded-lg transition-colors"
                                                            title="Xem chi tiết"
                                                        >
                                                            <EyeIcon className="h-5 w-5" />
                                                        </Link>
                                                        <Link
                                                            to={`/admin/brands/${brand.id}/edit`}
                                                            className="text-amber-600 hover:text-amber-800 p-2 hover:bg-amber-100 rounded-lg transition-colors"
                                                            title="Chỉnh sửa"
                                                        >
                                                            <PencilIcon className="h-5 w-5" />
                                                        </Link>
                                                        <button
                                                            onClick={() =>
                                                                handleToggleStatus(
                                                                    brand.id,
                                                                )
                                                            }
                                                            className="text-emerald-600 hover:text-emerald-800 p-2 hover:bg-emerald-100 rounded-lg transition-colors"
                                                            title={
                                                                brand.is_active
                                                                    ? "Vô hiệu hóa"
                                                                    : "Kích hoạt"
                                                            }
                                                        >
                                                            <ArrowPathIcon className="h-5 w-5" />
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                handleDelete(
                                                                    brand.id,
                                                                )
                                                            }
                                                            className="text-rose-600 hover:text-rose-800 p-2 hover:bg-rose-100 rounded-lg transition-colors"
                                                            title="Xóa"
                                                        >
                                                            <TrashIcon className="h-5 w-5" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Empty State */}
                    {filteredBrands.length === 0 && (
                        <div className="text-center py-16">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl mb-6">
                                <BuildingLibraryIcon className="h-10 w-10 text-blue-500" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                Không tìm thấy thương hiệu
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Thử thay đổi từ khóa tìm kiếm hoặc tạo thương
                                hiệu mới
                            </p>
                            <Link
                                to="/admin/brands/new"
                                className="inline-flex items-center px-5 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 shadow-lg hover:shadow-xl transition-all"
                            >
                                <PlusIcon className="h-5 w-5 mr-2" />
                                Tạo Thương Hiệu Đầu Tiên
                            </Link>
                        </div>
                    )}
                </>
            )}

            {/* Floating Action Button */}
            <Link
                to="/admin/brands/new"
                className="fixed bottom-8 right-8 inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all z-50"
            >
                <PlusIcon className="h-6 w-6" />
            </Link>
        </div>
    );
};

export default BrandList;
