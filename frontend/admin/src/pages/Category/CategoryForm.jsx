import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import CategoryAttributes from "./CategoryAttributes";
import categoryService from "../../services/categoryService";
import { ArrowLeftIcon, XMarkIcon, PhotoIcon, ArrowsUpDownIcon } from "@heroicons/react/24/outline";

const CategoryForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = !!id;

    const [formData, setFormData] = useState({
        name: "",
        slug: "",
        parentId: "",
        description: "",
        thumbnail: "",
        isActive: true,
        sortOrder: 0,
        attributes: [],
    });

    const [parentCategories, setParentCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("basic");

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const parents = await categoryService.getAll();
                setParentCategories(
                    parents.filter((c) => !isEditMode || c.id !== parseInt(id)),
                );

                if (isEditMode) {
                    const data = await categoryService.getById(id);
                    setFormData({
                        ...data,
                        parentId: data.parentId || "",
                    });
                }
            } catch (error) {
                console.error("Fetch error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id, isEditMode]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === "checkbox" ? checked : value;

        setFormData((prev) => ({ ...prev, [name]: newValue }));

        if (name === "name" && !isEditMode) {
            const slug = value
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/[^a-z0-9\s]/g, "")
                .replace(/\s+/g, "-");
            setFormData((prev) => ({ ...prev, slug }));
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > 2 * 1024 * 1024) {
            alert("File ảnh không được vượt quá 2MB");
            return;
        }

        const imageUrl = URL.createObjectURL(file);
        setFormData((prev) => ({ ...prev, thumbnail: imageUrl }));
    };

    const handleRemoveImage = () => {
        setFormData((prev) => ({ ...prev, thumbnail: "" }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const payload = {
                ...formData,
                parentId: formData.parentId ? formData.parentId : null,
            };

            if (isEditMode) {
                await categoryService.update(id, payload);
            } else {
                await categoryService.create(payload);
            }
            navigate("/admin/categories");
        } catch (error) {
            alert(
                "Có lỗi xảy ra: " +
                    (error.response?.data?.message || error.message),
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-6 md:mb-8">
                    <Link
                        to="/admin/categories"
                        className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4 transition-colors group"
                    >
                        <ArrowLeftIcon className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                        Quay lại danh sách
                    </Link>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                            {isEditMode
                                ? "Chỉnh sửa danh mục"
                                : "Thêm danh mục mới"}
                        </h1>
                        <div className="flex items-center gap-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${formData.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                {formData.isActive ? "Đang hiển thị" : "Đang ẩn"}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Main Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Tabs Navigation */}
                    <div className="flex space-x-1 bg-white p-1 rounded-xl border border-gray-200 shadow-sm w-full md:w-auto">
                        <button
                            type="button"
                            onClick={() => setActiveTab("basic")}
                            className={`flex-1 md:flex-none px-4 md:px-6 py-3 rounded-lg text-sm font-medium transition-all ${activeTab === "basic"
                                    ? "bg-blue-50 text-blue-700 shadow-sm"
                                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                                }`}
                        >
                            Thông tin cơ bản
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab("attributes")}
                            className={`flex-1 md:flex-none px-4 md:px-6 py-3 rounded-lg text-sm font-medium transition-all ${activeTab === "attributes"
                                    ? "bg-blue-50 text-blue-700 shadow-sm"
                                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                                }`}
                        >
                            Thuộc tính
                        </button>
                    </div>

                    {/* Content Area */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="p-6">
                            {activeTab === "basic" ? (
                                <div className="space-y-8">
                                    {/* Row 1: Name & Slug */}
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="block text-sm font-semibold text-gray-800">
                                                Tên danh mục *
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                required
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                                placeholder="Ví dụ: Điện thoại"
                                            />
                                            <p className="text-xs text-gray-500">
                                                Tên hiển thị của danh mục
                                            </p>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-sm font-semibold text-gray-800">
                                                Slug (URL) *
                                            </label>
                                            <input
                                                type="text"
                                                name="slug"
                                                required
                                                value={formData.slug}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                            />
                                            <p className="text-xs text-gray-500">
                                                Đường dẫn SEO-friendly
                                            </p>
                                        </div>
                                    </div>

                                    {/* Row 2: Parent & Sort Order */}
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="block text-sm font-semibold text-gray-800">
                                                Danh mục cha
                                            </label>
                                            <select
                                                name="parentId"
                                                value={formData.parentId}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all appearance-none bg-white"
                                            >
                                                <option value="">
                                                    -- Danh mục gốc --
                                                </option>
                                                {parentCategories.map((cat) => (
                                                    <option
                                                        key={cat.id}
                                                        value={cat.id}
                                                    >
                                                        {cat.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-sm font-semibold text-gray-800">
                                                <ArrowsUpDownIcon className="w-4 h-4 inline mr-1" />
                                                Thứ tự hiển thị
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="number"
                                                    name="sortOrder"
                                                    min="0"
                                                    value={formData.sortOrder}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all pl-12"
                                                />
                                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                                    #
                                                </div>
                                            </div>
                                            <p className="text-xs text-gray-500">
                                                Số càng nhỏ, hiển thị càng trước
                                            </p>
                                        </div>
                                    </div>

                                    {/* Row 3: Description */}
                                    <div className="space-y-2">
                                        <label className="block text-sm font-semibold text-gray-800">
                                            Mô tả
                                        </label>
                                        <textarea
                                            name="description"
                                            rows={3}
                                            value={formData.description}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
                                            placeholder="Mô tả ngắn về danh mục..."
                                        ></textarea>
                                    </div>

                                    {/* Row 4: Image Upload */}
                                    <div className="space-y-3">
                                        <label className="block text-sm font-semibold text-gray-800">
                                            <PhotoIcon className="w-4 h-4 inline mr-1" />
                                            Hình ảnh
                                        </label>
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                            {/* Upload Area */}
                                            <div>
                                                {formData.thumbnail ? (
                                                    <div className="space-y-3">
                                                        <div className="rounded-xl border border-gray-200 overflow-hidden">
                                                            <img
                                                                src={formData.thumbnail}
                                                                alt="Preview"
                                                                className="w-full h-64 object-cover"
                                                                onError={(e) => {
                                                                    e.target.style.display = 'none';
                                                                    e.target.parentElement.innerHTML = `
                                                                        <div class="w-full h-64 bg-gray-100 flex items-center justify-center rounded-xl">
                                                                            <div class="text-center">
                                                                                <PhotoIcon class="w-12 h-12 text-gray-400 mx-auto mb-2" />
                                                                                <p class="text-gray-500 text-sm">Không thể tải ảnh</p>
                                                                            </div>
                                                                        </div>
                                                                    `;
                                                                }}
                                                            />
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={handleRemoveImage}
                                                            className="w-full py-2.5 px-4 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium text-sm"
                                                        >
                                                            <XMarkIcon className="w-4 h-4 inline mr-2" />
                                                            Xóa ảnh
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div className="border-3 border-dashed border-gray-200 rounded-xl p-6 bg-gray-50 hover:bg-gray-100 transition-colors text-center cursor-pointer group">
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={handleImageUpload}
                                                            className="hidden"
                                                            id="thumbnail-upload"
                                                        />
                                                        <label
                                                            htmlFor="thumbnail-upload"
                                                            className="cursor-pointer flex flex-col items-center"
                                                        >
                                                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm group-hover:shadow-md transition-shadow">
                                                                <PhotoIcon className="w-8 h-8 text-gray-400" />
                                                            </div>
                                                            <p className="text-gray-700 font-medium mb-1">
                                                                Nhấn để tải ảnh lên
                                                            </p>
                                                            <p className="text-sm text-gray-500">
                                                                PNG, JPG, WEBP • Tối đa 2MB
                                                            </p>
                                                        </label>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Status Toggle */}
                                            <div className="space-y-6">
                                                <div className="bg-gray-50 rounded-xl p-5">
                                                    <h4 className="font-semibold text-gray-800 mb-4">Trạng thái</h4>
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <p className="font-medium text-gray-700">Hiển thị công khai</p>
                                                            <p className="text-sm text-gray-500 mt-1">
                                                                {formData.isActive
                                                                    ? "Danh mục sẽ hiển thị trên website"
                                                                    : "Danh mục sẽ bị ẩn khỏi website"}
                                                            </p>
                                                        </div>
                                                        <label className="relative inline-flex items-center cursor-pointer">
                                                            <input
                                                                type="checkbox"
                                                                name="isActive"
                                                                checked={formData.isActive}
                                                                onChange={handleChange}
                                                                className="sr-only peer"
                                                            />
                                                            <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                                                        </label>
                                                    </div>
                                                </div>

                                                {/* Action Buttons */}
                                                <div className="flex flex-col gap-3 pt-4">
                                                    <button
                                                        type="submit"
                                                        disabled={loading}
                                                        className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow-md shadow-blue-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                                                    >
                                                        {loading ? (
                                                            <>
                                                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                                </svg>
                                                                Đang xử lý...
                                                            </>
                                                        ) : isEditMode ? (
                                                            "Lưu thay đổi"
                                                        ) : (
                                                            "Tạo danh mục"
                                                        )}
                                                    </button>
                                                    <Link
                                                        to="/admin/categories"
                                                        className="w-full py-3 px-4 bg-white border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 text-center transition-colors"
                                                    >
                                                        Hủy bỏ
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                // Component Attributes
                                <CategoryAttributes
                                    selectedAttributes={formData.attributes}
                                    onAttributesChange={(newAttrs) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            attributes: newAttrs,
                                        }))
                                    }
                                />
                            )}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CategoryForm;