import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAttribute } from "../../hooks/useAttribute";
import {
    MagnifyingGlassIcon,
    FunnelIcon,
    PlusIcon,
    PencilSquareIcon,
    TrashIcon,
    ArrowPathIcon,
    TagIcon,
    ListBulletIcon,
    AdjustmentsHorizontalIcon,
} from "@heroicons/react/24/outline";

const AttributeList = () => {
    const { attributes, loading, error, fetchAttributes, deleteAttribute } =
        useAttribute();
    const [filters, setFilters] = useState({ keyword: "", is_variant: "ALL" });
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        fetchAttributes();
    }, [fetchAttributes]);

    const handleDelete = async (id, count) => {
        if (count > 0) {
            alert(
                `Không thể xóa thuộc tính đang được dùng bởi ${count} sản phẩm!`,
            );
            return;
        }
        if (
            window.confirm(
                "Bạn chắc chắn muốn xóa thuộc tính này? Hành động không thể hoàn tác.",
            )
        ) {
            const result = await deleteAttribute(id);
            if (!result.success) alert(result.message);
        }
    };

    // Client-side filtering
    const filteredAttributes = attributes.filter((attr) => {
        const matchKeyword =
            (attr.name || "")
                .toLowerCase()
                .includes(filters.keyword.toLowerCase()) ||
            (attr.code || "")
                .toLowerCase()
                .includes(filters.keyword.toLowerCase());
        const matchVariant =
            filters.is_variant === "ALL" ||
            (filters.is_variant === "TRUE"
                ? attr.is_variant
                : !attr.is_variant);
        return matchKeyword && matchVariant;
    });

    const renderBadge = (active, text, colorClass) => {
        if (!active) return null;
        return (
            <span
                className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${colorClass} mr-1 mb-1`}
            >
                {text}
            </span>
        );
    };

    const getTypeIcon = (inputType) => {
        switch (inputType) {
            case "SELECT":
                return (
                    <ListBulletIcon className="w-4 h-4 mr-1 text-blue-500" />
                );
            case "RADIO":
                return (
                    <AdjustmentsHorizontalIcon className="w-4 h-4 mr-1 text-purple-500" />
                );
            default:
                return <TagIcon className="w-4 h-4 mr-1 text-gray-500" />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50/50 p-6">
            <div className="max-w-7xl mx-auto mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Danh sách thuộc tính
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Quản lý các đặc điểm sản phẩm (Màu, Size, Chất liệu...)
                    </p>
                </div>
                <Link
                    to="/admin/attributes/new"
                    className="flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 shadow-sm transition-all"
                >
                    <PlusIcon className="h-5 w-5 mr-2" /> Tạo mới
                </Link>
            </div>

            {error && (
                <div className="max-w-7xl mx-auto mb-4 p-4 bg-red-50 text-red-600 rounded-lg">
                    {error}
                </div>
            )}

            <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 mb-6 p-4">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="relative w-full md:w-96">
                        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm theo tên, mã..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg outline-none text-sm"
                            value={filters.keyword}
                            onChange={(e) =>
                                setFilters({
                                    ...filters,
                                    keyword: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className={`flex items-center px-3 py-2 border rounded-lg text-sm font-medium transition-colors ${showFilters ? "bg-blue-50 text-blue-700" : "bg-white text-gray-700"}`}
                        >
                            <FunnelIcon className="w-4 h-4 mr-2" /> Bộ lọc
                        </button>
                        <button
                            onClick={fetchAttributes}
                            className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
                            title="Làm mới"
                        >
                            <ArrowPathIcon className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {showFilters && (
                    <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in-down">
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                                Loại biến thể
                            </label>
                            <select
                                className="w-full p-2 border rounded-md text-sm"
                                onChange={(e) =>
                                    setFilters({
                                        ...filters,
                                        is_variant: e.target.value,
                                    })
                                }
                            >
                                <option value="ALL">Tất cả</option>
                                <option value="TRUE">
                                    Là biến thể (Variant)
                                </option>
                                <option value="FALSE">Thuộc tính thường</option>
                            </select>
                        </div>
                    </div>
                )}
            </div>

            <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {loading ? (
                    <div className="p-12 text-center text-gray-500">
                        Đang tải dữ liệu...
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50/80">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                                        Thông tin
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                                        Cấu hình
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                                        Loại dữ liệu
                                    </th>
                                    <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500 uppercase">
                                        Thống kê
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase">
                                        Hành động
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredAttributes.map((attr) => (
                                    <tr
                                        key={attr.id}
                                        className="hover:bg-gray-50/50 transition-colors group"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold text-lg">
                                                    {attr.name
                                                        ? attr.name.charAt(0)
                                                        : "?"}
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {attr.name}
                                                    </div>
                                                    <div className="text-xs font-mono text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded inline-block mt-0.5">
                                                        {attr.code}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-wrap max-w-[200px]">
                                                {renderBadge(
                                                    attr.is_variant,
                                                    "Variant",
                                                    "bg-purple-100 text-purple-800",
                                                )}
                                                {renderBadge(
                                                    attr.is_filterable,
                                                    "Filterable",
                                                    "bg-indigo-100 text-indigo-800",
                                                )}
                                                {renderBadge(
                                                    attr.is_required,
                                                    "Required",
                                                    "bg-red-100 text-red-800",
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                            <div className="flex items-center">
                                                {getTypeIcon(attr.input_type)}{" "}
                                                {attr.input_type} |{" "}
                                                {attr.data_type}
                                            </div>
                                            {attr.unit && (
                                                <div className="text-xs text-gray-500 mt-1">
                                                    Đơn vị: {attr.unit}
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="flex flex-col gap-1">
                                                {[
                                                    "SELECT",
                                                    "RADIO",
                                                    "CHECKBOX",
                                                ].includes(attr.input_type) && (
                                                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full border border-gray-200">
                                                        {attr.option_count}{" "}
                                                        Options
                                                    </span>
                                                )}
                                                <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full border border-blue-100">
                                                    {attr.product_count} SP
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Link
                                                    to={`/admin/attributes/${attr.id}`}
                                                    className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                                                >
                                                    <PencilSquareIcon className="w-5 h-5" />
                                                </Link>
                                                <button
                                                    onClick={() =>
                                                        handleDelete(
                                                            attr.id,
                                                            attr.product_count,
                                                        )
                                                    }
                                                    className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                                                >
                                                    <TrashIcon className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {filteredAttributes.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan="5"
                                            className="px-6 py-10 text-center text-gray-500"
                                        >
                                            Không tìm thấy dữ liệu
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AttributeList;
