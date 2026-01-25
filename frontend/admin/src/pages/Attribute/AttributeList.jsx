// pages/attributes/AttributeList.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    MagnifyingGlassIcon,
    FunnelIcon,
    PlusIcon,
    PencilIcon,
    EyeIcon,
    TrashIcon,
    ArrowPathIcon,
    InformationCircleIcon,
    CheckCircleIcon,
    XCircleIcon,
} from "@heroicons/react/24/outline";

const AttributeList = () => {
    const navigate = useNavigate();
    const [filters, setFilters] = useState({
        search: "",
        isVariant: "all",
        isFilterable: "all",
        dataType: "all",
    });

    const [selectedAttributes, setSelectedAttributes] = useState([]);

    // Dữ liệu mẫu
    const attributes = [
        {
            id: 1,
            code: "COLOR_ATTR",
            name: "Màu sắc",
            data_type: "STRING",
            input_type: "SELECT",
            is_required: true,
            is_variant: true,
            is_filterable: true,
            unit: "",
            product_count: 156,
            created_at: "2023-10-01",
        },
        {
            id: 2,
            code: "SIZE_ATTR",
            name: "Kích thước",
            data_type: "STRING",
            input_type: "SELECT",
            is_required: true,
            is_variant: true,
            is_filterable: true,
            unit: "",
            product_count: 128,
            created_at: "2023-10-02",
        },
        {
            id: 3,
            code: "WEIGHT_ATTR",
            name: "Trọng lượng",
            data_type: "NUMBER",
            input_type: "TEXT",
            is_required: false,
            is_variant: false,
            is_filterable: true,
            unit: "kg",
            product_count: 89,
            created_at: "2023-10-03",
        },
        {
            id: 4,
            code: "MATERIAL_ATTR",
            name: "Chất liệu",
            data_type: "STRING",
            input_type: "RADIO",
            is_required: false,
            is_variant: true,
            is_filterable: true,
            unit: "",
            product_count: 67,
            created_at: "2023-10-04",
        },
        {
            id: 5,
            code: "WARRANTY_ATTR",
            name: "Bảo hành",
            data_type: "NUMBER",
            input_type: "TEXT",
            is_required: true,
            is_variant: false,
            is_filterable: false,
            unit: "tháng",
            product_count: 45,
            created_at: "2023-10-05",
        },
        {
            id: 6,
            code: "RAM_ATTR",
            name: "RAM",
            data_type: "NUMBER",
            input_type: "SELECT",
            is_required: true,
            is_variant: true,
            is_filterable: true,
            unit: "GB",
            product_count: 98,
            created_at: "2023-10-06",
        },
        {
            id: 7,
            code: "STORAGE_ATTR",
            name: "Bộ nhớ",
            data_type: "NUMBER",
            input_type: "SELECT",
            is_required: true,
            is_variant: true,
            is_filterable: true,
            unit: "GB",
            product_count: 76,
            created_at: "2023-10-07",
        },
        {
            id: 8,
            code: "BRAND_ATTR",
            name: "Thương hiệu",
            data_type: "STRING",
            input_type: "SELECT",
            is_required: true,
            is_variant: false,
            is_filterable: true,
            unit: "",
            product_count: 234,
            created_at: "2023-10-08",
        },
    ];

    const dataTypeOptions = [
        { value: "all", label: "Tất cả kiểu dữ liệu" },
        { value: "STRING", label: "Chuỗi (STRING)" },
        { value: "NUMBER", label: "Số (NUMBER)" },
        { value: "BOOLEAN", label: "Boolean" },
    ];

    const inputTypeOptions = [
        { value: "TEXT", label: "Text" },
        { value: "SELECT", label: "Select" },
        { value: "RADIO", label: "Radio" },
        { value: "CHECKBOX", label: "Checkbox" },
        { value: "TEXTAREA", label: "Textarea" },
    ];

    const handleFilterChange = (field, value) => {
        setFilters((prev) => ({ ...prev, [field]: value }));
    };

    const handleResetFilters = () => {
        setFilters({
            search: "",
            isVariant: "all",
            isFilterable: "all",
            dataType: "all",
        });
    };

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedAttributes(attributes.map((attr) => attr.id));
        } else {
            setSelectedAttributes([]);
        }
    };

    const handleSelectAttribute = (attributeId) => {
        setSelectedAttributes((prev) =>
            prev.includes(attributeId)
                ? prev.filter((id) => id !== attributeId)
                : [...prev, attributeId],
        );
    };

    const handleDeleteAttribute = (attribute) => {
        if (attribute.product_count > 0) {
            alert(
                `Không thể xóa thuộc tính "${attribute.name}" vì đã có ${attribute.product_count} sản phẩm sử dụng.`,
            );
            return;
        }

        if (
            window.confirm(
                `Bạn có chắc chắn muốn xóa thuộc tính "${attribute.name}"?`,
            )
        ) {
            console.log("Deleting attribute:", attribute.id);
            // Gọi API để xóa
        }
    };

    const handleBulkDelete = () => {
        const attributesToDelete = attributes.filter((attr) =>
            selectedAttributes.includes(attr.id),
        );
        const hasProducts = attributesToDelete.some(
            (attr) => attr.product_count > 0,
        );

        if (hasProducts) {
            alert(
                "Một số thuộc tính đã được sử dụng trong sản phẩm. Không thể xóa.",
            );
            return;
        }

        if (
            window.confirm(
                `Bạn có chắc chắn muốn xóa ${selectedAttributes.length} thuộc tính đã chọn?`,
            )
        ) {
            console.log("Bulk deleting:", selectedAttributes);
            // Gọi API để xóa hàng loạt
        }
    };

    const getInputTypeLabel = (type) => {
        const option = inputTypeOptions.find((opt) => opt.value === type);
        return option ? option.label : type;
    };

    return (
        <div className="p-6">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">
                    Quản lý Thuộc tính
                </h1>
                <p className="text-gray-600">
                    Quản lý các thuộc tính sản phẩm như màu sắc, kích thước,
                    RAM...
                </p>
            </div>

            {/* Filter Section */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    {/* Search */}
                    <div className="lg:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Tìm kiếm thuộc tính...
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                value={filters.search}
                                onChange={(e) =>
                                    handleFilterChange("search", e.target.value)
                                }
                                placeholder="Tên hoặc mã thuộc tính..."
                                className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>

                    {/* Is Variant Filter */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Là biến thể
                        </label>
                        <select
                            value={filters.isVariant}
                            onChange={(e) =>
                                handleFilterChange("isVariant", e.target.value)
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="all">Tất cả</option>
                            <option value="yes">Có</option>
                            <option value="no">Không</option>
                        </select>
                    </div>

                    {/* Is Filterable Filter */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Có thể lọc
                        </label>
                        <select
                            value={filters.isFilterable}
                            onChange={(e) =>
                                handleFilterChange(
                                    "isFilterable",
                                    e.target.value,
                                )
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="all">Tất cả</option>
                            <option value="yes">Có</option>
                            <option value="no">Không</option>
                        </select>
                    </div>

                    {/* Data Type Filter */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Kiểu dữ liệu
                        </label>
                        <select
                            value={filters.dataType}
                            onChange={(e) =>
                                handleFilterChange("dataType", e.target.value)
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            {dataTypeOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-500 flex items-center">
                        <InformationCircleIcon className="h-5 w-5 mr-1" />
                        Tổng: {attributes.length} thuộc tính
                    </div>
                    <div className="flex space-x-2">
                        <button
                            onClick={handleResetFilters}
                            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                            <ArrowPathIcon className="h-5 w-5 inline mr-1" />
                            Reset
                        </button>
                        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                            <FunnelIcon className="h-5 w-5 mr-2" />
                            Lọc
                        </button>
                    </div>
                </div>
            </div>

            {/* Bulk Actions */}
            {selectedAttributes.length > 0 && (
                <div className="bg-blue-50 p-4 rounded-lg mb-6 flex items-center justify-between">
                    <div className="flex items-center">
                        <span className="text-blue-700 font-medium">
                            Đã chọn {selectedAttributes.length} thuộc tính
                        </span>
                    </div>
                    <button
                        onClick={handleBulkDelete}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                        <TrashIcon className="h-5 w-5 inline mr-1" />
                        Xóa đã chọn
                    </button>
                </div>
            )}

            {/* Attributes Table */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-gray-900">
                        Danh sách Thuộc tính
                    </h2>
                    <Link
                        to="/admin/attributes/new"
                        className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                        <PlusIcon className="h-5 w-5 mr-2" />
                        Thêm thuộc tính mới
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
                                    <input
                                        type="checkbox"
                                        checked={
                                            selectedAttributes.length ===
                                            attributes.length
                                        }
                                        onChange={handleSelectAll}
                                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    ID
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Mã
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Tên thuộc tính
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Kiểu dữ liệu
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Kiểu nhập
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Bắt buộc
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Biến thể
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Lọc
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Đơn vị
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Sản phẩm
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Thao tác
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {attributes.map((attr) => (
                                <tr key={attr.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <input
                                            type="checkbox"
                                            checked={selectedAttributes.includes(
                                                attr.id,
                                            )}
                                            onChange={() =>
                                                handleSelectAttribute(attr.id)
                                            }
                                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {attr.id}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-mono text-gray-900">
                                            {attr.code}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-medium text-gray-900">
                                            {attr.name}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            Tạo: {attr.created_at}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span
                                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                                                attr.data_type === "STRING"
                                                    ? "bg-blue-100 text-blue-800"
                                                    : "bg-green-100 text-green-800"
                                            }`}
                                        >
                                            {attr.data_type}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {getInputTypeLabel(attr.input_type)}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {attr.is_required ? (
                                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                <CheckCircleIcon className="h-3 w-3 mr-1" />
                                                Có
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                <XCircleIcon className="h-3 w-3 mr-1" />
                                                Không
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {attr.is_variant ? (
                                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                                <CheckCircleIcon className="h-3 w-3 mr-1" />
                                                Có
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                <XCircleIcon className="h-3 w-3 mr-1" />
                                                Không
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {attr.is_filterable ? (
                                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                                                <CheckCircleIcon className="h-3 w-3 mr-1" />
                                                Có
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                <XCircleIcon className="h-3 w-3 mr-1" />
                                                Không
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {attr.unit || "-"}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold">
                                            {attr.product_count}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex space-x-2">
                                            <Link
                                                to={`/admin/attributes/${attr.id}`}
                                                className="text-blue-600 hover:text-blue-900"
                                                title="Xem chi tiết"
                                            >
                                                <EyeIcon className="h-5 w-5" />
                                            </Link>
                                            <Link
                                                to={`/admin/attributes/${attr.id}/edit`}
                                                className="text-green-600 hover:text-green-900"
                                                title="Chỉnh sửa"
                                            >
                                                <PencilIcon className="h-5 w-5" />
                                            </Link>
                                            <button
                                                onClick={() =>
                                                    handleDeleteAttribute(attr)
                                                }
                                                className={`text-red-600 hover:text-red-900 ${attr.product_count > 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                                                title={
                                                    attr.product_count > 0
                                                        ? "Không thể xóa (đã có sản phẩm sử dụng)"
                                                        : "Xóa"
                                                }
                                                disabled={
                                                    attr.product_count > 0
                                                }
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

                {/* Pagination */}
                <div className="px-6 py-4 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-700">
                                Hiển thị <span className="font-medium">1</span>{" "}
                                đến <span className="font-medium">8</span> trong
                                tổng số <span className="font-medium">56</span>{" "}
                                thuộc tính
                            </p>
                        </div>
                        <nav className="flex items-center space-x-2">
                            <button className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                                Previous
                            </button>
                            <button className="px-3 py-2 border border-blue-500 bg-blue-50 text-blue-600 rounded-md text-sm font-medium">
                                1
                            </button>
                            <button className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                                2
                            </button>
                            <button className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                                3
                            </button>
                            <span className="px-3 py-2 text-sm text-gray-700">
                                ...
                            </span>
                            <button className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                                10
                            </button>
                            <button className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                                Next
                            </button>
                        </nav>
                    </div>
                </div>
            </div>

            {/* Info Box */}
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex">
                    <InformationCircleIcon className="h-5 w-5 text-blue-400 mr-2" />
                    <div>
                        <h3 className="text-sm font-medium text-blue-800">
                            Lưu ý về thuộc tính
                        </h3>
                        <ul className="mt-1 text-sm text-blue-700 list-disc list-inside">
                            <li>
                                Thuộc tính <strong>Biến thể</strong> dùng để tạo
                                SKU sản phẩm
                            </li>
                            <li>
                                Thuộc tính <strong>Có thể lọc</strong> sẽ hiển
                                thị trong bộ lọc frontend
                            </li>
                            <li>
                                Không thể xóa thuộc tính đã được sử dụng trong
                                sản phẩm
                            </li>
                            <li>
                                Mã thuộc tính không được thay đổi sau khi tạo
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AttributeList;
