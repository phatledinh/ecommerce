// pages/admin/suppliers/SupplierList.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    PencilIcon,
    TrashIcon,
    EyeIcon,
    PlusIcon,
    MagnifyingGlassIcon,
    PhoneIcon,
    EnvelopeIcon,
    MapPinIcon,
    UserIcon,
    BuildingOfficeIcon,
    TruckIcon,
    CheckCircleIcon,
    XCircleIcon,
    DocumentDuplicateIcon,
    ArrowTopRightOnSquareIcon,
    ShoppingBagIcon,
    CurrencyDollarIcon,
    ChartBarIcon,
} from "@heroicons/react/24/outline";

const SupplierList = () => {
    const [suppliers, setSuppliers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedSuppliers, setSelectedSuppliers] = useState([]);
    const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'

    // Mock data
    useEffect(() => {
        setTimeout(() => {
            setSuppliers([
                {
                    id: 1,
                    name: "Công Ty TNHH Samsung Electronics Việt Nam",
                    contact_person: "Nguyễn Văn A",
                    email: "contact@samsung.com.vn",
                    phone: "028 3811 9999",
                    address: "Số 2, Đường Tây Hồ, Quận Tân Phú, TP.HCM",
                    created_at: "2023-01-15T10:00:00",
                    updated_at: "2024-02-20T14:30:00",
                    product_count: 45,
                    order_count: 128,
                    total_value: 12500000000,
                    status: "active",
                    color: "from-blue-500 to-indigo-400",
                    icon: "🏢",
                },
                {
                    id: 2,
                    name: "Apple Vietnam LLC",
                    contact_person: "Trần Thị B",
                    email: "supplier@apple.com.vn",
                    phone: "024 3934 9999",
                    address: "Tầng 15, Keangnam Hanoi Landmark Tower, Hà Nội",
                    created_at: "2023-02-20T09:15:00",
                    updated_at: "2024-02-18T11:20:00",
                    product_count: 32,
                    order_count: 95,
                    total_value: 18500000000,
                    status: "active",
                    color: "from-gray-800 to-gray-600",
                    icon: "🍎",
                },
                {
                    id: 3,
                    name: "Xiaomi Technology Vietnam",
                    contact_person: "Lê Văn C",
                    email: "vietnam@xiaomi.com",
                    phone: "028 7300 8888",
                    address: "Tòa nhà The Landmark, Quận 1, TP.HCM",
                    created_at: "2023-03-10T14:30:00",
                    updated_at: "2024-02-15T16:45:00",
                    product_count: 28,
                    order_count: 76,
                    total_value: 8500000000,
                    status: "active",
                    color: "from-orange-500 to-red-400",
                    icon: "📱",
                },
                {
                    id: 4,
                    name: "Asus Computer International",
                    contact_person: "Phạm Văn D",
                    email: "supplier@asus.com.vn",
                    phone: "028 3910 1234",
                    address: "Số 1, Đường Võ Văn Ngân, Quận Thủ Đức, TP.HCM",
                    created_at: "2023-04-05T11:45:00",
                    updated_at: "2024-01-30T09:15:00",
                    product_count: 22,
                    order_count: 54,
                    total_value: 6500000000,
                    status: "inactive",
                    color: "from-purple-500 to-pink-400",
                    icon: "💻",
                },
                {
                    id: 5,
                    name: "Logitech Vietnam",
                    contact_person: "Hoàng Thị E",
                    email: "vietnam@logitech.com",
                    phone: "028 3827 5555",
                    address: "Tòa nhà Saigon Centre, Quận 1, TP.HCM",
                    created_at: "2023-05-12T13:20:00",
                    updated_at: "2024-02-10T10:30:00",
                    product_count: 18,
                    order_count: 42,
                    total_value: 3200000000,
                    status: "active",
                    color: "from-green-500 to-emerald-400",
                    icon: "🖱️",
                },
                {
                    id: 6,
                    name: "Dell Technologies Vietnam",
                    contact_person: "Ngô Văn F",
                    email: "vietnam@dell.com",
                    phone: "028 3836 7777",
                    address: "Tòa nhà Bitexco, Quận 1, TP.HCM",
                    created_at: "2023-06-18T15:10:00",
                    updated_at: "2024-02-12T14:20:00",
                    product_count: 26,
                    order_count: 68,
                    total_value: 9200000000,
                    status: "active",
                    color: "from-cyan-500 to-blue-400",
                    icon: "💻",
                },
            ]);
            setLoading(false);
        }, 800);
    }, []);

    const handleDelete = (id) => {
        if (window.confirm("Bạn có chắc muốn xóa nhà cung cấp này?")) {
            setSuppliers(suppliers.filter((supplier) => supplier.id !== id));
        }
    };

    const handleToggleStatus = (id) => {
        setSuppliers(
            suppliers.map((supplier) =>
                supplier.id === id
                    ? {
                          ...supplier,
                          status:
                              supplier.status === "active"
                                  ? "inactive"
                                  : "active",
                      }
                    : supplier,
            ),
        );
    };

    const toggleSelectSupplier = (id) => {
        setSelectedSuppliers((prev) =>
            prev.includes(id)
                ? prev.filter((supplierId) => supplierId !== id)
                : [...prev, id],
        );
    };

    const handleBulkAction = (action) => {
        if (selectedSuppliers.length === 0) {
            alert("Vui lòng chọn ít nhất một nhà cung cấp");
            return;
        }

        switch (action) {
            case "activate":
                setSuppliers(
                    suppliers.map((supplier) =>
                        selectedSuppliers.includes(supplier.id)
                            ? { ...supplier, status: "active" }
                            : supplier,
                    ),
                );
                break;
            case "deactivate":
                setSuppliers(
                    suppliers.map((supplier) =>
                        selectedSuppliers.includes(supplier.id)
                            ? { ...supplier, status: "inactive" }
                            : supplier,
                    ),
                );
                break;
            case "delete":
                if (
                    window.confirm(
                        `Xóa ${selectedSuppliers.length} nhà cung cấp?`,
                    )
                ) {
                    setSuppliers(
                        suppliers.filter(
                            (supplier) =>
                                !selectedSuppliers.includes(supplier.id),
                        ),
                    );
                    setSelectedSuppliers([]);
                }
                break;
        }
    };

    const filteredSuppliers = suppliers.filter((supplier) => {
        return (
            supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            supplier.contact_person
                ?.toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            supplier.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            supplier.phone?.includes(searchTerm)
        );
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

    const formatCurrency = (value) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
            maximumFractionDigits: 0,
        }).format(value);
    };

    return (
        <div className="p-6">
            {/* Header with Stats */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                            Quản Lý Nhà Cung Cấp
                        </h1>
                        <p className="text-gray-600 mt-2">
                            Quản lý thông tin và hợp tác với các nhà cung cấp
                        </p>
                    </div>
                    <Link
                        to="/admin/suppliers/new"
                        className="inline-flex items-center px-5 py-3 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-xl hover:from-indigo-600 hover:to-blue-600 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
                    >
                        <PlusIcon className="h-5 w-5 mr-2" />
                        Thêm Nhà Cung Cấp
                    </Link>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <StatsCard
                        title="Tổng Nhà Cung Cấp"
                        value={suppliers.length}
                        icon="🏢"
                        subtitle={`${suppliers.filter((s) => s.status === "active").length} đang hoạt động`}
                        color="bg-gradient-to-r from-indigo-500 to-blue-400"
                    />
                    <StatsCard
                        title="Tổng Sản Phẩm"
                        value={suppliers.reduce(
                            (sum, s) => sum + s.product_count,
                            0,
                        )}
                        icon="📦"
                        subtitle="Từ tất cả nhà cung cấp"
                        color="bg-gradient-to-r from-emerald-500 to-teal-400"
                    />
                    <StatsCard
                        title="Đơn Hàng/Năm"
                        value={suppliers.reduce(
                            (sum, s) => sum + s.order_count,
                            0,
                        )}
                        icon="📊"
                        subtitle="Tổng số đơn hàng"
                        color="bg-gradient-to-r from-amber-500 to-orange-400"
                    />
                    <StatsCard
                        title="Tổng Giá Trị"
                        value={formatCurrency(
                            suppliers.reduce(
                                (sum, s) => sum + s.total_value,
                                0,
                            ),
                        ).replace("₫", "")}
                        icon="💰"
                        subtitle="Tổng giá trị hợp đồng"
                        color="bg-gradient-to-r from-purple-500 to-pink-400"
                    />
                </div>
            </div>

            {/* Search and Controls */}
            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl p-6 mb-6 border border-indigo-100">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                    {/* Search */}
                    <div className="lg:col-span-2">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <MagnifyingGlassIcon className="h-5 w-5 text-indigo-500" />
                            </div>
                            <input
                                type="text"
                                placeholder="Tìm kiếm theo tên, người liên hệ, email, số điện thoại..."
                                className="w-full pl-12 pr-4 py-3 bg-white rounded-xl border border-indigo-200 focus:ring-2 focus:ring-indigo-300 focus:border-transparent transition-all"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* View Mode Toggle */}
                    <div className="flex space-x-2">
                        <button
                            onClick={() => setViewMode("grid")}
                            className={`flex-1 px-4 py-2 rounded-xl border transition-all ${
                                viewMode === "grid"
                                    ? "bg-white border-indigo-400 text-indigo-600 shadow-sm"
                                    : "bg-gray-100 border-gray-200 text-gray-600 hover:bg-gray-200"
                            }`}
                        >
                            Grid View
                        </button>
                        <button
                            onClick={() => setViewMode("list")}
                            className={`flex-1 px-4 py-2 rounded-xl border transition-all ${
                                viewMode === "list"
                                    ? "bg-white border-indigo-400 text-indigo-600 shadow-sm"
                                    : "bg-gray-100 border-gray-200 text-gray-600 hover:bg-gray-200"
                            }`}
                        >
                            List View
                        </button>
                    </div>

                    {/* Bulk Actions */}
                    <div>
                        <select
                            onChange={(e) => handleBulkAction(e.target.value)}
                            className="w-full px-4 py-3 bg-white rounded-xl border border-indigo-200 focus:ring-2 focus:ring-indigo-300 focus:border-transparent"
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

                    {/* Export Button */}
                    <div>
                        <button className="w-full px-4 py-3 bg-white text-indigo-600 border border-indigo-200 rounded-xl hover:bg-indigo-50 hover:border-indigo-300 transition-all">
                            Export CSV
                        </button>
                    </div>
                </div>
            </div>

            {/* Loading State */}
            {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                    <div className="relative">
                        <div className="w-20 h-20 border-4 border-indigo-200 rounded-full"></div>
                        <div className="absolute top-0 left-0 w-20 h-20 border-4 border-indigo-500 rounded-full border-t-transparent animate-spin"></div>
                    </div>
                    <p className="mt-6 text-lg text-gray-600">
                        Đang tải danh sách nhà cung cấp...
                    </p>
                </div>
            ) : (
                <>
                    {/* Grid View */}
                    {viewMode === "grid" ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredSuppliers.map((supplier) => (
                                <div
                                    key={supplier.id}
                                    className={`bg-white rounded-2xl overflow-hidden border-2 transition-all hover:shadow-xl hover:-translate-y-1 ${
                                        selectedSuppliers.includes(supplier.id)
                                            ? "border-indigo-400 ring-2 ring-indigo-100"
                                            : "border-gray-100 hover:border-indigo-200"
                                    }`}
                                >
                                    <div className="relative">
                                        {/* Header with Gradient */}
                                        <div
                                            className={`h-3 ${supplier.color}`}
                                        ></div>

                                        <div className="p-6">
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="flex-1">
                                                    <div className="flex items-center space-x-3 mb-2">
                                                        {/* Selection Checkbox */}
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedSuppliers.includes(
                                                                supplier.id,
                                                            )}
                                                            onChange={() =>
                                                                toggleSelectSupplier(
                                                                    supplier.id,
                                                                )
                                                            }
                                                            className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                        />

                                                        {/* Supplier Logo/Icon */}
                                                        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-indigo-100 to-blue-100">
                                                            <span className="text-2xl">
                                                                {supplier.icon}
                                                            </span>
                                                        </div>

                                                        {/* Status Badge */}
                                                        <div>
                                                            <span
                                                                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                                    supplier.status ===
                                                                    "active"
                                                                        ? "bg-emerald-100 text-emerald-800"
                                                                        : "bg-rose-100 text-rose-800"
                                                                }`}
                                                            >
                                                                {supplier.status ===
                                                                "active"
                                                                    ? "Đang hợp tác"
                                                                    : "Ngừng hợp tác"}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                                                        {supplier.name}
                                                    </h3>

                                                    {/* Contact Info */}
                                                    <div className="space-y-2 mb-4">
                                                        {supplier.contact_person && (
                                                            <div className="flex items-center text-sm text-gray-600">
                                                                <UserIcon className="h-4 w-4 mr-2 text-gray-400" />
                                                                <span>
                                                                    {
                                                                        supplier.contact_person
                                                                    }
                                                                </span>
                                                            </div>
                                                        )}
                                                        {supplier.phone && (
                                                            <div className="flex items-center text-sm text-gray-600">
                                                                <PhoneIcon className="h-4 w-4 mr-2 text-gray-400" />
                                                                <span>
                                                                    {
                                                                        supplier.phone
                                                                    }
                                                                </span>
                                                            </div>
                                                        )}
                                                        {supplier.email && (
                                                            <div className="flex items-center text-sm text-gray-600">
                                                                <EnvelopeIcon className="h-4 w-4 mr-2 text-gray-400" />
                                                                <span className="truncate">
                                                                    {
                                                                        supplier.email
                                                                    }
                                                                </span>
                                                            </div>
                                                        )}
                                                        {supplier.address && (
                                                            <div className="flex items-start text-sm text-gray-600">
                                                                <MapPinIcon className="h-4 w-4 mr-2 text-gray-400 mt-0.5 flex-shrink-0" />
                                                                <span className="line-clamp-2">
                                                                    {
                                                                        supplier.address
                                                                    }
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Stats */}
                                            <div className="grid grid-cols-3 gap-3 mb-6">
                                                <div className="bg-blue-50 rounded-lg p-3">
                                                    <p className="text-xs text-blue-600">
                                                        Sản phẩm
                                                    </p>
                                                    <p className="text-lg font-bold text-gray-900">
                                                        {supplier.product_count}
                                                    </p>
                                                </div>
                                                <div className="bg-purple-50 rounded-lg p-3">
                                                    <p className="text-xs text-purple-600">
                                                        Đơn hàng
                                                    </p>
                                                    <p className="text-lg font-bold text-gray-900">
                                                        {supplier.order_count}
                                                    </p>
                                                </div>
                                                <div className="bg-emerald-50 rounded-lg p-3">
                                                    <p className="text-xs text-emerald-600">
                                                        Giá trị
                                                    </p>
                                                    <p className="text-lg font-bold text-gray-900">
                                                        {formatCurrency(
                                                            supplier.total_value,
                                                        ).replace("₫", "")}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Last Updated */}
                                            <div className="text-xs text-gray-500 mb-4">
                                                Cập nhật:{" "}
                                                {new Date(
                                                    supplier.updated_at,
                                                ).toLocaleDateString("vi-VN")}
                                            </div>

                                            {/* Actions */}
                                            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                                <div className="flex space-x-2">
                                                    <Link
                                                        to={`/admin/suppliers/${supplier.id}`}
                                                        className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                        title="Xem chi tiết"
                                                    >
                                                        <EyeIcon className="h-5 w-5" />
                                                    </Link>
                                                    <Link
                                                        to={`/admin/suppliers/${supplier.id}/edit`}
                                                        className="p-2 text-gray-600 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                                                        title="Chỉnh sửa"
                                                    >
                                                        <PencilIcon className="h-5 w-5" />
                                                    </Link>
                                                    <button
                                                        onClick={() =>
                                                            navigator.clipboard.writeText(
                                                                supplier.email,
                                                            )
                                                        }
                                                        className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                                        title="Copy email"
                                                    >
                                                        <DocumentDuplicateIcon className="h-5 w-5" />
                                                    </button>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <button
                                                        onClick={() =>
                                                            handleToggleStatus(
                                                                supplier.id,
                                                            )
                                                        }
                                                        className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                                                            supplier.status ===
                                                            "active"
                                                                ? "bg-rose-100 text-rose-700 hover:bg-rose-200"
                                                                : "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                                                        }`}
                                                    >
                                                        {supplier.status ===
                                                        "active"
                                                            ? "Ngừng hợp tác"
                                                            : "Kích hoạt"}
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                supplier.id,
                                                            )
                                                        }
                                                        className="p-2 text-gray-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                                                        title="Xóa"
                                                    >
                                                        <TrashIcon className="h-5 w-5" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        /* List View */
                        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gradient-to-r from-indigo-50 to-blue-50">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider">
                                                <input
                                                    type="checkbox"
                                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600"
                                                    onChange={(e) => {
                                                        if (e.target.checked) {
                                                            setSelectedSuppliers(
                                                                filteredSuppliers.map(
                                                                    (s) => s.id,
                                                                ),
                                                            );
                                                        } else {
                                                            setSelectedSuppliers(
                                                                [],
                                                            );
                                                        }
                                                    }}
                                                />
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider">
                                                NHÀ CUNG CẤP
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider">
                                                LIÊN HỆ
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider">
                                                SẢN PHẨM
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider">
                                                TRẠNG THÁI
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider">
                                                THAO TÁC
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {filteredSuppliers.map((supplier) => (
                                            <tr
                                                key={supplier.id}
                                                className="hover:bg-indigo-50/50 transition-colors"
                                            >
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedSuppliers.includes(
                                                            supplier.id,
                                                        )}
                                                        onChange={() =>
                                                            toggleSelectSupplier(
                                                                supplier.id,
                                                            )
                                                        }
                                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                    />
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center">
                                                        <div
                                                            className={`h-10 w-10 rounded-lg ${supplier.color} flex items-center justify-center mr-3`}
                                                        >
                                                            <span className="text-lg">
                                                                {supplier.icon}
                                                            </span>
                                                        </div>
                                                        <div>
                                                            <div className="font-medium text-gray-900">
                                                                {supplier.name}
                                                            </div>
                                                            <div className="text-sm text-gray-500">
                                                                {supplier.email}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="space-y-1">
                                                        <div className="flex items-center text-sm text-gray-900">
                                                            <UserIcon className="h-4 w-4 mr-2 text-gray-400" />
                                                            {
                                                                supplier.contact_person
                                                            }
                                                        </div>
                                                        <div className="flex items-center text-sm text-gray-600">
                                                            <PhoneIcon className="h-4 w-4 mr-2 text-gray-400" />
                                                            {supplier.phone}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="space-y-2">
                                                        <div className="flex items-center">
                                                            <ShoppingBagIcon className="h-4 w-4 mr-2 text-blue-600" />
                                                            <span className="font-medium text-gray-900">
                                                                {
                                                                    supplier.product_count
                                                                }{" "}
                                                                sản phẩm
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <ChartBarIcon className="h-4 w-4 mr-2 text-purple-600" />
                                                            <span className="text-sm text-gray-600">
                                                                {
                                                                    supplier.order_count
                                                                }{" "}
                                                                đơn hàng
                                                            </span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div
                                                            className={`flex items-center ${
                                                                supplier.status ===
                                                                "active"
                                                                    ? "text-emerald-600"
                                                                    : "text-rose-600"
                                                            }`}
                                                        >
                                                            {supplier.status ===
                                                            "active" ? (
                                                                <>
                                                                    <CheckCircleIcon className="h-5 w-5 mr-2" />
                                                                    <span className="font-medium">
                                                                        Đang hợp
                                                                        tác
                                                                    </span>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <XCircleIcon className="h-5 w-5 mr-2" />
                                                                    <span className="font-medium">
                                                                        Ngừng
                                                                        hợp tác
                                                                    </span>
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center space-x-3">
                                                        <Link
                                                            to={`/admin/suppliers/${supplier.id}`}
                                                            className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-100 rounded-lg transition-colors"
                                                            title="Xem chi tiết"
                                                        >
                                                            <EyeIcon className="h-5 w-5" />
                                                        </Link>
                                                        <Link
                                                            to={`/admin/suppliers/${supplier.id}/edit`}
                                                            className="text-amber-600 hover:text-amber-800 p-2 hover:bg-amber-100 rounded-lg transition-colors"
                                                            title="Chỉnh sửa"
                                                        >
                                                            <PencilIcon className="h-5 w-5" />
                                                        </Link>
                                                        <button
                                                            onClick={() =>
                                                                handleToggleStatus(
                                                                    supplier.id,
                                                                )
                                                            }
                                                            className="text-emerald-600 hover:text-emerald-800 p-2 hover:bg-emerald-100 rounded-lg transition-colors"
                                                            title={
                                                                supplier.status ===
                                                                "active"
                                                                    ? "Ngừng hợp tác"
                                                                    : "Kích hoạt"
                                                            }
                                                        >
                                                            {supplier.status ===
                                                            "active" ? (
                                                                <XCircleIcon className="h-5 w-5" />
                                                            ) : (
                                                                <CheckCircleIcon className="h-5 w-5" />
                                                            )}
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                handleDelete(
                                                                    supplier.id,
                                                                )
                                                            }
                                                            className="text-rose-600 hover:text-rose-800 p-2 hover:bg-rose-100 rounded-lg transition-colors"
                                                            title="Xóa"
                                                        >
                                                            <TrashIcon className="h-5 w-5" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Empty State */}
                    {filteredSuppliers.length === 0 && (
                        <div className="text-center py-16">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-indigo-100 to-blue-100 rounded-2xl mb-6">
                                <BuildingOfficeIcon className="h-10 w-10 text-indigo-500" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                Không tìm thấy nhà cung cấp
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Thử thay đổi từ khóa tìm kiếm hoặc thêm nhà cung
                                cấp mới
                            </p>
                            <Link
                                to="/admin/suppliers/new"
                                className="inline-flex items-center px-5 py-3 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-xl hover:from-indigo-600 hover:to-blue-600 shadow-lg hover:shadow-xl transition-all"
                            >
                                <PlusIcon className="h-5 w-5 mr-2" />
                                Thêm Nhà Cung Cấp Đầu Tiên
                            </Link>
                        </div>
                    )}
                </>
            )}

            {/* Floating Action Button */}
            <Link
                to="/admin/suppliers/new"
                className="fixed bottom-8 right-8 inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all z-50"
            >
                <PlusIcon className="h-6 w-6" />
            </Link>
        </div>
    );
};

export default SupplierList;
