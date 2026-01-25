// pages/admin/campaigns/CampaignList.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    PencilIcon,
    TrashIcon,
    EyeIcon,
    PlusIcon,
    MagnifyingGlassIcon,
    FunnelIcon,
    CalendarIcon,
    ClockIcon,
    CheckCircleIcon,
    XCircleIcon,
    ArrowPathIcon,
    ChartBarIcon,
    MegaphoneIcon,
    TagIcon,
    FireIcon,
    ArrowTrendingUpIcon,
    UsersIcon,
    ShoppingBagIcon,
} from "@heroicons/react/24/outline";

const CampaignList = () => {
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCampaigns, setSelectedCampaigns] = useState([]);
    const [statusFilter, setStatusFilter] = useState("all"); // all, active, upcoming, ended
    const [sortBy, setSortBy] = useState("start_time");

    // Mock data với cấu trúc từ database
    useEffect(() => {
        setTimeout(() => {
            const now = new Date();
            const mockCampaigns = [
                {
                    id: 1,
                    name: "Black Friday 2024",
                    start_time: "2024-11-20T00:00:00Z",
                    end_time: "2024-11-30T23:59:59Z",
                    is_active: true,
                    created_at: "2024-10-15T10:30:00Z",
                    updated_at: "2024-10-20T14:20:00Z",
                    created_by: 1,
                    updated_by: 1,
                    status: getCampaignStatus(
                        "2024-11-20T00:00:00Z",
                        "2024-11-30T23:59:59Z",
                        true,
                    ),
                    products_count: 45,
                    total_sold: 1250,
                    total_revenue: 12500000000,
                    discount_types: { PERCENT: 30, FIXED: 15 },
                },
                {
                    id: 2,
                    name: "Giảm giá cuối năm",
                    start_time: "2024-12-20T00:00:00Z",
                    end_time: "2024-12-31T23:59:59Z",
                    is_active: true,
                    created_at: "2024-11-01T09:15:00Z",
                    updated_at: "2024-11-05T11:45:00Z",
                    created_by: 1,
                    updated_by: 1,
                    status: getCampaignStatus(
                        "2024-12-20T00:00:00Z",
                        "2024-12-31T23:59:59Z",
                        true,
                    ),
                    products_count: 32,
                    total_sold: 0,
                    total_revenue: 0,
                    discount_types: { PERCENT: 25 },
                },
                {
                    id: 3,
                    name: "Sale hè rực rỡ",
                    start_time: "2024-06-01T00:00:00Z",
                    end_time: "2024-08-31T23:59:59Z",
                    is_active: false,
                    created_at: "2024-05-15T14:20:00Z",
                    updated_at: "2024-09-01T09:30:00Z",
                    created_by: 1,
                    updated_by: 1,
                    status: getCampaignStatus(
                        "2024-06-01T00:00:00Z",
                        "2024-08-31T23:59:59Z",
                        false,
                    ),
                    products_count: 28,
                    total_sold: 890,
                    total_revenue: 7565000000,
                    discount_types: { PERCENT: 20, FIXED: 10 },
                },
                {
                    id: 4,
                    name: "Ưu đãi sinh nhật",
                    start_time: "2024-10-01T00:00:00Z",
                    end_time: "2024-10-15T23:59:59Z",
                    is_active: true,
                    created_at: "2024-09-20T08:30:00Z",
                    updated_at: "2024-10-02T16:20:00Z",
                    created_by: 1,
                    updated_by: 1,
                    status: getCampaignStatus(
                        "2024-10-01T00:00:00Z",
                        "2024-10-15T23:59:59Z",
                        true,
                    ),
                    products_count: 18,
                    total_sold: 340,
                    total_revenue: 2890000000,
                    discount_types: { PERCENT: 15 },
                },
                {
                    id: 5,
                    name: "Flash Sale 24h",
                    start_time: "2024-10-25T00:00:00Z",
                    end_time: "2024-10-26T00:00:00Z",
                    is_active: true,
                    created_at: "2024-10-20T11:45:00Z",
                    updated_at: "2024-10-24T14:30:00Z",
                    created_by: 1,
                    updated_by: 1,
                    status: getCampaignStatus(
                        "2024-10-25T00:00:00Z",
                        "2024-10-26T00:00:00Z",
                        true,
                    ),
                    products_count: 12,
                    total_sold: 210,
                    total_revenue: 1890000000,
                    discount_types: { FIXED: 8 },
                },
                {
                    id: 6,
                    name: "Back to School",
                    start_time: "2024-08-15T00:00:00Z",
                    end_time: "2024-09-15T23:59:59Z",
                    is_active: false,
                    created_at: "2024-07-28T16:20:00Z",
                    updated_at: "2024-09-16T10:15:00Z",
                    created_by: 1,
                    updated_by: 1,
                    status: getCampaignStatus(
                        "2024-08-15T00:00:00Z",
                        "2024-09-15T23:59:59Z",
                        false,
                    ),
                    products_count: 22,
                    total_sold: 450,
                    total_revenue: 3825000000,
                    discount_types: { PERCENT: 10, FIXED: 5 },
                },
            ];
            setCampaigns(mockCampaigns);
            setLoading(false);
        }, 800);
    }, []);

    // Helper function to calculate campaign status
    function getCampaignStatus(startTime, endTime, isActive) {
        const now = new Date();
        const start = new Date(startTime);
        const end = new Date(endTime);

        if (!isActive) return "inactive";
        if (now < start) return "upcoming";
        if (now > end) return "ended";
        return "active";
    }

    const handleDelete = (id) => {
        if (window.confirm("Bạn có chắc muốn xóa chiến dịch này?")) {
            setCampaigns(campaigns.filter((campaign) => campaign.id !== id));
        }
    };

    const handleToggleStatus = (id) => {
        setCampaigns(
            campaigns.map((campaign) =>
                campaign.id === id
                    ? { ...campaign, is_active: !campaign.is_active }
                    : campaign,
            ),
        );
    };

    const toggleSelectCampaign = (id) => {
        setSelectedCampaigns((prev) =>
            prev.includes(id)
                ? prev.filter((campaignId) => campaignId !== id)
                : [...prev, id],
        );
    };

    const handleBulkAction = (action) => {
        if (selectedCampaigns.length === 0) {
            alert("Vui lòng chọn ít nhất một chiến dịch");
            return;
        }

        switch (action) {
            case "activate":
                setCampaigns(
                    campaigns.map((campaign) =>
                        selectedCampaigns.includes(campaign.id)
                            ? { ...campaign, is_active: true }
                            : campaign,
                    ),
                );
                break;
            case "deactivate":
                setCampaigns(
                    campaigns.map((campaign) =>
                        selectedCampaigns.includes(campaign.id)
                            ? { ...campaign, is_active: false }
                            : campaign,
                    ),
                );
                break;
            case "delete":
                if (
                    window.confirm(
                        `Xóa ${selectedCampaigns.length} chiến dịch?`,
                    )
                ) {
                    setCampaigns(
                        campaigns.filter(
                            (campaign) =>
                                !selectedCampaigns.includes(campaign.id),
                        ),
                    );
                    setSelectedCampaigns([]);
                }
                break;
        }
    };

    const filteredCampaigns = campaigns
        .filter((campaign) => {
            // Search filter
            const searchMatch = campaign.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase());

            // Status filter
            const statusMatch =
                statusFilter === "all" ||
                (statusFilter === "active" && campaign.status === "active") ||
                (statusFilter === "upcoming" &&
                    campaign.status === "upcoming") ||
                (statusFilter === "ended" && campaign.status === "ended") ||
                (statusFilter === "inactive" && campaign.status === "inactive");

            return searchMatch && statusMatch;
        })
        .sort((a, b) => {
            // Sort by selected criteria
            switch (sortBy) {
                case "start_time":
                    return new Date(b.start_time) - new Date(a.start_time);
                case "end_time":
                    return new Date(b.end_time) - new Date(a.end_time);
                case "name":
                    return a.name.localeCompare(b.name);
                case "products_count":
                    return b.products_count - a.products_count;
                case "total_sold":
                    return b.total_sold - a.total_sold;
                default:
                    return new Date(b.start_time) - new Date(a.start_time);
            }
        });

    const formatCurrency = (amount) => {
        if (!amount) return "0 đ";
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const getStatusBadge = (status, is_active) => {
        if (!is_active) {
            return {
                text: "Vô hiệu hóa",
                bg: "bg-gray-100",
                textColor: "text-gray-800",
                icon: <XCircleIcon className="h-4 w-4" />,
            };
        }

        switch (status) {
            case "active":
                return {
                    text: "Đang diễn ra",
                    bg: "bg-emerald-100",
                    textColor: "text-emerald-800",
                    icon: <FireIcon className="h-4 w-4" />,
                };
            case "upcoming":
                return {
                    text: "Sắp diễn ra",
                    bg: "bg-blue-100",
                    textColor: "text-blue-800",
                    icon: <ClockIcon className="h-4 w-4" />,
                };
            case "ended":
                return {
                    text: "Đã kết thúc",
                    bg: "bg-rose-100",
                    textColor: "text-rose-800",
                    icon: <CalendarIcon className="h-4 w-4" />,
                };
            default:
                return {
                    text: "Không xác định",
                    bg: "bg-gray-100",
                    textColor: "text-gray-800",
                    icon: <XCircleIcon className="h-4 w-4" />,
                };
        }
    };

    const getTimeRemaining = (startTime, endTime) => {
        const now = new Date();
        const start = new Date(startTime);
        const end = new Date(endTime);

        if (now < start) {
            const diff = start - now;
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor(
                (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
            );
            return `Bắt đầu sau: ${days}d ${hours}h`;
        } else if (now > end) {
            return "Đã kết thúc";
        } else {
            const diff = end - now;
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor(
                (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
            );
            return `Còn lại: ${days}d ${hours}h`;
        }
    };

    const StatsCard = ({ title, value, icon, color, subtitle }) => (
        <div
            className={`${color} rounded-2xl p-6 text-white shadow-lg transform transition-transform hover:scale-105`}
        >
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm opacity-90">{title}</p>
                    <p className="text-3xl font-bold mt-2">{value}</p>
                    {subtitle && (
                        <p className="text-xs opacity-80 mt-1">{subtitle}</p>
                    )}
                </div>
                <div className="text-3xl">{icon}</div>
            </div>
        </div>
    );

    const calculateStats = () => {
        const totalCampaigns = campaigns.length;
        const activeCampaigns = campaigns.filter(
            (c) => c.status === "active",
        ).length;
        const upcomingCampaigns = campaigns.filter(
            (c) => c.status === "upcoming",
        ).length;
        const totalRevenue = campaigns.reduce(
            (sum, c) => sum + c.total_revenue,
            0,
        );
        const totalProducts = campaigns.reduce(
            (sum, c) => sum + c.products_count,
            0,
        );

        return {
            totalCampaigns,
            activeCampaigns,
            upcomingCampaigns,
            totalRevenue: formatCurrency(totalRevenue),
            totalProducts,
        };
    };

    const stats = calculateStats();

    return (
        <div className="p-6">
            {/* Header with Stats */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-rose-600 bg-clip-text text-transparent">
                            Quản Lý Chiến Dịch
                        </h1>
                        <p className="text-gray-600 mt-2">
                            Quản lý các chiến dịch khuyến mãi và giảm giá
                        </p>
                    </div>
                    <div className="flex space-x-3">
                        <Link
                            to="/admin/campaigns/analytics"
                            className="inline-flex items-center px-5 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 shadow-lg hover:shadow-xl transition-all"
                        >
                            <ChartBarIcon className="h-5 w-5 mr-2" />
                            Thống kê
                        </Link>
                        <Link
                            to="/admin/campaigns/new"
                            className="inline-flex items-center px-5 py-3 bg-gradient-to-r from-orange-500 to-rose-500 text-white rounded-xl hover:from-orange-600 hover:to-rose-600 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
                        >
                            <PlusIcon className="h-5 w-5 mr-2" />
                            Tạo Chiến Dịch Mới
                        </Link>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <StatsCard
                        title="Tổng Chiến Dịch"
                        value={stats.totalCampaigns}
                        icon="🎯"
                        color="bg-gradient-to-r from-orange-400 to-amber-400"
                        subtitle={`đang hoạt động`}
                    />
                    <StatsCard
                        title="Sản Phẩm KM"
                        value={stats.totalProducts}
                        icon="🏷️"
                        color="bg-gradient-to-r from-emerald-400 to-teal-400"
                        subtitle="Tổng sản phẩm tham gia"
                    />
                    <StatsCard
                        title="Sắp Diễn Ra"
                        value={stats.upcomingCampaigns}
                        icon="⏰"
                        color="bg-gradient-to-r from-blue-400 to-cyan-400"
                        subtitle="Chuẩn bị khởi động"
                    />
                    <StatsCard
                        title="Doanh Thu"
                        value={stats.totalRevenue}
                        icon="💰"
                        color="bg-gradient-to-r from-purple-400 to-pink-400"
                        subtitle="Tổng doanh thu chiến dịch"
                    />
                </div>
            </div>

            {/* Search and Filters */}
            <div className="bg-gradient-to-r from-orange-50 to-rose-50 rounded-2xl p-6 mb-6 border border-orange-100">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-4">
                    {/* Search */}
                    <div className="lg:col-span-2">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <MagnifyingGlassIcon className="h-5 w-5 text-orange-500" />
                            </div>
                            <input
                                type="text"
                                placeholder="Tìm kiếm chiến dịch theo tên..."
                                className="w-full pl-12 pr-4 py-3 bg-white rounded-xl border border-orange-200 focus:ring-2 focus:ring-orange-300 focus:border-transparent transition-all"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Status Filter */}
                    <div>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <FunnelIcon className="h-5 w-5 text-orange-500" />
                            </div>
                            <select
                                value={statusFilter}
                                onChange={(e) =>
                                    setStatusFilter(e.target.value)
                                }
                                className="w-full pl-12 pr-4 py-3 bg-white rounded-xl border border-orange-200 focus:ring-2 focus:ring-orange-300 focus:border-transparent"
                            >
                                <option value="all">Tất cả trạng thái</option>
                                <option value="active">Đang diễn ra</option>
                                <option value="upcoming">Sắp diễn ra</option>
                                <option value="ended">Đã kết thúc</option>
                                <option value="inactive">Vô hiệu hóa</option>
                            </select>
                        </div>
                    </div>

                    {/* Sort By */}
                    <div>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <ArrowTrendingUpIcon className="h-5 w-5 text-orange-500" />
                            </div>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-white rounded-xl border border-orange-200 focus:ring-2 focus:ring-orange-300 focus:border-transparent"
                            >
                                <option value="start_time">Mới nhất</option>
                                <option value="end_time">Sắp kết thúc</option>
                                <option value="name">Tên A-Z</option>
                                <option value="products_count">
                                    Nhiều sản phẩm
                                </option>
                                <option value="total_sold">
                                    Bán chạy nhất
                                </option>
                            </select>
                        </div>
                    </div>

                    {/* Bulk Actions */}
                    <div>
                        <select
                            onChange={(e) => handleBulkAction(e.target.value)}
                            className="w-full px-4 py-3 bg-white rounded-xl border border-orange-200 focus:ring-2 focus:ring-orange-300 focus:border-transparent"
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
                        <div className="w-20 h-20 border-4 border-orange-200 rounded-full"></div>
                        <div className="absolute top-0 left-0 w-20 h-20 border-4 border-orange-500 rounded-full border-t-transparent animate-spin"></div>
                    </div>
                    <p className="mt-6 text-lg text-gray-600">
                        Đang tải chiến dịch...
                    </p>
                    <p className="text-sm text-gray-400">
                        Vui lòng đợi trong giây lát
                    </p>
                </div>
            ) : (
                <>
                    {/* Campaigns Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredCampaigns.map((campaign) => {
                            const statusBadge = getStatusBadge(
                                campaign.status,
                                campaign.is_active,
                            );
                            const timeRemaining = getTimeRemaining(
                                campaign.start_time,
                                campaign.end_time,
                            );
                            const startDate = new Date(campaign.start_time);
                            const endDate = new Date(campaign.end_time);
                            const durationDays = Math.ceil(
                                (endDate - startDate) / (1000 * 60 * 60 * 24),
                            );

                            return (
                                <div
                                    key={campaign.id}
                                    className={`bg-white rounded-2xl overflow-hidden border-2 transition-all hover:shadow-xl hover:-translate-y-1 ${
                                        selectedCampaigns.includes(campaign.id)
                                            ? "border-orange-400 ring-2 ring-orange-100"
                                            : "border-gray-100 hover:border-orange-200"
                                    }`}
                                >
                                    <div className="relative">
                                        {/* Campaign Header */}
                                        <div className="bg-gradient-to-r from-orange-500 to-rose-500 p-6 text-white relative">
                                            <div className="absolute top-4 left-4">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedCampaigns.includes(
                                                        campaign.id,
                                                    )}
                                                    onChange={() =>
                                                        toggleSelectCampaign(
                                                            campaign.id,
                                                        )
                                                    }
                                                    className="h-5 w-5 rounded border-white/30 text-white bg-white/20 focus:ring-orange-300"
                                                />
                                            </div>

                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex items-center">
                                                    <MegaphoneIcon className="h-6 w-6 mr-2" />
                                                    <h3 className="text-xl font-bold truncate">
                                                        {campaign.name}
                                                    </h3>
                                                </div>
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center ${statusBadge.bg} ${statusBadge.textColor}`}
                                                >
                                                    {statusBadge.icon}
                                                    <span className="ml-1">
                                                        {statusBadge.text}
                                                    </span>
                                                </span>
                                            </div>

                                            {/* Time Info */}
                                            <div className="space-y-2">
                                                <div className="flex items-center text-sm">
                                                    <CalendarIcon className="h-4 w-4 mr-2" />
                                                    <span>
                                                        {formatDate(
                                                            campaign.start_time,
                                                        )}
                                                    </span>
                                                    <span className="mx-2">
                                                        →
                                                    </span>
                                                    <span>
                                                        {formatDate(
                                                            campaign.end_time,
                                                        )}
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-between text-sm">
                                                    <div className="flex items-center">
                                                        <ClockIcon className="h-4 w-4 mr-2" />
                                                        <span>
                                                            {timeRemaining}
                                                        </span>
                                                    </div>
                                                    <span className="bg-white/20 px-2 py-1 rounded text-xs">
                                                        {durationDays} ngày
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-6">
                                            {/* Discount Types */}
                                            <div className="mb-6">
                                                <h4 className="text-sm font-medium text-gray-900 mb-3">
                                                    Loại giảm giá
                                                </h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {campaign.discount_types
                                                        .PERCENT && (
                                                        <span className="px-3 py-1 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-800 rounded-full text-sm font-medium">
                                                            {
                                                                campaign
                                                                    .discount_types
                                                                    .PERCENT
                                                            }
                                                            % giảm
                                                        </span>
                                                    )}
                                                    {campaign.discount_types
                                                        .FIXED && (
                                                        <span className="px-3 py-1 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 rounded-full text-sm font-medium">
                                                            Giảm{" "}
                                                            {formatCurrency(
                                                                campaign
                                                                    .discount_types
                                                                    .FIXED *
                                                                    1000000,
                                                            )}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Stats */}
                                            <div className="grid grid-cols-3 gap-3 mb-6">
                                                <div className="bg-gray-50 rounded-lg p-3 text-center">
                                                    <p className="text-xs text-gray-600">
                                                        Sản phẩm
                                                    </p>
                                                    <p className="text-lg font-bold text-orange-600">
                                                        {
                                                            campaign.products_count
                                                        }
                                                    </p>
                                                </div>
                                                <div className="bg-gray-50 rounded-lg p-3 text-center">
                                                    <p className="text-xs text-gray-600">
                                                        Đã bán
                                                    </p>
                                                    <p className="text-lg font-bold text-emerald-600">
                                                        {campaign.total_sold}
                                                    </p>
                                                </div>
                                                <div className="bg-gray-50 rounded-lg p-3 text-center">
                                                    <p className="text-xs text-gray-600">
                                                        Doanh thu
                                                    </p>
                                                    <p className="text-sm font-bold text-purple-600">
                                                        {formatCurrency(
                                                            campaign.total_revenue,
                                                        )}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Performance Bar */}
                                            {campaign.status === "ended" &&
                                                campaign.total_sold > 0 && (
                                                    <div className="mb-6">
                                                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                                                            <span>
                                                                Hiệu quả chiến
                                                                dịch
                                                            </span>
                                                            <span>
                                                                {Math.round(
                                                                    (campaign.total_sold /
                                                                        campaign.products_count) *
                                                                        100,
                                                                )}
                                                                %
                                                            </span>
                                                        </div>
                                                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                                            <div
                                                                className="h-full bg-gradient-to-r from-orange-400 to-rose-400 rounded-full"
                                                                style={{
                                                                    width: `${Math.min(100, (campaign.total_sold / campaign.products_count) * 100)}%`,
                                                                }}
                                                            ></div>
                                                        </div>
                                                    </div>
                                                )}

                                            {/* Actions */}
                                            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                                <div className="flex space-x-2">
                                                    <Link
                                                        to={`/admin/campaigns/${campaign.id}`}
                                                        className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                        title="Xem chi tiết"
                                                    >
                                                        <EyeIcon className="h-5 w-5" />
                                                    </Link>
                                                    <Link
                                                        to={`/admin/campaigns/${campaign.id}/edit`}
                                                        className="p-2 text-gray-600 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                                                        title="Chỉnh sửa"
                                                    >
                                                        <PencilIcon className="h-5 w-5" />
                                                    </Link>
                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                campaign.id,
                                                            )
                                                        }
                                                        className="p-2 text-gray-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                                                        title="Xóa"
                                                    >
                                                        <TrashIcon className="h-5 w-5" />
                                                    </button>
                                                </div>
                                                <button
                                                    onClick={() =>
                                                        handleToggleStatus(
                                                            campaign.id,
                                                        )
                                                    }
                                                    className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                                                        campaign.is_active
                                                            ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                                            : "bg-orange-100 text-orange-700 hover:bg-orange-200"
                                                    }`}
                                                >
                                                    {campaign.is_active
                                                        ? "Vô hiệu hóa"
                                                        : "Kích hoạt"}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Empty State */}
                    {filteredCampaigns.length === 0 && (
                        <div className="text-center py-16">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-orange-100 to-rose-100 rounded-2xl mb-6">
                                <MegaphoneIcon className="h-10 w-10 text-orange-500" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                Không tìm thấy chiến dịch
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Thử thay đổi bộ lọc hoặc tạo chiến dịch mới
                            </p>
                            <Link
                                to="/admin/campaigns/new"
                                className="inline-flex items-center px-5 py-3 bg-gradient-to-r from-orange-500 to-rose-500 text-white rounded-xl hover:from-orange-600 hover:to-rose-600 shadow-lg hover:shadow-xl transition-all"
                            >
                                <PlusIcon className="h-5 w-5 mr-2" />
                                Tạo Chiến Dịch Đầu Tiên
                            </Link>
                        </div>
                    )}
                </>
            )}

            {/* Floating Action Button */}
            <Link
                to="/admin/campaigns/new"
                className="fixed bottom-8 right-8 inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-orange-500 to-rose-500 text-white rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all z-50"
            >
                <PlusIcon className="h-6 w-6" />
            </Link>
        </div>
    );
};

export default CampaignList;
