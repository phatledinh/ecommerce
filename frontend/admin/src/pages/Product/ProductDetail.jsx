// pages/admin/products/ProductDetail.jsx
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
    ArrowLeftIcon,
    PencilIcon,
    TrashIcon,
    EyeIcon,
    PhotoIcon,
    DocumentTextIcon,
    TagIcon,
    BuildingLibraryIcon,
    FolderIcon,
    CurrencyDollarIcon,
    CubeIcon,
    CogIcon,
    ChartBarIcon,
    CalendarIcon,
    UserIcon,
    ArrowPathIcon,
    ShareIcon,
    ShoppingBagIcon,
    CheckCircleIcon,
    XCircleIcon,
    ArrowRightIcon,
    PlusIcon,
    SparklesIcon,
    InformationCircleIcon,
    ArrowUpTrayIcon,
    ClockIcon,
    StarIcon,
    ChatBubbleLeftRightIcon,
    TrophyIcon,
    ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("overview");
    const [selectedVariant, setSelectedVariant] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            setTimeout(() => {
                setProduct({
                    id: 1,
                    sku_base: "IPHONE14PRO",
                    name: "iPhone 14 Pro Max",
                    slug: "iphone-14-pro-max",
                    short_description:
                        "iPhone 14 Pro Max với chip A16 Bionic, camera 48MP và màn hình Dynamic Island",
                    description: `
                        <h2>Thiết kế cao cấp</h2>
                        <p>iPhone 14 Pro Max được làm từ thép không gỉ với thiết kế nguyên khối, mang đến cảm giác cao cấp và sang trọng.</p>
                        
                        <h2>Màn hình Dynamic Island</h2>
                        <p>Màn hình Super Retina XDR 6.7 inch với công nghệ ProMotion 120Hz và Always-On Display.</p>
                        
                        <h2>Hệ thống camera chuyên nghiệp</h2>
                        <p>Camera chính 48MP với cảm biến lớn hơn, cải thiện 65% chất lượng ảnh trong điều kiện ánh sáng yếu.</p>
                        
                        <h2>Hiệu năng đột phá</h2>
                        <p>Chip A16 Bionic mạnh mẽ nhất từ trước đến nay, tiết kiệm năng lượng hơn 20%.</p>
                        
                        <h2>Thời lượng pin ấn tượng</h2>
                        <p>Thời lượng pin lên đến 29 giờ phát video, thỏa mãn nhu cầu sử dụng cả ngày dài.</p>
                    `,
                    thumbnail:
                        "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&h=600&fit=crop",
                    is_active: true,
                    brand_id: 1,
                    brand_name: "Apple",
                    category_id: 1,
                    category_name: "Điện Thoại",
                    created_at: "2024-01-15 10:30:00",
                    updated_at: "2024-01-20 14:20:00",
                    created_by: "Admin",

                    // Promotion info
                    promotion_info: "Giảm 2 triệu cho thẻ VISA",
                    gifts: "Tai nghe AirPods, Ốp lưng chính hãng",
                    other_offers: "Trả góp 0% trong 12 tháng, Bảo hành 2 năm",

                    // Stats
                    view_count: 12500,
                    order_count: 450,
                    total_revenue: 13500000000,
                    average_rating: 4.7,
                    review_count: 128,

                    // Images
                    images: [
                        {
                            id: 1,
                            url: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&h=600&fit=crop",
                            sort_order: 1,
                        },
                        {
                            id: 2,
                            url: "https://images.unsplash.com/photo-1694868707783-2f0e8cf8bf3e?w=800&h=600&fit=crop",
                            sort_order: 2,
                        },
                        {
                            id: 3,
                            url: "https://images.unsplash.com/photo-1694695365794-2a5ce6fd54c8?w=800&h=600&fit=crop",
                            sort_order: 3,
                        },
                        {
                            id: 4,
                            url: "https://images.unsplash.com/photo-1694868707651-9f8a542c4a19?w=800&h=600&fit=crop",
                            sort_order: 4,
                        },
                        {
                            id: 5,
                            url: "https://images.unsplash.com/photo-1694868707649-d9b77bc7625b?w=800&h=600&fit=crop",
                            sort_order: 5,
                        },
                    ],

                    // Variants
                    variants: [
                        {
                            id: 1,
                            sku: "IPHONE14PRO-8-256",
                            name: "8GB/256GB",
                            price: 29990000,
                            sale_price: 27990000,
                            stock: 50,
                            cost_price: 25000000,
                            is_active: true,
                        },
                        {
                            id: 2,
                            sku: "IPHONE14PRO-8-512",
                            name: "8GB/512GB",
                            price: 32990000,
                            sale_price: 30990000,
                            stock: 30,
                            cost_price: 28000000,
                            is_active: true,
                        },
                        {
                            id: 3,
                            sku: "IPHONE14PRO-12-256",
                            name: "12GB/256GB",
                            price: 34990000,
                            sale_price: 32990000,
                            stock: 20,
                            cost_price: 30000000,
                            is_active: true,
                        },
                        {
                            id: 4,
                            sku: "IPHONE14PRO-12-512",
                            name: "12GB/512GB",
                            price: 37990000,
                            sale_price: 35990000,
                            stock: 15,
                            cost_price: 32000000,
                            is_active: true,
                        },
                        {
                            id: 5,
                            sku: "IPHONE14PRO-12-1TB",
                            name: "12GB/1TB",
                            price: 42990000,
                            sale_price: 40990000,
                            stock: 10,
                            cost_price: 37000000,
                            is_active: true,
                        },
                    ],

                    // Attribute values
                    attributes: [
                        { id: 1, name: "RAM", values: ["8GB", "12GB"] },
                        {
                            id: 2,
                            name: "Dung lượng",
                            values: ["256GB", "512GB", "1TB"],
                        },
                        {
                            id: 3,
                            name: "Màu sắc",
                            values: ["Đen", "Trắng", "Xanh", "Tím"],
                        },
                    ],

                    // Specifications
                    specs: [
                        {
                            group: "Màn hình",
                            icon: "📱",
                            items: [
                                { name: "Kích thước", value: "6.7 inch" },
                                {
                                    name: "Độ phân giải",
                                    value: "2796 x 1290 pixels",
                                },
                                {
                                    name: "Công nghệ",
                                    value: "Super Retina XDR OLED",
                                },
                                {
                                    name: "Tần số quét",
                                    value: "120Hz ProMotion",
                                },
                                { name: "Độ sáng", value: "2000 nits (peak)" },
                            ],
                        },
                        {
                            group: "Camera",
                            icon: "📷",
                            items: [
                                { name: "Camera chính", value: "48MP" },
                                {
                                    name: "Camera tele",
                                    value: "12MP (3x optical zoom)",
                                },
                                { name: "Camera góc siêu rộng", value: "12MP" },
                                { name: "Camera selfie", value: "12MP" },
                                { name: "Quay video", value: "4K 60fps" },
                            ],
                        },
                        {
                            group: "Hiệu năng",
                            icon: "⚡",
                            items: [
                                { name: "Chip", value: "Apple A16 Bionic" },
                                { name: "GPU", value: "5-core GPU" },
                                { name: "RAM", value: "6GB" },
                                { name: "Hệ điều hành", value: "iOS 16" },
                            ],
                        },
                        {
                            group: "Pin & Sạc",
                            icon: "🔋",
                            items: [
                                { name: "Dung lượng pin", value: "4323 mAh" },
                                { name: "Sạc nhanh", value: "20W" },
                                { name: "Sạc không dây", value: "MagSafe 15W" },
                                {
                                    name: "Thời gian sử dụng",
                                    value: "29 giờ video",
                                },
                            ],
                        },
                        {
                            group: "Kết nối",
                            icon: "📡",
                            items: [
                                { name: "5G", value: "Có" },
                                { name: "Wi-Fi", value: "Wi-Fi 6" },
                                { name: "Bluetooth", value: "5.3" },
                                { name: "Cổng sạc", value: "Lightning" },
                            ],
                        },
                    ],

                    // Recent orders
                    recent_orders: [
                        {
                            id: 1001,
                            customer: "Nguyễn Văn A",
                            variant: "8GB/256GB",
                            price: 27990000,
                            date: "2024-01-20",
                            status: "completed",
                        },
                        {
                            id: 1002,
                            customer: "Trần Thị B",
                            variant: "12GB/512GB",
                            price: 35990000,
                            date: "2024-01-19",
                            status: "completed",
                        },
                        {
                            id: 1003,
                            customer: "Lê Văn C",
                            variant: "8GB/512GB",
                            price: 30990000,
                            date: "2024-01-18",
                            status: "processing",
                        },
                        {
                            id: 1004,
                            customer: "Phạm Thị D",
                            variant: "8GB/256GB",
                            price: 27990000,
                            date: "2024-01-17",
                            status: "completed",
                        },
                        {
                            id: 1005,
                            customer: "Hoàng Văn E",
                            variant: "12GB/1TB",
                            price: 40990000,
                            date: "2024-01-16",
                            status: "shipped",
                        },
                    ],

                    // Reviews
                    recent_reviews: [
                        {
                            id: 1,
                            customer: "Nguyễn Minh Anh",
                            rating: 5,
                            comment:
                                "Sản phẩm tuyệt vời, camera cực kỳ sắc nét",
                            date: "2024-01-19",
                        },
                        {
                            id: 2,
                            customer: "Trần Quốc Bảo",
                            rating: 4,
                            comment: "Pin tốt, nhưng giá hơi cao",
                            date: "2024-01-18",
                        },
                        {
                            id: 3,
                            customer: "Lê Thị Cẩm",
                            rating: 5,
                            comment: "Màn hình đẹp, hiệu năng mượt",
                            date: "2024-01-17",
                        },
                    ],

                    // Inventory alerts
                    inventory_alerts: [
                        {
                            variant: "12GB/1TB",
                            current_stock: 10,
                            min_stock: 15,
                            status: "low",
                        },
                        {
                            variant: "12GB/512GB",
                            current_stock: 15,
                            min_stock: 20,
                            status: "warning",
                        },
                    ],
                });
                setSelectedVariant(1);
                setLoading(false);
            }, 1000);
        };

        fetchProduct();
    }, [id]);

    const handleDelete = () => {
        if (window.confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
            console.log("Delete product", id);
            navigate("/admin/products");
        }
    };

    const handleToggleStatus = () => {
        setProduct((prev) => ({
            ...prev,
            is_active: !prev.is_active,
        }));
    };

    const handleDuplicate = () => {
        if (window.confirm("Bạn có muốn tạo bản sao của sản phẩm này?")) {
            console.log("Duplicate product", id);
            navigate("/admin/products/new");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-blue-50/50 to-gray-50 flex items-center justify-center p-6">
                <div className="text-center">
                    <div className="relative inline-block">
                        <div className="w-20 h-20 border-4 border-blue-200 rounded-full"></div>
                        <div className="absolute top-0 left-0 w-20 h-20 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
                    </div>
                    <p className="mt-6 text-lg text-gray-600">
                        Đang tải thông tin sản phẩm...
                    </p>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-blue-50/50 to-gray-50 flex items-center justify-center p-6">
                <div className="text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-rose-100 to-pink-100 rounded-2xl mb-6">
                        <XCircleIcon className="h-10 w-10 text-rose-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Không tìm thấy sản phẩm
                    </h3>
                    <p className="text-gray-600 mb-6">
                        Sản phẩm bạn tìm kiếm không tồn tại hoặc đã bị xóa
                    </p>
                    <Link
                        to="/admin/products"
                        className="inline-flex items-center px-5 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 shadow-lg hover:shadow-xl transition-all"
                    >
                        <ArrowLeftIcon className="h-5 w-5 mr-2" />
                        Quay lại danh sách
                    </Link>
                </div>
            </div>
        );
    }

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

    const StatCard = ({ icon, label, value, color, subtitle }) => (
        <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center">
                <div className={`p-3 ${color} rounded-lg`}>{icon}</div>
                <div className="ml-4">
                    <p className="text-sm text-gray-600">{label}</p>
                    <p className="text-xl font-bold text-gray-900">{value}</p>
                    {subtitle && (
                        <p className="text-xs text-gray-500">{subtitle}</p>
                    )}
                </div>
            </div>
        </div>
    );

    const getPriceRange = () => {
        if (!product.variants || product.variants.length === 0) {
            return { min: 0, max: 0 };
        }

        const prices = product.variants.map((v) => v.sale_price || v.price);
        return {
            min: Math.min(...prices),
            max: Math.max(...prices),
        };
    };

    const priceRange = getPriceRange();
    const totalStock =
        product.variants?.reduce((sum, v) => sum + v.stock, 0) || 0;
    const totalValue =
        product.variants?.reduce(
            (sum, v) => sum + (v.sale_price || v.price) * v.stock,
            0,
        ) || 0;

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50/50 to-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <Link
                        to="/admin/products"
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4 group"
                    >
                        <ArrowLeftIcon className="h-5 w-5 mr-2 transition-transform group-hover:-translate-x-1" />
                        Quay lại danh sách
                    </Link>

                    <div className="flex items-start justify-between">
                        <div>
                            <div className="flex items-center space-x-3 mb-3">
                                <div className="w-16 h-16 rounded-xl overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100">
                                    {product.thumbnail ? (
                                        <img
                                            src={product.thumbnail}
                                            alt={product.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <PhotoIcon className="h-8 w-8 text-gray-400" />
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900">
                                        {product.name}
                                    </h1>
                                    <div className="flex items-center space-x-3 mt-2">
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                                                product.is_active
                                                    ? "bg-emerald-100 text-emerald-800"
                                                    : "bg-rose-100 text-rose-800"
                                            }`}
                                        >
                                            {product.is_active ? (
                                                <span className="flex items-center">
                                                    <EyeIcon className="h-4 w-4 mr-1" />
                                                    Đang bán
                                                </span>
                                            ) : (
                                                <span className="flex items-center">
                                                    <XCircleIcon className="h-4 w-4 mr-1" />
                                                    Ngừng bán
                                                </span>
                                            )}
                                        </span>
                                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium flex items-center">
                                            <TagIcon className="h-4 w-4 mr-1" />
                                            {product.sku_base}
                                        </span>
                                        <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium flex items-center">
                                            <CubeIcon className="h-4 w-4 mr-1" />
                                            {product.variants?.length || 0} biến
                                            thể
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex space-x-3">
                            <button
                                onClick={handleDuplicate}
                                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border border-blue-200 rounded-xl hover:from-blue-100 hover:to-indigo-100 transition-all"
                            >
                                <ArrowUpTrayIcon className="h-5 w-5 mr-2" />
                                Tạo bản sao
                            </button>
                            <button
                                onClick={handleDelete}
                                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-rose-50 to-pink-50 text-rose-700 border border-rose-200 rounded-xl hover:from-rose-100 hover:to-pink-100 transition-all"
                            >
                                <TrashIcon className="h-5 w-5 mr-2" />
                                Xóa
                            </button>
                            <Link
                                to={`/admin/products/${id}/edit`}
                                className="inline-flex items-center px-5 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 shadow-lg hover:shadow-xl transition-all"
                            >
                                <PencilIcon className="h-5 w-5 mr-2" />
                                Chỉnh sửa
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <StatCard
                        icon={
                            <CurrencyDollarIcon className="h-6 w-6 text-blue-600" />
                        }
                        label="Giá từ - đến"
                        value={`${formatCurrency(priceRange.min)} - ${formatCurrency(priceRange.max)}`}
                        color="bg-blue-100"
                        subtitle={`${product.variants?.length || 0} biến thể`}
                    />
                    <StatCard
                        icon={
                            <ShoppingBagIcon className="h-6 w-6 text-emerald-600" />
                        }
                        label="Tổng tồn kho"
                        value={totalStock}
                        color="bg-emerald-100"
                        subtitle={`Giá trị: ${formatCurrency(totalValue)}`}
                    />
                    <StatCard
                        icon={
                            <ChartBarIcon className="h-6 w-6 text-amber-600" />
                        }
                        label="Doanh thu"
                        value={formatCurrency(product.total_revenue)}
                        color="bg-amber-100"
                        subtitle={`${product.order_count} đơn hàng`}
                    />
                    <StatCard
                        icon={<StarIcon className="h-6 w-6 text-purple-600" />}
                        label="Đánh giá"
                        value={product.average_rating}
                        color="bg-purple-100"
                        subtitle={`${product.review_count} đánh giá`}
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Tab Navigation */}
                        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                            <div className="border-b border-gray-200">
                                <nav
                                    className="flex space-x-1 px-6"
                                    aria-label="Tabs"
                                >
                                    {[
                                        "overview",
                                        "variants",
                                        "specs",
                                        "media",
                                        "analytics",
                                    ].map((tab) => (
                                        <button
                                            key={tab}
                                            onClick={() => setActiveTab(tab)}
                                            className={`px-4 py-3 text-sm font-medium rounded-lg transition-all ${
                                                activeTab === tab
                                                    ? "bg-blue-100 text-blue-700"
                                                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                                            }`}
                                        >
                                            {tab === "overview" && "Tổng quan"}
                                            {tab === "variants" && "Biến thể"}
                                            {tab === "specs" && "Thông số"}
                                            {tab === "media" && "Hình ảnh"}
                                            {tab === "analytics" && "Phân tích"}
                                        </button>
                                    ))}
                                </nav>
                            </div>

                            <div className="p-6">
                                {/* Overview Tab */}
                                {activeTab === "overview" && (
                                    <div className="space-y-6">
                                        {/* Description */}
                                        <div>
                                            <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
                                                <DocumentTextIcon className="h-5 w-5 mr-2 text-blue-500" />
                                                Mô tả sản phẩm
                                            </h3>
                                            <div className="bg-gradient-to-r from-gray-50 to-white p-6 rounded-xl border border-gray-200">
                                                <div className="prose max-w-none">
                                                    <div
                                                        dangerouslySetInnerHTML={{
                                                            __html: product.description,
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Promotion Info */}
                                        {(product.promotion_info ||
                                            product.gifts ||
                                            product.other_offers) && (
                                            <div>
                                                <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
                                                    <TrophyIcon className="h-5 w-5 mr-2 text-amber-500" />
                                                    Thông tin khuyến mãi
                                                </h3>
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                    {product.promotion_info && (
                                                        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-100 p-4">
                                                            <h4 className="text-sm font-medium text-amber-900 mb-2">
                                                                Khuyến mãi
                                                            </h4>
                                                            <p className="text-amber-700">
                                                                {
                                                                    product.promotion_info
                                                                }
                                                            </p>
                                                        </div>
                                                    )}
                                                    {product.gifts && (
                                                        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-100 p-4">
                                                            <h4 className="text-sm font-medium text-emerald-900 mb-2">
                                                                Quà tặng kèm
                                                            </h4>
                                                            <p className="text-emerald-700">
                                                                {product.gifts}
                                                            </p>
                                                        </div>
                                                    )}
                                                    {product.other_offers && (
                                                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 p-4">
                                                            <h4 className="text-sm font-medium text-blue-900 mb-2">
                                                                Ưu đãi khác
                                                            </h4>
                                                            <p className="text-blue-700">
                                                                {
                                                                    product.other_offers
                                                                }
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        {/* Basic Info Grid */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-5 rounded-xl border border-blue-100">
                                                <h4 className="text-sm font-medium text-blue-900 mb-3">
                                                    Thông tin cơ bản
                                                </h4>
                                                <div className="space-y-3">
                                                    <div>
                                                        <p className="text-xs text-blue-700">
                                                            ID
                                                        </p>
                                                        <p className="text-lg font-bold text-gray-900">
                                                            #{product.id}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-blue-700">
                                                            Slug
                                                        </p>
                                                        <p className="text-sm text-gray-900">
                                                            /{product.slug}
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center space-x-4">
                                                        <div>
                                                            <p className="text-xs text-blue-700">
                                                                Danh mục
                                                            </p>
                                                            <p className="text-sm font-medium text-gray-900 flex items-center">
                                                                <FolderIcon className="h-4 w-4 mr-2 text-blue-500" />
                                                                {
                                                                    product.category_name
                                                                }
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <p className="text-xs text-blue-700">
                                                                Thương hiệu
                                                            </p>
                                                            <p className="text-sm font-medium text-gray-900 flex items-center">
                                                                <BuildingLibraryIcon className="h-4 w-4 mr-2 text-blue-500" />
                                                                {
                                                                    product.brand_name
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-5 rounded-xl border border-emerald-100">
                                                <h4 className="text-sm font-medium text-emerald-900 mb-3">
                                                    Trạng thái
                                                </h4>
                                                <div className="space-y-3">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm text-gray-700">
                                                            Trạng thái bán hàng
                                                        </span>
                                                        <button
                                                            onClick={
                                                                handleToggleStatus
                                                            }
                                                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                                                product.is_active
                                                                    ? "bg-emerald-500"
                                                                    : "bg-gray-300"
                                                            }`}
                                                        >
                                                            <span
                                                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                                                    product.is_active
                                                                        ? "translate-x-6"
                                                                        : "translate-x-1"
                                                                }`}
                                                            />
                                                        </button>
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm text-gray-700">
                                                            Tổng biến thể
                                                        </span>
                                                        <span className="font-medium text-gray-900">
                                                            {product.variants
                                                                ?.length || 0}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm text-gray-700">
                                                            Số hình ảnh
                                                        </span>
                                                        <span className="font-medium text-gray-900">
                                                            {product.images
                                                                ?.length || 0}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Recent Orders */}
                                        {product.recent_orders &&
                                            product.recent_orders.length >
                                                0 && (
                                                <div>
                                                    <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                                                        <ShoppingBagIcon className="h-5 w-5 mr-2 text-emerald-500" />
                                                        Đơn hàng gần đây
                                                    </h3>
                                                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                                                        <div className="divide-y divide-gray-200">
                                                            {product.recent_orders.map(
                                                                (order) => (
                                                                    <div
                                                                        key={
                                                                            order.id
                                                                        }
                                                                        className="p-4 hover:bg-gray-50 transition-colors"
                                                                    >
                                                                        <div className="flex items-center justify-between">
                                                                            <div>
                                                                                <p className="font-medium text-gray-900">
                                                                                    #
                                                                                    {
                                                                                        order.id
                                                                                    }{" "}
                                                                                    -{" "}
                                                                                    {
                                                                                        order.customer
                                                                                    }
                                                                                </p>
                                                                                <p className="text-sm text-gray-500">
                                                                                    {
                                                                                        order.variant
                                                                                    }{" "}
                                                                                    •{" "}
                                                                                    {formatCurrency(
                                                                                        order.price,
                                                                                    )}
                                                                                </p>
                                                                            </div>
                                                                            <div className="flex items-center space-x-4">
                                                                                <span
                                                                                    className={`px-2 py-1 text-xs rounded ${
                                                                                        order.status ===
                                                                                        "completed"
                                                                                            ? "bg-emerald-100 text-emerald-800"
                                                                                            : order.status ===
                                                                                                "processing"
                                                                                              ? "bg-blue-100 text-blue-800"
                                                                                              : order.status ===
                                                                                                  "shipped"
                                                                                                ? "bg-amber-100 text-amber-800"
                                                                                                : "bg-gray-100 text-gray-800"
                                                                                    }`}
                                                                                >
                                                                                    {order.status ===
                                                                                    "completed"
                                                                                        ? "Hoàn thành"
                                                                                        : order.status ===
                                                                                            "processing"
                                                                                          ? "Đang xử lý"
                                                                                          : order.status ===
                                                                                              "shipped"
                                                                                            ? "Đang giao"
                                                                                            : order.status}
                                                                                </span>
                                                                                <span className="text-sm text-gray-500">
                                                                                    {
                                                                                        order.date
                                                                                    }
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                ),
                                                            )}
                                                        </div>
                                                        <div className="p-4 bg-gray-50 border-t border-gray-200">
                                                            <Link
                                                                to="/admin/orders"
                                                                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                                            >
                                                                Xem tất cả đơn
                                                                hàng →
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                        {/* Recent Reviews */}
                                        {product.recent_reviews &&
                                            product.recent_reviews.length >
                                                0 && (
                                                <div>
                                                    <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                                                        <ChatBubbleLeftRightIcon className="h-5 w-5 mr-2 text-purple-500" />
                                                        Đánh giá gần đây
                                                    </h3>
                                                    <div className="space-y-4">
                                                        {product.recent_reviews.map(
                                                            (review) => (
                                                                <div
                                                                    key={
                                                                        review.id
                                                                    }
                                                                    className="bg-white rounded-xl border border-gray-200 p-4"
                                                                >
                                                                    <div className="flex items-center justify-between mb-2">
                                                                        <div className="flex items-center">
                                                                            <div className="font-medium text-gray-900">
                                                                                {
                                                                                    review.customer
                                                                                }
                                                                            </div>
                                                                            <div className="flex items-center ml-4">
                                                                                {[
                                                                                    ...Array(
                                                                                        5,
                                                                                    ),
                                                                                ].map(
                                                                                    (
                                                                                        _,
                                                                                        i,
                                                                                    ) => (
                                                                                        <StarIcon
                                                                                            key={
                                                                                                i
                                                                                            }
                                                                                            className={`h-4 w-4 ${
                                                                                                i <
                                                                                                review.rating
                                                                                                    ? "text-amber-400 fill-amber-400"
                                                                                                    : "text-gray-300"
                                                                                            }`}
                                                                                        />
                                                                                    ),
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                        <span className="text-sm text-gray-500">
                                                                            {
                                                                                review.date
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                    <p className="text-gray-600">
                                                                        {
                                                                            review.comment
                                                                        }
                                                                    </p>
                                                                </div>
                                                            ),
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                    </div>
                                )}

                                {/* Variants Tab */}
                                {activeTab === "variants" && (
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between mb-6">
                                            <div>
                                                <h3 className="text-lg font-medium text-gray-900">
                                                    Quản lý biến thể
                                                </h3>
                                                <p className="text-sm text-gray-500">
                                                    {product.variants?.length ||
                                                        0}{" "}
                                                    biến thể đã được tạo
                                                </p>
                                            </div>
                                            <Link
                                                to={`/admin/products/${id}/edit#variants`}
                                                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600"
                                            >
                                                <PencilIcon className="h-5 w-5 mr-2" />
                                                Chỉnh sửa biến thể
                                            </Link>
                                        </div>

                                        {/* Attributes Summary */}
                                        {product.attributes &&
                                            product.attributes.length > 0 && (
                                                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 p-6 mb-6">
                                                    <h4 className="text-sm font-medium text-blue-900 mb-3">
                                                        Thuộc tính đã chọn
                                                    </h4>
                                                    <div className="flex flex-wrap gap-3">
                                                        {product.attributes.map(
                                                            (attr) => (
                                                                <div
                                                                    key={
                                                                        attr.id
                                                                    }
                                                                    className="bg-white rounded-lg px-4 py-2 border border-blue-200"
                                                                >
                                                                    <div className="font-medium text-blue-700">
                                                                        {
                                                                            attr.name
                                                                        }
                                                                    </div>
                                                                    <div className="text-sm text-gray-600">
                                                                        {attr.values.join(
                                                                            ", ",
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            ),
                                                        )}
                                                    </div>
                                                </div>
                                            )}

                                        {/* Variants Table */}
                                        {product.variants &&
                                        product.variants.length > 0 ? (
                                            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                                                <table className="min-w-full divide-y divide-gray-200">
                                                    <thead className="bg-gray-50">
                                                        <tr>
                                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                Biến thể
                                                            </th>
                                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                SKU
                                                            </th>
                                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                Giá
                                                            </th>
                                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                Giá sale
                                                            </th>
                                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                Tồn kho
                                                            </th>
                                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                Trạng thái
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-200">
                                                        {product.variants.map(
                                                            (variant) => (
                                                                <tr
                                                                    key={
                                                                        variant.id
                                                                    }
                                                                    className={`hover:bg-gray-50 ${selectedVariant === variant.id ? "bg-blue-50" : ""}`}
                                                                    onClick={() =>
                                                                        setSelectedVariant(
                                                                            variant.id,
                                                                        )
                                                                    }
                                                                >
                                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                                        <div className="text-sm font-medium text-gray-900">
                                                                            {
                                                                                variant.name
                                                                            }
                                                                        </div>
                                                                    </td>
                                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                                        <div className="text-sm text-gray-900">
                                                                            {
                                                                                variant.sku
                                                                            }
                                                                        </div>
                                                                    </td>
                                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                                        <div className="text-sm font-bold text-gray-900">
                                                                            {formatCurrency(
                                                                                variant.price,
                                                                            )}
                                                                        </div>
                                                                    </td>
                                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                                        {variant.sale_price ? (
                                                                            <div>
                                                                                <div className="text-sm font-bold text-rose-600">
                                                                                    {formatCurrency(
                                                                                        variant.sale_price,
                                                                                    )}
                                                                                </div>
                                                                                <div className="text-xs text-gray-500">
                                                                                    Giảm{" "}
                                                                                    {Math.round(
                                                                                        (1 -
                                                                                            variant.sale_price /
                                                                                                variant.price) *
                                                                                            100,
                                                                                    )}

                                                                                    %
                                                                                </div>
                                                                            </div>
                                                                        ) : (
                                                                            <span className="text-sm text-gray-400">
                                                                                -
                                                                            </span>
                                                                        )}
                                                                    </td>
                                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                                        <div className="flex items-center">
                                                                            <div
                                                                                className={`w-24 h-2 rounded-full ${variant.stock > 20 ? "bg-emerald-100" : variant.stock > 10 ? "bg-amber-100" : "bg-rose-100"} overflow-hidden`}
                                                                            >
                                                                                <div
                                                                                    className={`h-full ${variant.stock > 20 ? "bg-emerald-500" : variant.stock > 10 ? "bg-amber-500" : "bg-rose-500"}`}
                                                                                    style={{
                                                                                        width: `${Math.min((variant.stock / 50) * 100, 100)}%`,
                                                                                    }}
                                                                                ></div>
                                                                            </div>
                                                                            <span
                                                                                className={`ml-3 text-sm font-medium ${variant.stock > 20 ? "text-emerald-700" : variant.stock > 10 ? "text-amber-700" : "text-rose-700"}`}
                                                                            >
                                                                                {
                                                                                    variant.stock
                                                                                }
                                                                            </span>
                                                                        </div>
                                                                    </td>
                                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                                        {variant.is_active ? (
                                                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                                                                                <CheckCircleIcon className="h-3 w-3 mr-1" />
                                                                                Đang
                                                                                bán
                                                                            </span>
                                                                        ) : (
                                                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                                                Ngừng
                                                                                bán
                                                                            </span>
                                                                        )}
                                                                    </td>
                                                                </tr>
                                                            ),
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        ) : (
                                            <div className="text-center py-12 bg-gray-50 rounded-xl">
                                                <CubeIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                                                <p className="text-gray-500">
                                                    Sản phẩm chưa có biến thể
                                                    nào
                                                </p>
                                                <Link
                                                    to={`/admin/products/${id}/edit#variants`}
                                                    className="inline-flex items-center mt-4 text-blue-600 hover:text-blue-800"
                                                >
                                                    <PlusIcon className="h-5 w-5 mr-2" />
                                                    Thêm biến thể ngay
                                                </Link>
                                            </div>
                                        )}

                                        {/* Inventory Alerts */}
                                        {product.inventory_alerts &&
                                            product.inventory_alerts.length >
                                                0 && (
                                                <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-100 p-6">
                                                    <div className="flex items-center mb-4">
                                                        <ExclamationTriangleIcon className="h-5 w-5 text-amber-600 mr-2" />
                                                        <h4 className="text-lg font-medium text-amber-900">
                                                            Cảnh báo tồn kho
                                                        </h4>
                                                    </div>
                                                    <div className="space-y-3">
                                                        {product.inventory_alerts.map(
                                                            (alert, index) => (
                                                                <div
                                                                    key={index}
                                                                    className="flex items-center justify-between p-3 bg-white rounded-lg border border-amber-200"
                                                                >
                                                                    <div>
                                                                        <p className="font-medium text-gray-900">
                                                                            {
                                                                                alert.variant
                                                                            }
                                                                        </p>
                                                                        <p className="text-sm text-gray-600">
                                                                            Tồn
                                                                            kho
                                                                            hiện
                                                                            tại:{" "}
                                                                            {
                                                                                alert.current_stock
                                                                            }{" "}
                                                                            (tối
                                                                            thiểu:{" "}
                                                                            {
                                                                                alert.min_stock
                                                                            }
                                                                            )
                                                                        </p>
                                                                    </div>
                                                                    <span
                                                                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                                                                            alert.status ===
                                                                            "low"
                                                                                ? "bg-rose-100 text-rose-800"
                                                                                : "bg-amber-100 text-amber-800"
                                                                        }`}
                                                                    >
                                                                        {alert.status ===
                                                                        "low"
                                                                            ? "Sắp hết hàng"
                                                                            : "Cảnh báo"}
                                                                    </span>
                                                                </div>
                                                            ),
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                    </div>
                                )}

                                {/* Specs Tab */}
                                {activeTab === "specs" && (
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between mb-6">
                                            <div>
                                                <h3 className="text-lg font-medium text-gray-900">
                                                    Thông số kỹ thuật
                                                </h3>
                                                <p className="text-sm text-gray-500">
                                                    {product.specs?.reduce(
                                                        (sum, group) =>
                                                            sum +
                                                            group.items.length,
                                                        0,
                                                    ) || 0}{" "}
                                                    thông số
                                                </p>
                                            </div>
                                            <Link
                                                to={`/admin/products/${id}/edit#specs`}
                                                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600"
                                            >
                                                <PencilIcon className="h-5 w-5 mr-2" />
                                                Chỉnh sửa thông số
                                            </Link>
                                        </div>

                                        {product.specs &&
                                        product.specs.length > 0 ? (
                                            <div className="space-y-6">
                                                {product.specs.map(
                                                    (group, groupIndex) => (
                                                        <div
                                                            key={groupIndex}
                                                            className="border border-gray-200 rounded-xl overflow-hidden"
                                                        >
                                                            <div className="bg-gradient-to-r from-gray-50 to-white p-5 border-b border-gray-200">
                                                                <div className="flex items-center">
                                                                    <span className="text-2xl mr-3">
                                                                        {
                                                                            group.icon
                                                                        }
                                                                    </span>
                                                                    <h4 className="text-lg font-medium text-gray-900">
                                                                        {
                                                                            group.group
                                                                        }
                                                                    </h4>
                                                                </div>
                                                            </div>
                                                            <div className="p-5">
                                                                <div className="space-y-4">
                                                                    {group.items.map(
                                                                        (
                                                                            item,
                                                                            itemIndex,
                                                                        ) => (
                                                                            <div
                                                                                key={
                                                                                    itemIndex
                                                                                }
                                                                                className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0"
                                                                            >
                                                                                <div className="flex-1">
                                                                                    <p className="text-sm font-medium text-gray-700">
                                                                                        {
                                                                                            item.name
                                                                                        }
                                                                                    </p>
                                                                                </div>
                                                                                <div className="flex-1 text-right">
                                                                                    <p className="text-sm text-gray-900">
                                                                                        {
                                                                                            item.value
                                                                                        }
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        ),
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ),
                                                )}
                                            </div>
                                        ) : (
                                            <div className="text-center py-12 bg-gray-50 rounded-xl">
                                                <CogIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                                                <p className="text-gray-500">
                                                    Sản phẩm chưa có thông số kỹ
                                                    thuật
                                                </p>
                                                <Link
                                                    to={`/admin/products/${id}/edit#specs`}
                                                    className="inline-flex items-center mt-4 text-blue-600 hover:text-blue-800"
                                                >
                                                    <PlusIcon className="h-5 w-5 mr-2" />
                                                    Thêm thông số ngay
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Media Tab */}
                                {activeTab === "media" && (
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between mb-6">
                                            <div>
                                                <h3 className="text-lg font-medium text-gray-900">
                                                    Hình ảnh sản phẩm
                                                </h3>
                                                <p className="text-sm text-gray-500">
                                                    {product.images?.length ||
                                                        0}{" "}
                                                    hình ảnh đã được tải lên
                                                </p>
                                            </div>
                                            <Link
                                                to={`/admin/products/${id}/edit#images`}
                                                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600"
                                            >
                                                <PencilIcon className="h-5 w-5 mr-2" />
                                                Chỉnh sửa hình ảnh
                                            </Link>
                                        </div>

                                        {product.images &&
                                        product.images.length > 0 ? (
                                            <>
                                                {/* Main Image */}
                                                <div className="mb-6">
                                                    <h4 className="text-sm font-medium text-gray-900 mb-3">
                                                        Ảnh đại diện
                                                    </h4>
                                                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden">
                                                        {product.images.find(
                                                            (img) =>
                                                                img.sort_order ===
                                                                1,
                                                        ) ? (
                                                            <img
                                                                src={
                                                                    product.images.find(
                                                                        (img) =>
                                                                            img.sort_order ===
                                                                            1,
                                                                    ).url
                                                                }
                                                                alt="Ảnh đại diện"
                                                                className="w-full h-96 object-cover"
                                                            />
                                                        ) : (
                                                            <div className="w-full h-96 flex items-center justify-center">
                                                                <PhotoIcon className="h-16 w-16 text-gray-400" />
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Gallery */}
                                                <div>
                                                    <h4 className="text-sm font-medium text-gray-900 mb-3">
                                                        Thư viện ảnh
                                                    </h4>
                                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                                        {product.images
                                                            .sort(
                                                                (a, b) =>
                                                                    a.sort_order -
                                                                    b.sort_order,
                                                            )
                                                            .map(
                                                                (
                                                                    image,
                                                                    index,
                                                                ) => (
                                                                    <div
                                                                        key={
                                                                            image.id
                                                                        }
                                                                        className={`relative rounded-xl overflow-hidden border-2 ${image.sort_order === 1 ? "border-blue-500" : "border-gray-200"}`}
                                                                    >
                                                                        <img
                                                                            src={
                                                                                image.url
                                                                            }
                                                                            alt={`Product ${index + 1}`}
                                                                            className="w-full h-48 object-cover"
                                                                        />
                                                                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                                                                            <div className="flex items-center justify-between">
                                                                                <span className="text-white text-sm font-medium">
                                                                                    Ảnh
                                                                                    #
                                                                                    {
                                                                                        image.sort_order
                                                                                    }
                                                                                </span>
                                                                                {image.sort_order ===
                                                                                    1 && (
                                                                                    <span className="px-2 py-1 bg-blue-500 text-white text-xs rounded">
                                                                                        Chính
                                                                                    </span>
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                ),
                                                            )}
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="text-center py-12 bg-gray-50 rounded-xl">
                                                <PhotoIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                                                <p className="text-gray-500">
                                                    Sản phẩm chưa có hình ảnh
                                                    nào
                                                </p>
                                                <Link
                                                    to={`/admin/products/${id}/edit#images`}
                                                    className="inline-flex items-center mt-4 text-blue-600 hover:text-blue-800"
                                                >
                                                    <PlusIcon className="h-5 w-5 mr-2" />
                                                    Thêm hình ảnh ngay
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Analytics Tab */}
                                {activeTab === "analytics" && (
                                    <div className="space-y-6">
                                        {/* Performance Stats */}
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 p-6">
                                                <h4 className="text-sm font-medium text-blue-900 mb-3">
                                                    Tổng quan hiệu suất
                                                </h4>
                                                <div className="space-y-3">
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-sm text-gray-600">
                                                            Lượt xem
                                                        </span>
                                                        <span className="font-bold text-blue-600">
                                                            {product.view_count}
                                                        </span>
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-sm text-gray-600">
                                                            Tỷ lệ chuyển đổi
                                                        </span>
                                                        <span className="font-bold text-emerald-600">
                                                            {product.order_count >
                                                            0
                                                                ? (
                                                                      (product.order_count /
                                                                          product.view_count) *
                                                                      100
                                                                  ).toFixed(2)
                                                                : 0}
                                                            %
                                                        </span>
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-sm text-gray-600">
                                                            Doanh thu trung bình
                                                        </span>
                                                        <span className="font-bold text-purple-600">
                                                            {formatCurrency(
                                                                product.total_revenue /
                                                                    (product.order_count ||
                                                                        1),
                                                            )}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-100 p-6">
                                                <h4 className="text-sm font-medium text-emerald-900 mb-3">
                                                    Hiệu quả bán hàng
                                                </h4>
                                                <div className="space-y-3">
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-sm text-gray-600">
                                                            Tổng đơn hàng
                                                        </span>
                                                        <span className="font-bold text-emerald-600">
                                                            {
                                                                product.order_count
                                                            }
                                                        </span>
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-sm text-gray-600">
                                                            Số lượng đã bán
                                                        </span>
                                                        <span className="font-bold text-emerald-600">
                                                            {product.variants?.reduce(
                                                                (sum, v) =>
                                                                    sum +
                                                                    (50 -
                                                                        v.stock),
                                                                0,
                                                            ) || 0}
                                                        </span>
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-sm text-gray-600">
                                                            Tỷ lệ hoàn thành
                                                        </span>
                                                        <span className="font-bold text-emerald-600">
                                                            98.5%
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-100 p-6">
                                                <h4 className="text-sm font-medium text-amber-900 mb-3">
                                                    Đánh giá & Phản hồi
                                                </h4>
                                                <div className="space-y-3">
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-sm text-gray-600">
                                                            Điểm đánh giá
                                                        </span>
                                                        <div className="flex items-center">
                                                            <StarIcon className="h-5 w-5 text-amber-400 fill-amber-400 mr-1" />
                                                            <span className="font-bold text-amber-600">
                                                                {
                                                                    product.average_rating
                                                                }
                                                                /5
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-sm text-gray-600">
                                                            Tổng đánh giá
                                                        </span>
                                                        <span className="font-bold text-amber-600">
                                                            {
                                                                product.review_count
                                                            }
                                                        </span>
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-sm text-gray-600">
                                                            Tỷ lệ phản hồi tích
                                                            cực
                                                        </span>
                                                        <span className="font-bold text-emerald-600">
                                                            92%
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Sales Trend Chart (Mock) */}
                                        <div className="bg-white rounded-xl border border-gray-200 p-6">
                                            <h4 className="text-lg font-medium text-gray-900 mb-4">
                                                Xu hướng bán hàng (30 ngày)
                                            </h4>
                                            <div className="h-64 bg-gradient-to-b from-gray-50 to-gray-100 rounded-lg flex items-center justify-center">
                                                <div className="text-center">
                                                    <ChartBarIcon className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                                                    <p className="text-gray-500">
                                                        Biểu đồ sẽ hiển thị tại
                                                        đây
                                                    </p>
                                                    <p className="text-sm text-gray-400 mt-1">
                                                        Dữ liệu bán hàng theo
                                                        thời gian
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Recommendations */}
                                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 p-6">
                                            <div className="flex items-center mb-4">
                                                <SparklesIcon className="h-5 w-5 text-blue-600 mr-2" />
                                                <h4 className="text-lg font-medium text-blue-900">
                                                    Đề xuất tối ưu
                                                </h4>
                                            </div>
                                            <div className="space-y-3">
                                                <div className="flex items-center p-3 bg-white rounded-lg border border-blue-200">
                                                    <InformationCircleIcon className="h-5 w-5 text-blue-500 mr-3" />
                                                    <div>
                                                        <p className="font-medium text-gray-900">
                                                            Cải thiện hình ảnh
                                                            sản phẩm
                                                        </p>
                                                        <p className="text-sm text-gray-600">
                                                            Thêm 2-3 hình ảnh
                                                            góc quay video để
                                                            tăng tỷ lệ chuyển
                                                            đổi
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center p-3 bg-white rounded-lg border border-blue-200">
                                                    <InformationCircleIcon className="h-5 w-5 text-blue-500 mr-3" />
                                                    <div>
                                                        <p className="font-medium text-gray-900">
                                                            Tối ưu mô tả SEO
                                                        </p>
                                                        <p className="text-sm text-gray-600">
                                                            Thêm từ khóa
                                                            "smartphone
                                                            flagship" vào mô tả
                                                            để cải thiện SEO
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center p-3 bg-white rounded-lg border border-blue-200">
                                                    <InformationCircleIcon className="h-5 w-5 text-blue-500 mr-3" />
                                                    <div>
                                                        <p className="font-medium text-gray-900">
                                                            Quản lý tồn kho
                                                        </p>
                                                        <p className="text-sm text-gray-600">
                                                            2 biến thể sắp hết
                                                            hàng, cần nhập thêm
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

                    {/* Right Column - Sidebar */}
                    <div className="space-y-6">
                        {/* Quick Actions */}
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">
                                Thao tác nhanh
                            </h3>
                            <div className="space-y-3">
                                <Link
                                    to={`/admin/products/${id}/edit`}
                                    className="block w-full text-center px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all"
                                >
                                    <PencilIcon className="h-5 w-5 inline mr-2" />
                                    Chỉnh sửa sản phẩm
                                </Link>

                                <button
                                    onClick={handleToggleStatus}
                                    className={`w-full px-4 py-3 rounded-xl text-center font-medium transition-all ${
                                        product.is_active
                                            ? "bg-gradient-to-r from-rose-50 to-pink-50 text-rose-700 border border-rose-200 hover:from-rose-100 hover:to-pink-100"
                                            : "bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 border border-emerald-200 hover:from-emerald-100 hover:to-teal-100"
                                    }`}
                                >
                                    {product.is_active
                                        ? "Ngừng bán"
                                        : "Kích hoạt bán"}
                                </button>

                                <button
                                    onClick={handleDuplicate}
                                    className="w-full px-4 py-3 bg-white text-gray-700 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center justify-center"
                                >
                                    <ArrowUpTrayIcon className="h-5 w-5 mr-2" />
                                    Tạo bản sao
                                </button>

                                <button
                                    onClick={() =>
                                        navigator.clipboard.writeText(
                                            `https://dpshop.vn/products/${product.slug}`,
                                        )
                                    }
                                    className="w-full px-4 py-3 bg-white text-gray-700 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center justify-center"
                                >
                                    <ShareIcon className="h-5 w-5 mr-2" />
                                    Sao chép link
                                </button>
                            </div>
                        </div>

                        {/* Selected Variant Details */}
                        {selectedVariant &&
                            product.variants?.find(
                                (v) => v.id === selectedVariant,
                            ) && (
                                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                                        Chi tiết biến thể
                                    </h3>
                                    {(() => {
                                        const variant = product.variants.find(
                                            (v) => v.id === selectedVariant,
                                        );
                                        if (!variant) return null;

                                        return (
                                            <div className="space-y-4">
                                                <div>
                                                    <p className="text-sm text-gray-500">
                                                        Tên biến thể
                                                    </p>
                                                    <p className="font-medium text-gray-900">
                                                        {variant.name}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-500">
                                                        SKU
                                                    </p>
                                                    <p className="font-medium text-gray-900">
                                                        {variant.sku}
                                                    </p>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <p className="text-sm text-gray-500">
                                                            Giá gốc
                                                        </p>
                                                        <p className="font-bold text-gray-900">
                                                            {formatCurrency(
                                                                variant.price,
                                                            )}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-gray-500">
                                                            Giá sale
                                                        </p>
                                                        {variant.sale_price ? (
                                                            <p className="font-bold text-rose-600">
                                                                {formatCurrency(
                                                                    variant.sale_price,
                                                                )}
                                                            </p>
                                                        ) : (
                                                            <p className="text-gray-400">
                                                                -
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-500">
                                                        Tồn kho
                                                    </p>
                                                    <div className="flex items-center">
                                                        <div className="flex-1">
                                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                                <div
                                                                    className={`h-2 rounded-full ${variant.stock > 20 ? "bg-emerald-500" : variant.stock > 10 ? "bg-amber-500" : "bg-rose-500"}`}
                                                                    style={{
                                                                        width: `${Math.min((variant.stock / 50) * 100, 100)}%`,
                                                                    }}
                                                                ></div>
                                                            </div>
                                                        </div>
                                                        <span
                                                            className={`ml-3 font-medium ${variant.stock > 20 ? "text-emerald-600" : variant.stock > 10 ? "text-amber-600" : "text-rose-600"}`}
                                                        >
                                                            {variant.stock}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-500">
                                                        Trạng thái
                                                    </p>
                                                    {variant.is_active ? (
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                                                            <CheckCircleIcon className="h-3 w-3 mr-1" />
                                                            Đang bán
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                            Ngừng bán
                                                        </span>
                                                    )}
                                                </div>
                                                <Link
                                                    to={`/admin/products/${id}/edit#variants`}
                                                    className="block w-full text-center px-4 py-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg border border-blue-200 transition-colors"
                                                >
                                                    Chỉnh sửa biến thể này
                                                </Link>
                                            </div>
                                        );
                                    })()}
                                </div>
                            )}

                        {/* Category & Brand Info */}
                        <div className="bg-white rounded-2xl border border-gray-200 p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">
                                Phân loại
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-center p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                                    <FolderIcon className="h-5 w-5 text-blue-500 mr-3" />
                                    <div>
                                        <p className="text-sm text-blue-700">
                                            Danh mục
                                        </p>
                                        <p className="font-medium text-gray-900">
                                            {product.category_name}
                                        </p>
                                    </div>
                                    <Link
                                        to={`/admin/categories/${product.category_id}`}
                                        className="ml-auto text-blue-600 hover:text-blue-800"
                                    >
                                        <ArrowRightIcon className="h-5 w-5" />
                                    </Link>
                                </div>
                                <div className="flex items-center p-3 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl">
                                    <BuildingLibraryIcon className="h-5 w-5 text-emerald-500 mr-3" />
                                    <div>
                                        <p className="text-sm text-emerald-700">
                                            Thương hiệu
                                        </p>
                                        <p className="font-medium text-gray-900">
                                            {product.brand_name}
                                        </p>
                                    </div>
                                    <Link
                                        to={`/admin/brands/${product.brand_id}`}
                                        className="ml-auto text-emerald-600 hover:text-emerald-800"
                                    >
                                        <ArrowRightIcon className="h-5 w-5" />
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* System Info */}
                        <div className="bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-200 p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">
                                Thông tin hệ thống
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <CalendarIcon className="h-5 w-5 text-gray-400 mr-3" />
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Ngày tạo
                                        </p>
                                        <p className="font-medium text-gray-900">
                                            {formatDate(product.created_at)}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <UserIcon className="h-5 w-5 text-gray-400 mr-3" />
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Người tạo
                                        </p>
                                        <p className="font-medium text-gray-900">
                                            {product.created_by}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <ArrowPathIcon className="h-5 w-5 text-gray-400 mr-3" />
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Cập nhật lần cuối
                                        </p>
                                        <p className="font-medium text-gray-900">
                                            {formatDate(product.updated_at)}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <ClockIcon className="h-5 w-5 text-gray-400 mr-3" />
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Thời gian tồn tại
                                        </p>
                                        <p className="font-medium text-gray-900">
                                            5 ngày
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Customer Preview */}
                        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100 p-6">
                            <div className="flex items-center mb-3">
                                <EyeIcon className="h-5 w-5 text-emerald-600 mr-2" />
                                <h3 className="text-lg font-medium text-emerald-900">
                                    Xem trước khách hàng
                                </h3>
                            </div>
                            <p className="text-sm text-emerald-700 mb-4">
                                Sản phẩm sẽ hiển thị như thế này đối với khách
                                hàng
                            </p>
                            <a
                                href={`https://dpshop.vn/products/${product.slug}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center w-full px-4 py-3 bg-white text-emerald-700 border border-emerald-200 rounded-xl hover:bg-emerald-50 hover:border-emerald-300 transition-all"
                            >
                                <EyeIcon className="h-5 w-5 mr-2" />
                                Xem trang sản phẩm
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
