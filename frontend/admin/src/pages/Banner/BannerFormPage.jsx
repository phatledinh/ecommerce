// pages/admin/BannerFormPage.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    ArrowLeftIcon,
    PhotoIcon,
    LinkIcon,
    CalendarIcon,
    InformationCircleIcon,
    CheckIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";

const BannerFormPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = !!id;

    const [loading, setLoading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState("");
    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
        title: "",
        image_url: "",
        link_url: "",
        position: "HOME_MAIN",
        is_active: true,
        sort_order: 0,
        start_time: "",
        end_time: "",
    });

    const POSITION_OPTIONS = [
        {
            value: "HOME_MAIN",
            label: "Trang chủ - Banner chính",
            description: "Banner lớn ở đầu trang chủ",
        },
        {
            value: "HOME_SUB",
            label: "Trang chủ - Banner phụ",
            description: "Banner nhỏ trên trang chủ",
        },
        {
            value: "SIDEBAR",
            label: "Sidebar",
            description: "Banner ở cột bên trái/phải",
        },
    ];

    useEffect(() => {
        if (isEditMode) {
            fetchBanner();
        }
    }, [id]);

    useEffect(() => {
        if (formData.image_url) {
            setPreviewUrl(formData.image_url);
        }
    }, [formData.image_url]);

    const fetchBanner = async () => {
        try {
            setLoading(true);
            // Mock API call - replace with actual API
            const mockBanner = {
                id: 1,
                title: "Summer Sale 2024",
                image_url:
                    "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&h=400&fit=crop",
                link_url: "/summer-sale",
                position: "HOME_MAIN",
                is_active: true,
                sort_order: 1,
                start_time: "2024-06-01T00:00:00",
                end_time: "2024-08-31T23:59:59",
            };
            setFormData(mockBanner);
        } catch (error) {
            console.error("Error fetching banner:", error);
        } finally {
            setLoading(false);
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.title.trim()) {
            newErrors.title = "Vui lòng nhập tiêu đề banner";
        }

        if (!formData.image_url.trim()) {
            newErrors.image_url = "Vui lòng nhập URL hình ảnh";
        } else if (
            !/^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i.test(
                formData.image_url,
            )
        ) {
            newErrors.image_url = "URL hình ảnh không hợp lệ";
        }

        if (!formData.link_url.trim()) {
            newErrors.link_url = "Vui lòng nhập đường dẫn";
        }

        if (formData.start_time && formData.end_time) {
            const start = new Date(formData.start_time);
            const end = new Date(formData.end_time);
            if (end <= start) {
                newErrors.end_time =
                    "Thời gian kết thúc phải sau thời gian bắt đầu";
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            setLoading(true);
            console.log(
                isEditMode ? "Updating banner:" : "Creating banner:",
                formData,
            );
            // Add API call here

            // Success - navigate back
            navigate("/admin/banners");
        } catch (error) {
            console.error("Error saving banner:", error);
            alert("Có lỗi xảy ra khi lưu banner");
        } finally {
            setLoading(false);
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                // In production, upload to server and get URL
                const uploadedUrl = reader.result;
                setFormData({ ...formData, image_url: uploadedUrl });
            };
            reader.readAsDataURL(file);
        }
    };

    const handlePreview = () => {
        if (previewUrl) {
            window.open(previewUrl, "_blank");
        }
    };

    if (loading && isEditMode) {
        return (
            <div className="flex justify-center items-center h-96">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            {/* Header */}
            <div className="mb-8">
                <button
                    onClick={() => navigate("/admin/banners")}
                    className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
                >
                    <ArrowLeftIcon className="h-5 w-5 mr-2" />
                    Quay lại danh sách
                </button>

                <h1 className="text-3xl font-bold text-gray-900">
                    {isEditMode ? "Chỉnh sửa Banner" : "Tạo Banner Mới"}
                </h1>
                <p className="text-gray-600 mt-2">
                    {isEditMode
                        ? "Cập nhật thông tin và cài đặt banner"
                        : "Thiết lập banner quảng cáo mới cho website"}
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Form */}
                <div className="lg:col-span-2">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Basic Info Card */}
                        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                <InformationCircleIcon className="h-5 w-5 mr-2 text-blue-600" />
                                Thông tin cơ bản
                            </h2>

                            {/* Title */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Tiêu đề banner *
                                </label>
                                <input
                                    type="text"
                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                        errors.title
                                            ? "border-red-300"
                                            : "border-gray-300"
                                    }`}
                                    placeholder="Ví dụ: Summer Sale 2024"
                                    value={formData.title}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            title: e.target.value,
                                        })
                                    }
                                />
                                {errors.title && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.title}
                                    </p>
                                )}
                            </div>

                            {/* Link URL */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Đường dẫn khi click *
                                </label>
                                <div className="flex">
                                    <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                                        <LinkIcon className="h-5 w-5" />
                                    </span>
                                    <input
                                        type="text"
                                        className={`flex-1 px-4 py-3 border rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                            errors.link_url
                                                ? "border-red-300"
                                                : "border-gray-300"
                                        }`}
                                        placeholder="/summer-sale hoặc https://example.com"
                                        value={formData.link_url}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                link_url: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                {errors.link_url && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.link_url}
                                    </p>
                                )}
                            </div>

                            {/* Position */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Vị trí hiển thị *
                                </label>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                    {POSITION_OPTIONS.map((option) => (
                                        <label
                                            key={option.value}
                                            className={`relative cursor-pointer border rounded-lg p-4 transition-all ${
                                                formData.position ===
                                                option.value
                                                    ? "border-blue-500 bg-blue-50 ring-2 ring-blue-200"
                                                    : "border-gray-200 hover:border-gray-300"
                                            }`}
                                        >
                                            <input
                                                type="radio"
                                                name="position"
                                                value={option.value}
                                                checked={
                                                    formData.position ===
                                                    option.value
                                                }
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        position:
                                                            e.target.value,
                                                    })
                                                }
                                                className="sr-only"
                                            />
                                            <div className="flex items-center">
                                                <div
                                                    className={`h-4 w-4 rounded-full border flex items-center justify-center mr-3 ${
                                                        formData.position ===
                                                        option.value
                                                            ? "border-blue-500 bg-blue-500"
                                                            : "border-gray-300"
                                                    }`}
                                                >
                                                    {formData.position ===
                                                        option.value && (
                                                        <CheckIcon className="h-3 w-3 text-white" />
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="font-medium text-gray-900">
                                                        {option.label}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {option.description}
                                                    </div>
                                                </div>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Sort Order */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Thứ tự hiển thị
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    className="w-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    value={formData.sort_order}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            sort_order:
                                                parseInt(e.target.value) || 0,
                                        })
                                    }
                                />
                                <p className="mt-1 text-sm text-gray-500">
                                    Số nhỏ hơn sẽ hiển thị trước
                                </p>
                            </div>
                        </div>

                        {/* Image Upload Card */}
                        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                <PhotoIcon className="h-5 w-5 mr-2 text-purple-600" />
                                Hình ảnh banner
                            </h2>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    URL hình ảnh *
                                </label>
                                <input
                                    type="text"
                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                        errors.image_url
                                            ? "border-red-300"
                                            : "border-gray-300"
                                    }`}
                                    placeholder="https://example.com/banner-image.jpg"
                                    value={formData.image_url}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            image_url: e.target.value,
                                        })
                                    }
                                />
                                {errors.image_url && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.image_url}
                                    </p>
                                )}
                            </div>

                            {/* Image Upload Alternative */}
                            <div className="mt-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Hoặc tải ảnh lên
                                </label>
                                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-gray-400 transition-colors">
                                    <div className="space-y-1 text-center">
                                        <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
                                        <div className="flex text-sm text-gray-600">
                                            <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                                                <span>Tải ảnh lên</span>
                                                <input
                                                    type="file"
                                                    className="sr-only"
                                                    accept="image/*"
                                                    onChange={handleImageUpload}
                                                />
                                            </label>
                                            <p className="pl-1">
                                                hoặc kéo thả ảnh vào đây
                                            </p>
                                        </div>
                                        <p className="text-xs text-gray-500">
                                            PNG, JPG, GIF tối đa 10MB
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Schedule Card */}
                        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                <CalendarIcon className="h-5 w-5 mr-2 text-green-600" />
                                Lịch trình hiển thị
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Start Time */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Thời gian bắt đầu
                                    </label>
                                    <input
                                        type="datetime-local"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        value={
                                            formData.start_time
                                                ? formData.start_time.slice(
                                                      0,
                                                      16,
                                                  )
                                                : ""
                                        }
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                start_time: e.target.value
                                                    ? e.target.value + ":00"
                                                    : "",
                                            })
                                        }
                                    />
                                    <p className="mt-1 text-sm text-gray-500">
                                        Để trống nếu muốn chạy ngay
                                    </p>
                                </div>

                                {/* End Time */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Thời gian kết thúc
                                    </label>
                                    <input
                                        type="datetime-local"
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                            errors.end_time
                                                ? "border-red-300"
                                                : "border-gray-300"
                                        }`}
                                        value={
                                            formData.end_time
                                                ? formData.end_time.slice(0, 16)
                                                : ""
                                        }
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                end_time: e.target.value
                                                    ? e.target.value + ":00"
                                                    : "",
                                            })
                                        }
                                    />
                                    {errors.end_time && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.end_time}
                                        </p>
                                    )}
                                    <p className="mt-1 text-sm text-gray-500">
                                        Để trống nếu không giới hạn
                                    </p>
                                </div>
                            </div>

                            {/* Active Status */}
                            <div className="mt-6">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        checked={formData.is_active}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                is_active: e.target.checked,
                                            })
                                        }
                                    />
                                    <span className="ml-2 text-gray-700">
                                        Kích hoạt banner ngay sau khi lưu
                                    </span>
                                </label>
                            </div>
                        </div>

                        {/* Submit Buttons */}
                        <div className="flex justify-end space-x-4 pt-6">
                            <button
                                type="button"
                                onClick={() => navigate("/admin/banners")}
                                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 font-medium"
                            >
                                Hủy
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <span className="flex items-center">
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                        Đang lưu...
                                    </span>
                                ) : (
                                    <span>
                                        {isEditMode
                                            ? "Cập nhật banner"
                                            : "Tạo banner mới"}
                                    </span>
                                )}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Right Column - Preview */}
                <div className="lg:col-span-1">
                    <div className="sticky top-6">
                        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">
                                Xem trước
                            </h2>

                            <div className="space-y-4">
                                {/* Preview Image */}
                                <div className="relative rounded-lg overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 aspect-video">
                                    {previewUrl ? (
                                        <img
                                            src={previewUrl}
                                            alt="Preview"
                                            className="w-full h-full object-cover"
                                            onError={() => setPreviewUrl("")}
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <PhotoIcon className="h-12 w-12 text-gray-400" />
                                        </div>
                                    )}
                                </div>

                                {/* Preview Info */}
                                <div className="space-y-3">
                                    <div>
                                        <h3 className="font-medium text-gray-900">
                                            {formData.title ||
                                                "(Chưa có tiêu đề)"}
                                        </h3>
                                        <p className="text-sm text-gray-500 truncate">
                                            {formData.link_url ||
                                                "(Chưa có đường dẫn)"}
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between text-sm">
                                        <span
                                            className={`px-3 py-1 rounded-full ${formData.is_active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                                        >
                                            {formData.is_active
                                                ? "Đang hoạt động"
                                                : "Tạm dừng"}
                                        </span>
                                        <span className="text-gray-600">
                                            {POSITION_OPTIONS.find(
                                                (p) =>
                                                    p.value ===
                                                    formData.position,
                                            )?.label || "Chưa chọn vị trí"}
                                        </span>
                                    </div>

                                    {formData.start_time &&
                                        formData.end_time && (
                                            <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                                                <div className="flex items-center mb-1">
                                                    <CalendarIcon className="h-4 w-4 mr-2" />
                                                    Lịch trình
                                                </div>
                                                <div>
                                                    <div>
                                                        Từ:{" "}
                                                        {formData.start_time
                                                            ?.slice(0, 16)
                                                            .replace("T", " ")}
                                                    </div>
                                                    <div>
                                                        Đến:{" "}
                                                        {formData.end_time
                                                            ?.slice(0, 16)
                                                            .replace("T", " ")}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                </div>

                                {/* Preview Actions */}
                                <div className="pt-4 border-t">
                                    <button
                                        onClick={handlePreview}
                                        disabled={!previewUrl}
                                        className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Xem ảnh gốc
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Tips */}
                        <div className="mt-6 bg-blue-50 rounded-xl border border-blue-200 p-4">
                            <h3 className="font-medium text-blue-900 mb-2 flex items-center">
                                <InformationCircleIcon className="h-5 w-5 mr-2" />
                                Mẹo thiết kế banner
                            </h3>
                            <ul className="text-sm text-blue-800 space-y-1">
                                <li>
                                    • Kích thước phù hợp với vị trí hiển thị
                                </li>
                                <li>• Sử dụng hình ảnh chất lượng cao</li>
                                <li>• Màu sắc tương phản với nền website</li>
                                <li>• Đảm bảo văn bản dễ đọc</li>
                                <li>• Test trên mobile và desktop</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BannerFormPage;
