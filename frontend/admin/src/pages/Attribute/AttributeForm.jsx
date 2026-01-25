// pages/attributes/AttributeForm.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    ArrowLeftIcon,
    CheckCircleIcon,
    InformationCircleIcon,
} from "@heroicons/react/24/outline";

const AttributeForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = !!id;

    const [formData, setFormData] = useState({
        name: "",
        code: "",
        unit: "",
        data_type: "STRING",
        input_type: "TEXT",
        is_required: false,
        is_variant: false,
        is_filterable: false,
    });

    const [errors, setErrors] = useState({});

    const dataTypeOptions = [
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

    // Load data nếu là edit mode
    useEffect(() => {
        if (isEditMode) {
            // Fetch attribute data from API
            const mockAttribute = {
                id: id,
                name: "Màu sắc",
                code: "COLOR_ATTR",
                unit: "",
                data_type: "STRING",
                input_type: "SELECT",
                is_required: true,
                is_variant: true,
                is_filterable: true,
            };
            setFormData(mockAttribute);
        }
    }, [id, isEditMode]);

    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));

        // Clear error when field is edited
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: null }));
        }

        // Auto-enable variant for SELECT/RADIO/CHECKBOX
        if (
            field === "input_type" &&
            ["SELECT", "RADIO", "CHECKBOX"].includes(value)
        ) {
            setFormData((prev) => ({ ...prev, is_variant: true }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Tên thuộc tính là bắt buộc";
        }

        if (!formData.code.trim()) {
            newErrors.code = "Mã thuộc tính là bắt buộc";
        } else if (!/^[A-Z_]+$/.test(formData.code)) {
            newErrors.code =
                "Mã phải viết hoa và chỉ chứa chữ cái và dấu gạch dưới";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        // Xử lý lưu thuộc tính
        console.log("Saving attribute:", formData);

        // Sau khi lưu thành công
        alert(
            isEditMode
                ? "Cập nhật thuộc tính thành công!"
                : "Tạo thuộc tính thành công!",
        );
        navigate("/admin/attributes");
    };

    const handleCancel = () => {
        if (
            window.confirm(
                "Bạn có chắc muốn hủy? Các thay đổi sẽ không được lưu.",
            )
        ) {
            navigate("/admin/attributes");
        }
    };

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
                <h1 className="text-2xl font-bold text-gray-900">
                    {isEditMode ? "Chỉnh sửa Thuộc tính" : "Tạo Thuộc tính Mới"}
                </h1>
            </div>

            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-lg border border-gray-200 p-6"
            >
                {/* Basic Info Section */}
                <div className="mb-8">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">
                        Thông tin cơ bản
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Attribute Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Tên thuộc tính{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) =>
                                    handleChange("name", e.target.value)
                                }
                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.name ? "border-red-500" : "border-gray-300"}`}
                                placeholder="VD: Màu sắc, Kích thước, RAM"
                                required
                            />
                            {errors.name && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        {/* Attribute Code */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Mã thuộc tính{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={formData.code}
                                onChange={(e) =>
                                    handleChange(
                                        "code",
                                        e.target.value.toUpperCase(),
                                    )
                                }
                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.code ? "border-red-500" : "border-gray-300"}`}
                                placeholder="VD: COLOR_ATTR, SIZE_ATTR"
                                required
                                disabled={isEditMode} // Không cho sửa code khi edit
                            />
                            {errors.code && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.code}
                                </p>
                            )}
                            <p className="mt-1 text-xs text-gray-500">
                                Mã duy nhất, viết hoa, dùng gạch dưới. Không thể
                                thay đổi sau khi tạo.
                            </p>
                        </div>

                        {/* Unit */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Đơn vị (Tuỳ chọn)
                            </label>
                            <input
                                type="text"
                                value={formData.unit}
                                onChange={(e) =>
                                    handleChange("unit", e.target.value)
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="VD: GB, inch, kg, tháng"
                            />
                            <p className="mt-1 text-xs text-gray-500">
                                Để trống nếu không có đơn vị
                            </p>
                        </div>
                    </div>
                </div>

                {/* Data Configuration Section */}
                <div className="mb-8">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">
                        Cấu hình dữ liệu
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Data Type */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Kiểu dữ liệu{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <select
                                value={formData.data_type}
                                onChange={(e) =>
                                    handleChange("data_type", e.target.value)
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                {dataTypeOptions.map((option) => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Input Type */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Kiểu nhập{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                                {inputTypeOptions.map((option) => (
                                    <label
                                        key={option.value}
                                        className={`flex items-center p-3 border rounded-lg cursor-pointer ${formData.input_type === option.value ? "border-blue-500 bg-blue-50" : "border-gray-300"}`}
                                    >
                                        <input
                                            type="radio"
                                            name="input_type"
                                            value={option.value}
                                            checked={
                                                formData.input_type ===
                                                option.value
                                            }
                                            onChange={(e) =>
                                                handleChange(
                                                    "input_type",
                                                    e.target.value,
                                                )
                                            }
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                        />
                                        <span className="ml-2 text-sm text-gray-700">
                                            {option.label}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Business Configuration Section */}
                <div className="mb-8">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">
                        Cấu hình nghiệp vụ
                    </h2>
                    <div className="space-y-4">
                        <label className="flex items-start p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={formData.is_required}
                                onChange={(e) =>
                                    handleChange(
                                        "is_required",
                                        e.target.checked,
                                    )
                                }
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
                            />
                            <div className="ml-3">
                                <span className="text-sm font-medium text-gray-700">
                                    Bắt buộc
                                </span>
                                <p className="text-xs text-gray-500">
                                    Thuộc tính này phải được nhập khi tạo sản
                                    phẩm
                                </p>
                            </div>
                        </label>

                        <label
                            className={`flex items-start p-3 border rounded-lg cursor-pointer ${["SELECT", "RADIO", "CHECKBOX"].includes(formData.input_type) ? "border-gray-300 bg-gray-100" : "border-gray-300 hover:bg-gray-50"}`}
                        >
                            <input
                                type="checkbox"
                                checked={
                                    formData.is_variant ||
                                    ["SELECT", "RADIO", "CHECKBOX"].includes(
                                        formData.input_type,
                                    )
                                }
                                onChange={(e) =>
                                    !["SELECT", "RADIO", "CHECKBOX"].includes(
                                        formData.input_type,
                                    ) &&
                                    handleChange("is_variant", e.target.checked)
                                }
                                disabled={[
                                    "SELECT",
                                    "RADIO",
                                    "CHECKBOX",
                                ].includes(formData.input_type)}
                                className={`h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1 ${["SELECT", "RADIO", "CHECKBOX"].includes(formData.input_type) ? "opacity-50 cursor-not-allowed" : ""}`}
                            />
                            <div className="ml-3">
                                <span className="text-sm font-medium text-gray-700">
                                    Là biến thể
                                </span>
                                <p className="text-xs text-gray-500">
                                    Dùng để tạo SKU sản phẩm. Tự động bật khi
                                    chọn kiểu nhập SELECT/RADIO/CHECKBOX
                                </p>
                            </div>
                        </label>

                        <label className="flex items-start p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={formData.is_filterable}
                                onChange={(e) =>
                                    handleChange(
                                        "is_filterable",
                                        e.target.checked,
                                    )
                                }
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
                            />
                            <div className="ml-3">
                                <span className="text-sm font-medium text-gray-700">
                                    Có thể lọc
                                </span>
                                <p className="text-xs text-gray-500">
                                    Hiển thị trong bộ lọc sản phẩm trên trang
                                    frontend
                                </p>
                            </div>
                        </label>
                    </div>
                </div>

                {/* Info Box */}
                {formData.input_type === "SELECT" && (
                    <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex">
                            <InformationCircleIcon className="h-5 w-5 text-blue-400 mr-2" />
                            <div>
                                <h3 className="text-sm font-medium text-blue-800">
                                    Lưu ý về kiểu nhập SELECT
                                </h3>
                                <p className="mt-1 text-sm text-blue-700">
                                    Với kiểu nhập SELECT, bạn cần thêm các giá
                                    trị (options) sau khi tạo thuộc tính. Các
                                    giá trị này sẽ hiển thị trong dropdown khi
                                    tạo sản phẩm.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4 pt-6 border-t">
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
                        {isEditMode ? "Cập nhật" : "Tạo thuộc tính"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AttributeForm;
