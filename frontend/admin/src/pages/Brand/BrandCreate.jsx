import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import brandApi from "../../api/brandApi";

const BrandCreate = () => {
    const navigate = useNavigate();
    const [saving, setSaving] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        slug: "",
        logo: "",
        isActive: true,
    });

    const [imagePreview, setImagePreview] = useState("");
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;

        if (type === "file" && files && files[0]) {
            const file = files[0];

            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
                setFormData((prev) => ({
                    ...prev,
                    logoFile: file,
                }));
            };
            reader.readAsDataURL(file);
        } else if (type === "checkbox") {
            setFormData((prev) => ({
                ...prev,
                [name]: checked,
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
        // Auto generate slug from name
        if (name === "name") {
            const slug = value
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/[^\w\s]/g, "")
                .replace(/\s+/g, "-");
            setFormData((prev) => ({
                ...prev,
                slug: slug,
            }));
        }
    };

    const removeImage = () => {
        setFormData((prev) => ({
            ...prev,
            logoFile: null,
        }));
        setImagePreview("");
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Tên thương hiệu là bắt buộc";
        }

        if (!formData.slug.trim()) {
            newErrors.slug = "Đường dẫn là bắt buộc";
        } else if (!/^[a-z0-9-]+$/.test(formData.slug)) {
            newErrors.slug =
                "Đường dẫn chỉ được chứa chữ thường, số và dấu gạch ngang";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e, action = "save") => {
        e.preventDefault();

        if (!validateForm()) {
            Swal.fire({
                title: "Lỗi!",
                text: "Vui lòng kiểm tra lại thông tin",
                icon: "error",
                confirmButtonText: "OK",
            });
            return;
        }

        setSaving(true);

        try {
            const formDataToSend = new FormData();
            formDataToSend.append("name", formData.name);
            formDataToSend.append("slug", formData.slug);
            formDataToSend.append("isActive", formData.isActive.toString());

            if (formData.logoFile) {
                formDataToSend.append("logoFile", formData.logoFile);
            }

            // Dùng brandApi thay vì axiosClient trực tiếp
            const response = await brandApi.create(formDataToSend);

            if (response.status === 201 || response.data.success) {
                await Swal.fire({
                    title: "Thành công!",
                    text: "Thương hiệu đã được tạo thành công.",
                    icon: "success",
                    confirmButtonText: "OK",
                });

                if (action === "save_and_new") {
                    resetForm();
                } else {
                    navigate("/admin/brands");
                }
            } else {
                throw new Error(response.data.message || "Có lỗi xảy ra");
            }
        } catch (error) {
            console.error("Error creating brand:", error);

            let errorMessage = "Đã xảy ra lỗi khi tạo thương hiệu";
            if (error.response?.data?.errors) {
                const serverErrors = error.response.data.errors;
                setErrors(serverErrors);
                errorMessage = "Vui lòng kiểm tra lại thông tin";
            } else if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            }

            await Swal.fire({
                title: "Lỗi!",
                text: errorMessage,
                icon: "error",
                confirmButtonText: "OK",
            });
        } finally {
            setSaving(false);
        }
    };

    const resetForm = () => {
        setFormData({
            name: "",
            slug: "",
            logo: "",
            isActive: true,
        });
        setImagePreview("");
        setErrors({});
    };

    const handleCancel = () => {
        Swal.fire({
            title: "Xác nhận",
            text: "Bạn có chắc chắn muốn hủy? Mọi thay đổi sẽ không được lưu.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Có, hủy",
            cancelButtonText: "Không",
            buttonsStyling: false,
            customClass: {
                confirmButton:
                    "bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg mr-2 transition-colors",
                cancelButton:
                    "bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors",
            },
        }).then((result) => {
            if (result.isConfirmed) {
                navigate("/admin/brands");
            }
        });
    };

    return (
        <main className="flex-1 p-6">
            <div className="max-w-4xl mx-auto">
                <Header
                    title="Thêm Thương hiệu Mới"
                    onBack={() => navigate("/admin/brands")}
                />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Form - 2/3 width */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            <CardHeader
                                icon="tag"
                                title="Thông tin thương hiệu"
                            />

                            <form
                                onSubmit={(e) => handleSubmit(e, "save")}
                                className="p-6"
                            >
                                <div className="space-y-6">
                                    {/* Basic Information */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <FormInput
                                            label="Tên thương hiệu"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Nhập tên thương hiệu"
                                            error={errors.name}
                                            required
                                        />

                                        <FormInput
                                            label="Đường dẫn (Slug)"
                                            name="slug"
                                            value={formData.slug}
                                            onChange={handleChange}
                                            placeholder="duong-dan-thuong-hieu"
                                            error={errors.slug}
                                            required
                                        />
                                    </div>

                                    {/* Logo Upload */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Logo thương hiệu
                                        </label>
                                        {/* Image Upload */}

                                        <div
                                            className={`border-2 ${
                                                imagePreview
                                                    ? "border-solid"
                                                    : "border-dashed"
                                            } border-gray-300 rounded-lg p-4`}
                                        >
                                            {imagePreview ? (
                                                <div className="space-y-4">
                                                    <div className="relative">
                                                        <img
                                                            src={imagePreview}
                                                            alt="Preview"
                                                            className="w-full h-48 object-contain rounded-lg"
                                                        />
                                                    </div>
                                                    <div className="flex space-x-3">
                                                        <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors flex items-center">
                                                            <svg
                                                                className="w-4 h-4 mr-2"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth="2"
                                                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                                />
                                                            </svg>
                                                            Thay ảnh
                                                            <input
                                                                type="file"
                                                                name="logoFile"
                                                                className="hidden"
                                                                accept="image/*"
                                                                onChange={
                                                                    handleChange
                                                                }
                                                            />
                                                        </label>
                                                        <button
                                                            type="button"
                                                            onClick={
                                                                removeImage
                                                            }
                                                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition-colors flex items-center"
                                                        >
                                                            <svg
                                                                className="w-4 h-4 mr-2"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth="2"
                                                                    d="M6 18L18 6M6 6l12 12"
                                                                />
                                                            </svg>
                                                            Xóa ảnh
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="space-y-4 text-center">
                                                    <svg
                                                        className="mx-auto h-20 w-20 text-gray-400"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                        />
                                                    </svg>
                                                    <div className="text-sm text-gray-600">
                                                        <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors inline-flex items-center">
                                                            <svg
                                                                className="w-4 h-4 mr-2"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth="2"
                                                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                                                />
                                                            </svg>
                                                            Tải ảnh lên
                                                            <input
                                                                type="file"
                                                                name="logoFile"
                                                                className="hidden"
                                                                accept="image/*"
                                                                onChange={
                                                                    handleChange
                                                                }
                                                            />
                                                        </label>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <p className="text-sm text-gray-500 mt-2">
                                            Logo sẽ hiển thị trên website và sản
                                            phẩm. Định dạng: JPG, PNG, SVG. Tối
                                            đa 2MB.
                                        </p>
                                    </div>

                                    {/* Status */}
                                    <div className="flex items-center">
                                        <FormCheckbox
                                            label="Kích hoạt thương hiệu"
                                            name="isActive"
                                            checked={formData.isActive}
                                            onChange={handleChange}
                                            helpText="Tắt để ẩn thương hiệu khỏi website"
                                        />
                                    </div>
                                </div>

                                <FormActions
                                    saving={saving}
                                    onCancel={handleCancel}
                                    onSaveAndNew={(e) =>
                                        handleSubmit(e, "save_and_new")
                                    }
                                />
                            </form>
                        </div>
                    </div>

                    {/* Sidebar Help - 1/3 width */}
                    <div className="space-y-6">
                        <BrandGuidelines />
                        <StatsCard />
                    </div>
                </div>
            </div>
        </main>
    );
};

const Header = ({ title, onBack }) => (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
        <button
            onClick={onBack}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
        >
            <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
            </svg>
            Quay lại
        </button>
    </div>
);

const CardHeader = ({ title }) => (
    <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center">
            <svg
                className="w-5 h-5 text-gray-500 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
            </svg>
            <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        </div>
    </div>
);

const FormInput = ({
    label,
    name,
    value,
    onChange,
    placeholder,
    error,
    required = false,
    type = "text",
}) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                error ? "border-red-500" : "border-gray-300"
            }`}
            placeholder={placeholder}
            required={required}
        />
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
);

const FormCheckbox = ({ label, name, checked, onChange, helpText = "" }) => (
    <div className="flex items-center">
        <input
            type="checkbox"
            id={name}
            name={name}
            checked={checked}
            onChange={onChange}
            className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor={name} className="ml-3 text-sm text-gray-900">
            <span className="font-medium">{label}</span>
            {helpText && <p className="text-gray-500">{helpText}</p>}
        </label>
    </div>
);

const FormActions = ({ saving, onCancel, onSaveAndNew }) => (
    <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
        <button
            type="button"
            onClick={onCancel}
            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors flex items-center"
            disabled={saving}
        >
            <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                />
            </svg>
            Hủy
        </button>
        <div className="flex flex-col sm:flex-row gap-3">
            <button
                type="button"
                onClick={onSaveAndNew}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center"
                disabled={saving}
            >
                {saving ? (
                    <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Đang lưu...
                    </>
                ) : (
                    <>
                        <svg
                            className="w-4 h-4 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 4v16m8-8H4"
                            />
                        </svg>
                        Lưu và thêm mới
                    </>
                )}
            </button>
            <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center"
                disabled={saving}
            >
                {saving ? (
                    <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Đang lưu...
                    </>
                ) : (
                    <>
                        <svg
                            className="w-4 h-4 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                        Tạo thương hiệu
                    </>
                )}
            </button>
        </div>
    </div>
);

const BrandGuidelines = () => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center">
                <svg
                    className="w-5 h-5 text-gray-500 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
                <h2 className="text-lg font-semibold text-gray-800">
                    Hướng dẫn
                </h2>
            </div>
        </div>
        <div className="p-6">
            <div className="space-y-4">
                <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">
                        Thông tin bắt buộc:
                    </h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                        <li className="flex items-start">
                            <svg
                                className="w-4 h-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            Tên thương hiệu và đường dẫn là bắt buộc
                        </li>
                        <li className="flex items-start">
                            <svg
                                className="w-4 h-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            Đường dẫn nên viết không dấu, cách nhau bằng dấu
                            gạch ngang
                        </li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">
                        Logo thương hiệu:
                    </h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                        <li className="flex items-start">
                            <svg
                                className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            Kích thước đề xuất: 300x300px
                        </li>
                        <li className="flex items-start">
                            <svg
                                className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            Định dạng: JPG, PNG, SVG
                        </li>
                        <li className="flex items-start">
                            <svg
                                className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            Nền trong suốt (PNG) hoặc nền trắng
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
);

const StatsCard = () => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center">
                <svg
                    className="w-5 h-5 text-gray-500 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                </svg>
                <h2 className="text-lg font-semibold text-gray-800">
                    Thống kê
                </h2>
            </div>
        </div>
        <div className="p-6">
            <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">0</div>
                <div className="text-sm text-blue-800">Tổng thương hiệu</div>
            </div>
        </div>
    </div>
);

export default BrandCreate;
