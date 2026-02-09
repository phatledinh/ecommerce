import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAttribute } from "../../hooks/useAttribute";
import {
    ArrowLeftIcon,
    TrashIcon,
    Bars3Icon,
    SparklesIcon,
    PlusIcon,
} from "@heroicons/react/24/outline";

const AttributeForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = !!id;

    const { fetchAttributeById, createAttribute, updateAttribute, loading } =
        useAttribute();

    const [formData, setFormData] = useState({
        name: "",
        code: "",
        unit: "",
        dataType: "STRING",
        inputType: "TEXT",
        isRequired: false,
        isVariant: false,
        isFilterable: false,
    });

    const [options, setOptions] = useState([
        { id: Date.now(), displayName: "", value: "", sortOrder: 0 },
    ]);

    const [errors, setErrors] = useState({});
    const [touchedCode, setTouchedCode] = useState(false);

    const INPUT_TYPES = [
        { id: "TEXT", label: "Text Box", icon: "Aa", dataType: "STRING" },
        { id: "TEXTAREA", label: "Text Area", icon: "¶", dataType: "STRING" },
        { id: "NUMBER", label: "Number", icon: "123", dataType: "INTEGER" },
        { id: "DATE", label: "Date Picker", icon: "📅", dataType: "DATE" },
        {
            id: "SELECT",
            label: "Dropdown",
            icon: "▼",
            dataType: "STRING",
            hasOptions: true,
        },
        {
            id: "RADIO",
            label: "Radio Button",
            icon: "◉",
            dataType: "STRING",
            hasOptions: true,
        },
        {
            id: "CHECKBOX",
            label: "Multi Select",
            icon: "☑",
            dataType: "STRING",
            hasOptions: true,
        },
    ];

    useEffect(() => {
        if (isEditMode) {
            const loadData = async () => {
                const data = await fetchAttributeById(id);
                if (data) {
                    setFormData({
                        name: data.name,
                        code: data.code,
                        unit: data.unit || "",
                        dataType: data.dataType,
                        inputType: data.inputType,
                        isRequired: data.isRequired,
                        isVariant: data.isVariant,
                        isFilterable: data.isFilterable,
                    });

                    if (data.options && data.options.length > 0) {
                        setOptions(
                            data.options.map((opt) => ({
                                id: opt.id,
                                displayName: opt.displayName,
                                value: opt.value,
                                sortOrder: opt.sortOrder,
                            })),
                        );
                    } else {
                        setOptions([
                            {
                                id: Date.now(),
                                displayName: "",
                                value: "",
                                sortOrder: 0,
                            },
                        ]);
                    }
                    setTouchedCode(true);
                }
            };
            loadData();
        }
    }, [isEditMode, id, fetchAttributeById]);

    const handleNameChange = (val) => {
        const updates = { name: val };
        if (!isEditMode && !touchedCode) {
            const generatedCode = val
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .toUpperCase()
                .trim()
                .replace(/[^A-Z0-9 ]/g, "")
                .replace(/\s+/g, "_");
            updates.code = generatedCode;
        }
        setFormData((prev) => ({ ...prev, ...updates }));
        if (errors.name) setErrors((prev) => ({ ...prev, name: null }));
    };

    const handleOptionChange = (id, field, value) => {
        setOptions((prev) =>
            prev.map((opt) =>
                opt.id === id ? { ...opt, [field]: value } : opt,
            ),
        );
    };

    const addOption = () => {
        setOptions((prev) => [
            ...prev,
            {
                id: Date.now(),
                displayName: "",
                value: "",
                sortOrder: prev.length,
            },
        ]);
    };

    const removeOption = (id) => {
        if (options.length === 1) return;
        setOptions((prev) => prev.filter((opt) => opt.id !== id));
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Vui lòng nhập tên";
        if (!formData.code.trim()) newErrors.code = "Vui lòng nhập mã";

        const currentType = INPUT_TYPES.find(
            (t) => t.id === formData.inputType,
        );
        if (currentType?.hasOptions) {
            const hasEmpty = options.some(
                (o) => !o.displayName.trim() || !o.value.trim(),
            );
            if (hasEmpty)
                newErrors.options = "Vui lòng điền đầy đủ Nhãn và Giá trị";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        const currentType = INPUT_TYPES.find(
            (t) => t.id === formData.inputType,
        );

        const payload = {
            ...formData,
            options: currentType?.hasOptions ? options : [],
        };

        let result;
        if (isEditMode) {
            result = await updateAttribute(id, payload);
        } else {
            result = await createAttribute(payload);
        }

        if (result.success) {
            alert("Lưu thành công!");
            navigate("/admin/attributes");
        } else {
            alert(`Lỗi: ${result.message}`);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50/50 p-6">
            <div className="max-w-5xl mx-auto mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 hover:bg-white rounded-full transition-colors"
                    >
                        <ArrowLeftIcon className="w-5 h-5 text-gray-500" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            {isEditMode
                                ? `Cập nhật: ${formData.name}`
                                : "Tạo thuộc tính mới"}
                        </h1>
                        <p className="text-sm text-gray-500">
                            Định nghĩa các thuộc tính sản phẩm (Master Data)
                        </p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => navigate(-1)}
                        className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50"
                    >
                        Hủy bỏ
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 disabled:opacity-50"
                    >
                        {loading ? (
                            "Đang lưu..."
                        ) : (
                            <>
                                <SparklesIcon className="w-4 h-4" /> Lưu thuộc
                                tính
                            </>
                        )}
                    </button>
                </div>
            </div>

            <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                            <h3 className="font-semibold text-gray-800">
                                Thông tin chung
                            </h3>
                        </div>
                        <div className="p-6 space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-gray-700">
                                        Tên thuộc tính{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) =>
                                            handleNameChange(e.target.value)
                                        }
                                        className={`w-full px-3 py-2 border rounded-lg ${errors.name ? "border-red-500" : "border-gray-300"}`}
                                        placeholder="Ví dụ: Màu sắc"
                                    />
                                    {errors.name && (
                                        <p className="text-xs text-red-500">
                                            {errors.name}
                                        </p>
                                    )}
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-gray-700">
                                        Mã định danh (Code){" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.code}
                                        disabled={isEditMode}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                code: e.target.value.toUpperCase(),
                                            })
                                        }
                                        className="w-full px-3 py-2 border rounded-lg bg-gray-50 font-mono text-sm uppercase"
                                    />
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-gray-700">
                                    Đơn vị tính
                                </label>
                                <input
                                    type="text"
                                    value={formData.unit}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            unit: e.target.value,
                                        })
                                    }
                                    className="w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded-lg"
                                    placeholder="VD: kg, cm..."
                                />
                            </div>
                        </div>
                    </div>

                    {/* Kiểm tra hasOptions dựa trên inputType mới */}
                    {INPUT_TYPES.find((t) => t.id === formData.inputType)
                        ?.hasOptions && (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                                <h3 className="font-semibold text-gray-800">
                                    Danh sách giá trị (Options)
                                </h3>
                                <button
                                    onClick={addOption}
                                    className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                                >
                                    <PlusIcon className="w-4 h-4" /> Thêm giá
                                    trị
                                </button>
                            </div>
                            <div className="p-4 space-y-3">
                                <div className="grid grid-cols-12 gap-3 text-xs font-semibold text-gray-500 uppercase px-2">
                                    <div className="col-span-1"></div>
                                    <div className="col-span-5">
                                        Nhãn hiển thị
                                    </div>
                                    <div className="col-span-5">
                                        Giá trị nội bộ
                                    </div>
                                    <div className="col-span-1"></div>
                                </div>
                                {options.map((opt) => (
                                    <div
                                        key={opt.id}
                                        className="grid grid-cols-12 gap-3 items-center group"
                                    >
                                        <div className="col-span-1 flex justify-center text-gray-300">
                                            <Bars3Icon className="w-5 h-5" />
                                        </div>
                                        <div className="col-span-5">
                                            <input
                                                type="text"
                                                value={opt.displayName}
                                                onChange={(e) =>
                                                    handleOptionChange(
                                                        opt.id,
                                                        "displayName",
                                                        e.target.value,
                                                    )
                                                }
                                                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md"
                                                placeholder="Nhãn (VD: Đỏ)"
                                            />
                                        </div>
                                        <div className="col-span-5">
                                            <input
                                                type="text"
                                                value={opt.value}
                                                onChange={(e) =>
                                                    handleOptionChange(
                                                        opt.id,
                                                        "value",
                                                        e.target.value,
                                                    )
                                                }
                                                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md font-mono"
                                                placeholder="Giá trị (VD: RED)"
                                            />
                                        </div>
                                        <div className="col-span-1 flex justify-center">
                                            <button
                                                onClick={() =>
                                                    removeOption(opt.id)
                                                }
                                                className="p-1.5 text-gray-400 hover:text-red-500"
                                            >
                                                <TrashIcon className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                {errors.options && (
                                    <p className="text-sm text-red-500 text-center">
                                        {errors.options}
                                    </p>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                <div className="space-y-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                        <h3 className="font-semibold text-gray-800 mb-4">
                            Loại dữ liệu
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                            {INPUT_TYPES.map((type) => (
                                <button
                                    key={type.id}
                                    type="button"
                                    onClick={() =>
                                        setFormData({
                                            ...formData,
                                            inputType: type.id,
                                            dataType: type.dataType,
                                        })
                                    }
                                    className={`flex flex-col items-center justify-center p-3 rounded-lg border text-sm transition-all ${formData.inputType === type.id ? "border-blue-500 bg-blue-50 text-blue-700 ring-1 ring-blue-500" : "border-gray-200 hover:bg-gray-50"}`}
                                >
                                    <span className="text-xl mb-1">
                                        {type.icon}
                                    </span>
                                    {type.label}
                                </button>
                            ))}
                        </div>
                        {/* Hiển thị dataType hiện tại để debug/kiểm tra */}
                        <div className="mt-3 text-xs text-gray-500 text-center">
                            Data Type:{" "}
                            <span className="font-mono font-semibold">
                                {formData.dataType}
                            </span>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 space-y-4">
                        <h3 className="font-semibold text-gray-800 mb-2">
                            Cấu hình
                        </h3>
                        <label className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer">
                            <input
                                type="checkbox"
                                checked={formData.isRequired}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        isRequired: e.target.checked,
                                    })
                                }
                                className="w-4 h-4 text-blue-600 rounded"
                            />
                            <span className="text-sm font-medium">
                                Bắt buộc nhập
                            </span>
                        </label>
                        <label className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer">
                            <input
                                type="checkbox"
                                checked={formData.isFilterable}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        isFilterable: e.target.checked,
                                    })
                                }
                                className="w-4 h-4 text-blue-600 rounded"
                            />
                            <span className="text-sm font-medium">
                                Dùng để lọc (Filter)
                            </span>
                        </label>
                        <label
                            className={`flex items-center gap-3 p-2 rounded cursor-pointer ${formData.isVariant ? "bg-indigo-50" : "hover:bg-gray-50"}`}
                        >
                            <input
                                type="checkbox"
                                checked={formData.isVariant}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        isVariant: e.target.checked,
                                    })
                                }
                                className="w-4 h-4 text-indigo-600 rounded"
                            />
                            <div>
                                <div className="text-sm font-medium">
                                    Dùng làm biến thể
                                </div>
                                <div className="text-xs text-gray-500">
                                    Tạo SKU (Màu, Size...)
                                </div>
                            </div>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AttributeForm;
