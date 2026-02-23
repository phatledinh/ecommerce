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
    LinkIcon,
} from "@heroicons/react/24/outline";
import { useBrand } from "../../hooks/useBrand";
import { getImageUrl } from "../../utils/imageURL";
const BrandList = () => {
    const { brands, loading, deleteBrand, fetchBrands, toggleBrandStatus } =
        useBrand();

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [viewMode, setViewMode] = useState("grid");

    // Xử lý Search Server-side (Debounce 500ms)
    useEffect(() => {
        const delaySearch = setTimeout(() => {
            // Gọi API fetchBrands với tham số search
            fetchBrands({ search: searchTerm, page: 1, size: 10 });
        }, 500);

        return () => clearTimeout(delaySearch);
    }, [searchTerm, fetchBrands]);

    const handleDelete = async (id) => {
        if (window.confirm("Bạn có chắc muốn xóa thương hiệu này?")) {
            const result = await deleteBrand(id);
            if (!result.success) {
                alert("Xóa thất bại: " + result.error);
            }
        }
    };

    // Xử lý Toggle Status gọi xuống API thật
    const handleToggleStatus = async (id) => {
        const result = await toggleBrandStatus(id);
        if (!result.success) {
            alert("Lỗi cập nhật trạng thái: " + result.error);
        }
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
        alert(
            `Đang xử lý hành động: ${action} cho ${selectedBrands.length} mục`,
        );
    };

    // Helper format ngày
    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        return date.toLocaleDateString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
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

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <StatsCard
                        title="Tổng Thương Hiệu"
                        value={brands.length} // Nếu có API count riêng thì dùng state meta
                        icon="🏢"
                        color="bg-gradient-to-r from-blue-400 to-cyan-400"
                    />
                    <StatsCard
                        title="Đang Hoạt Động"
                        value={brands.filter((b) => b.isActive).length}
                        icon="✅"
                        color="bg-gradient-to-r from-emerald-400 to-teal-400"
                    />
                    <StatsCard
                        title="Tổng Sản Phẩm"
                        value={brands.reduce(
                            (sum, brand) => sum + (brand.productCount || 0),
                            0,
                        )}
                        icon="📦"
                        color="bg-gradient-to-r from-purple-400 to-pink-400"
                    />
                    <StatsCard
                        title="Đang Tạm Dừng"
                        value={brands.filter((b) => !b.isActive).length}
                        icon="⏸️"
                        color="bg-gradient-to-r from-amber-400 to-orange-400"
                    />
                </div>
            </div>

            {/* Search and Controls */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 mb-6 border border-blue-100">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                    {/* Search Input - Server side trigger via useEffect */}
                    <div className="lg:col-span-2">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <MagnifyingGlassIcon className="h-5 w-5 text-blue-500" />
                            </div>
                            <input
                                type="text"
                                placeholder="Tìm kiếm thương hiệu..."
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
                            className={`flex-1 px-4 py-2 rounded-xl border transition-all ${viewMode === "grid" ? "bg-white border-blue-400 text-blue-600 shadow-sm" : "bg-gray-100 border-gray-200 text-gray-600 hover:bg-gray-200"}`}
                        >
                            Grid View
                        </button>
                        <button
                            onClick={() => setViewMode("list")}
                            className={`flex-1 px-4 py-2 rounded-xl border transition-all ${viewMode === "list" ? "bg-white border-blue-400 text-blue-600 shadow-sm" : "bg-gray-100 border-gray-200 text-gray-600 hover:bg-gray-200"}`}
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
                            <option value="delete">Xóa đã chọn</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                    <div className="w-20 h-20 border-4 border-blue-200 rounded-full border-t-blue-500 animate-spin"></div>
                    <p className="mt-6 text-lg text-gray-600">
                        Đang tải dữ liệu...
                    </p>
                </div>
            ) : (
                <>
                    {viewMode === "grid" ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {brands.map((brand) => (
                                <div
                                    key={brand.id}
                                    className={`bg-white rounded-2xl overflow-hidden border-2 transition-all hover:shadow-xl ${selectedBrands.includes(brand.id) ? "border-blue-400 ring-2 ring-blue-100" : "border-gray-100 hover:border-blue-200"}`}
                                >
                                    <div className="relative">
                                        <div className="h-40 relative overflow-hidden bg-gray-50">
                                            <img
                                                src={
                                                    getImageUrl(brand.logo) ||
                                                    "/placeholder-brand.png"
                                                }
                                                alt={brand.name}
                                                className="w-full h-full object-contain p-4"
                                            />
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
                                            <div className="absolute top-4 right-4">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-semibold ${brand.isActive ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"}`}
                                                >
                                                    {brand.isActive
                                                        ? "Hoạt động"
                                                        : "Tạm dừng"}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="p-5">
                                            <div className="flex items-center space-x-2 mb-1">
                                                <BuildingLibraryIcon className="h-5 w-5 text-gray-400" />
                                                <h3 className="text-lg font-bold text-gray-900 truncate">
                                                    {brand.name}
                                                </h3>
                                            </div>
                                            <p className="text-sm text-gray-500 mb-4 truncate">
                                                /{brand.slug}
                                            </p>

                                            <div className="grid grid-cols-2 gap-3 mb-4">
                                                <div className="bg-blue-50 rounded-lg p-3">
                                                    <p className="text-xs text-blue-600">
                                                        Sản phẩm
                                                    </p>
                                                    <p className="text-lg font-bold text-gray-900">
                                                        {brand.productCount ||
                                                            0}
                                                    </p>
                                                </div>
                                                <div className="bg-purple-50 rounded-lg p-3">
                                                    <p className="text-xs text-purple-600">
                                                        Ngày tạo
                                                    </p>
                                                    <p className="text-sm font-bold text-gray-900">
                                                        {formatDate(
                                                            brand.createdAt,
                                                        )}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                                <div className="flex space-x-2">
                                                    <Link
                                                        to={`/admin/brands/${brand.id}`}
                                                        className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                                                    >
                                                        <EyeIcon className="h-5 w-5" />
                                                    </Link>
                                                    <Link
                                                        to={`/admin/brands/${brand.id}/edit`}
                                                        className="p-2 text-gray-600 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg"
                                                    >
                                                        <PencilIcon className="h-5 w-5" />
                                                    </Link>
                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                brand.id,
                                                            )
                                                        }
                                                        className="p-2 text-gray-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg"
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
                                                    className={`px-3 py-1 text-sm rounded-lg transition-colors ${brand.isActive ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                                                >
                                                    {brand.isActive
                                                        ? "Tắt"
                                                        : "Bật"}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gradient-to-r from-blue-50 to-indigo-50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-blue-700 uppercase">
                                            <input
                                                type="checkbox"
                                                className="h-4 w-4 rounded border-gray-300 text-blue-600"
                                            />
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-blue-700 uppercase">
                                            Thương Hiệu
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-blue-700 uppercase">
                                            Sản Phẩm
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-blue-700 uppercase">
                                            Trạng Thái
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-blue-700 uppercase">
                                            Thao Tác
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {brands.map((brand) => (
                                        <tr
                                            key={brand.id}
                                            className="hover:bg-blue-50/50 transition-colors"
                                        >
                                            <td className="px-6 py-4">
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
                                                    className="h-4 w-4 rounded border-gray-300 text-blue-600"
                                                />
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                    <div className="h-10 w-10 rounded-lg overflow-hidden mr-3 bg-gray-50 border border-gray-200">
                                                        <img
                                                            src={
                                                                getImageUrl(
                                                                    brand.logo,
                                                                ) ||
                                                                "/placeholder.png"
                                                            }
                                                            alt={brand.name}
                                                            className="h-full w-full object-contain"
                                                        />
                                                    </div>
                                                    <div>
                                                        <div className="font-medium text-gray-900">
                                                            {brand.name}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            /{brand.slug}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                                                    {brand.productCount || 0}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div
                                                    className={`flex items-center ${brand.isActive ? "text-emerald-600" : "text-rose-600"}`}
                                                >
                                                    {brand.isActive ? (
                                                        <CheckCircleIcon className="h-5 w-5 mr-2" />
                                                    ) : (
                                                        <XCircleIcon className="h-5 w-5 mr-2" />
                                                    )}
                                                    <span className="font-medium">
                                                        {brand.isActive
                                                            ? "Hoạt động"
                                                            : "Ngừng"}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center space-x-3">
                                                    <Link
                                                        to={`/admin/brands/${brand.id}`}
                                                        className="text-blue-600 hover:text-blue-800"
                                                    >
                                                        <EyeIcon className="h-5 w-5" />
                                                    </Link>
                                                    <Link
                                                        to={`/admin/brands/${brand.id}/edit`}
                                                        className="text-amber-600 hover:text-amber-800"
                                                    >
                                                        <PencilIcon className="h-5 w-5" />
                                                    </Link>
                                                    <button
                                                        onClick={() =>
                                                            handleToggleStatus(
                                                                brand.id,
                                                            )
                                                        }
                                                        className="text-emerald-600 hover:text-emerald-800"
                                                    >
                                                        <ArrowPathIcon className="h-5 w-5" />
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                brand.id,
                                                            )
                                                        }
                                                        className="text-rose-600 hover:text-rose-800"
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
