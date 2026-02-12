// pages/admin/categories/CategoryList.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import {
    PencilIcon,
    TrashIcon,
    PlusIcon,
    MagnifyingGlassIcon,
    CheckCircleIcon,
    XCircleIcon,
    ArrowPathIcon,
    ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { useCategory } from "../../hooks/useCategory";
import categoryService from "../../services/categoryService";

const CategoryList = () => {
    const { categories, setCategories, loading, deleteCategory, toggleStatus } =
        useCategory();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [viewMode, setViewMode] = useState("grid");

    const handleDelete = async (id) => {
        if (window.confirm("Bạn có chắc muốn xóa danh mục này?")) {
            const result = await deleteCategory(id);
            if (!result.success) alert("Xóa thất bại: " + result.error);
        }
    };

    const toggleSelectCategory = (id) => {
        setSelectedCategories((prev) =>
            prev.includes(id)
                ? prev.filter((catId) => catId !== id)
                : [...prev, id],
        );
    };

    const handleBulkAction = async (action) => {
        if (selectedCategories.length === 0) {
            alert("Vui lòng chọn ít nhất một danh mục");
            return;
        }

        try {
            await categoryService.bulkAction(action, selectedCategories);
            // Refresh local state hoặc gọi lại API
            if (action === "delete") {
                setCategories(
                    categories.filter(
                        (cat) => !selectedCategories.includes(cat.id),
                    ),
                );
                setSelectedCategories([]);
            } else {
                const isActive = action === "activate";
                setCategories(
                    categories.map((cat) =>
                        selectedCategories.includes(cat.id)
                            ? { ...cat, isActive }
                            : cat,
                    ),
                );
            }
        } catch (err) {
            alert("Thao tác hàng loạt thất bại: " + err.message);
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
                        className="inline-flex items-center px-5 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 shadow-lg transition-all transform hover:-translate-y-0.5"
                    >
                        <PlusIcon className="h-5 w-5 mr-2" />
                        Thêm Danh Mục Mới
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <StatsCard
                        title="Tổng Danh Mục"
                        value={categories.length}
                        icon="📂"
                        color="bg-gradient-to-r from-blue-400 to-cyan-400"
                    />
                    <StatsCard
                        title="Đang Hoạt Động"
                        value={categories.filter((c) => c.isActive).length}
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

            {/* Controls */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 mb-6 border border-blue-100">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                    <div className="lg:col-span-2 relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <MagnifyingGlassIcon className="h-5 w-5 text-blue-500" />
                        </div>
                        <input
                            type="text"
                            placeholder="Tìm kiếm danh mục..."
                            className="w-full pl-12 pr-4 py-3 bg-white rounded-xl border border-blue-200 focus:ring-2 focus:ring-blue-300 transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="flex space-x-2">
                        <button
                            onClick={() => setViewMode("grid")}
                            className={`flex-1 px-4 py-2 rounded-xl border transition-all ${viewMode === "grid" ? "bg-white border-blue-400 text-blue-600 shadow-sm" : "bg-gray-100 text-gray-600"}`}
                        >
                            Grid
                        </button>
                        <button
                            onClick={() => setViewMode("list")}
                            className={`flex-1 px-4 py-2 rounded-xl border transition-all ${viewMode === "list" ? "bg-white border-blue-400 text-blue-600 shadow-sm" : "bg-gray-100 text-gray-600"}`}
                        >
                            List
                        </button>
                    </div>

                    <select
                        onChange={(e) => handleBulkAction(e.target.value)}
                        className="w-full px-4 py-3 bg-white rounded-xl border border-blue-200"
                        defaultValue=""
                    >
                        <option value="" disabled>
                            Hành động hàng loạt
                        </option>
                        <option value="activate">Kích hoạt đã chọn</option>
                        <option value="deactivate">Vô hiệu hóa đã chọn</option>
                        <option value="delete">Xóa đã chọn</option>
                    </select>
                </div>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                    <div className="w-20 h-20 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
                    <p className="mt-4 text-gray-600">Đang tải danh mục...</p>
                </div>
            ) : (
                <>
                    {viewMode === "grid" ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredCategories.map((category) => (
                                <div
                                    key={category.id}
                                    className={`bg-white rounded-2xl overflow-hidden border-2 transition-all hover:shadow-xl ${selectedCategories.includes(category.id) ? "border-blue-400 ring-2 ring-blue-100" : "border-gray-100"}`}
                                >
                                    <div className="h-40 relative">
                                        <img
                                            src={category.thumbnail}
                                            alt={category.name}
                                            className="w-full h-full object-cover"
                                        />
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
                                                className="h-5 w-5 rounded text-blue-600"
                                            />
                                        </div>
                                        <div className="absolute top-4 right-4">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-semibold ${category.isActive ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"}`}
                                            >
                                                {category.isActive
                                                    ? "Đang hoạt động"
                                                    : "Ngừng hoạt động"}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-5">
                                        <div className="flex items-center space-x-2 mb-2">
                                            <span className="text-2xl">
                                                {category.icon}
                                            </span>
                                            <h3 className="text-lg font-bold">
                                                {category.name}
                                            </h3>
                                        </div>

                                        <div className="grid grid-cols-2 gap-3 mb-4">
                                            <div className="bg-blue-50 rounded-lg p-3">
                                                <p className="text-xs text-blue-600">
                                                    Sản phẩm
                                                </p>
                                                <p className="text-lg font-bold">
                                                    {category.productCount}
                                                </p>
                                            </div>
                                            <div className="bg-purple-50 rounded-lg p-3">
                                                <p className="text-xs text-purple-600">
                                                    Con
                                                </p>
                                                <p className="text-lg font-bold">
                                                    {category.childrenCount}
                                                </p>
                                            </div>
                                        </div>

                                        {category.parentId && (
                                            <div className="flex items-center text-sm text-gray-500 mb-4">
                                                <ChevronRightIcon className="h-4 w-4 mr-1" />
                                                <span>
                                                    Thuộc:{" "}
                                                    {getParentCategory(
                                                        category.parentId,
                                                    )}
                                                </span>
                                            </div>
                                        )}

                                        <div className="flex items-center justify-between pt-4 border-t">
                                            <div className="flex space-x-2">
                                                <Link
                                                    to={`/admin/categories/${category.id}/edit`}
                                                    className="p-2 text-gray-600 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg"
                                                >
                                                    <PencilIcon className="h-5 w-5" />
                                                </Link>
                                                <button
                                                    onClick={() =>
                                                        handleDelete(
                                                            category.id,
                                                        )
                                                    }
                                                    className="p-2 text-gray-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg"
                                                >
                                                    <TrashIcon className="h-5 w-5" />
                                                </button>
                                            </div>
                                            <button
                                                onClick={() =>
                                                    toggleStatus(category.id)
                                                }
                                                className={`px-3 py-1 text-sm rounded-lg ${category.isActive ? "bg-emerald-100 text-emerald-700" : "bg-gray-100"}`}
                                            >
                                                {category.isActive
                                                    ? "Vô hiệu hóa"
                                                    : "Kích hoạt"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                                            Tên
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                                            Sản phẩm
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                                            Trạng thái
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                                            Thao tác
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {filteredCategories.map((category) => (
                                        <tr
                                            key={category.id}
                                            className="hover:bg-gray-50"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                    <span className="mr-3 text-xl">
                                                        {category.icon}
                                                    </span>
                                                    <div>
                                                        <div className="font-medium">
                                                            {category.name}
                                                        </div>
                                                        <div className="text-xs text-gray-400">
                                                            /{category.slug}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm">
                                                {category.productCount} sản phẩm
                                            </td>
                                            <td className="px-6 py-4">
                                                <span
                                                    className={`flex items-center ${category.isActive ? "text-emerald-600" : "text-rose-600"}`}
                                                >
                                                    {category.isActive ? (
                                                        <CheckCircleIcon className="h-5 w-5 mr-1" />
                                                    ) : (
                                                        <XCircleIcon className="h-5 w-5 mr-1" />
                                                    )}
                                                    {category.isActive
                                                        ? "Hoạt động"
                                                        : "Ngừng"}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex space-x-3">
                                                    <Link
                                                        to={`/admin/categories/${category.id}/edit`}
                                                        className="text-amber-600 hover:bg-amber-50 p-1 rounded"
                                                    >
                                                        <PencilIcon className="h-5 w-5" />
                                                    </Link>
                                                    <button
                                                        onClick={() =>
                                                            toggleStatus(
                                                                category.id,
                                                            )
                                                        }
                                                        className="text-blue-600 hover:bg-blue-50 p-1 rounded"
                                                    >
                                                        <ArrowPathIcon className="h-5 w-5" />
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                category.id,
                                                            )
                                                        }
                                                        className="text-rose-600 hover:bg-rose-50 p-1 rounded"
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
                    )}
                </>
            )}
        </div>
    );
};

export default CategoryList;
