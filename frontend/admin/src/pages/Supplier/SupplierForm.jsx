// pages/admin/suppliers/SupplierForm.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
    ArrowLeftIcon,
    BuildingOfficeIcon,
    UserIcon,
    PhoneIcon,
    EnvelopeIcon,
    MapPinIcon,
    CheckCircleIcon,
    InformationCircleIcon,
    DocumentTextIcon,
    ClipboardDocumentCheckIcon,
    TruckIcon,
    ChartBarIcon,
    CurrencyDollarIcon,
    SparklesIcon,
} from "@heroicons/react/24/outline";

const SupplierForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = !!id;

    const [formData, setFormData] = useState({
        name: "",
        contact_person: "",
        email: "",
        phone: "",
        address: "",
        website: "",
        tax_code: "",
        payment_terms: "net_30",
        lead_time: 7,
        minimum_order: 0,
        notes: "",
        is_active: true,
    });

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [activeTab, setActiveTab] = useState("basic");

    const paymentTerms = [
        { value: "prepaid", label: "Trả trước" },
        { value: "net_7", label: "Net 7 ngày" },
        { value: "net_15", label: "Net 15 ngày" },
        { value: "net_30", label: "Net 30 ngày" },
        { value: "net_60", label: "Net 60 ngày" },
        { value: "cod", label: "COD (Nhận hàng thanh toán)" },
    ];

    useEffect(() => {
        if (isEditMode) {
            setLoading(true);
            setTimeout(() => {
                setFormData({
                    name: "Công Ty TNHH Samsung Electronics Việt Nam",
                    contact_person: "Nguyễn Văn A",
                    email: "contact@samsung.com.vn",
                    phone: "028 3811 9999",
                    address: "Số 2, Đường Tây Hồ, Quận Tân Phú, TP.HCM",
                    website: "https://www.samsung.com/vn",
                    tax_code: "0301234567",
                    payment_terms: "net_30",
                    lead_time: 7,
                    minimum_order: 10000000,
                    notes: "Nhà cung cấp chính thức của Samsung tại Việt Nam. Thời gian giao hàng từ 3-7 ngày làm việc. Hỗ trợ bảo hành chính hãng 12 tháng.",
                    is_active: true,
                });
                setLoading(false);
            }, 800);
        }
    }, [id, isEditMode]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === "checkbox" ? checked : value;

        setFormData((prev) => ({
            ...prev,
            [name]: newValue,
        }));

        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Tên nhà cung cấp là bắt buộc";
        }

        if (!formData.contact_person.trim()) {
            newErrors.contact_person = "Người liên hệ là bắt buộc";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email là bắt buộc";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Email không hợp lệ";
        }

        if (!formData.phone.trim()) {
            newErrors.phone = "Số điện thoại là bắt buộc";
        } else if (
            !/^[0-9+\-\s()]{10,15}$/.test(formData.phone.replace(/\s/g, ""))
        ) {
            newErrors.phone = "Số điện thoại không hợp lệ";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            console.log("Supplier saved:", formData);
            navigate("/admin/suppliers");
        } catch (error) {
            console.error("Error saving supplier:", error);
            alert("Có lỗi xảy ra khi lưu nhà cung cấp");
        } finally {
            setLoading(false);
        }
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
            maximumFractionDigits: 0,
        }).format(value);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-indigo-50/50 to-gray-50 p-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <Link
                        to="/admin/suppliers"
                        className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-4 group"
                    >
                        <ArrowLeftIcon className="h-5 w-5 mr-2 transition-transform group-hover:-translate-x-1" />
                        Quay lại danh sách
                    </Link>
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                                {isEditMode
                                    ? "Chỉnh Sửa Nhà Cung Cấp"
                                    : "Thêm Nhà Cung Cấp Mới"}
                            </h1>
                            <p className="text-gray-600 mt-2">
                                {isEditMode
                                    ? "Cập nhật thông tin nhà cung cấp"
                                    : "Thêm nhà cung cấp mới vào hệ thống"}
                            </p>
                        </div>
                        <div
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                                formData.is_active
                                    ? "bg-emerald-100 text-emerald-800"
                                    : "bg-rose-100 text-rose-800"
                            }`}
                        >
                            {formData.is_active
                                ? "Đang hợp tác"
                                : "Ngừng hợp tác"}
                        </div>
                    </div>
                </div>

                {loading && isEditMode ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="relative">
                            <div className="w-20 h-20 border-4 border-indigo-200 rounded-full"></div>
                            <div className="absolute top-0 left-0 w-20 h-20 border-4 border-indigo-500 rounded-full border-t-transparent animate-spin"></div>
                        </div>
                        <p className="mt-6 text-lg text-gray-600">
                            Đang tải dữ liệu...
                        </p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Left Column - Form */}
                            <div className="lg:col-span-2 space-y-8">
                                {/* Tab Navigation */}
                                <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                                    <div className="border-b border-gray-200">
                                        <nav
                                            className="flex space-x-1 px-6"
                                            aria-label="Tabs"
                                        >
                                            {[
                                                "basic",
                                                "business",
                                                "settings",
                                            ].map((tab) => (
                                                <button
                                                    key={tab}
                                                    type="button"
                                                    onClick={() =>
                                                        setActiveTab(tab)
                                                    }
                                                    className={`px-4 py-3 text-sm font-medium rounded-lg transition-all ${
                                                        activeTab === tab
                                                            ? "bg-indigo-100 text-indigo-700"
                                                            : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                                                    }`}
                                                >
                                                    {tab === "basic" &&
                                                        "Thông tin cơ bản"}
                                                    {tab === "business" &&
                                                        "Thông tin kinh doanh"}
                                                    {tab === "settings" &&
                                                        "Thiết lập"}
                                                </button>
                                            ))}
                                        </nav>
                                    </div>

                                    <div className="p-6">
                                        {/* Basic Info Tab */}
                                        {activeTab === "basic" && (
                                            <div className="space-y-6">
                                                {/* Company Name */}
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-900 mb-2">
                                                        Tên công ty *
                                                    </label>
                                                    <div className="relative">
                                                        <input
                                                            type="text"
                                                            name="name"
                                                            value={
                                                                formData.name
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            className={`block w-full px-4 py-3 bg-gradient-to-r from-gray-50 to-white border-2 rounded-xl focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition-all ${
                                                                errors.name
                                                                    ? "border-rose-300"
                                                                    : "border-gray-200"
                                                            }`}
                                                            placeholder="Ví dụ: Công Ty TNHH Samsung Electronics Việt Nam"
                                                        />
                                                        <div className="absolute right-3 top-3">
                                                            <BuildingOfficeIcon className="h-5 w-5 text-gray-400" />
                                                        </div>
                                                    </div>
                                                    {errors.name && (
                                                        <p className="mt-2 text-sm text-rose-600 flex items-center">
                                                            <InformationCircleIcon className="h-4 w-4 mr-1" />
                                                            {errors.name}
                                                        </p>
                                                    )}
                                                </div>

                                                {/* Contact Person */}
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-900 mb-2">
                                                        Người liên hệ *
                                                    </label>
                                                    <div className="relative">
                                                        <input
                                                            type="text"
                                                            name="contact_person"
                                                            value={
                                                                formData.contact_person
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            className={`block w-full px-4 py-3 bg-gradient-to-r from-gray-50 to-white border-2 rounded-xl focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition-all ${
                                                                errors.contact_person
                                                                    ? "border-rose-300"
                                                                    : "border-gray-200"
                                                            }`}
                                                            placeholder="Ví dụ: Nguyễn Văn A"
                                                        />
                                                        <div className="absolute right-3 top-3">
                                                            <UserIcon className="h-5 w-5 text-gray-400" />
                                                        </div>
                                                    </div>
                                                    {errors.contact_person && (
                                                        <p className="mt-2 text-sm text-rose-600 flex items-center">
                                                            <InformationCircleIcon className="h-4 w-4 mr-1" />
                                                            {
                                                                errors.contact_person
                                                            }
                                                        </p>
                                                    )}
                                                </div>

                                                {/* Email */}
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-900 mb-2">
                                                        Email *
                                                    </label>
                                                    <div className="relative">
                                                        <input
                                                            type="email"
                                                            name="email"
                                                            value={
                                                                formData.email
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            className={`block w-full px-4 py-3 bg-gradient-to-r from-gray-50 to-white border-2 rounded-xl focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition-all ${
                                                                errors.email
                                                                    ? "border-rose-300"
                                                                    : "border-gray-200"
                                                            }`}
                                                            placeholder="contact@company.com"
                                                        />
                                                        <div className="absolute right-3 top-3">
                                                            <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                                                        </div>
                                                    </div>
                                                    {errors.email && (
                                                        <p className="mt-2 text-sm text-rose-600 flex items-center">
                                                            <InformationCircleIcon className="h-4 w-4 mr-1" />
                                                            {errors.email}
                                                        </p>
                                                    )}
                                                </div>

                                                {/* Phone */}
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-900 mb-2">
                                                        Số điện thoại *
                                                    </label>
                                                    <div className="relative">
                                                        <input
                                                            type="tel"
                                                            name="phone"
                                                            value={
                                                                formData.phone
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            className={`block w-full px-4 py-3 bg-gradient-to-r from-gray-50 to-white border-2 rounded-xl focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition-all ${
                                                                errors.phone
                                                                    ? "border-rose-300"
                                                                    : "border-gray-200"
                                                            }`}
                                                            placeholder="028 3811 9999"
                                                        />
                                                        <div className="absolute right-3 top-3">
                                                            <PhoneIcon className="h-5 w-5 text-gray-400" />
                                                        </div>
                                                    </div>
                                                    {errors.phone && (
                                                        <p className="mt-2 text-sm text-rose-600 flex items-center">
                                                            <InformationCircleIcon className="h-4 w-4 mr-1" />
                                                            {errors.phone}
                                                        </p>
                                                    )}
                                                </div>

                                                {/* Address */}
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-900 mb-2">
                                                        Địa chỉ
                                                    </label>
                                                    <div className="relative">
                                                        <textarea
                                                            name="address"
                                                            value={
                                                                formData.address
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            rows={3}
                                                            className="block w-full px-4 py-3 bg-gradient-to-r from-gray-50 to-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition-all"
                                                            placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành phố"
                                                        />
                                                        <div className="absolute right-3 top-3">
                                                            <MapPinIcon className="h-5 w-5 text-gray-400" />
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Website */}
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-900 mb-2">
                                                        Website
                                                    </label>
                                                    <input
                                                        type="url"
                                                        name="website"
                                                        value={formData.website}
                                                        onChange={handleChange}
                                                        className="block w-full px-4 py-3 bg-gradient-to-r from-gray-50 to-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition-all"
                                                        placeholder="https://www.company.com"
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        {/* Business Info Tab */}
                                        {activeTab === "business" && (
                                            <div className="space-y-6">
                                                {/* Tax Code */}
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-900 mb-2">
                                                        Mã số thuế
                                                    </label>
                                                    <div className="relative">
                                                        <input
                                                            type="text"
                                                            name="tax_code"
                                                            value={
                                                                formData.tax_code
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            className="block w-full px-4 py-3 bg-gradient-to-r from-gray-50 to-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition-all"
                                                            placeholder="0301234567"
                                                            maxLength={13}
                                                        />
                                                        <div className="absolute right-3 top-3">
                                                            <DocumentTextIcon className="h-5 w-5 text-gray-400" />
                                                        </div>
                                                    </div>
                                                    <p className="mt-2 text-sm text-gray-500">
                                                        Mã số thuế doanh nghiệp
                                                        (10 hoặc 13 số)
                                                    </p>
                                                </div>

                                                {/* Payment Terms */}
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-900 mb-2">
                                                        Điều khoản thanh toán
                                                    </label>
                                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                                        {paymentTerms.map(
                                                            (term) => (
                                                                <button
                                                                    key={
                                                                        term.value
                                                                    }
                                                                    type="button"
                                                                    onClick={() =>
                                                                        setFormData(
                                                                            (
                                                                                prev,
                                                                            ) => ({
                                                                                ...prev,
                                                                                payment_terms:
                                                                                    term.value,
                                                                            }),
                                                                        )
                                                                    }
                                                                    className={`p-3 rounded-lg border transition-all flex flex-col items-center ${
                                                                        formData.payment_terms ===
                                                                        term.value
                                                                            ? "border-indigo-400 bg-indigo-50"
                                                                            : "border-gray-200 hover:border-gray-300"
                                                                    }`}
                                                                >
                                                                    <span
                                                                        className={`text-sm font-medium ${
                                                                            formData.payment_terms ===
                                                                            term.value
                                                                                ? "text-indigo-700"
                                                                                : "text-gray-700"
                                                                        }`}
                                                                    >
                                                                        {
                                                                            term.label
                                                                        }
                                                                    </span>
                                                                </button>
                                                            ),
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Lead Time */}
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-900 mb-2">
                                                        Thời gian giao hàng
                                                        (ngày)
                                                    </label>
                                                    <div className="flex items-center space-x-4">
                                                        <input
                                                            type="range"
                                                            name="lead_time"
                                                            value={
                                                                formData.lead_time
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            min="1"
                                                            max="30"
                                                            className="flex-1 h-2 bg-indigo-100 rounded-lg appearance-none cursor-pointer"
                                                        />
                                                        <span className="text-lg font-bold text-indigo-600 min-w-[3rem]">
                                                            {formData.lead_time}{" "}
                                                            ngày
                                                        </span>
                                                    </div>
                                                    <p className="mt-2 text-sm text-gray-500">
                                                        Số ngày từ khi đặt hàng
                                                        đến khi nhận hàng
                                                    </p>
                                                </div>

                                                {/* Minimum Order */}
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-900 mb-2">
                                                        Đơn hàng tối thiểu
                                                    </label>
                                                    <div className="relative">
                                                        <input
                                                            type="number"
                                                            name="minimum_order"
                                                            value={
                                                                formData.minimum_order
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            min="0"
                                                            className="block w-full px-4 py-3 bg-gradient-to-r from-gray-50 to-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition-all"
                                                            placeholder="10000000"
                                                        />
                                                        <div className="absolute right-3 top-3 text-gray-500">
                                                            đ
                                                        </div>
                                                    </div>
                                                    <p className="mt-2 text-sm text-gray-500">
                                                        Để 0 nếu không yêu cầu
                                                    </p>
                                                </div>

                                                {/* Notes */}
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-900 mb-2">
                                                        Ghi chú
                                                    </label>
                                                    <textarea
                                                        name="notes"
                                                        value={formData.notes}
                                                        onChange={handleChange}
                                                        rows={4}
                                                        className="block w-full px-4 py-3 bg-gradient-to-r from-gray-50 to-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition-all"
                                                        placeholder="Thông tin bổ sung về nhà cung cấp, điều khoản đặc biệt, v.v..."
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        {/* Settings Tab */}
                                        {activeTab === "settings" && (
                                            <div className="space-y-6">
                                                <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl mb-6">
                                                    <h4 className="text-lg font-medium text-blue-900 mb-2">
                                                        Thiết lập hợp tác
                                                    </h4>
                                                    <p className="text-sm text-blue-700">
                                                        Cấu hình các thông số
                                                        hợp tác với nhà cung cấp
                                                    </p>
                                                </div>

                                                {/* Status */}
                                                <div className="space-y-4">
                                                    <label className="flex items-center p-3 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200 cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            name="is_active"
                                                            checked={
                                                                formData.is_active
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                                        />
                                                        <span className="ml-3">
                                                            <span className="block text-sm font-medium text-gray-900">
                                                                Nhà cung cấp
                                                                đang hoạt động
                                                            </span>
                                                            <span className="block text-sm text-gray-500">
                                                                Nhà cung cấp có
                                                                thể nhận đơn
                                                                hàng mới
                                                            </span>
                                                        </span>
                                                    </label>

                                                    <div className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-100">
                                                        <h5 className="text-sm font-medium text-emerald-900 mb-2">
                                                            Lưu ý quan trọng
                                                        </h5>
                                                        <ul className="space-y-1 text-sm text-emerald-700">
                                                            <li className="flex items-start">
                                                                <CheckCircleIcon className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                                                                <span>
                                                                    Thông tin
                                                                    nhà cung cấp
                                                                    sẽ được sử
                                                                    dụng cho tất
                                                                    cả đơn hàng
                                                                </span>
                                                            </li>
                                                            <li className="flex items-start">
                                                                <CheckCircleIcon className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                                                                <span>
                                                                    Kiểm tra kỹ
                                                                    thông tin
                                                                    trước khi
                                                                    lưu
                                                                </span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>

                                                {/* Quick Actions */}
                                                <div className="pt-6 border-t border-gray-200">
                                                    <h4 className="text-lg font-medium text-gray-900 mb-4">
                                                        Thao tác nhanh
                                                    </h4>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                        <button
                                                            type="button"
                                                            className="flex items-center justify-center p-4 bg-gradient-to-r from-gray-50 to-white border-2 border-gray-200 rounded-xl hover:border-indigo-300 transition-all"
                                                            onClick={() => {
                                                                setFormData({
                                                                    ...formData,
                                                                    payment_terms:
                                                                        "net_30",
                                                                    lead_time: 7,
                                                                    minimum_order: 0,
                                                                });
                                                            }}
                                                        >
                                                            <SparklesIcon className="h-5 w-5 mr-2 text-indigo-600" />
                                                            <span className="text-sm font-medium text-gray-900">
                                                                Thiết lập mặc
                                                                định
                                                            </span>
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="flex items-center justify-center p-4 bg-gradient-to-r from-gray-50 to-white border-2 border-gray-200 rounded-xl hover:border-indigo-300 transition-all"
                                                            onClick={() => {
                                                                navigator.clipboard.writeText(
                                                                    JSON.stringify(
                                                                        formData,
                                                                        null,
                                                                        2,
                                                                    ),
                                                                );
                                                                alert(
                                                                    "Đã sao chép thông tin!",
                                                                );
                                                            }}
                                                        >
                                                            <ClipboardDocumentCheckIcon className="h-5 w-5 mr-2 text-indigo-600" />
                                                            <span className="text-sm font-medium text-gray-900">
                                                                Sao chép thông
                                                                tin
                                                            </span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Preview & Actions */}
                            <div className="space-y-6">
                                {/* Preview Card */}
                                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                                        Xem trước thông tin
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="p-4 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl">
                                            <div className="flex items-center mb-3">
                                                <BuildingOfficeIcon className="h-6 w-6 text-indigo-600 mr-3" />
                                                <h4 className="text-lg font-bold text-gray-900 truncate">
                                                    {formData.name ||
                                                        "Tên công ty"}
                                                </h4>
                                            </div>
                                            <div className="space-y-2">
                                                {formData.contact_person && (
                                                    <div className="flex items-center text-sm text-gray-700">
                                                        <UserIcon className="h-4 w-4 mr-2 text-gray-500" />
                                                        <span>
                                                            {
                                                                formData.contact_person
                                                            }
                                                        </span>
                                                    </div>
                                                )}
                                                {formData.email && (
                                                    <div className="flex items-center text-sm text-gray-700">
                                                        <EnvelopeIcon className="h-4 w-4 mr-2 text-gray-500" />
                                                        <span className="truncate">
                                                            {formData.email}
                                                        </span>
                                                    </div>
                                                )}
                                                {formData.phone && (
                                                    <div className="flex items-center text-sm text-gray-700">
                                                        <PhoneIcon className="h-4 w-4 mr-2 text-gray-500" />
                                                        <span>
                                                            {formData.phone}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Business Info Preview */}
                                        {(formData.lead_time > 0 ||
                                            formData.minimum_order > 0 ||
                                            formData.payment_terms) && (
                                            <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
                                                <h5 className="text-sm font-medium text-gray-900 mb-3">
                                                    Điều khoản hợp tác
                                                </h5>
                                                <div className="space-y-2">
                                                    {formData.lead_time > 0 && (
                                                        <div className="flex items-center text-sm text-gray-700">
                                                            <TruckIcon className="h-4 w-4 mr-2 text-gray-500" />
                                                            <span>
                                                                Giao hàng:{" "}
                                                                {
                                                                    formData.lead_time
                                                                }{" "}
                                                                ngày
                                                            </span>
                                                        </div>
                                                    )}
                                                    {formData.minimum_order >
                                                        0 && (
                                                        <div className="flex items-center text-sm text-gray-700">
                                                            <CurrencyDollarIcon className="h-4 w-4 mr-2 text-gray-500" />
                                                            <span>
                                                                Đơn tối thiểu:{" "}
                                                                {formatCurrency(
                                                                    formData.minimum_order,
                                                                )}
                                                            </span>
                                                        </div>
                                                    )}
                                                    {formData.payment_terms && (
                                                        <div className="flex items-center text-sm text-gray-700">
                                                            <ChartBarIcon className="h-4 w-4 mr-2 text-gray-500" />
                                                            <span>
                                                                Thanh toán:{" "}
                                                                {
                                                                    paymentTerms.find(
                                                                        (t) =>
                                                                            t.value ===
                                                                            formData.payment_terms,
                                                                    )?.label
                                                                }
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Summary Card */}
                                <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl border border-indigo-100 p-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                                        Tóm tắt
                                    </h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-700">
                                                Thông tin cơ bản
                                            </span>
                                            <span
                                                className={`px-2 py-1 text-xs rounded-full ${
                                                    formData.name &&
                                                    formData.contact_person &&
                                                    formData.email &&
                                                    formData.phone
                                                        ? "bg-emerald-100 text-emerald-800"
                                                        : "bg-yellow-100 text-yellow-800"
                                                }`}
                                            >
                                                {formData.name &&
                                                formData.contact_person &&
                                                formData.email &&
                                                formData.phone
                                                    ? "Đầy đủ"
                                                    : "Thiếu"}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-700">
                                                Thông tin kinh doanh
                                            </span>
                                            <span
                                                className={`px-2 py-1 text-xs rounded-full ${
                                                    formData.payment_terms
                                                        ? "bg-emerald-100 text-emerald-800"
                                                        : "bg-gray-100 text-gray-800"
                                                }`}
                                            >
                                                {formData.payment_terms
                                                    ? "Đã cấu hình"
                                                    : "Mặc định"}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-700">
                                                Trạng thái
                                            </span>
                                            <span
                                                className={`px-2 py-1 text-xs rounded-full ${
                                                    formData.is_active
                                                        ? "bg-emerald-100 text-emerald-800"
                                                        : "bg-rose-100 text-rose-800"
                                                }`}
                                            >
                                                {formData.is_active
                                                    ? "Đang hợp tác"
                                                    : "Ngừng hợp tác"}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Actions Card */}
                                <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl border border-indigo-100 p-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                                        Thao tác
                                    </h3>
                                    <div className="space-y-3">
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full flex items-center justify-center px-6 py-4 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-xl hover:from-indigo-600 hover:to-blue-600 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:-translate-y-0.5"
                                        >
                                            {loading ? (
                                                <>
                                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                                                    Đang xử lý...
                                                </>
                                            ) : (
                                                <>
                                                    <CheckCircleIcon className="h-5 w-5 mr-3" />
                                                    {isEditMode
                                                        ? "Cập nhật nhà cung cấp"
                                                        : "Tạo nhà cung cấp"}
                                                </>
                                            )}
                                        </button>

                                        <Link
                                            to="/admin/suppliers"
                                            className="w-full block text-center px-6 py-3 bg-white text-gray-700 border-2 border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all"
                                        >
                                            Hủy bỏ
                                        </Link>

                                        {isEditMode && (
                                            <button
                                                type="button"
                                                className="w-full px-6 py-3 bg-white text-rose-700 border-2 border-rose-200 rounded-xl hover:bg-rose-50 hover:border-rose-300 transition-all"
                                                onClick={() => {
                                                    if (
                                                        window.confirm(
                                                            "Bạn có chắc muốn xóa nhà cung cấp này?",
                                                        )
                                                    ) {
                                                        // API call to delete
                                                        navigate(
                                                            "/admin/suppliers",
                                                        );
                                                    }
                                                }}
                                            >
                                                Xóa nhà cung cấp
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {/* Tips Card */}
                                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100 p-6">
                                    <div className="flex items-center mb-3">
                                        <SparklesIcon className="h-5 w-5 text-emerald-600 mr-2" />
                                        <h3 className="text-lg font-medium text-emerald-900">
                                            Mẹo hữu ích
                                        </h3>
                                    </div>
                                    <ul className="space-y-2 text-sm text-emerald-700">
                                        <li className="flex items-start">
                                            <CheckCircleIcon className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                                            <span>
                                                Luôn cập nhật thông tin liên hệ
                                                chính xác
                                            </span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircleIcon className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                                            <span>
                                                Xác nhận điều khoản thanh toán
                                                với nhà cung cấp
                                            </span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircleIcon className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                                            <span>
                                                Lưu ý thời gian giao hàng để
                                                quản lý tồn kho
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default SupplierForm;
