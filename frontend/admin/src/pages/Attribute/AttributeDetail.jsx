import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAttribute } from "../../hooks/useAttribute";
import {
    ArrowLeftIcon,
    PencilIcon,
    CheckCircleIcon,
    XCircleIcon,
    InformationCircleIcon,
    TrashIcon,
} from "@heroicons/react/24/outline";

const AttributeDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { fetchAttributeById, updateAttribute, loading } = useAttribute();

    const [attribute, setAttribute] = useState(null);
    const [activeTab, setActiveTab] = useState("info");

    useEffect(() => {
        const load = async () => {
            const data = await fetchAttributeById(id);
            if (data) setAttribute(data);
        };
        load();
    }, [id, fetchAttributeById]);

    const handleDeleteOption = async (optionToDelete) => {
        if (
            window.confirm(
                `Bạn có chắc chắn muốn xóa giá trị "${optionToDelete.display_name}"?`,
            )
        ) {
            // Logic: Filter out the deleted option -> Update Attribute
            const newOptions = attribute.options.filter(
                (o) => o.id !== optionToDelete.id,
            );
            const result = await updateAttribute(id, {
                ...attribute,
                options: newOptions,
            });

            if (result.success) {
                // Update local state to reflect changes immediately
                setAttribute((prev) => ({ ...prev, options: newOptions }));
            } else {
                alert(`Lỗi: ${result.message}`);
            }
        }
    };

    if (loading || !attribute)
        return <div className="p-10 text-center">Đang tải...</div>;

    const showOptionsTab = ["SELECT", "RADIO", "CHECKBOX"].includes(
        attribute.input_type,
    );

    return (
        <div className="p-6">
            <div className="mb-6">
                <button
                    onClick={() => navigate("/admin/attributes")}
                    className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
                >
                    <ArrowLeftIcon className="h-5 w-5 mr-2" /> Quay lại danh
                    sách
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
                    <Link
                        to={`/admin/attributes/${id}/edit`}
                        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        <PencilIcon className="h-5 w-5 mr-2" /> Chỉnh sửa
                    </Link>
                </div>
            </div>

            <div className="border-b border-gray-200 mb-6">
                <nav className="-mb-px flex space-x-8">
                    <button
                        onClick={() => setActiveTab("info")}
                        className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === "info" ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}
                    >
                        Thông tin
                    </button>
                    {showOptionsTab && (
                        <button
                            onClick={() => setActiveTab("options")}
                            className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === "options" ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}
                        >
                            Danh sách giá trị{" "}
                            <span className="ml-2 px-2 py-0.5 text-xs bg-gray-200 rounded-full">
                                {attribute.options.length}
                            </span>
                        </button>
                    )}
                </nav>
            </div>

            {activeTab === "info" && (
                <div className="bg-white rounded-lg border border-gray-200 p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <div>
                            <label className="text-sm text-gray-500">
                                Tên thuộc tính
                            </label>
                            <p className="font-medium">{attribute.name}</p>
                        </div>
                        <div>
                            <label className="text-sm text-gray-500">
                                Mã (Code)
                            </label>
                            <p className="font-mono bg-gray-50 p-1 rounded inline-block">
                                {attribute.code}
                            </p>
                        </div>
                        <div>
                            <label className="text-sm text-gray-500">
                                Kiểu dữ liệu
                            </label>
                            <p>
                                {attribute.data_type} / {attribute.input_type}
                            </p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            {attribute.is_required ? (
                                <CheckCircleIcon className="w-5 h-5 text-green-500" />
                            ) : (
                                <XCircleIcon className="w-5 h-5 text-gray-400" />
                            )}{" "}
                            <span>Bắt buộc</span>
                        </div>
                        <div className="flex items-center gap-2">
                            {attribute.is_variant ? (
                                <CheckCircleIcon className="w-5 h-5 text-purple-500" />
                            ) : (
                                <XCircleIcon className="w-5 h-5 text-gray-400" />
                            )}{" "}
                            <span>Biến thể (Variant)</span>
                        </div>
                        <div className="flex items-center gap-2">
                            {attribute.is_filterable ? (
                                <CheckCircleIcon className="w-5 h-5 text-blue-500" />
                            ) : (
                                <XCircleIcon className="w-5 h-5 text-gray-400" />
                            )}{" "}
                            <span>Cho phép lọc</span>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === "options" && showOptionsTab && (
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Tên hiển thị
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Giá trị DB
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                                    Thao tác
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {attribute.options.map((option) => (
                                <tr key={option.id}>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                        {option.display_name}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-mono text-gray-600">
                                        {option.value}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() =>
                                                handleDeleteOption(option)
                                            }
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            <TrashIcon className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {attribute.options.length === 0 && (
                                <tr>
                                    <td
                                        colSpan="3"
                                        className="text-center py-4 text-gray-500"
                                    >
                                        Chưa có giá trị nào
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AttributeDetail;
