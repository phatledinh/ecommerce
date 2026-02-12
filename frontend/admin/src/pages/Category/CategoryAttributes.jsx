import { useState, useEffect } from "react";
import { PlusIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import attributeService from "../../services/attributeService";

const CategoryAttributes = ({
    selectedAttributes = [],
    onAttributesChange,
}) => {
    const [systemAttributes, setSystemAttributes] = useState([]);
    const [loading, setLoading] = useState(false);

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newAttrData, setNewAttrData] = useState({
        name: "",
        code: "",
        dataType: "string",
        inputType: "text",
    });

    useEffect(() => {
        loadSystemAttributes();
    }, []);

    const loadSystemAttributes = async () => {
        setLoading(true);
        try {
            const data = await attributeService.getAll();
            setSystemAttributes(data);
        } catch (error) {
            console.error("Failed to load attributes", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSelectAttribute = (e) => {
        const attrId = parseInt(e.target.value);
        if (!attrId) return;

        if (selectedAttributes.some((item) => item.attributeId === attrId)) {
            alert("Thuộc tính này đã có trong danh sách!");
            e.target.value = "";
            return;
        }

        const originalAttr = systemAttributes.find((a) => a.id === attrId);

        const newSelection = {
            attributeId: originalAttr.id,
            attributeName: originalAttr.name,
            attributeCode: originalAttr.code,
            isRequired: false,
            isFilterable: false,
            isVariant: false,
            sortOrder: selectedAttributes.length,
        };

        onAttributesChange([...selectedAttributes, newSelection]);
        e.target.value = "";
    };

    const updateRowState = (index, field, value) => {
        const updated = [...selectedAttributes];
        updated[index] = { ...updated[index], [field]: value };
        onAttributesChange(updated);
    };

    const removeAttribute = (index) => {
        const updated = selectedAttributes.filter((_, i) => i !== index);
        onAttributesChange(updated);
    };

    const handleCreateNewAttribute = async () => {
        if (!newAttrData.name || !newAttrData.code) {
            alert("Vui lòng nhập tên và mã thuộc tính");
            return;
        }

        try {
            const createdAttr = await attributeService.create(newAttrData);

            setSystemAttributes((prev) => [...prev, createdAttr]);

            const newSelection = {
                attributeId: createdAttr.id,
                attributeName: createdAttr.name,
                attributeCode: createdAttr.code,
                isRequired: false,
                isFilterable: false,
                isVariant: false,
                sortOrder: selectedAttributes.length,
            };
            onAttributesChange([...selectedAttributes, newSelection]);

            setShowCreateModal(false);
            setNewAttrData({
                name: "",
                code: "",
                dataType: "string",
                inputType: "text",
            });
        } catch (error) {
            alert(
                "Lỗi tạo thuộc tính: " +
                    (error.response?.data?.message || error.message),
            );
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">
                    Cấu hình Thuộc tính
                </h3>
                <button
                    type="button"
                    onClick={() => setShowCreateModal(true)}
                    className="flex items-center px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 font-medium text-sm transition-colors"
                >
                    <PlusIcon className="w-4 h-4 mr-1.5" /> Tạo thuộc tính mới
                </button>
            </div>

            <div className="relative">
                <select
                    className="w-full pl-4 pr-10 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none transition-all"
                    onChange={handleSelectAttribute}
                    defaultValue=""
                >
                    <option value="" disabled>
                        -- Chọn thuộc tính từ hệ thống --
                    </option>
                    {systemAttributes.map((attr) => (
                        <option key={attr.id} value={attr.id}>
                            {attr.name} ({attr.code})
                        </option>
                    ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-500">
                    <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                        ></path>
                    </svg>
                </div>
            </div>

            {selectedAttributes.length > 0 ? (
                <div className="overflow-hidden border border-gray-200 rounded-xl">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    Tên thuộc tính
                                </th>
                                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    Bắt buộc
                                </th>
                                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    Bộ lọc
                                </th>
                                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    Biến thể
                                </th>
                                <th className="px-6 py-3"></th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {selectedAttributes.map((item, index) => (
                                <tr
                                    key={item.attributeId || index}
                                    className="hover:bg-gray-50 transition-colors"
                                >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">
                                            {item.attributeName}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {item.attributeCode}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <input
                                            type="checkbox"
                                            checked={item.isRequired || false}
                                            onChange={(e) =>
                                                updateRowState(
                                                    index,
                                                    "isRequired",
                                                    e.target.checked,
                                                )
                                            }
                                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                        />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <input
                                            type="checkbox"
                                            checked={item.isFilterable || false}
                                            onChange={(e) =>
                                                updateRowState(
                                                    index,
                                                    "isFilterable",
                                                    e.target.checked,
                                                )
                                            }
                                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                        />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <input
                                            type="checkbox"
                                            checked={item.isVariant || false}
                                            onChange={(e) =>
                                                updateRowState(
                                                    index,
                                                    "isVariant",
                                                    e.target.checked,
                                                )
                                            }
                                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                        />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                removeAttribute(index)
                                            }
                                            className="text-gray-400 hover:text-red-600 transition-colors"
                                        >
                                            <TrashIcon className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="text-center py-10 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                    <p className="text-gray-500 text-sm">
                        Chưa có thuộc tính nào được chọn.
                    </p>
                </div>
            )}

            {showCreateModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-fade-in-up">
                        <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                            <h3 className="text-lg font-bold text-gray-800">
                                Tạo Thuộc tính Mới
                            </h3>
                            <button
                                onClick={() => setShowCreateModal(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <XMarkIcon className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Tên hiển thị
                                </label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                    placeholder="Ví dụ: Màu sắc"
                                    value={newAttrData.name}
                                    onChange={(e) =>
                                        setNewAttrData({
                                            ...newAttrData,
                                            name: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Mã (Code)
                                </label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                    placeholder="color, size..."
                                    value={newAttrData.code}
                                    onChange={(e) =>
                                        setNewAttrData({
                                            ...newAttrData,
                                            code: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Kiểu dữ liệu
                                    </label>
                                    <select
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                                        value={newAttrData.dataType}
                                        onChange={(e) =>
                                            setNewAttrData({
                                                ...newAttrData,
                                                dataType: e.target.value,
                                            })
                                        }
                                    >
                                        <option value="string">
                                            Chuỗi (String)
                                        </option>
                                        <option value="int">
                                            Số nguyên (Int)
                                        </option>
                                        <option value="date">Ngày tháng</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Kiểu nhập liệu
                                    </label>
                                    <select
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                                        value={newAttrData.inputType}
                                        onChange={(e) =>
                                            setNewAttrData({
                                                ...newAttrData,
                                                inputType: e.target.value,
                                            })
                                        }
                                    >
                                        <option value="text">
                                            Ô nhập (Text)
                                        </option>
                                        <option value="select">
                                            Danh sách (Select)
                                        </option>
                                        <option value="radio">
                                            Nút chọn (Radio)
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3">
                            <button
                                onClick={() => setShowCreateModal(false)}
                                className="px-5 py-2.5 text-gray-700 font-medium hover:bg-gray-200 rounded-xl transition-colors"
                            >
                                Hủy bỏ
                            </button>
                            <button
                                onClick={handleCreateNewAttribute}
                                className="px-5 py-2.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all"
                            >
                                Tạo & Thêm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CategoryAttributes;
