// pages/admin/discounts/DiscountList.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    PencilIcon,
    TrashIcon,
    EyeIcon,
    PlusIcon,
    MagnifyingGlassIcon,
    CheckCircleIcon,
    XCircleIcon,
    TagIcon,
    ClockIcon,
    CurrencyDollarIcon,
    PercentBadgeIcon,
    FireIcon,
    DocumentDuplicateIcon,
    ArrowTopRightOnSquareIcon,
    ChartBarIcon,
} from "@heroicons/react/24/outline";

const DiscountList = () => {
    const [discounts, setDiscounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState("all");
    const [filterStatus, setFilterStatus] = useState("all");
    const [selectedDiscounts, setSelectedDiscounts] = useState([]);

    // Mock data
    useEffect(() => {
        setTimeout(() => {
            setDiscounts([
                {
                    id: 1,
                    code: "WELCOME50",
                    name: "Giảm giá chào mừng",
                    description: "Giảm giá cho khách hàng mới",
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
                    target_type: "ALL",
                    color: "from-purple-500 to-pink-400",
                },
                {
                    id: 2,
                    code: "FREESHIP",
                    name: "Miễn phí vận chuyển",
                    description: "Miễn phí vận chuyển cho đơn từ 500K",
                    discount_type: "FIXED_AMOUNT",
                    discount_value: 30000,
                    max_discount_amount: 30000,
                    min_order_value: 500000,
                    start_date: "2024-02-01T00:00:00",
                    end_date: "2024-02-29T23:59:59",
                    is_active: true,
                    usage_count: 89,
                    usage_limit: 500,
                    created_at: "2024-01-15T14:30:00",
                    target_type: "ALL",
                    color: "from-blue-500 to-cyan-400",
                },
                {
                    id: 3,
                    code: "SAMSUNG30",
                    name: "Giảm giá sản phẩm Samsung",
                    description: "Giảm giá cho sản phẩm thương hiệu Samsung",
                    discount_type: "PERCENT",
                    discount_value: 30,
                    max_discount_amount: 2000000,
                    min_order_value: 1000000,
                    start_date: "2024-01-20T00:00:00",
                    end_date: "2024-03-31T23:59:59",
                    is_active: true,
                    usage_count: 42,
                    usage_limit: 200,
                    created_at: "2024-01-20T09:15:00",
                    target_type: "BRAND",
                    color: "from-emerald-500 to-teal-400",
                },
                {
                    id: 4,
                    code: "BLACKFRIDAY",
                    name: "Black Friday Sale",
                    description: "Siêu sale Black Friday",
                    discount_type: "PERCENT",
                    discount_value: 70,
                    max_discount_amount: 5000000,
                    min_order_value: 0,
                    start_date: "2023-11-24T00:00:00",
                    end_date: "2023-11-24T23:59:59",
                    is_active: false,
                    usage_count: 1000,
                    usage_limit: 1000,
                    created_at: "2023-11-01T08:00:00",
                    target_type: "ALL",
                    color: "from-gray-800 to-gray-600",
                },
                {
                    id: 5,
                    code: "PHONE20",
                    name: "Giảm giá điện thoại",
                    description: "Giảm giá cho danh mục điện thoại",
                    discount_type: "PERCENT",
                    discount_value: 20,
                    max_discount_amount: 1000000,
                    min_order_value: 2000000,
                    start_date: "2024-03-01T00:00:00",
                    end_date: "2024-03-31T23:59:59",
                    is_active: true,
                    usage_count: 0,
                    usage_limit: 300,
                    created_at: "2024-02-25T16:45:00",
                    target_type: "CATEGORY",
                    color: "from-amber-500 to-orange-400",
                },
            ]);
            setLoading(false);
        }, 800);
    }, []);

    const handleDelete = (id) => {
        if (window.confirm("Bạn có chắc muốn xóa mã giảm giá này?")) {
            setDiscounts(discounts.filter((d) => d.id !== id));
        }
    };

    const handleToggleStatus = (id) => {
        setDiscounts(
            discounts.map((d) =>
                d.id === id ? { ...d, is_active: !d.is_active } : d,
            ),
        );
    };

    const toggleSelectDiscount = (id) => {
        setSelectedDiscounts((prev) =>
            prev.includes(id)
                ? prev.filter((discountId) => discountId !== id)
                : [...prev, id],
        );
    };

    const handleBulkAction = (action) => {
        if (selectedDiscounts.length === 0) {
            alert("Vui lòng chọn ít nhất một mã giảm giá");
            return;
        }

        switch (action) {
            case "activate":
                setDiscounts(
                    discounts.map((d) =>
                        selectedDiscounts.includes(d.id)
                            ? { ...d, is_active: true }
                            : d,
                    ),
                );
                break;
            case "deactivate":
                setDiscounts(
                    discounts.map((d) =>
                        selectedDiscounts.includes(d.id)
                            ? { ...d, is_active: false }
                            : d,
                    ),
                );
                break;
            case "delete":
                if (
                    window.confirm(
                        `Xóa ${selectedDiscounts.length} mã giảm giá?`,
                    )
                ) {
                    setDiscounts(
                        discounts.filter(
                            (d) => !selectedDiscounts.includes(d.id),
                        ),
                    );
                    setSelectedDiscounts([]);
                }
                break;
        }
    };

    const getStatusColor = (discount) => {
        const now = new Date();
        const start = new Date(discount.start_date);
        const end = new Date(discount.end_date);

        if (!discount.is_active) return "bg-gray-100 text-gray-800";
        if (now < start) return "bg-yellow-100 text-yellow-800";
        if (now > end) return "bg-rose-100 text-rose-800";
        return "bg-emerald-100 text-emerald-800";
    };

    const getStatusText = (discount) => {
        const now = new Date();
        const start = new Date(discount.start_date);
        const end = new Date(discount.end_date);

        if (!discount.is_active) return "Ngừng hoạt động";
        if (now < start) return "Sắp diễn ra";
        if (now > end) return "Đã hết hạn";
        return "Đang hoạt động";
    };

    const calculateUsagePercentage = (discount) => {
        if (!discount.usage_limit || discount.usage_limit === 0) return 0;
        return Math.min(
            100,
            (discount.usage_count / discount.usage_limit) * 100,
        );
    };

    const filteredDiscounts = discounts.filter((discount) => {
        const matchesSearch =
            discount.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
            discount.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType =
            filterType === "all" || discount.discount_type === filterType;
        const matchesStatus =
            filterStatus === "all" ||
            (filterStatus === "active" && discount.is_active) ||
            (filterStatus === "inactive" && !discount.is_active);

        return matchesSearch && matchesType && matchesStatus;
    });

    const StatsCard = ({ title, value, icon, color, subtitle }) => (
        <div
            className={`${color} rounded-2xl p-6 text-white shadow-lg transform transition-transform hover:scale-105`}
        >
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm opacity-90">{title}</p>
                    <p className="text-3xl font-bold mt-2">{value}</p>
                    {subtitle && (
                        <p className="text-sm opacity-90 mt-1">{subtitle}</p>
                    )}
                </div>
                <div className="text-3xl">{icon}</div>
            </div>
        </div>
    );

    return (
        <div className="p-6">
            {/* Header with Stats */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            Quản Lý Mã Giảm Giá
                        </h1>
                        <p className="text-gray-600 mt-2">
                            Quản lý mã giảm giá và voucher khuyến mãi
                        </p>
                    </div>
                    <Link
                        to="/admin/discounts/new"
                        className="inline-flex items-center px-5 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
                    >
                        <PlusIcon className="h-5 w-5 mr-2" />
                        Tạo Mã Giảm Giá
                    </Link>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <StatsCard
                        title="Tổng Mã Giảm Giá"
                        value={discounts.length}
                        icon="🎫"
                        color="bg-gradient-to-r from-purple-500 to-pink-400"
                    />
                    <StatsCard
                        title="Đang Hoạt Động"
                        value={discounts.filter((d) => d.is_active).length}
                        icon="✅"
                        subtitle={`${
                            discounts.filter((d) => {
                                const now = new Date();
                                const start = new Date(d.start_date);
                                const end = new Date(d.end_date);
                                return (
                                    d.is_active && now >= start && now <= end
                                );
                            }).length
                        } đang chạy`}
                        color="bg-gradient-to-r from-emerald-500 to-teal-400"
                    />
                    <StatsCard
                        title="Sử Dụng Hôm Nay"
                        value="256"
                        icon="📊"
                        subtitle="+24% so với hôm qua"
                        color="bg-gradient-to-r from-blue-500 to-cyan-400"
                    />
                    <StatsCard
                        title="Doanh Thu Giảm"
                        value="15.2M"
                        icon="💰"
                        subtitle="Tổng giá trị giảm"
                        color="bg-gradient-to-r from-amber-500 to-orange-400"
                    />
                </div>
            </div>

            {/* Search and Controls */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 mb-6 border border-purple-100">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                    {/* Search */}
                    <div className="lg:col-span-2">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <MagnifyingGlassIcon className="h-5 w-5 text-purple-500" />
                            </div>
                            <input
                                type="text"
                                placeholder="Tìm kiếm mã, tên giảm giá..."
                                className="w-full pl-12 pr-4 py-3 bg-white rounded-xl border border-purple-200 focus:ring-2 focus:ring-purple-300 focus:border-transparent transition-all"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Filter by Type */}
                    <div>
                        <select
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                            className="w-full px-4 py-3 bg-white rounded-xl border border-purple-200 focus:ring-2 focus:ring-purple-300 focus:border-transparent"
                        >
                            <option value="all">Tất cả loại</option>
                            <option value="FIXED_AMOUNT">Giá cố định</option>
                            <option value="PERCENT">Phần trăm</option>
                        </select>
                    </div>

                    {/* Filter by Status */}
                    <div>
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="w-full px-4 py-3 bg-white rounded-xl border border-purple-200 focus:ring-2 focus:ring-purple-300 focus:border-transparent"
                        >
                            <option value="all">Tất cả trạng thái</option>
                            <option value="active">Đang hoạt động</option>
                            <option value="inactive">Ngừng hoạt động</option>
                        </select>
                    </div>

                    {/* Bulk Actions */}
                    <div>
                        <select
                            onChange={(e) => handleBulkAction(e.target.value)}
                            className="w-full px-4 py-3 bg-white rounded-xl border border-purple-200 focus:ring-2 focus:ring-purple-300 focus:border-transparent"
                            defaultValue=""
                        >
                            <option value="" disabled>
                                Hành động hàng loạt
                            </option>
                            <option value="activate">Kích hoạt đã chọn</option>
                            <option value="deactivate">
                                Vô hiệu hóa đã chọn
                            </option>
                            <option value="delete">Xóa đã chọn</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Loading State */}
            {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                    <div className="relative">
                        <div className="w-20 h-20 border-4 border-purple-200 rounded-full"></div>
                        <div className="absolute top-0 left-0 w-20 h-20 border-4 border-purple-500 rounded-full border-t-transparent animate-spin"></div>
                    </div>
                    <p className="mt-6 text-lg text-gray-600">
                        Đang tải mã giảm giá...
                    </p>
                </div>
            ) : (
                <>
                    {/* Discount Cards Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {filteredDiscounts.map((discount) => (
                            <div
                                key={discount.id}
                                className={`bg-white rounded-2xl overflow-hidden border-2 transition-all hover:shadow-xl hover:-translate-y-1 ${
                                    selectedDiscounts.includes(discount.id)
                                        ? "border-purple-400 ring-2 ring-purple-100"
                                        : "border-gray-100 hover:border-purple-200"
                                }`}
                            >
                                <div className="relative">
                                    {/* Header with Gradient */}
                                    <div
                                        className={`h-3 ${discount.color}`}
                                    ></div>

                                    <div className="p-6">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex-1">
                                                <div className="flex items-center space-x-3 mb-2">
                                                    {/* Selection Checkbox */}
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedDiscounts.includes(
                                                            discount.id,
                                                        )}
                                                        onChange={() =>
                                                            toggleSelectDiscount(
                                                                discount.id,
                                                            )
                                                        }
                                                        className="h-5 w-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                                                    />

                                                    {/* Discount Code */}
                                                    <div className="flex items-center">
                                                        <div className="bg-gradient-to-r from-purple-100 to-pink-100 px-4 py-2 rounded-lg">
                                                            <code className="text-lg font-bold text-purple-700">
                                                                {discount.code}
                                                            </code>
                                                        </div>
                                                    </div>

                                                    {/* Status Badge */}
                                                    <div>
                                                        <span
                                                            className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                                                                discount,
                                                            )}`}
                                                        >
                                                            {getStatusText(
                                                                discount,
                                                            )}
                                                        </span>
                                                    </div>
                                                </div>

                                                <h3 className="text-xl font-bold text-gray-900 mb-1">
                                                    {discount.name}
                                                </h3>
                                                <p className="text-gray-600 text-sm mb-4">
                                                    {discount.description}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Discount Details */}
                                        <div className="grid grid-cols-2 gap-4 mb-6">
                                            <div className="space-y-3">
                                                <div>
                                                    <p className="text-xs text-gray-500">
                                                        Loại giảm giá
                                                    </p>
                                                    <div className="flex items-center mt-1">
                                                        {discount.discount_type ===
                                                        "PERCENT" ? (
                                                            <>
                                                                <PercentBadgeIcon className="h-5 w-5 text-purple-600 mr-2" />
                                                                <span className="font-medium text-gray-900">
                                                                    {
                                                                        discount.discount_value
                                                                    }
                                                                    %
                                                                </span>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <CurrencyDollarIcon className="h-5 w-5 text-emerald-600 mr-2" />
                                                                <span className="font-medium text-gray-900">
                                                                    {discount.discount_value.toLocaleString()}
                                                                    đ
                                                                </span>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>

                                                <div>
                                                    <p className="text-xs text-gray-500">
                                                        Áp dụng cho
                                                    </p>
                                                    <div className="flex items-center mt-1">
                                                        <TagIcon className="h-5 w-5 text-blue-600 mr-2" />
                                                        <span className="font-medium text-gray-900">
                                                            {discount.target_type ===
                                                            "ALL"
                                                                ? "Tất cả sản phẩm"
                                                                : discount.target_type ===
                                                                    "BRAND"
                                                                  ? "Thương hiệu"
                                                                  : discount.target_type ===
                                                                      "CATEGORY"
                                                                    ? "Danh mục"
                                                                    : "Sản phẩm"}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-3">
                                                <div>
                                                    <p className="text-xs text-gray-500">
                                                        Điều kiện
                                                    </p>
                                                    <div className="mt-1">
                                                        {discount.min_order_value >
                                                            0 && (
                                                            <p className="text-sm text-gray-900">
                                                                Đơn tối thiểu:{" "}
                                                                <span className="font-medium">
                                                                    {discount.min_order_value.toLocaleString()}
                                                                    đ
                                                                </span>
                                                            </p>
                                                        )}
                                                        {discount.max_discount_amount && (
                                                            <p className="text-sm text-gray-900">
                                                                Giảm tối đa:{" "}
                                                                <span className="font-medium">
                                                                    {discount.max_discount_amount.toLocaleString()}
                                                                    đ
                                                                </span>
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>

                                                <div>
                                                    <p className="text-xs text-gray-500">
                                                        Sử dụng
                                                    </p>
                                                    <div className="flex items-center mt-1">
                                                        <ChartBarIcon className="h-5 w-5 text-amber-600 mr-2" />
                                                        <span className="font-medium text-gray-900">
                                                            {
                                                                discount.usage_count
                                                            }
                                                            /
                                                            {discount.usage_limit ||
                                                                "∞"}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Usage Progress Bar */}
                                        <div className="mb-6">
                                            <div className="flex justify-between text-sm text-gray-600 mb-1">
                                                <span>Tỉ lệ sử dụng</span>
                                                <span>
                                                    {Math.round(
                                                        calculateUsagePercentage(
                                                            discount,
                                                        ),
                                                    )}
                                                    %
                                                </span>
                                            </div>
                                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full ${discount.color} rounded-full transition-all duration-500`}
                                                    style={{
                                                        width: `${calculateUsagePercentage(
                                                            discount,
                                                        )}%`,
                                                    }}
                                                ></div>
                                            </div>
                                        </div>

                                        {/* Date Range */}
                                        <div className="flex items-center justify-between mb-6 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
                                            <div className="text-center">
                                                <p className="text-xs text-gray-500">
                                                    Bắt đầu
                                                </p>
                                                <p className="font-medium text-gray-900">
                                                    {new Date(
                                                        discount.start_date,
                                                    ).toLocaleDateString(
                                                        "vi-VN",
                                                    )}
                                                </p>
                                            </div>
                                            <div className="text-gray-400">
                                                →
                                            </div>
                                            <div className="text-center">
                                                <p className="text-xs text-gray-500">
                                                    Kết thúc
                                                </p>
                                                <p className="font-medium text-gray-900">
                                                    {new Date(
                                                        discount.end_date,
                                                    ).toLocaleDateString(
                                                        "vi-VN",
                                                    )}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() =>
                                                        navigator.clipboard.writeText(
                                                            discount.code,
                                                        )
                                                    }
                                                    className="inline-flex items-center px-3 py-2 text-sm text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                                                    title="Sao chép mã"
                                                >
                                                    <DocumentDuplicateIcon className="h-4 w-4 mr-1" />
                                                    Copy
                                                </button>
                                                <Link
                                                    to={`/admin/discounts/${discount.id}`}
                                                    className="inline-flex items-center px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                    title="Xem chi tiết"
                                                >
                                                    <EyeIcon className="h-4 w-4 mr-1" />
                                                    Chi tiết
                                                </Link>
                                            </div>

                                            <div className="flex items-center space-x-2">
                                                <button
                                                    onClick={() =>
                                                        handleToggleStatus(
                                                            discount.id,
                                                        )
                                                    }
                                                    className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                                                        discount.is_active
                                                            ? "bg-rose-100 text-rose-700 hover:bg-rose-200"
                                                            : "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                                                    }`}
                                                >
                                                    {discount.is_active
                                                        ? "Vô hiệu hóa"
                                                        : "Kích hoạt"}
                                                </button>
                                                <Link
                                                    to={`/admin/discounts/${discount.id}/edit`}
                                                    className="inline-flex items-center px-3 py-2 text-sm text-gray-600 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                                                    title="Chỉnh sửa"
                                                >
                                                    <PencilIcon className="h-4 w-4 mr-1" />
                                                    Sửa
                                                </Link>
                                                <button
                                                    onClick={() =>
                                                        handleDelete(
                                                            discount.id,
                                                        )
                                                    }
                                                    className="inline-flex items-center px-3 py-2 text-sm text-gray-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                                                    title="Xóa"
                                                >
                                                    <TrashIcon className="h-4 w-4 mr-1" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Empty State */}
                    {filteredDiscounts.length === 0 && (
                        <div className="text-center py-16">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl mb-6">
                                <TagIcon className="h-10 w-10 text-purple-500" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                Không tìm thấy mã giảm giá
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Thử thay đổi bộ lọc hoặc tạo mã giảm giá mới
                            </p>
                            <Link
                                to="/admin/discounts/new"
                                className="inline-flex items-center px-5 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 shadow-lg hover:shadow-xl transition-all"
                            >
                                <PlusIcon className="h-5 w-5 mr-2" />
                                Tạo Mã Giảm Giá Đầu Tiên
                            </Link>
                        </div>
                    )}
                </>
            )}

            {/* Floating Action Button */}
            <Link
                to="/admin/discounts/new"
                className="fixed bottom-8 right-8 inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all z-50"
            >
                <PlusIcon className="h-6 w-6" />
            </Link>
        </div>
    );
};

export default DiscountList;
