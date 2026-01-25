// pages/admin/BannerListPage.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    PlusIcon,
    PencilIcon,
    TrashIcon,
    EyeIcon,
    EyeSlashIcon,
    PhotoIcon,
    CalendarIcon,
    ArrowTopRightOnSquareIcon,
    FunnelIcon,
    AdjustmentsHorizontalIcon,
    ChartBarIcon,
    ArrowsUpDownIcon,
} from "@heroicons/react/24/outline";
import { format, parseISO, isAfter, isBefore } from "date-fns";
import { vi } from "date-fns/locale";

const BannerListPage = () => {
    const [banners, setBanners] = useState([]);
    const [filteredBanners, setFilteredBanners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedBanner, setSelectedBanner] = useState(null);

    // Filter states
    const [positionFilter, setPositionFilter] = useState("all");
    const [statusFilter, setStatusFilter] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");

    // Position options from DB enum
    const POSITION_OPTIONS = [
        {
            value: "HOME_MAIN",
            label: "Trang chủ - Chính",
            color: "bg-purple-100 text-purple-800",
        },
        {
            value: "HOME_SUB",
            label: "Trang chủ - Phụ",
            color: "bg-blue-100 text-blue-800",
        },
        {
            value: "SIDEBAR",
            label: "Sidebar",
            color: "bg-green-100 text-green-800",
        },
    ];

    // Fetch banners
    useEffect(() => {
        fetchBanners();
    }, []);

    // Apply filters
    useEffect(() => {
        let filtered = banners;

        // Search filter
        if (searchTerm) {
            filtered = filtered.filter(
                (banner) =>
                    banner.title
                        ?.toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                    banner.link_url
                        ?.toLowerCase()
                        .includes(searchTerm.toLowerCase()),
            );
        }

        // Position filter
        if (positionFilter !== "all") {
            filtered = filtered.filter(
                (banner) => banner.position === positionFilter,
            );
        }

        // Status filter
        if (statusFilter !== "all") {
            const isActive = statusFilter === "active";
            filtered = filtered.filter((banner) => {
                if (statusFilter === "scheduled") {
                    return banner.is_scheduled && isBannerActive(banner);
                }
                return banner.is_active === isActive;
            });
        }

        setFilteredBanners(filtered);
    }, [banners, searchTerm, positionFilter, statusFilter]);

    const fetchBanners = async () => {
        try {
            setLoading(true);
            // Mock data - replace with API call
            const mockData = [
                {
                    id: 1,
                    title: "Summer Sale 2024",
                    image_url:
                        "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&h-400&fit=crop",
                    link_url: "/summer-sale",
                    position: "HOME_MAIN",
                    is_active: true,
                    sort_order: 1,
                    start_time: "2024-06-01T00:00:00",
                    end_time: "2024-08-31T23:59:59",
                    created_at: "2024-05-15T10:30:00",
                    clicks: 15000,
                    views: 150000,
                },
                {
                    id: 2,
                    title: "New Arrivals Spotlight",
                    image_url:
                        "https://images.unsplash.com/photo-1556656793-08538906a9f8?w-600&h=300&fit=crop",
                    link_url: "/new-arrivals",
                    position: "SIDEBAR",
                    is_active: true,
                    sort_order: 2,
                    start_time: "2024-07-15T00:00:00",
                    end_time: "2024-09-15T23:59:59",
                    created_at: "2024-07-01T14:20:00",
                    clicks: 8500,
                    views: 85000,
                    is_scheduled: true,
                },
                {
                    id: 3,
                    title: "Free Shipping Promo",
                    image_url:
                        "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=200&fit=crop",
                    link_url: "/shipping-info",
                    position: "HOME_SUB",
                    is_active: true,
                    sort_order: 3,
                    created_at: "2024-01-01T00:00:00",
                    clicks: 25000,
                    views: 200000,
                },
                {
                    id: 4,
                    title: "Tech Week 2024",
                    image_url:
                        "https://images.unsplash.com/photo-1498049794561-7780e7231661?w-1200&h-400&fit=crop",
                    link_url: "/tech-week",
                    position: "HOME_MAIN",
                    is_active: false,
                    sort_order: 4,
                    start_time: "2024-10-01T00:00:00",
                    end_time: "2024-10-07T23:59:59",
                    created_at: "2024-09-20T09:15:00",
                    clicks: 0,
                    views: 0,
                },
            ];
            setBanners(mockData);
            setFilteredBanners(mockData);
        } catch (error) {
            console.error("Error fetching banners:", error);
        } finally {
            setLoading(false);
        }
    };

    const isBannerActive = (banner) => {
        if (!banner.is_active) return false;
        if (!banner.start_time && !banner.end_time) return true;

        const now = new Date();
        const start = banner.start_time ? parseISO(banner.start_time) : null;
        const end = banner.end_time ? parseISO(banner.end_time) : null;

        if (start && end) {
            return isAfter(now, start) && isBefore(now, end);
        } else if (start) {
            return isAfter(now, start);
        } else if (end) {
            return isBefore(now, end);
        }
        return true;
    };

    const getPositionLabel = (position) => {
        const option = POSITION_OPTIONS.find((p) => p.value === position);
        return option ? option.label : position;
    };

    const getPositionColor = (position) => {
        const option = POSITION_OPTIONS.find((p) => p.value === position);
        return option ? option.color : "bg-gray-100 text-gray-800";
    };

    const getBannerStatus = (banner) => {
        if (!banner.is_active)
            return {
                label: "Ngừng hoạt động",
                color: "bg-red-100 text-red-800",
            };

        if (banner.is_scheduled) {
            return {
                label: "Đã lên lịch",
                color: "bg-yellow-100 text-yellow-800",
            };
        }

        if (banner.start_time || banner.end_time) {
            const isActive = isBannerActive(banner);
            return isActive
                ? { label: "Đang chạy", color: "bg-green-100 text-green-800" }
                : { label: "Chưa bắt đầu", color: "bg-blue-100 text-blue-800" };
        }

        return {
            label: "Luôn hoạt động",
            color: "bg-green-100 text-green-800",
        };
    };

    const calculateCTR = (banner) => {
        if (!banner.views) return 0;
        return (((banner.clicks || 0) / banner.views) * 100).toFixed(1);
    };

    const handleDelete = async (banner) => {
        if (!window.confirm(`Bạn có chắc muốn xóa banner "${banner.title}"?`))
            return;

        try {
            console.log("Deleting banner:", banner.id);
            // Add API call here
            fetchBanners();
        } catch (error) {
            console.error("Error deleting banner:", error);
        }
    };

    const handleToggleStatus = async (banner) => {
        try {
            console.log("Toggling banner status:", banner.id);
            // Add API call here
            fetchBanners();
        } catch (error) {
            console.error("Error toggling banner status:", error);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-96">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="p-6">
            {/* Header */}
            <div className="mb-8">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            Quản lý Banner
                        </h1>
                        <p className="text-gray-600 mt-2">
                            Quản lý quảng cáo và banner hiển thị trên website
                        </p>
                    </div>
                    <Link
                        to="/admin/banners/create"
                        className="inline-flex items-center px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-lg"
                    >
                        <PlusIcon className="h-5 w-5 mr-2" />
                        Thêm Banner Mới
                    </Link>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-blue-600">
                                Tổng Banner
                            </p>
                            <p className="text-3xl font-bold text-gray-900 mt-2">
                                {banners.length}
                            </p>
                        </div>
                        <PhotoIcon className="h-10 w-10 text-blue-500" />
                    </div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-green-600">
                                Đang hoạt động
                            </p>
                            <p className="text-3xl font-bold text-gray-900 mt-2">
                                {banners.filter((b) => b.is_active).length}
                            </p>
                        </div>
                        <EyeIcon className="h-10 w-10 text-green-500" />
                    </div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-purple-600">
                                Tổng lượt xem
                            </p>
                            <p className="text-3xl font-bold text-gray-900 mt-2">
                                {banners
                                    .reduce((sum, b) => sum + (b.views || 0), 0)
                                    .toLocaleString()}
                            </p>
                        </div>
                        <ChartBarIcon className="h-10 w-10 text-purple-500" />
                    </div>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-orange-600">
                                CTR trung bình
                            </p>
                            <p className="text-3xl font-bold text-gray-900 mt-2">
                                {(
                                    banners.reduce(
                                        (sum, b) =>
                                            sum + parseFloat(calculateCTR(b)),
                                        0,
                                    ) / banners.length || 0
                                ).toFixed(1)}
                                %
                            </p>
                        </div>
                        <ArrowTopRightOnSquareIcon className="h-10 w-10 text-orange-500" />
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                        <FunnelIcon className="h-5 w-5 mr-2" />
                        Bộ lọc
                    </h3>
                    <button
                        onClick={() => {
                            setSearchTerm("");
                            setPositionFilter("all");
                            setStatusFilter("all");
                        }}
                        className="text-sm text-gray-600 hover:text-gray-900"
                    >
                        Xóa bộ lọc
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Search */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Tìm kiếm
                        </label>
                        <input
                            type="text"
                            placeholder="Tìm theo tiêu đề hoặc đường dẫn..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* Position Filter */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Vị trí hiển thị
                        </label>
                        <select
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={positionFilter}
                            onChange={(e) => setPositionFilter(e.target.value)}
                        >
                            <option value="all">Tất cả vị trí</option>
                            {POSITION_OPTIONS.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Status Filter */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Trạng thái
                        </label>
                        <select
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="all">Tất cả trạng thái</option>
                            <option value="active">Đang hoạt động</option>
                            <option value="scheduled">Đã lên lịch</option>
                            <option value="inactive">Ngừng hoạt động</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Banners Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredBanners.length === 0 ? (
                    <div className="col-span-2 text-center py-12">
                        <PhotoIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            Không tìm thấy banner nào
                        </h3>
                        <p className="text-gray-500">
                            Thử thay đổi bộ lọc hoặc tạo banner mới
                        </p>
                    </div>
                ) : (
                    filteredBanners.map((banner) => {
                        const status = getBannerStatus(banner);
                        return (
                            <div
                                key={banner.id}
                                className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                            >
                                {/* Banner Image */}
                                <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                                    <img
                                        src={banner.image_url}
                                        alt={banner.title}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.style.display = "none";
                                            e.target.parentElement.classList.add(
                                                "bg-gradient-to-br",
                                                "from-gray-100",
                                                "to-gray-200",
                                            );
                                        }}
                                    />
                                    <div className="absolute top-3 right-3 flex space-x-2">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-medium ${getPositionColor(banner.position)}`}
                                        >
                                            {getPositionLabel(banner.position)}
                                        </span>
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-medium ${status.color}`}
                                        >
                                            {status.label}
                                        </span>
                                    </div>
                                    <div className="absolute top-3 left-3">
                                        <span className="px-3 py-1 bg-black bg-opacity-70 text-white rounded-full text-xs font-medium">
                                            Thứ tự: {banner.sort_order}
                                        </span>
                                    </div>
                                </div>

                                {/* Banner Info */}
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900">
                                                {banner.title}
                                            </h3>
                                            <a
                                                href={banner.link_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-sm text-blue-600 hover:text-blue-800 flex items-center mt-1"
                                            >
                                                {banner.link_url}
                                                <ArrowTopRightOnSquareIcon className="h-3 w-3 ml-1" />
                                            </a>
                                        </div>
                                        <div className="flex space-x-2">
                                            <Link
                                                to={`/admin/banners/edit/${banner.id}`}
                                                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                                                title="Chỉnh sửa"
                                            >
                                                <PencilIcon className="h-5 w-5" />
                                            </Link>
                                            <button
                                                onClick={() =>
                                                    handleDelete(banner)
                                                }
                                                className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg"
                                                title="Xóa"
                                            >
                                                <TrashIcon className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Stats */}
                                    <div className="grid grid-cols-3 gap-4 mb-4">
                                        <div className="text-center">
                                            <p className="text-2xl font-bold text-gray-900">
                                                {banner.views?.toLocaleString() ||
                                                    0}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                Lượt xem
                                            </p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-2xl font-bold text-gray-900">
                                                {banner.clicks?.toLocaleString() ||
                                                    0}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                Lượt click
                                            </p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-2xl font-bold text-gray-900">
                                                {calculateCTR(banner)}%
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                CTR
                                            </p>
                                        </div>
                                    </div>

                                    {/* Schedule Info */}
                                    {banner.start_time || banner.end_time ? (
                                        <div className="bg-gray-50 rounded-lg p-4 mb-4">
                                            <div className="flex items-center text-sm text-gray-600 mb-2">
                                                <CalendarIcon className="h-4 w-4 mr-2" />
                                                Lịch trình
                                            </div>
                                            <div className="grid grid-cols-2 gap-2 text-sm">
                                                <div>
                                                    <p className="text-gray-500">
                                                        Bắt đầu:
                                                    </p>
                                                    <p className="font-medium">
                                                        {banner.start_time
                                                            ? format(
                                                                  parseISO(
                                                                      banner.start_time,
                                                                  ),
                                                                  "dd/MM/yyyy HH:mm",
                                                                  {
                                                                      locale: vi,
                                                                  },
                                                              )
                                                            : "Ngay lập tức"}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-gray-500">
                                                        Kết thúc:
                                                    </p>
                                                    <p className="font-medium">
                                                        {banner.end_time
                                                            ? format(
                                                                  parseISO(
                                                                      banner.end_time,
                                                                  ),
                                                                  "dd/MM/yyyy HH:mm",
                                                                  {
                                                                      locale: vi,
                                                                  },
                                                              )
                                                            : "Không giới hạn"}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ) : null}

                                    {/* Action Buttons */}
                                    <div className="flex justify-between">
                                        <button
                                            onClick={() =>
                                                handleToggleStatus(banner)
                                            }
                                            className={`px-4 py-2 rounded-lg text-sm font-medium ${
                                                banner.is_active
                                                    ? "bg-red-50 text-red-700 hover:bg-red-100"
                                                    : "bg-green-50 text-green-700 hover:bg-green-100"
                                            }`}
                                        >
                                            {banner.is_active ? (
                                                <>
                                                    <EyeSlashIcon className="h-4 w-4 inline mr-1" />
                                                    Tạm dừng
                                                </>
                                            ) : (
                                                <>
                                                    <EyeIcon className="h-4 w-4 inline mr-1" />
                                                    Kích hoạt
                                                </>
                                            )}
                                        </button>
                                        <Link
                                            to={`/admin/banners/preview/${banner.id}`}
                                            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm font-medium"
                                        >
                                            Xem trước
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default BannerListPage;
