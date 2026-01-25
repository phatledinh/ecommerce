// pages/admin/categories/CategoryList.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    PencilIcon,
    TrashIcon,
    EyeIcon,
    PlusIcon,
    MagnifyingGlassIcon,
    FunnelIcon,
    ChevronRightIcon,
    FolderIcon,
    CheckCircleIcon,
    XCircleIcon,
    ArrowPathIcon,
    SparklesIcon,
    LinkIcon,
} from "@heroicons/react/24/outline";

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'

    // Mock data with better structure
    useEffect(() => {
        setTimeout(() => {
            setCategories([
                {
                    id: 1,
                    name: "Điện Thoại & Máy Tính Bảng",
                    slug: "dien-thoai-may-tinh-bang",
                    level: 1,
                    is_active: true,
                    parent_id: null,
                    thumbnail:
                        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop",
                    product_count: 150,
                    color: "bg-gradient-to-r from-blue-400 to-cyan-300",
                    icon: "📱",
                    children_count: 3,
                },
                {
                    id: 2,
                    name: "Laptop & Máy Tính",
                    slug: "laptop-may-tinh",
                    level: 1,
                    is_active: true,
                    parent_id: null,
                    thumbnail:
                        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=300&fit=crop",
                    product_count: 80,
                    color: "bg-gradient-to-r from-purple-400 to-pink-300",
                    icon: "💻",
                    children_count: 2,
                },
                {
                    id: 3,
                    name: "iPhone",
                    slug: "iphone",
                    level: 2,
                    is_active: true,
                    parent_id: 1,
                    thumbnail:
                        "https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?w-300&h=300&fit=crop",
                    product_count: 50,
                    color: "bg-gradient-to-r from-gray-800 to-gray-600",
                    icon: "🍎",
                    children_count: 0,
                },
                {
                    id: 4,
                    name: "Phụ Kiện Công Nghệ",
                    slug: "phu-kien-cong-nghe",
                    level: 1,
                    is_active: false,
                    parent_id: null,
                    thumbnail:
                        "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=300&h=300&fit=crop",
                    product_count: 0,
                    color: "bg-gradient-to-r from-amber-400 to-orange-300",
                    icon: "🎧",
                    children_count: 0,
                },
                {
                    id: 5,
                    name: "Thiết Bị Đeo Thông Minh",
                    slug: "thiet-bi-deo-thong-minh",
                    level: 1,
                    is_active: true,
                    parent_id: null,
                    thumbnail:
                        "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=300&h=300&fit=crop",
                    product_count: 30,
                    color: "bg-gradient-to-r from-emerald-400 to-teal-300",
                    icon: "⌚",
                    children_count: 0,
                },
                {
                    id: 6,
                    name: "Samsung",
                    slug: "samsung",
                    level: 2,
                    is_active: true,
                    parent_id: 1,
                    thumbnail:
                        "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=300&h=300&fit=crop",
                    product_count: 40,
                    color: "bg-gradient-to-r from-blue-500 to-indigo-400",
                    icon: "📱",
                    children_count: 0,
                },
            ]);
            setLoading(false);
        }, 800);
    }, []);

    const handleDelete = (id) => {
        if (window.confirm("Bạn có chắc muốn xóa danh mục này?")) {
            setCategories(categories.filter((cat) => cat.id !== id));
        }
    };

    const handleToggleStatus = (id) => {
        setCategories(
            categories.map((cat) =>
                cat.id === id ? { ...cat, is_active: !cat.is_active } : cat,
            ),
        );
    };

    const toggleSelectCategory = (id) => {
        setSelectedCategories((prev) =>
            prev.includes(id)
                ? prev.filter((catId) => catId !== id)
                : [...prev, id],
        );
    };

    const handleBulkAction = (action) => {
        if (selectedCategories.length === 0) {
            alert("Vui lòng chọn ít nhất một danh mục");
            return;
        }

        switch (action) {
            case "activate":
                setCategories(
                    categories.map((cat) =>
                        selectedCategories.includes(cat.id)
                            ? { ...cat, is_active: true }
                            : cat,
                    ),
                );
                break;
            case "deactivate":
                setCategories(
                    categories.map((cat) =>
                        selectedCategories.includes(cat.id)
                            ? { ...cat, is_active: false }
                            : cat,
                    ),
                );
                break;
            case "delete":
                if (
                    window.confirm(`Xóa ${selectedCategories.length} danh mục?`)
                ) {
                    setCategories(
                        categories.filter(
                            (cat) => !selectedCategories.includes(cat.id),
                        ),
                    );
                    setSelectedCategories([]);
                }
                break;
        }
    };

    const filteredCategories = categories.filter((category) => {
        return (
            category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            category.slug.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    const getParentCategory = (parentId) => {
        return (
            categories.find((cat) => cat.id === parentId)?.name || "Không có"
        );
    };

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

    return (
        <div className="p-6">
            {/* Header with Stats */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Quản Lý Danh Mục
                        </h1>
                        <p className="text-gray-600 mt-2">
                            Quản lý và tổ chức danh mục sản phẩm
                        </p>
                    </div>
                    <Link
                        to="/admin/categories/new"
                        className="inline-flex items-center px-5 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
                    >
                        <PlusIcon className="h-5 w-5 mr-2" />
                        Thêm Danh Mục Mới
                    </Link>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <StatsCard
                        title="Tổng Danh Mục"
                        value={categories.length}
                        icon="📂"
                        color="bg-gradient-to-r from-blue-400 to-cyan-400"
                    />
                    <StatsCard
                        title="Đang Hoạt Động"
                        value={categories.filter((c) => c.is_active).length}
                        icon="✅"
                        color="bg-gradient-to-r from-emerald-400 to-teal-400"
                    />
                    <StatsCard
                        title="Danh Mục Cha"
                        value={categories.filter((c) => c.level === 1).length}
                        icon="🏷️"
                        color="bg-gradient-to-r from-purple-400 to-pink-400"
                    />
                    <StatsCard
                        title="Danh Mục Con"
                        value={categories.filter((c) => c.level > 1).length}
                        icon="📁"
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
                                placeholder="Tìm kiếm danh mục theo tên, slug..."
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
                        Đang tải danh mục...
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
                            {filteredCategories.map((category) => (
                                <div
                                    key={category.id}
                                    className={`bg-white rounded-2xl overflow-hidden border-2 transition-all hover:shadow-xl hover:-translate-y-1 ${
                                        selectedCategories.includes(category.id)
                                            ? "border-blue-400 ring-2 ring-blue-100"
                                            : "border-gray-100 hover:border-blue-200"
                                    }`}
                                >
                                    <div className="relative">
                                        {/* Thumbnail */}
                                        <div
                                            className={`h-40 relative overflow-hidden ${category.color}`}
                                        >
                                            <img
                                                src={category.thumbnail}
                                                alt={category.name}
                                                className="w-full h-full object-cover opacity-90"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

                                            {/* Selection Checkbox */}
                                            <div className="absolute top-4 left-4">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedCategories.includes(
                                                        category.id,
                                                    )}
                                                    onChange={() =>
                                                        toggleSelectCategory(
                                                            category.id,
                                                        )
                                                    }
                                                    className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                                />
                                            </div>

                                            {/* Status Badge */}
                                            <div className="absolute top-4 right-4">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                        category.is_active
                                                            ? "bg-emerald-100 text-emerald-800"
                                                            : "bg-rose-100 text-rose-800"
                                                    }`}
                                                >
                                                    {category.is_active
                                                        ? "Đang hoạt động"
                                                        : "Ngừng hoạt động"}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-5">
                                            <div className="flex items-start justify-between mb-3">
                                                <div>
                                                    <div className="flex items-center space-x-2 mb-1">
                                                        <span className="text-2xl">
                                                            {category.icon}
                                                        </span>
                                                        <h3 className="text-lg font-bold text-gray-900">
                                                            {category.name}
                                                        </h3>
                                                    </div>
                                                    <div className="flex items-center text-sm text-gray-500">
                                                        <FolderIcon className="h-4 w-4 mr-1" />
                                                        <span>
                                                            /{category.slug}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Stats */}
                                            <div className="grid grid-cols-2 gap-3 mb-4">
                                                <div className="bg-blue-50 rounded-lg p-3">
                                                    <p className="text-xs text-blue-600">
                                                        Sản phẩm
                                                    </p>
                                                    <p className="text-lg font-bold text-gray-900">
                                                        {category.product_count}
                                                    </p>
                                                </div>
                                                <div className="bg-purple-50 rounded-lg p-3">
                                                    <p className="text-xs text-purple-600">
                                                        Danh mục con
                                                    </p>
                                                    <p className="text-lg font-bold text-gray-900">
                                                        {
                                                            category.children_count
                                                        }
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Parent Info */}
                                            {category.parent_id && (
                                                <div className="flex items-center text-sm text-gray-600 mb-4">
                                                    <ChevronRightIcon className="h-4 w-4 mr-1" />
                                                    <span>
                                                        Thuộc:{" "}
                                                        {getParentCategory(
                                                            category.parent_id,
                                                        )}
                                                    </span>
                                                </div>
                                            )}

                                            {/* Actions */}
                                            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                                <div className="flex space-x-2">
                                                    <Link
                                                        to={`/admin/categories/${category.id}`}
                                                        className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                        title="Xem chi tiết"
                                                    >
                                                        <EyeIcon className="h-5 w-5" />
                                                    </Link>
                                                    <Link
                                                        to={`/admin/categories/${category.id}/edit`}
                                                        className="p-2 text-gray-600 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                                                        title="Chỉnh sửa"
                                                    >
                                                        <PencilIcon className="h-5 w-5" />
                                                    </Link>
                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                category.id,
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
                                                            category.id,
                                                        )
                                                    }
                                                    className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                                                        category.is_active
                                                            ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                                    }`}
                                                >
                                                    {category.is_active
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
                                                DANH MỤC
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">
                                                SLUG
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
                                        {filteredCategories.map((category) => (
                                            <tr
                                                key={category.id}
                                                className="hover:bg-blue-50/50 transition-colors"
                                            >
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedCategories.includes(
                                                            category.id,
                                                        )}
                                                        onChange={() =>
                                                            toggleSelectCategory(
                                                                category.id,
                                                            )
                                                        }
                                                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                                    />
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center">
                                                        <div
                                                            className={`h-10 w-10 rounded-lg ${category.color} flex items-center justify-center mr-3`}
                                                        >
                                                            <span className="text-lg">
                                                                {category.icon}
                                                            </span>
                                                        </div>
                                                        <div>
                                                            <div className="font-medium text-gray-900">
                                                                {category.name}
                                                            </div>
                                                            {category.parent_id && (
                                                                <div className="text-sm text-gray-500 flex items-center">
                                                                    <ChevronRightIcon className="h-3 w-3 mr-1" />
                                                                    {getParentCategory(
                                                                        category.parent_id,
                                                                    )}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center text-gray-600">
                                                        <LinkIcon className="h-4 w-4 mr-2" />
                                                        /{category.slug}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                                                            {
                                                                category.product_count
                                                            }{" "}
                                                            sản phẩm
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div
                                                            className={`flex items-center ${category.is_active ? "text-emerald-600" : "text-rose-600"}`}
                                                        >
                                                            {category.is_active ? (
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
                                                            to={`/admin/categories/${category.id}`}
                                                            className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-100 rounded-lg transition-colors"
                                                            title="Xem chi tiết"
                                                        >
                                                            <EyeIcon className="h-5 w-5" />
                                                        </Link>
                                                        <Link
                                                            to={`/admin/categories/${category.id}/edit`}
                                                            className="text-amber-600 hover:text-amber-800 p-2 hover:bg-amber-100 rounded-lg transition-colors"
                                                            title="Chỉnh sửa"
                                                        >
                                                            <PencilIcon className="h-5 w-5" />
                                                        </Link>
                                                        <button
                                                            onClick={() =>
                                                                handleToggleStatus(
                                                                    category.id,
                                                                )
                                                            }
                                                            className="text-emerald-600 hover:text-emerald-800 p-2 hover:bg-emerald-100 rounded-lg transition-colors"
                                                            title={
                                                                category.is_active
                                                                    ? "Vô hiệu hóa"
                                                                    : "Kích hoạt"
                                                            }
                                                        >
                                                            <ArrowPathIcon className="h-5 w-5" />
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                handleDelete(
                                                                    category.id,
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
                    {filteredCategories.length === 0 && (
                        <div className="text-center py-16">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl mb-6">
                                <FolderIcon className="h-10 w-10 text-blue-500" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                Không tìm thấy danh mục
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Thử thay đổi từ khóa tìm kiếm hoặc tạo danh mục
                                mới
                            </p>
                            <Link
                                to="/admin/categories/new"
                                className="inline-flex items-center px-5 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 shadow-lg hover:shadow-xl transition-all"
                            >
                                <PlusIcon className="h-5 w-5 mr-2" />
                                Tạo Danh Mục Đầu Tiên
                            </Link>
                        </div>
                    )}
                </>
            )}

            {/* Floating Action Button */}
            <Link
                to="/admin/categories/new"
                className="fixed bottom-8 right-8 inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all z-50"
            >
                <PlusIcon className="h-6 w-6" />
            </Link>
        </div>
    );
};

export default CategoryList;
