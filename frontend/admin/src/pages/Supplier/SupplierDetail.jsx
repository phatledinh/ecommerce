// pages/admin/suppliers/SupplierDetail.jsx
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
    ArrowLeftIcon,
    BuildingOfficeIcon,
    UserIcon,
    PhoneIcon,
    EnvelopeIcon,
    MapPinIcon,
    DocumentTextIcon,
    ClipboardDocumentCheckIcon,
    TruckIcon,
    ChartBarIcon,
    CurrencyDollarIcon,
    ShoppingBagIcon,
    CalendarIcon,
    PencilIcon,
    TrashIcon,
    CheckCircleIcon,
    XCircleIcon,
    ArrowTopRightOnSquareIcon,
    DocumentDuplicateIcon,
    ChatBubbleLeftRightIcon,
    CreditCardIcon,
    ClockIcon,
    ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

const SupplierDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [supplier, setSupplier] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("overview");
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setSupplier({
                id: 1,
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
                created_at: "2023-01-15T10:00:00",
                updated_at: "2024-02-20T14:30:00",
                created_by: "Admin",
                total_orders: 128,
                total_products: 45,
                total_value: 12500000000,
                avg_order_value: 97656250,
                last_order_date: "2024-02-19T11:30:00",
                color: "from-blue-500 to-indigo-400",
            });

            setOrders([
                {
                    id: "PO-2024-00123",
                    date: "2024-02-19",
                    items: 5,
                    total: 125000000,
                    status: "delivered",
                },
                {
                    id: "PO-2024-00122",
                    date: "2024-02-12",
                    items: 3,
                    total: 85000000,
                    status: "processing",
                },
                {
                    id: "PO-2024-00121",
                    date: "2024-02-05",
                    items: 8,
                    total: 210000000,
                    status: "delivered",
                },
                {
                    id: "PO-2024-00120",
                    date: "2024-01-29",
                    items: 2,
                    total: 45000000,
                    status: "delivered",
                },
                {
                    id: "PO-2024-00119",
                    date: "2024-01-22",
                    items: 6,
                    total: 175000000,
                    status: "delivered",
                },
            ]);

            setProducts([
                {
                    id: 1,
                    name: "Samsung Galaxy S24 Ultra",
                    sku: "SGS24U-512",
                    stock: 45,
                    price: 28990000,
                },
                {
                    id: 2,
                    name: "Samsung Galaxy Z Fold5",
                    sku: "SGZF5-512",
                    stock: 12,
                    price: 41990000,
                },
                {
                    id: 3,
                    name: "Samsung Galaxy Tab S9",
                    sku: "SGTS9-256",
                    stock: 28,
                    price: 18990000,
                },
                {
                    id: 4,
                    name: "Samsung Galaxy Watch6",
                    sku: "SGW6-44",
                    stock: 65,
                    price: 7990000,
                },
                {
                    id: 5,
                    name: "Samsung Galaxy Buds2 Pro",
                    sku: "SGB2P-BK",
                    stock: 120,
                    price: 3990000,
                },
            ]);

            setLoading(false);
        }, 800);
    }, [id]);

    const handleDelete = () => {
        if (window.confirm("Bạn có chắc muốn xóa nhà cung cấp này?")) {
            // API call to delete
            navigate("/admin/suppliers");
        }
    };

    const handleToggleStatus = () => {
        // API call to toggle status
        setSupplier((prev) => ({ ...prev, is_active: !prev.is_active }));
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        alert("Đã sao chép vào clipboard!");
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
            maximumFractionDigits: 0,
        }).format(value);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "delivered":
                return "bg-emerald-100 text-emerald-800";
            case "processing":
                return "bg-amber-100 text-amber-800";
            case "pending":
                return "bg-blue-100 text-blue-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case "delivered":
                return "Đã giao";
            case "processing":
                return "Đang xử lý";
            case "pending":
                return "Chờ xử lý";
            default:
                return "Không xác định";
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <div className="relative">
                    <div className="w-20 h-20 border-4 border-indigo-200 rounded-full"></div>
                    <div className="absolute top-0 left-0 w-20 h-20 border-4 border-indigo-500 rounded-full border-t-transparent animate-spin"></div>
                </div>
                <p className="mt-6 text-lg text-gray-600">
                    Đang tải chi tiết...
                </p>
            </div>
        );
    }

    if (!supplier) {
        return (
            <div className="text-center py-16">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-indigo-100 to-blue-100 rounded-2xl mb-6">
                    <BuildingOfficeIcon className="h-10 w-10 text-indigo-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Không tìm thấy nhà cung cấp
                </h3>
                <p className="text-gray-600 mb-6">
                    Nhà cung cấp bạn tìm kiếm không tồn tại
                </p>
                <Link
                    to="/admin/suppliers"
                    className="inline-flex items-center px-5 py-3 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-xl hover:from-indigo-600 hover:to-blue-600 shadow-lg hover:shadow-xl transition-all"
                >
                    <ArrowLeftIcon className="h-5 w-5 mr-2" />
                    Quay lại danh sách
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-indigo-50/50 to-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
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
                                Chi Tiết Nhà Cung Cấp
                            </h1>
                            <p className="text-gray-600 mt-2">
                                Thông tin chi tiết và lịch sử hợp tác
                            </p>
                        </div>
                        <div className="flex items-center space-x-3">
                            <span
                                className={`px-3 py-1 rounded-full text-sm font-medium ${
                                    supplier.is_active
                                        ? "bg-emerald-100 text-emerald-800"
                                        : "bg-rose-100 text-rose-800"
                                }`}
                            >
                                {supplier.is_active
                                    ? "Đang hợp tác"
                                    : "Ngừng hợp tác"}
                            </span>
                            <Link
                                to={`/admin/suppliers/${id}/edit`}
                                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl hover:from-amber-600 hover:to-orange-600 shadow-lg hover:shadow-xl transition-all"
                            >
                                <PencilIcon className="h-5 w-5 mr-2" />
                                Chỉnh sửa
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Supplier Info */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Supplier Card */}
                        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                            <div className={`h-2 ${supplier.color}`}></div>
                            <div className="p-6">
                                <div className="flex items-start justify-between mb-6">
                                    <div className="flex items-start space-x-4">
                                        <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-r from-indigo-100 to-blue-100">
                                            <BuildingOfficeIcon className="h-8 w-8 text-indigo-600" />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                                {supplier.name}
                                            </h2>
                                            <div className="flex items-center space-x-4">
                                                <a
                                                    href={`mailto:${supplier.email}`}
                                                    className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-800"
                                                >
                                                    <EnvelopeIcon className="h-4 w-4 mr-1" />
                                                    {supplier.email}
                                                </a>
                                                <button
                                                    onClick={() =>
                                                        copyToClipboard(
                                                            supplier.email,
                                                        )
                                                    }
                                                    className="text-gray-400 hover:text-gray-600"
                                                    title="Copy email"
                                                >
                                                    <DocumentDuplicateIcon className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Contact Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                    <div className="space-y-4">
                                        <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
                                            <p className="text-sm text-gray-500 mb-1">
                                                Người liên hệ
                                            </p>
                                            <div className="flex items-center">
                                                <UserIcon className="h-5 w-5 text-indigo-600 mr-3" />
                                                <span className="text-lg font-medium text-gray-900">
                                                    {supplier.contact_person}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
                                            <p className="text-sm text-gray-500 mb-1">
                                                Số điện thoại
                                            </p>
                                            <div className="flex items-center">
                                                <PhoneIcon className="h-5 w-5 text-indigo-600 mr-3" />
                                                <span className="text-lg font-medium text-gray-900">
                                                    {supplier.phone}
                                                </span>
                                            </div>
                                        </div>

                                        {supplier.website && (
                                            <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
                                                <p className="text-sm text-gray-500 mb-1">
                                                    Website
                                                </p>
                                                <div className="flex items-center">
                                                    <ArrowTopRightOnSquareIcon className="h-5 w-5 text-indigo-600 mr-3" />
                                                    <a
                                                        href={supplier.website}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-lg font-medium text-indigo-600 hover:text-indigo-800"
                                                    >
                                                        {supplier.website.replace(
                                                            "https://",
                                                            "",
                                                        )}
                                                    </a>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-4">
                                        <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
                                            <p className="text-sm text-gray-500 mb-1">
                                                Địa chỉ
                                            </p>
                                            <div className="flex items-start">
                                                <MapPinIcon className="h-5 w-5 text-indigo-600 mr-3 mt-0.5 flex-shrink-0" />
                                                <span className="text-gray-900">
                                                    {supplier.address}
                                                </span>
                                            </div>
                                        </div>

                                        {supplier.tax_code && (
                                            <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
                                                <p className="text-sm text-gray-500 mb-1">
                                                    Mã số thuế
                                                </p>
                                                <div className="flex items-center">
                                                    <DocumentTextIcon className="h-5 w-5 text-indigo-600 mr-3" />
                                                    <span className="text-lg font-medium text-gray-900">
                                                        {supplier.tax_code}
                                                    </span>
                                                </div>
                                            </div>
                                        )}

                                        <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
                                            <p className="text-sm text-gray-500 mb-1">
                                                Ngày tạo
                                            </p>
                                            <div className="flex items-center">
                                                <CalendarIcon className="h-5 w-5 text-indigo-600 mr-3" />
                                                <span className="text-gray-900">
                                                    {new Date(
                                                        supplier.created_at,
                                                    ).toLocaleDateString(
                                                        "vi-VN",
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Business Terms */}
                                <div className="mb-8">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                                        Điều khoản hợp tác
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                                            <div className="flex items-center mb-2">
                                                <TruckIcon className="h-5 w-5 text-blue-600 mr-2" />
                                                <p className="text-sm text-blue-700">
                                                    Thời gian giao hàng
                                                </p>
                                            </div>
                                            <p className="text-xl font-bold text-gray-900">
                                                {supplier.lead_time} ngày
                                            </p>
                                        </div>

                                        <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                                            <div className="flex items-center mb-2">
                                                <CreditCardIcon className="h-5 w-5 text-purple-600 mr-2" />
                                                <p className="text-sm text-purple-700">
                                                    Thanh toán
                                                </p>
                                            </div>
                                            <p className="text-xl font-bold text-gray-900">
                                                Net{" "}
                                                {
                                                    supplier.payment_terms.split(
                                                        "_",
                                                    )[1]
                                                }{" "}
                                                ngày
                                            </p>
                                        </div>

                                        <div className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl">
                                            <div className="flex items-center mb-2">
                                                <CurrencyDollarIcon className="h-5 w-5 text-emerald-600 mr-2" />
                                                <p className="text-sm text-emerald-700">
                                                    Đơn tối thiểu
                                                </p>
                                            </div>
                                            <p className="text-xl font-bold text-gray-900">
                                                {formatCurrency(
                                                    supplier.minimum_order,
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Notes */}
                                {supplier.notes && (
                                    <div className="mb-6">
                                        <h3 className="text-lg font-medium text-gray-900 mb-3">
                                            Ghi chú
                                        </h3>
                                        <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
                                            <p className="text-gray-700">
                                                {supplier.notes}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Tab Navigation */}
                        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                            <div className="border-b border-gray-200">
                                <nav
                                    className="flex space-x-1 px-6"
                                    aria-label="Tabs"
                                >
                                    {[
                                        "overview",
                                        "products",
                                        "orders",
                                        "performance",
                                    ].map((tab) => (
                                        <button
                                            key={tab}
                                            type="button"
                                            onClick={() => setActiveTab(tab)}
                                            className={`px-4 py-3 text-sm font-medium rounded-lg transition-all ${
                                                activeTab === tab
                                                    ? "bg-indigo-100 text-indigo-700"
                                                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                                            }`}
                                        >
                                            {tab === "overview" && "Tổng quan"}
                                            {tab === "products" && "Sản phẩm"}
                                            {tab === "orders" && "Đơn hàng"}
                                            {tab === "performance" &&
                                                "Hiệu suất"}
                                        </button>
                                    ))}
                                </nav>
                            </div>

                            <div className="p-6">
                                {activeTab === "overview" && (
                                    <div className="space-y-6">
                                        <div>
                                            <h4 className="text-lg font-medium text-gray-900 mb-4">
                                                Thống kê hợp tác
                                            </h4>
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl">
                                                    <p className="text-sm text-blue-700">
                                                        Tổng đơn hàng
                                                    </p>
                                                    <p className="text-2xl font-bold text-blue-900 mt-2">
                                                        {supplier.total_orders}
                                                    </p>
                                                </div>
                                                <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                                                    <p className="text-sm text-purple-700">
                                                        Sản phẩm
                                                    </p>
                                                    <p className="text-2xl font-bold text-purple-900 mt-2">
                                                        {
                                                            supplier.total_products
                                                        }
                                                    </p>
                                                </div>
                                                <div className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl">
                                                    <p className="text-sm text-emerald-700">
                                                        Tổng giá trị
                                                    </p>
                                                    <p className="text-2xl font-bold text-emerald-900 mt-2">
                                                        {formatCurrency(
                                                            supplier.total_value,
                                                        ).replace("₫", "")}
                                                    </p>
                                                </div>
                                                <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl">
                                                    <p className="text-sm text-amber-700">
                                                        Đơn trung bình
                                                    </p>
                                                    <p className="text-2xl font-bold text-amber-900 mt-2">
                                                        {formatCurrency(
                                                            supplier.avg_order_value,
                                                        ).replace("₫", "")}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="text-lg font-medium text-gray-900 mb-4">
                                                Thông tin bổ sung
                                            </h4>
                                            <div className="space-y-3">
                                                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-white rounded-xl">
                                                    <span className="text-gray-700">
                                                        Người tạo
                                                    </span>
                                                    <span className="font-medium text-gray-900">
                                                        {supplier.created_by}
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-white rounded-xl">
                                                    <span className="text-gray-700">
                                                        Lần cập nhật cuối
                                                    </span>
                                                    <span className="font-medium text-gray-900">
                                                        {new Date(
                                                            supplier.updated_at,
                                                        ).toLocaleDateString(
                                                            "vi-VN",
                                                        )}
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-white rounded-xl">
                                                    <span className="text-gray-700">
                                                        Đơn hàng cuối
                                                    </span>
                                                    <span className="font-medium text-gray-900">
                                                        {new Date(
                                                            supplier.last_order_date,
                                                        ).toLocaleDateString(
                                                            "vi-VN",
                                                        )}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === "products" && (
                                    <div>
                                        <div className="flex items-center justify-between mb-6">
                                            <h4 className="text-lg font-medium text-gray-900">
                                                Sản phẩm từ nhà cung cấp
                                            </h4>
                                            <span className="text-sm text-gray-500">
                                                {products.length} sản phẩm
                                            </span>
                                        </div>

                                        <div className="space-y-3">
                                            {products.map((product) => (
                                                <div
                                                    key={product.id}
                                                    className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200 hover:border-indigo-300 transition-colors"
                                                >
                                                    <div>
                                                        <div className="flex items-center space-x-3">
                                                            <ShoppingBagIcon className="h-5 w-5 text-gray-400" />
                                                            <div>
                                                                <p className="font-medium text-gray-900">
                                                                    {
                                                                        product.name
                                                                    }
                                                                </p>
                                                                <p className="text-sm text-gray-500">
                                                                    SKU:{" "}
                                                                    {
                                                                        product.sku
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="font-bold text-gray-900">
                                                            {formatCurrency(
                                                                product.price,
                                                            )}
                                                        </p>
                                                        <p className="text-sm text-gray-500">
                                                            Tồn kho:{" "}
                                                            {product.stock}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {activeTab === "orders" && (
                                    <div>
                                        <div className="flex items-center justify-between mb-6">
                                            <h4 className="text-lg font-medium text-gray-900">
                                                Đơn hàng gần đây
                                            </h4>
                                            <span className="text-sm text-gray-500">
                                                5 đơn gần nhất
                                            </span>
                                        </div>

                                        <div className="space-y-3">
                                            {orders.map((order) => (
                                                <div
                                                    key={order.id}
                                                    className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200 hover:border-indigo-300 transition-colors"
                                                >
                                                    <div>
                                                        <div className="flex items-center space-x-3">
                                                            <DocumentTextIcon className="h-5 w-5 text-gray-400" />
                                                            <div>
                                                                <p className="font-medium text-gray-900">
                                                                    {order.id}
                                                                </p>
                                                                <p className="text-sm text-gray-500">
                                                                    {order.date}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="text-center">
                                                        <p className="font-medium text-gray-900">
                                                            {order.items} items
                                                        </p>
                                                        <p className="text-sm text-gray-500">
                                                            Số lượng
                                                        </p>
                                                    </div>
                                                    <div className="text-center">
                                                        <p className="font-bold text-gray-900">
                                                            {formatCurrency(
                                                                order.total,
                                                            )}
                                                        </p>
                                                        <p className="text-sm text-gray-500">
                                                            Tổng giá trị
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <span
                                                            className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                                                                order.status,
                                                            )}`}
                                                        >
                                                            {getStatusText(
                                                                order.status,
                                                            )}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {activeTab === "performance" && (
                                    <div>
                                        <h4 className="text-lg font-medium text-gray-900 mb-6">
                                            Hiệu suất hợp tác
                                        </h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl">
                                                <p className="text-sm text-blue-700">
                                                    Đánh giá chất lượng
                                                </p>
                                                <div className="flex items-center mt-4">
                                                    <div className="text-3xl mr-3">
                                                        ⭐
                                                    </div>
                                                    <div>
                                                        <p className="text-2xl font-bold text-blue-900">
                                                            4.8/5.0
                                                        </p>
                                                        <p className="text-sm text-blue-600">
                                                            Dựa trên 128 đánh
                                                            giá
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="p-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl">
                                                <p className="text-sm text-emerald-700">
                                                    Tỉ lệ giao hàng đúng hạn
                                                </p>
                                                <div className="flex items-center mt-4">
                                                    <div className="text-3xl mr-3">
                                                        📦
                                                    </div>
                                                    <div>
                                                        <p className="text-2xl font-bold text-emerald-900">
                                                            94.5%
                                                        </p>
                                                        <p className="text-sm text-emerald-600">
                                                            Trong 6 tháng qua
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="p-6 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl">
                                                <p className="text-sm text-amber-700">
                                                    Thời gian phản hồi trung
                                                    bình
                                                </p>
                                                <div className="flex items-center mt-4">
                                                    <div className="text-3xl mr-3">
                                                        ⏱️
                                                    </div>
                                                    <div>
                                                        <p className="text-2xl font-bold text-amber-900">
                                                            2.3 giờ
                                                        </p>
                                                        <p className="text-sm text-amber-600">
                                                            Cho các yêu cầu hỗ
                                                            trợ
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl">
                                                <p className="text-sm text-purple-700">
                                                    Tăng trưởng hợp tác
                                                </p>
                                                <div className="flex items-center mt-4">
                                                    <div className="text-3xl mr-3">
                                                        📈
                                                    </div>
                                                    <div>
                                                        <p className="text-2xl font-bold text-purple-900">
                                                            +24.5%
                                                        </p>
                                                        <p className="text-sm text-purple-600">
                                                            So với năm trước
                                                        </p>
                                                    </div>
                                                </div>
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
                        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl border border-indigo-100 p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">
                                Thao tác nhanh
                            </h3>
                            <div className="space-y-3">
                                <button
                                    onClick={() =>
                                        copyToClipboard(supplier.email)
                                    }
                                    className="w-full flex items-center justify-center px-4 py-3 bg-white text-gray-700 border-2 border-gray-200 rounded-xl hover:border-indigo-300 hover:text-indigo-700 transition-all"
                                >
                                    <DocumentDuplicateIcon className="h-5 w-5 mr-2" />
                                    Sao chép email
                                </button>
                                <button
                                    onClick={handleToggleStatus}
                                    className={`w-full flex items-center justify-center px-4 py-3 border-2 rounded-xl transition-all ${
                                        supplier.is_active
                                            ? "bg-rose-50 border-rose-200 text-rose-700 hover:bg-rose-100"
                                            : "bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100"
                                    }`}
                                >
                                    {supplier.is_active ? (
                                        <>
                                            <XCircleIcon className="h-5 w-5 mr-2" />
                                            Ngừng hợp tác
                                        </>
                                    ) : (
                                        <>
                                            <CheckCircleIcon className="h-5 w-5 mr-2" />
                                            Tiếp tục hợp tác
                                        </>
                                    )}
                                </button>
                                <Link
                                    to={`/admin/suppliers/${id}/edit`}
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
                                    Xóa nhà cung cấp
                                </button>
                            </div>
                        </div>

                        {/* Contact Card */}
                        <div className="bg-white rounded-2xl border border-gray-200 p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">
                                Liên hệ nhanh
                            </h3>
                            <div className="space-y-4">
                                <a
                                    href={`mailto:${supplier.email}`}
                                    className="flex items-center justify-center p-3 bg-gradient-to-r from-indigo-50 to-blue-50 text-indigo-700 rounded-xl hover:from-indigo-100 hover:to-blue-100 transition-all"
                                >
                                    <EnvelopeIcon className="h-5 w-5 mr-2" />
                                    Gửi email
                                </a>
                                <a
                                    href={`tel:${supplier.phone}`}
                                    className="flex items-center justify-center p-3 bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 rounded-xl hover:from-emerald-100 hover:to-teal-100 transition-all"
                                >
                                    <PhoneIcon className="h-5 w-5 mr-2" />
                                    Gọi điện
                                </a>
                                <button className="flex items-center justify-center p-3 bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 rounded-xl hover:from-purple-100 hover:to-pink-100 transition-all">
                                    <ChatBubbleLeftRightIcon className="h-5 w-5 mr-2" />
                                    Nhắn tin
                                </button>
                            </div>
                        </div>

                        {/* Performance Summary */}
                        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100 p-6">
                            <div className="flex items-center mb-3">
                                <ChartBarIcon className="h-5 w-5 text-emerald-600 mr-2" />
                                <h3 className="text-lg font-medium text-emerald-900">
                                    Tóm tắt hiệu suất
                                </h3>
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-sm text-emerald-700">
                                        Đơn hàng thành công
                                    </span>
                                    <span className="font-bold text-emerald-900">
                                        {supplier.total_orders}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-emerald-700">
                                        Tổng giá trị
                                    </span>
                                    <span className="font-bold text-emerald-900">
                                        {formatCurrency(
                                            supplier.total_value,
                                        ).replace("₫", "")}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-emerald-700">
                                        Đơn trung bình
                                    </span>
                                    <span className="font-bold text-emerald-900">
                                        {formatCurrency(
                                            supplier.avg_order_value,
                                        ).replace("₫", "")}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Alerts */}
                        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-100 p-6">
                            <div className="flex items-center mb-3">
                                <ExclamationTriangleIcon className="h-5 w-5 text-amber-600 mr-2" />
                                <h3 className="text-lg font-medium text-amber-900">
                                    Lưu ý quan trọng
                                </h3>
                            </div>
                            <ul className="space-y-2 text-sm text-amber-700">
                                <li className="flex items-start">
                                    <ClockIcon className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                                    <span>
                                        Thời gian giao hàng:{" "}
                                        {supplier.lead_time} ngày
                                    </span>
                                </li>
                                <li className="flex items-start">
                                    <CreditCardIcon className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                                    <span>
                                        Thanh toán: Net{" "}
                                        {supplier.payment_terms.split("_")[1]}{" "}
                                        ngày
                                    </span>
                                </li>
                                {supplier.minimum_order > 0 && (
                                    <li className="flex items-start">
                                        <CurrencyDollarIcon className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                                        <span>
                                            Đơn tối thiểu:{" "}
                                            {formatCurrency(
                                                supplier.minimum_order,
                                            )}
                                        </span>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SupplierDetail;
