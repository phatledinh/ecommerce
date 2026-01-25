// pages/attributes/AttributeOptionForm.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    ArrowLeftIcon,
    CheckCircleIcon,
    InformationCircleIcon,
} from "@heroicons/react/24/outline";

const AttributeOptionForm = () => {
    const { id, optionId } = useParams();
    const navigate = useNavigate();
    const isEditMode = !!optionId;

    const [formData, setFormData] = useState({
        display_name: "",
        value: "",
        sort_order: 1,
    });

    const [errors, setErrors] = useState({});
    const [attribute, setAttribute] = useState(null);

    // Load attribute and option data
    useEffect(() => {
        const fetchData = async () => {
            // Mock attribute data
            const mockAttribute = {
                id: parseInt(id),
                name: "Màu sắc",
                code: "COLOR_ATTR",
                input_type: "SELECT",
            };
            setAttribute(mockAttribute);

            // Load option data if edit mode
            if (isEditMode) {
                const mockOption = {
                    id: parseInt(optionId),
                    display_name: "Đỏ",
                    value: "red",
                    sort_order: 1,
                };
                setFormData(mockOption);
            }
        };

        fetchData();
    }, [id, optionId, isEditMode]);

    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));

        // Clear error when field is edited
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: null }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.display_name.trim()) {
            newErrors.display_name = "Tên hiển thị là bắt buộc";
        }

        if (!formData.value.trim()) {
            newErrors.value = "Giá trị là bắt buộc";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        // Xử lý lưu option
        console.log("Saving option:", formData);

        // Sau khi lưu thành công
        alert(
            isEditMode
                ? "Cập nhật giá trị thành công!"
                : "Thêm giá trị thành công!",
        );
        navigate(`/admin/attributes/${id}`);
    };

    const handleCancel = () => {
        if (
            window.confirm(
                "Bạn có chắc muốn hủy? Các thay đổi sẽ không được lưu.",
            )
        ) {
            navigate(`/admin/attributes/${id}`);
        }
    };

    return (
        <div className="p-6">
            {/* Header */}
            <div className="mb-6">
                <button
                    onClick={() => navigate(`/admin/attributes/${id}`)}
                    className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
                >
                    <ArrowLeftIcon className="h-5 w-5 mr-2" />
                    Quay lại chi tiết thuộc tính
                </button>
                <h1 className="text-2xl font-bold text-gray-900">
                    {isEditMode
                        ? "Chỉnh sửa Giá trị Thuộc tính"
                        : "Thêm Giá trị Thuộc tính Mới"}
                </h1>
                {attribute && (
                    <p className="text-gray-600 mt-1">
                        Thuộc tính: {attribute.name} ({attribute.code})
                    </p>
                )}
            </div>

            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-lg border border-gray-200 p-6 max-w-2xl mx-auto"
            >
                <div className="space-y-6">
                    {/* Display Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Tên hiển thị <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={formData.display_name}
                            onChange={(e) =>
                                handleChange("display_name", e.target.value)
                            }
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.display_name ? "border-red-500" : "border-gray-300"}`}
                            placeholder="VD: Đỏ, 8GB, Lớn"
                            required
                        />
                        {errors.display_name && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.display_name}
                            </p>
                        )}
                        <p className="mt-1 text-xs text-gray-500">
                            Tên sẽ hiển thị cho người dùng trên website
                        </p>
                    </div>

                    {/* Value */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Giá trị <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={formData.value}
                            onChange={(e) =>
                                handleChange("value", e.target.value)
                            }
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.value ? "border-red-500" : "border-gray-300"}`}
                            placeholder="VD: red, 8, large"
                            required
                        />
                        {errors.value && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.value}
                            </p>
                        )}
                        <p className="mt-1 text-xs text-gray-500">
                            Giá trị dùng trong hệ thống, viết thường không dấu,
                            không khoảng trắng
                        </p>
                    </div>

                    {/* Sort Order */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Thứ tự sắp xếp
                        </label>
                        <input
                            type="number"
                            value={formData.sort_order}
                            onChange={(e) =>
                                handleChange(
                                    "sort_order",
                                    parseInt(e.target.value) || 1,
                                )
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            min="1"
                        />
                        <p className="mt-1 text-xs text-gray-500">
                            Số nhỏ hơn sẽ hiển thị trước trong danh sách
                        </p>
                    </div>

                    {/* Preview */}
                    {formData.display_name && (
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="text-sm font-medium text-gray-700 mb-2">
                                Xem trước
                            </h3>
                            <div className="flex items-center space-x-4">
                                <div className="text-sm">
                                    <span className="text-gray-500">
                                        Hiển thị:{" "}
                                    </span>
                                    <span className="font-medium">
                                        {formData.display_name}
                                    </span>
                                </div>
                                <div className="text-sm">
                                    <span className="text-gray-500">
                                        Giá trị:{" "}
                                    </span>
                                    <code className="font-mono bg-gray-200 px-2 py-1 rounded">
                                        {formData.value}
                                    </code>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Info Box */}
                <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex">
                        <InformationCircleIcon className="h-5 w-5 text-blue-400 mr-2" />
                        <div>
                            <h3 className="text-sm font-medium text-blue-800">
                                Lưu ý về giá trị thuộc tính
                            </h3>
                            <ul className="mt-1 text-sm text-blue-700 list-disc list-inside">
                                <li>
                                    Giá trị phải là duy nhất trong cùng thuộc
                                    tính
                                </li>
                                <li>
                                    Không thể xóa giá trị đã được sử dụng trong
                                    sản phẩm
                                </li>
                                <li>Có thể thay đổi thứ tự sắp xếp sau này</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4 pt-6 mt-6 border-t">
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                    >
                        Hủy
                    </button>
                    <button
                        type="submit"
                        className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        <CheckCircleIcon className="h-5 w-5 mr-2" />
                        {isEditMode ? "Cập nhật" : "Thêm giá trị"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AttributeOptionForm;
