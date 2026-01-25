// CategoryAttributes.jsx với chế độ controlled
import { useState, useEffect } from "react";
import {
    PlusIcon,
    PencilIcon,
    TrashIcon,
    CheckIcon,
    XMarkIcon,
    TagIcon,
    InformationCircleIcon,
    ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

const CategoryAttributes = ({
    attributes = [],
    onAttributesChange,
    readOnly = false,
    isCategorySaved = false,
}) => {
    // State cho modal và form
    const [showAttributeForm, setShowAttributeForm] = useState(false);
    const [editingAttribute, setEditingAttribute] = useState(null);
    const [attributeFormData, setAttributeFormData] = useState({
        name: "",
        type: "text",
        options: [""],
        isRequired: false,
        isFilterable: false,
    });

    // Không cần useEffect để fetch data nữa vì attributes được truyền từ parent

    const handleAddAttribute = () => {
        setEditingAttribute(null);
        setAttributeFormData({
            name: "",
            type: "text",
            options: [""],
            isRequired: false,
            isFilterable: false,
        });
        setShowAttributeForm(true);
    };

    const handleEditAttribute = (attribute) => {
        setEditingAttribute(attribute);
        setAttributeFormData({
            name: attribute.name,
            type: attribute.type,
            options: attribute.options || [""],
            isRequired: attribute.isRequired || false,
            isFilterable: attribute.isFilterable || false,
        });
        setShowAttributeForm(true);
    };

    const handleFormChange = (field, value) => {
        setAttributeFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleAddOption = () => {
        setAttributeFormData((prev) => ({
            ...prev,
            options: [...prev.options, ""],
        }));
    };

    const handleOptionChange = (index, value) => {
        const newOptions = [...attributeFormData.options];
        newOptions[index] = value;
        setAttributeFormData((prev) => ({
            ...prev,
            options: newOptions,
        }));
    };

    const handleRemoveOption = (index) => {
        if (attributeFormData.options.length > 1) {
            const newOptions = attributeFormData.options.filter(
                (_, i) => i !== index,
            );
            setAttributeFormData((prev) => ({
                ...prev,
                options: newOptions,
            }));
        }
    };

    const handleSaveAttribute = () => {
        // Validate
        if (!attributeFormData.name.trim()) {
            alert("Vui lòng nhập tên thuộc tính");
            return;
        }

        if (
            (attributeFormData.type === "select" ||
                attributeFormData.type === "multi_select") &&
            attributeFormData.options.some((opt) => !opt.trim())
        ) {
            alert("Vui lòng nhập đầy đủ các giá trị cho options");
            return;
        }

        const newAttribute = {
            id: editingAttribute ? editingAttribute.id : Date.now(),
            name: attributeFormData.name.trim(),
            type: attributeFormData.type,
            options:
                attributeFormData.type === "text" ||
                attributeFormData.type === "number"
                    ? []
                    : attributeFormData.options
                          .map((opt) => opt.trim())
                          .filter((opt) => opt),
            isRequired: attributeFormData.isRequired,
            isFilterable: attributeFormData.isFilterable,
        };

        if (editingAttribute) {
            // Cập nhật attribute
            const updatedAttributes = attributes.map((attr) =>
                attr.id === editingAttribute.id ? newAttribute : attr,
            );
            onAttributesChange?.(updatedAttributes);
        } else {
            // Thêm attribute mới
            const newAttributes = [...attributes, newAttribute];
            onAttributesChange?.(newAttributes);
        }

        handleCancelForm();
    };

    const handleDeleteAttribute = (id) => {
        if (window.confirm("Bạn có chắc muốn xóa thuộc tính này?")) {
            const filteredAttributes = attributes.filter(
                (attr) => attr.id !== id,
            );
            onAttributesChange?.(filteredAttributes);
        }
    };

    const handleCancelForm = () => {
        setShowAttributeForm(false);
        setEditingAttribute(null);
        setAttributeFormData({
            name: "",
            type: "text",
            options: [""],
            isRequired: false,
            isFilterable: false,
        });
    };

    // Render modal
    const renderAttributeFormModal = () => {
        return (
            <div className="fixed inset-0 z-50 overflow-y-auto">
                {/* Background mờ */}
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

                <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <div className="relative transform overflow-hidden rounded-xl bg-white text-left shadow-xl transition-all w-full max-w-md">
                        {/* Header */}
                        <div className="bg-white px-6 py-4 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-medium text-gray-900">
                                    {editingAttribute
                                        ? "Chỉnh sửa thuộc tính"
                                        : "Thêm thuộc tính mới"}
                                </h3>
                                <button
                                    onClick={handleCancelForm}
                                    className="text-gray-400 hover:text-gray-500"
                                >
                                    <XMarkIcon className="h-6 w-6" />
                                </button>
                            </div>
                        </div>

                        {/* Form content */}
                        <div className="px-6 py-4 max-h-[60vh] overflow-y-auto">
                            {/* Thông báo khi danh mục chưa được lưu */}
                            {!isCategorySaved && (
                                <div className="mb-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-100 p-3">
                                    <div className="flex items-center">
                                        <ExclamationTriangleIcon className="h-5 w-5 text-amber-600 mr-2 flex-shrink-0" />
                                        <div>
                                            <p className="text-sm text-amber-700">
                                                Thuộc tính sẽ được lưu cùng với
                                                danh mục khi bạn nhấn "Tạo danh
                                                mục mới".
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="space-y-4">
                                {/* Tên thuộc tính */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Tên thuộc tính *
                                    </label>
                                    <input
                                        type="text"
                                        value={attributeFormData.name}
                                        onChange={(e) =>
                                            handleFormChange(
                                                "name",
                                                e.target.value,
                                            )
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Ví dụ: RAM, Dung lượng, Màu sắc"
                                    />
                                </div>

                                {/* Loại thuộc tính */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-3">
                                        Loại thuộc tính
                                    </label>
                                    <div className="grid grid-cols-2 gap-3">
                                        {[
                                            { value: "text", label: "Text" },
                                            {
                                                value: "number",
                                                label: "Number",
                                            },
                                            {
                                                value: "select",
                                                label: "Select",
                                            },
                                            {
                                                value: "multi_select",
                                                label: "Multi Select",
                                            },
                                        ].map((type) => (
                                            <label
                                                key={type.value}
                                                className={`flex items-center justify-center p-3 border rounded-lg cursor-pointer transition-colors ${
                                                    attributeFormData.type ===
                                                    type.value
                                                        ? "border-blue-500 bg-blue-50"
                                                        : "border-gray-300 hover:border-gray-400"
                                                }`}
                                            >
                                                <input
                                                    type="radio"
                                                    name="type"
                                                    value={type.value}
                                                    checked={
                                                        attributeFormData.type ===
                                                        type.value
                                                    }
                                                    onChange={(e) =>
                                                        handleFormChange(
                                                            "type",
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="sr-only"
                                                />
                                                <span className="text-sm font-medium">
                                                    {type.label}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Options cho Select/Multi Select */}
                                {(attributeFormData.type === "select" ||
                                    attributeFormData.type ===
                                        "multi_select") && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Danh sách giá trị
                                        </label>
                                        <div className="space-y-2">
                                            {attributeFormData.options.map(
                                                (option, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex space-x-2"
                                                    >
                                                        <input
                                                            type="text"
                                                            value={option}
                                                            onChange={(e) =>
                                                                handleOptionChange(
                                                                    index,
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                            placeholder="Nhập giá trị..."
                                                        />
                                                        {attributeFormData
                                                            .options.length >
                                                            1 && (
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    handleRemoveOption(
                                                                        index,
                                                                    )
                                                                }
                                                                className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                            >
                                                                <XMarkIcon className="h-5 w-5" />
                                                            </button>
                                                        )}
                                                    </div>
                                                ),
                                            )}
                                            <button
                                                type="button"
                                                onClick={handleAddOption}
                                                className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 mt-2"
                                            >
                                                <PlusIcon className="h-4 w-4 mr-1" />
                                                Thêm giá trị mới
                                            </button>
                                        </div>
                                        <p className="mt-2 text-xs text-gray-500">
                                            Các giá trị này sẽ được dùng cho
                                            dropdown khi tạo sản phẩm
                                        </p>
                                    </div>
                                )}

                                {/* Checkboxes */}
                                <div className="space-y-3 pt-4 border-t border-gray-200">
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={
                                                attributeFormData.isRequired
                                            }
                                            onChange={(e) =>
                                                handleFormChange(
                                                    "isRequired",
                                                    e.target.checked,
                                                )
                                            }
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        />
                                        <span className="ml-3 text-sm text-gray-700">
                                            Bắt buộc nhập khi tạo sản phẩm
                                        </span>
                                    </label>

                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={
                                                attributeFormData.isFilterable
                                            }
                                            onChange={(e) =>
                                                handleFormChange(
                                                    "isFilterable",
                                                    e.target.checked,
                                                )
                                            }
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        />
                                        <span className="ml-3 text-sm text-gray-700">
                                            Hiển thị ngoài bộ lọc sản phẩm
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                            <div className="flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={handleCancelForm}
                                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Hủy
                                </button>
                                <button
                                    type="button"
                                    onClick={handleSaveAttribute}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                                >
                                    <CheckIcon className="h-5 w-5 mr-2" />
                                    {editingAttribute
                                        ? "Cập nhật"
                                        : "Thêm thuộc tính"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-6">
            {/* Info Panel */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-start">
                    <InformationCircleIcon className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                        <h3 className="text-sm font-medium text-blue-900">
                            Quản lý thuộc tính danh mục
                        </h3>
                        <p className="text-sm text-blue-700 mt-1">
                            {isCategorySaved
                                ? "Các thuộc tính được gán ở đây sẽ xuất hiện khi tạo sản phẩm thuộc danh mục này."
                                : "Bạn có thể thêm thuộc tính ngay bây giờ. Tất cả sẽ được lưu cùng với danh mục khi bạn nhấn 'Tạo danh mục mới'."}
                        </p>
                    </div>
                </div>
            </div>

            {/* Attributes List */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                    <div>
                        <h3 className="text-lg font-medium text-gray-900">
                            Danh sách thuộc tính
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                            {attributes.length} thuộc tính đã được thêm
                        </p>
                    </div>
                    {!readOnly && (
                        <button
                            type="button"
                            onClick={handleAddAttribute}
                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <PlusIcon className="h-5 w-5 mr-2" />
                            Thêm thuộc tính
                        </button>
                    )}
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Tên thuộc tính
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Kiểu
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Bắt buộc
                                </th>
                                {!readOnly && (
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Thao tác
                                    </th>
                                )}
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {attributes.length > 0 ? (
                                attributes.map((attribute) => (
                                    <tr
                                        key={attribute.id}
                                        className="hover:bg-gray-50 transition-colors"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-8 w-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                                    <TagIcon className="h-4 w-4 text-blue-600" />
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {attribute.name}
                                                    </div>
                                                    {attribute.options &&
                                                        attribute.options
                                                            .length > 0 && (
                                                            <div className="text-xs text-gray-500 mt-1">
                                                                {attribute.options
                                                                    .slice(0, 3)
                                                                    .join(", ")}
                                                                {attribute
                                                                    .options
                                                                    .length >
                                                                    3 && "..."}
                                                            </div>
                                                        )}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className={`px-2 py-1 text-xs font-medium rounded ${
                                                    attribute.type === "select"
                                                        ? "bg-purple-100 text-purple-800"
                                                        : attribute.type ===
                                                            "multi_select"
                                                          ? "bg-pink-100 text-pink-800"
                                                          : attribute.type ===
                                                              "number"
                                                            ? "bg-green-100 text-green-800"
                                                            : "bg-blue-100 text-blue-800"
                                                }`}
                                            >
                                                {attribute.type === "select"
                                                    ? "Select"
                                                    : attribute.type ===
                                                        "multi_select"
                                                      ? "Multi Select"
                                                      : attribute.type ===
                                                          "number"
                                                        ? "Number"
                                                        : "Text"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {attribute.isRequired ? (
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                                                    <CheckIcon className="h-3 w-3 mr-1" />
                                                    Bắt buộc
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                    Tùy chọn
                                                </span>
                                            )}
                                        </td>
                                        {!readOnly && (
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                <div className="flex space-x-2">
                                                    <button
                                                        onClick={() =>
                                                            handleEditAttribute(
                                                                attribute,
                                                            )
                                                        }
                                                        className="text-blue-600 hover:text-blue-900 p-1 hover:bg-blue-50 rounded transition-colors"
                                                        title="Chỉnh sửa"
                                                    >
                                                        <PencilIcon className="h-5 w-5" />
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handleDeleteAttribute(
                                                                attribute.id,
                                                            )
                                                        }
                                                        className="text-red-600 hover:text-red-900 p-1 hover:bg-red-50 rounded transition-colors"
                                                        title="Xóa"
                                                    >
                                                        <TrashIcon className="h-5 w-5" />
                                                    </button>
                                                </div>
                                            </td>
                                        )}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={readOnly ? 3 : 4}
                                        className="px-6 py-12 text-center"
                                    >
                                        <div className="text-gray-500">
                                            <TagIcon className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                                            <p className="text-lg font-medium text-gray-900 mb-2">
                                                Chưa có thuộc tính nào
                                            </p>
                                            <p className="text-gray-600 mb-4">
                                                {readOnly
                                                    ? "Danh mục này chưa có thuộc tính nào được cấu hình"
                                                    : "Thêm thuộc tính để bắt đầu cấu hình"}
                                            </p>
                                            {!readOnly && (
                                                <button
                                                    onClick={handleAddAttribute}
                                                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                                >
                                                    <PlusIcon className="h-5 w-5 mr-2" />
                                                    Thêm thuộc tính đầu tiên
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {showAttributeForm && renderAttributeFormModal()}
        </div>
    );
};

export default CategoryAttributes;
