// pages/attributes/AttributeDetail.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
    ArrowLeftIcon,
    PencilIcon,
    PlusIcon,
    TrashIcon,
    InformationCircleIcon,
    CheckCircleIcon,
    XCircleIcon,
    ArrowsUpDownIcon,
} from "@heroicons/react/24/outline";

const AttributeDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("info");
    const [attribute, setAttribute] = useState(null);
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(true);

    // Load attribute data
    useEffect(() => {
        const fetchAttribute = async () => {
            setLoading(true);
            // Mock data - thực tế sẽ fetch từ API
            const mockAttribute = {
                id: parseInt(id),
                name: "Màu sắc",
                code: "COLOR_ATTR",
                data_type: "STRING",
                input_type: "SELECT",
                unit: "",
                is_required: true,
                is_variant: true,
                is_filterable: true,
                created_at: "2023-10-01 10:30:45",
                updated_at: "2023-10-27 15:45:20",
                product_count: 156,
                option_count: 8,
            };

            const mockOptions = [
                {
                    id: 1,
                    display_name: "Đỏ",
                    value: "red",
                    sort_order: 1,
                    product_count: 45,
                },
                {
                    id: 2,
                    display_name: "Xanh dương",
                    value: "blue",
                    sort_order: 2,
                    product_count: 38,
                },
                {
                    id: 3,
                    display_name: "Xanh lá",
                    value: "green",
                    sort_order: 3,
                    product_count: 29,
                },
                {
                    id: 4,
                    display_name: "Vàng",
                    value: "yellow",
                    sort_order: 4,
                    product_count: 25,
                },
                {
                    id: 5,
                    display_name: "Đen",
                    value: "black",
                    sort_order: 5,
                    product_count: 42,
                },
                {
                    id: 6,
                    display_name: "Trắng",
                    value: "white",
                    sort_order: 6,
                    product_count: 37,
                },
                {
                    id: 7,
                    display_name: "Tím",
                    value: "purple",
                    sort_order: 7,
                    product_count: 18,
                },
                {
                    id: 8,
                    display_name: "Hồng",
                    value: "pink",
                    sort_order: 8,
                    product_count: 22,
                },
            ];

            setTimeout(() => {
                setAttribute(mockAttribute);
                setOptions(mockOptions);
                setLoading(false);
            }, 500);
        };

        fetchAttribute();
    }, [id]);

    const showOptionsTab = ["SELECT", "RADIO", "CHECKBOX"].includes(
        attribute?.input_type || "",
    );

    const handleDeleteOption = (option) => {
        if (option.product_count > 0) {
            alert(
                `Không thể xóa giá trị "${option.display_name}" vì đã có ${option.product_count} sản phẩm sử dụng.`,
            );
            return;
        }

        if (
            window.confirm(
                `Bạn có chắc chắn muốn xóa giá trị "${option.display_name}"?`,
            )
        ) {
            console.log("Deleting option:", option.id);
            // Gọi API để xóa
        }
    };

    const handleReorderOption = (optionId, direction) => {
        // Logic để sắp xếp lại option
        console.log(`Moving option ${optionId} ${direction}`);
    };

    if (loading) {
        return (
            <div className="p-6">
                <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="mt-4 text-gray-600">
                            Đang tải dữ liệu...
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6">
            {/* Header */}
            <div className="mb-6">
                <button
                    onClick={() => navigate("/admin/attributes")}
                    className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
                >
                    <ArrowLeftIcon className="h-5 w-5 mr-2" />
                    Quay lại danh sách
                </button>
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Chi tiết Thuộc tính
                        </h1>
                        <p className="text-gray-600">
                            {attribute.name} ({attribute.code})
                        </p>
                    </div>
                    <div className="flex space-x-2">
                        <Link
                            to={`/admin/attributes/${id}/edit`}
                            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            <PencilIcon className="h-5 w-5 mr-2" />
                            Chỉnh sửa
                        </Link>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 mb-6">
                <nav className="-mb-px flex space-x-8">
                    <button
                        onClick={() => setActiveTab("info")}
                        className={`py-4 px-1 border-b-2 font-medium text-sm ${
                            activeTab === "info"
                                ? "border-blue-500 text-blue-600"
                                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                    >
                        Thông tin thuộc tính
                    </button>
                    {showOptionsTab && (
                        <button
                            onClick={() => setActiveTab("options")}
                            className={`py-4 px-1 border-b-2 font-medium text-sm ${
                                activeTab === "options"
                                    ? "border-blue-500 text-blue-600"
                                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                            }`}
                        >
                            Danh sách giá trị
                            <span className="ml-2 px-2 py-1 text-xs font-medium bg-gray-200 text-gray-800 rounded-full">
                                {attribute.option_count}
                            </span>
                        </button>
                    )}
                    <button
                        onClick={() => setActiveTab("products")}
                        className={`py-4 px-1 border-b-2 font-medium text-sm ${
                            activeTab === "products"
                                ? "border-blue-500 text-blue-600"
                                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                    >
                        Sản phẩm sử dụng
                        <span className="ml-2 px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                            {attribute.product_count}
                        </span>
                    </button>
                </nav>
            </div>

            {/* Tab Content */}
            {activeTab === "info" && attribute && (
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-6">
                        Thông tin chi tiết
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Left Column */}
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">
                                    Tên thuộc tính
                                </label>
                                <p className="text-lg font-medium text-gray-900">
                                    {attribute.name}
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">
                                    Mã thuộc tính
                                </label>
                                <p className="font-mono text-lg font-medium text-gray-900">
                                    {attribute.code}
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">
                                    Kiểu dữ liệu
                                </label>
                                <span
                                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                        attribute.data_type === "STRING"
                                            ? "bg-blue-100 text-blue-800"
                                            : "bg-green-100 text-green-800"
                                    }`}
                                >
                                    {attribute.data_type}
                                </span>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">
                                    Kiểu nhập
                                </label>
                                <p className="text-lg font-medium text-gray-900">
                                    {attribute.input_type}
                                </p>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">
                                    Đơn vị
                                </label>
                                <p className="text-lg font-medium text-gray-900">
                                    {attribute.unit || "Không có"}
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">
                                    Cấu hình nghiệp vụ
                                </label>
                                <div className="space-y-3 mt-2">
                                    <div className="flex items-center">
                                        {attribute.is_required ? (
                                            <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                                        ) : (
                                            <XCircleIcon className="h-5 w-5 text-gray-400 mr-2" />
                                        )}
                                        <span className="text-gray-700">
                                            Bắt buộc khi tạo sản phẩm
                                        </span>
                                    </div>
                                    <div className="flex items-center">
                                        {attribute.is_variant ? (
                                            <CheckCircleIcon className="h-5 w-5 text-purple-500 mr-2" />
                                        ) : (
                                            <XCircleIcon className="h-5 w-5 text-gray-400 mr-2" />
                                        )}
                                        <span className="text-gray-700">
                                            Dùng để tạo biến thể (SKU)
                                        </span>
                                    </div>
                                    <div className="flex items-center">
                                        {attribute.is_filterable ? (
                                            <CheckCircleIcon className="h-5 w-5 text-amber-500 mr-2" />
                                        ) : (
                                            <XCircleIcon className="h-5 w-5 text-gray-400 mr-2" />
                                        )}
                                        <span className="text-gray-700">
                                            Hiển thị trong bộ lọc frontend
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">
                                    Ngày tạo
                                </label>
                                <p className="text-gray-700">
                                    {attribute.created_at}
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">
                                    Ngày cập nhật
                                </label>
                                <p className="text-gray-700">
                                    {attribute.updated_at}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Usage Stats */}
                    <div className="mt-8 pt-8 border-t">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            Thống kê sử dụng
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-gray-900">
                                        {attribute.product_count}
                                    </div>
                                    <p className="text-sm text-gray-500">
                                        Sản phẩm sử dụng
                                    </p>
                                </div>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-gray-900">
                                        {attribute.option_count}
                                    </div>
                                    <p className="text-sm text-gray-500">
                                        Giá trị định nghĩa
                                    </p>
                                </div>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-gray-900">
                                        8
                                    </div>
                                    <p className="text-sm text-gray-500">
                                        Danh mục áp dụng
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === "options" && showOptionsTab && (
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900">
                                Quản lý giá trị thuộc tính
                            </h2>
                            <p className="text-sm text-gray-500 mt-1">
                                Các giá trị sẽ hiển thị khi chọn thuộc tính này
                                trong sản phẩm
                            </p>
                        </div>
                        <Link
                            to={`/admin/attributes/${id}/options/new`}
                            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                        >
                            <PlusIcon className="h-5 w-5 mr-2" />
                            Thêm giá trị mới
                        </Link>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
                                        STT
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Tên hiển thị
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Giá trị
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Thứ tự
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
                                {options.map((option) => (
                                    <tr
                                        key={option.id}
                                        className="hover:bg-gray-50"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {option.id}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-medium text-gray-900">
                                                {option.display_name}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <code className="text-sm font-mono text-gray-900 bg-gray-100 px-2 py-1 rounded">
                                                {option.value}
                                            </code>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center space-x-2">
                                                <span className="text-sm text-gray-900">
                                                    {option.sort_order}
                                                </span>
                                                <div className="flex flex-col">
                                                    <button
                                                        onClick={() =>
                                                            handleReorderOption(
                                                                option.id,
                                                                "up",
                                                            )
                                                        }
                                                        className="text-gray-400 hover:text-gray-600"
                                                        disabled={
                                                            option.sort_order ===
                                                            1
                                                        }
                                                    >
                                                        <ArrowsUpDownIcon className="h-4 w-4 rotate-90" />
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handleReorderOption(
                                                                option.id,
                                                                "down",
                                                            )
                                                        }
                                                        className="text-gray-400 hover:text-gray-600"
                                                        disabled={
                                                            option.sort_order ===
                                                            options.length
                                                        }
                                                    >
                                                        <ArrowsUpDownIcon className="h-4 w-4 -rotate-90" />
                                                    </button>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold">
                                                {option.product_count}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex space-x-3">
                                                <Link
                                                    to={`/admin/attributes/${id}/options/${option.id}/edit`}
                                                    className="text-blue-600 hover:text-blue-900"
                                                >
                                                    Sửa
                                                </Link>
                                                <button
                                                    onClick={() =>
                                                        handleDeleteOption(
                                                            option,
                                                        )
                                                    }
                                                    className={`text-red-600 hover:text-red-900 ${option.product_count > 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                                                    title={
                                                        option.product_count > 0
                                                            ? "Không thể xóa (đã có sản phẩm sử dụng)"
                                                            : "Xóa"
                                                    }
                                                    disabled={
                                                        option.product_count > 0
                                                    }
                                                >
                                                    Xóa
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Empty State */}
                    {options.length === 0 && (
                        <div className="text-center py-12">
                            <InformationCircleIcon className="h-12 w-12 text-gray-400 mx-auto" />
                            <h3 className="mt-4 text-sm font-medium text-gray-900">
                                Chưa có giá trị nào
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                                Thêm các giá trị để sử dụng thuộc tính này trong
                                sản phẩm.
                            </p>
                            <div className="mt-6">
                                <Link
                                    to={`/admin/attributes/${id}/options/new`}
                                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    <PlusIcon className="h-5 w-5 mr-2" />
                                    Thêm giá trị đầu tiên
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {activeTab === "products" && (
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-6">
                        Sản phẩm sử dụng thuộc tính "{attribute?.name}"
                    </h2>
                    <div className="text-center py-12">
                        <InformationCircleIcon className="h-12 w-12 text-gray-400 mx-auto" />
                        <p className="mt-4 text-gray-500">
                            Tính năng này đang được phát triển. Sẽ hiển thị danh
                            sách sản phẩm sử dụng thuộc tính này.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AttributeDetail;
