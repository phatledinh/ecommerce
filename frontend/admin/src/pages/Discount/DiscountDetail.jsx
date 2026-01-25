// pages/admin/discounts/DiscountDetail.jsx
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
    ArrowLeftIcon,
    CalendarIcon,
    ClockIcon,
    TagIcon,
    CurrencyDollarIcon,
    PercentBadgeIcon,
    UsersIcon,
    ChartBarIcon,
    DocumentDuplicateIcon,
    ArrowTopRightOnSquareIcon,
    PencilIcon,
    TrashIcon,
    CheckCircleIcon,
    XCircleIcon,
    FireIcon,
    CubeIcon,
    UserGroupIcon,
    ShoppingBagIcon,
} from "@heroicons/react/24/outline";

const DiscountDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [discount, setDiscount] = useState(null);
    const [loading, setLoading] = useState(true);
    const [usageHistory, setUsageHistory] = useState([]);
    const [activeTab, setActiveTab] = useState("overview");

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setDiscount({
                id: 1,
                code: "WELCOME50",
                name: "Giảm giá chào mừng",
                description: "Giảm giá cho khách hàng mới mua hàng lần đầu",
                discount_type: "PERCENT",
                discount_value: 50,
                max_discount_amount: 500000,
                min_order_value: 0,
                start_date: "2024-01-01T00:00:00",
                end_date: "2024-12-31T23:59:59",
                is_active: true,
                usage_count: 125,
                usage_limit: 1000,
                created_at: "2024-01-01T10:00:00",
                updated_at: "2024-02-15T14:30:00",
                created_by: "Admin",
                target_type: "ALL",
                color: "from-purple-500 to-pink-400",
            });

            setUsageHistory([
                {
                    id: 1,
                    order_id: "ORD-2024-00123",
                    customer_name: "Nguyễn Văn A",
                    customer_email: "nguyenvana@email.com",
                    order_amount: 2500000,
                    discount_amount: 500000,
                    used_at: "2024-02-15T14:30:00",
                },
                {
                    id: 2,
                    order_id: "ORD-2024-00124",
                    customer_name: "Trần Thị B",
                    customer_email: "tranthib@email.com",
                    order_amount: 1800000,
                    discount_amount: 500000,
                    used_at: "2024-02-15T10:15:00",
                },
                {
                    id: 3,
                    order_id: "ORD-2024-00125",
                    customer_name: "Lê Văn C",
                    customer_email: "levanc@email.com",
                    order_amount: 3200000,
                    discount_amount: 500000,
                    used_at: "2024-02-14T16:45:00",
                },
            ]);

            setLoading(false);
        }, 800);
    }, [id]);

    const handleDelete = () => {
        if (window.confirm("Bạn có chắc muốn xóa mã giảm giá này?")) {
            // API call to delete
            navigate("/admin/discounts");
        }
    };

    const handleToggleStatus = () => {
        // API call to toggle status
        setDiscount((prev) => ({ ...prev, is_active: !prev.is_active }));
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(discount.code);
        alert("Đã sao chép mã vào clipboard!");
    };

    const getStatusInfo = () => {
        const now = new Date();
        const start = new Date(discount.start_date);
        const end = new Date(discount.end_date);

        if (!discount.is_active) {
            return {
                color: "bg-gray-100 text-gray-800",
                text: "Ngừng hoạt động",
            };
        }
        if (now < start) {
            return {
                color: "bg-yellow-100 text-yellow-800",
                text: "Sắp diễn ra",
            };
        }
        if (now > end) {
            return { color: "bg-rose-100 text-rose-800", text: "Đã hết hạn" };
        }
        return {
            color: "bg-emerald-100 text-emerald-800",
            text: "Đang hoạt động",
        };
    };

    const calculateUsagePercentage = () => {
        if (!discount.usage_limit || discount.usage_limit === 0) return 0;
        return Math.min(
            100,
            (discount.usage_count / discount.usage_limit) * 100,
        );
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <div className="relative">
                    <div className="w-20 h-20 border-4 border-purple-200 rounded-full"></div>
                    <div className="absolute top-0 left-0 w-20 h-20 border-4 border-purple-500 rounded-full border-t-transparent animate-spin"></div>
                </div>
                <p className="mt-6 text-lg text-gray-600">
                    Đang tải chi tiết...
                </p>
            </div>
        );
    }

    if (!discount) {
        return (
            <div className="text-center py-16">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl mb-6">
                    <TagIcon className="h-10 w-10 text-purple-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Không tìm thấy mã giảm giá
                </h3>
                <p className="text-gray-600 mb-6">
                    Mã giảm giá bạn tìm kiếm không tồn tại
                </p>
                <Link
                    to="/admin/discounts"
                    className="inline-flex items-center px-5 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 shadow-lg hover:shadow-xl transition-all"
                >
                    <ArrowLeftIcon className="h-5 w-5 mr-2" />
                    Quay lại danh sách
                </Link>
            </div>
        );
    }

    const statusInfo = getStatusInfo();

    return (
        <div className="min-h-screen bg-gradient-to-b from-purple-50/50 to-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <Link
                        to="/admin/discounts"
                        className="inline-flex items-center text-purple-600 hover:text-purple-800 mb-4 group"
                    >
                        <ArrowLeftIcon className="h-5 w-5 mr-2 transition-transform group-hover:-translate-x-1" />
                        Quay lại danh sách
                    </Link>
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                Chi Tiết Mã Giảm Giá
                            </h1>
                            <p className="text-gray-600 mt-2">
                                Thông tin chi tiết và lịch sử sử dụng
                            </p>
                        </div>
                        <div className="flex items-center space-x-3">
                            <span
                                className={`px-3 py-1 rounded-full text-sm font-medium ${statusInfo.color}`}
                            >
                                {statusInfo.text}
                            </span>
                            <Link
                                to={`/admin/discounts/${id}/edit`}
                                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl hover:from-amber-600 hover:to-orange-600 shadow-lg hover:shadow-xl transition-all"
                            >
                                <PencilIcon className="h-5 w-5 mr-2" />
                                Chỉnh sửa
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Discount Info */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Discount Card */}
                        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                            <div className={`h-2 ${discount.color}`}></div>
                            <div className="p-6">
                                <div className="flex items-start justify-between mb-6">
                                    <div>
                                        <div className="flex items-center space-x-3 mb-2">
                                            <div className="bg-gradient-to-r from-purple-100 to-pink-100 px-4 py-2 rounded-lg">
                                                <code className="text-2xl font-bold text-purple-700">
                                                    {discount.code}
                                                </code>
                                            </div>
                                            <button
                                                onClick={copyToClipboard}
                                                className="inline-flex items-center px-3 py-2 text-sm text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                                                title="Sao chép mã"
                                            >
                                                <DocumentDuplicateIcon className="h-4 w-4 mr-1" />
                                                Copy
                                            </button>
                                        </div>
                                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                            {discount.name}
                                        </h2>
                                        <p className="text-gray-600">
                                            {discount.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Discount Details Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                    <div className="space-y-4">
                                        <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
                                            <p className="text-sm text-gray-500 mb-1">
                                                Loại giảm giá
                                            </p>
                                            <div className="flex items-center">
                                                {discount.discount_type ===
                                                "PERCENT" ? (
                                                    <>
                                                        <PercentBadgeIcon className="h-6 w-6 text-purple-600 mr-3" />
                                                        <span className="text-xl font-bold text-gray-900">
                                                            {
                                                                discount.discount_value
                                                            }
                                                            %
                                                        </span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <CurrencyDollarIcon className="h-6 w-6 text-emerald-600 mr-3" />
                                                        <span className="text-xl font-bold text-gray-900">
                                                            {discount.discount_value.toLocaleString()}
                                                            đ
                                                        </span>
                                                    </>
                                                )}
                                            </div>
                                        </div>

                                        <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
                                            <p className="text-sm text-gray-500 mb-1">
                                                Giảm tối đa
                                            </p>
                                            <div className="flex items-center">
                                                <CurrencyDollarIcon className="h-6 w-6 text-blue-600 mr-3" />
                                                <span className="text-xl font-bold text-gray-900">
                                                    {discount.max_discount_amount
                                                        ? `${discount.max_discount_amount.toLocaleString()}đ`
                                                        : "Không giới hạn"}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
                                            <p className="text-sm text-gray-500 mb-1">
                                                Đơn tối thiểu
                                            </p>
                                            <div className="flex items-center">
                                                <ShoppingBagIcon className="h-6 w-6 text-amber-600 mr-3" />
                                                <span className="text-xl font-bold text-gray-900">
                                                    {discount.min_order_value
                                                        ? `${discount.min_order_value.toLocaleString()}đ`
                                                        : "Không yêu cầu"}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
                                            <p className="text-sm text-gray-500 mb-1">
                                                Áp dụng cho
                                            </p>
                                            <div className="flex items-center">
                                                <CubeIcon className="h-6 w-6 text-indigo-600 mr-3" />
                                                <span className="text-xl font-bold text-gray-900">
                                                    {discount.target_type ===
                                                    "ALL"
                                                        ? "Tất cả sản phẩm"
                                                        : discount.target_type}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Date Range */}
                                <div className="flex items-center justify-between mb-8 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                                    <div className="text-center">
                                        <p className="text-xs text-gray-500">
                                            Bắt đầu
                                        </p>
                                        <p className="font-bold text-gray-900">
                                            {new Date(
                                                discount.start_date,
                                            ).toLocaleDateString("vi-VN")}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            {new Date(
                                                discount.start_date,
                                            ).toLocaleTimeString("vi-VN")}
                                        </p>
                                    </div>
                                    <div className="text-gray-400 text-xl">
                                        →
                                    </div>
                                    <div className="text-center">
                                        <p className="text-xs text-gray-500">
                                            Kết thúc
                                        </p>
                                        <p className="font-bold text-gray-900">
                                            {new Date(
                                                discount.end_date,
                                            ).toLocaleDateString("vi-VN")}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            {new Date(
                                                discount.end_date,
                                            ).toLocaleTimeString("vi-VN")}
                                        </p>
                                    </div>
                                </div>

                                {/* Usage Progress */}
                                <div className="mb-6">
                                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                                        <div className="flex items-center">
                                            <ChartBarIcon className="h-4 w-4 mr-2" />
                                            <span>Tỉ lệ sử dụng</span>
                                        </div>
                                        <span>
                                            {discount.usage_count} /{" "}
                                            {discount.usage_limit || "∞"} (
                                            {Math.round(
                                                calculateUsagePercentage(),
                                            )}
                                            %)
                                        </span>
                                    </div>
                                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full ${discount.color} rounded-full transition-all duration-500`}
                                            style={{
                                                width: `${calculateUsagePercentage()}%`,
                                            }}
                                        ></div>
                                    </div>
                                </div>

                                {/* Created Info */}
                                <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-200">
                                    <div>
                                        Tạo bởi:{" "}
                                        <span className="font-medium">
                                            {discount.created_by}
                                        </span>
                                    </div>
                                    <div>
                                        Cập nhật:{" "}
                                        {new Date(
                                            discount.updated_at,
                                        ).toLocaleString("vi-VN")}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Tab Navigation */}
                        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                            <div className="border-b border-gray-200">
                                <nav
                                    className="flex space-x-1 px-6"
                                    aria-label="Tabs"
                                >
                                    {["overview", "usage", "stats"].map(
                                        (tab) => (
                                            <button
                                                key={tab}
                                                type="button"
                                                onClick={() =>
                                                    setActiveTab(tab)
                                                }
                                                className={`px-4 py-3 text-sm font-medium rounded-lg transition-all ${
                                                    activeTab === tab
                                                        ? "bg-purple-100 text-purple-700"
                                                        : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                                                }`}
                                            >
                                                {tab === "overview" &&
                                                    "Tổng quan"}
                                                {tab === "usage" &&
                                                    "Lịch sử sử dụng"}
                                                {tab === "stats" && "Thống kê"}
                                            </button>
                                        ),
                                    )}
                                </nav>
                            </div>

                            <div className="p-6">
                                {activeTab === "overview" && (
                                    <div className="space-y-6">
                                        <div>
                                            <h4 className="text-lg font-medium text-gray-900 mb-4">
                                                Thông tin bổ sung
                                            </h4>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200">
                                                    <p className="text-sm text-gray-500">
                                                        Thời gian còn lại
                                                    </p>
                                                    <p className="text-xl font-bold text-gray-900 mt-1">
                                                        {Math.ceil(
                                                            (new Date(
                                                                discount.end_date,
                                                            ) -
                                                                new Date()) /
                                                                (1000 *
                                                                    60 *
                                                                    60 *
                                                                    24),
                                                        )}{" "}
                                                        ngày
                                                    </p>
                                                </div>
                                                <div className="p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200">
                                                    <p className="text-sm text-gray-500">
                                                        Lượt sử dụng còn lại
                                                    </p>
                                                    <p className="text-xl font-bold text-gray-900 mt-1">
                                                        {discount.usage_limit
                                                            ? discount.usage_limit -
                                                              discount.usage_count
                                                            : "Không giới hạn"}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="text-lg font-medium text-gray-900 mb-4">
                                                Hướng dẫn sử dụng
                                            </h4>
                                            <ul className="space-y-2">
                                                <li className="flex items-start">
                                                    <div className="bg-emerald-100 text-emerald-800 p-1 rounded mr-3">
                                                        <CheckCircleIcon className="h-4 w-4" />
                                                    </div>
                                                    <span className="text-gray-700">
                                                        Nhập mã {discount.code}{" "}
                                                        tại trang thanh toán
                                                    </span>
                                                </li>
                                                <li className="flex items-start">
                                                    <div className="bg-emerald-100 text-emerald-800 p-1 rounded mr-3">
                                                        <CheckCircleIcon className="h-4 w-4" />
                                                    </div>
                                                    <span className="text-gray-700">
                                                        Áp dụng cho đơn hàng{" "}
                                                        {discount.min_order_value >
                                                        0
                                                            ? `từ ${discount.min_order_value.toLocaleString()}đ`
                                                            : "không có giá trị tối thiểu"}
                                                    </span>
                                                </li>
                                                <li className="flex items-start">
                                                    <div className="bg-emerald-100 text-emerald-800 p-1 rounded mr-3">
                                                        <CheckCircleIcon className="h-4 w-4" />
                                                    </div>
                                                    <span className="text-gray-700">
                                                        {discount.target_type ===
                                                        "ALL"
                                                            ? "Áp dụng cho tất cả sản phẩm"
                                                            : `Chỉ áp dụng cho ${discount.target_type.toLowerCase()}`}
                                                    </span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                )}

                                {activeTab === "usage" && (
                                    <div>
                                        <div className="flex items-center justify-between mb-6">
                                            <h4 className="text-lg font-medium text-gray-900">
                                                Lịch sử sử dụng
                                            </h4>
                                            <span className="text-sm text-gray-500">
                                                {usageHistory.length} lượt
                                            </span>
                                        </div>

                                        <div className="space-y-3">
                                            {usageHistory.map((usage) => (
                                                <div
                                                    key={usage.id}
                                                    className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200 hover:border-purple-300 transition-colors"
                                                >
                                                    <div>
                                                        <div className="flex items-center space-x-3">
                                                            <UserGroupIcon className="h-5 w-5 text-gray-400" />
                                                            <div>
                                                                <p className="font-medium text-gray-900">
                                                                    {
                                                                        usage.customer_name
                                                                    }
                                                                </p>
                                                                <p className="text-sm text-gray-500">
                                                                    {
                                                                        usage.customer_email
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="font-medium text-gray-900">
                                                            {usage.order_id}
                                                        </p>
                                                        <p className="text-sm text-gray-500">
                                                            {new Date(
                                                                usage.used_at,
                                                            ).toLocaleDateString(
                                                                "vi-VN",
                                                            )}
                                                        </p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="font-bold text-emerald-700">
                                                            -
                                                            {usage.discount_amount.toLocaleString()}
                                                            đ
                                                        </p>
                                                        <p className="text-sm text-gray-500">
                                                            Tổng:{" "}
                                                            {usage.order_amount.toLocaleString()}
                                                            đ
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {activeTab === "stats" && (
                                    <div>
                                        <h4 className="text-lg font-medium text-gray-900 mb-6">
                                            Thống kê hiệu quả
                                        </h4>
                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl">
                                                <p className="text-sm text-blue-700">
                                                    Tổng giảm giá
                                                </p>
                                                <p className="text-2xl font-bold text-blue-900 mt-2">
                                                    15.2M đ
                                                </p>
                                                <p className="text-xs text-blue-600 mt-2">
                                                    Tổng giá trị đã giảm
                                                </p>
                                            </div>
                                            <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl">
                                                <p className="text-sm text-purple-700">
                                                    Đơn hàng thành công
                                                </p>
                                                <p className="text-2xl font-bold text-purple-900 mt-2">
                                                    {discount.usage_count}
                                                </p>
                                                <p className="text-xs text-purple-600 mt-2">
                                                    Số đơn sử dụng mã
                                                </p>
                                            </div>
                                            <div className="p-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl">
                                                <p className="text-sm text-emerald-700">
                                                    Tỉ lệ sử dụng
                                                </p>
                                                <p className="text-2xl font-bold text-emerald-900 mt-2">
                                                    {Math.round(
                                                        calculateUsagePercentage(),
                                                    )}
                                                    %
                                                </p>
                                                <p className="text-xs text-emerald-600 mt-2">
                                                    So với giới hạn
                                                </p>
                                            </div>
                                            <div className="p-6 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl">
                                                <p className="text-sm text-amber-700">
                                                    Giá trị đơn trung bình
                                                </p>
                                                <p className="text-2xl font-bold text-amber-900 mt-2">
                                                    2.8M đ
                                                </p>
                                                <p className="text-xs text-amber-600 mt-2">
                                                    Khi sử dụng mã
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Actions */}
                    <div className="space-y-6">
                        {/* Quick Actions */}
                        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-100 p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">
                                Thao tác nhanh
                            </h3>
                            <div className="space-y-3">
                                <button
                                    onClick={copyToClipboard}
                                    className="w-full flex items-center justify-center px-4 py-3 bg-white text-gray-700 border-2 border-gray-200 rounded-xl hover:border-purple-300 hover:text-purple-700 transition-all"
                                >
                                    <DocumentDuplicateIcon className="h-5 w-5 mr-2" />
                                    Sao chép mã
                                </button>
                                <button
                                    onClick={handleToggleStatus}
                                    className={`w-full flex items-center justify-center px-4 py-3 border-2 rounded-xl transition-all ${
                                        discount.is_active
                                            ? "bg-rose-50 border-rose-200 text-rose-700 hover:bg-rose-100"
                                            : "bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100"
                                    }`}
                                >
                                    {discount.is_active ? (
                                        <>
                                            <XCircleIcon className="h-5 w-5 mr-2" />
                                            Vô hiệu hóa
                                        </>
                                    ) : (
                                        <>
                                            <CheckCircleIcon className="h-5 w-5 mr-2" />
                                            Kích hoạt
                                        </>
                                    )}
                                </button>
                                <Link
                                    to={`/admin/discounts/${id}/edit`}
                                    className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl hover:from-amber-600 hover:to-orange-600 shadow-lg hover:shadow-xl transition-all"
                                >
                                    <PencilIcon className="h-5 w-5 mr-2" />
                                    Chỉnh sửa
                                </Link>
                                <button
                                    onClick={handleDelete}
                                    className="w-full flex items-center justify-center px-4 py-3 bg-white text-rose-700 border-2 border-rose-200 rounded-xl hover:bg-rose-50 hover:border-rose-300 transition-all"
                                >
                                    <TrashIcon className="h-5 w-5 mr-2" />
                                    Xóa mã giảm giá
                                </button>
                            </div>
                        </div>

                        {/* QR Code (Optional) */}
                        <div className="bg-white rounded-2xl border border-gray-200 p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">
                                QR Code
                            </h3>
                            <div className="flex flex-col items-center">
                                <div className="w-48 h-48 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl flex items-center justify-center mb-4">
                                    <div className="text-center">
                                        <div className="text-4xl mb-2">🎫</div>
                                        <code className="font-mono font-bold text-purple-700">
                                            {discount.code}
                                        </code>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-600 text-center">
                                    Quét mã để sử dụng
                                </p>
                            </div>
                        </div>

                        {/* Summary */}
                        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100 p-6">
                            <div className="flex items-center mb-3">
                                <FireIcon className="h-5 w-5 text-emerald-600 mr-2" />
                                <h3 className="text-lg font-medium text-emerald-900">
                                    Tóm tắt hiệu quả
                                </h3>
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-sm text-emerald-700">
                                        Lượt sử dụng
                                    </span>
                                    <span className="font-bold text-emerald-900">
                                        {discount.usage_count}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-emerald-700">
                                        Tỉ lệ sử dụng
                                    </span>
                                    <span className="font-bold text-emerald-900">
                                        {Math.round(calculateUsagePercentage())}
                                        %
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-emerald-700">
                                        Thời gian còn lại
                                    </span>
                                    <span className="font-bold text-emerald-900">
                                        {Math.ceil(
                                            (new Date(discount.end_date) -
                                                new Date()) /
                                                (1000 * 60 * 60 * 24),
                                        )}{" "}
                                        ngày
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DiscountDetail;
