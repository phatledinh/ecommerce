// pages/admin/categories/CategoryDetail.jsx
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import CategoryAttributes from "./CategoryAttributes";
import {
    ArrowLeftIcon,
    ArrowRightIcon,
    PencilIcon,
    TrashIcon,
    LinkIcon,
    PhotoIcon,
    CheckCircleIcon,
    XCircleIcon,
    DocumentTextIcon,
    UserIcon,
    CalendarIcon,
    ChartBarIcon,
    ShoppingBagIcon,
    SparklesIcon,
    ArrowPathIcon,
    ShareIcon,
    EyeIcon,
    EyeSlashIcon,
    PlusIcon,
    CubeIcon,
} from "@heroicons/react/24/outline";

const CategoryDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("overview");

    useEffect(() => {
        const fetchCategory = async () => {
            setLoading(true);
            setTimeout(() => {
                setCategory({
                    id: 1,
                    name: "Điện Thoại & Máy Tính Bảng",
                    slug: "dien-thoai-may-tinh-bang",
                    parent_id: null,
                    parent_name: null,
                    description:
                        "Danh mục điện thoại và máy tính bảng các loại, từ phổ thông đến cao cấp. Cập nhật liên tục các sản phẩm mới nhất từ các thương hiệu hàng đầu.",
                    thumbnail:
                        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=400&fit=crop",
                    is_active: true,
                    level: 1,
                    product_count: 150,
                    color: "#3B82F6",
                    icon: "📱",
                    created_at: "2024-01-20 10:30:00",
                    updated_at: "2024-01-20 15:45:00",
                    created_by: "Admin",
                    meta_title: "Điện thoại & Máy tính bảng giá tốt - DPShop",
                    meta_description:
                        "Mua điện thoại và máy tính bảng chính hãng giá tốt tại DPShop. Giao hàng nhanh, bảo hành dài hạn.",
                    sort_order: 1,
                    show_in_menu: true,
                    seo_score: 85,
                    view_count: 12500,
                    children: [
                        {
                            id: 3,
                            name: "iPhone",
                            product_count: 50,
                            color: "#000000",
                        },
                        {
                            id: 4,
                            name: "Samsung",
                            product_count: 40,
                            color: "#1428A0",
                        },
                        {
                            id: 5,
                            name: "Xiaomi",
                            product_count: 30,
                            color: "#FF6900",
                        },
                        {
                            id: 6,
                            name: "Oppo",
                            product_count: 20,
                            color: "#0088FF",
                        },
                    ],
                    attributes: [
                        { id: 1, name: "Màu sắc", values_count: 12 },
                        { id: 2, name: "Bộ nhớ", values_count: 6 },
                        { id: 3, name: "Kích thước màn hình", values_count: 8 },
                    ],
                    recent_products: [
                        {
                            id: 101,
                            name: "iPhone 15 Pro Max",
                            price: "29.990.000đ",
                        },
                        {
                            id: 102,
                            name: "Samsung Galaxy S24 Ultra",
                            price: "26.990.000đ",
                        },
                        {
                            id: 103,
                            name: "Xiaomi 14 Pro",
                            price: "18.990.000đ",
                        },
                    ],
                });
                setLoading(false);
            }, 1000);
        };

        fetchCategory();
    }, [id]);

    const handleDelete = () => {
        if (
            window.confirm(
                "Bạn có chắc muốn xóa danh mục này và tất cả danh mục con?",
            )
        ) {
            console.log("Delete category", id);
            navigate("/admin/categories");
        }
    };

    const handleToggleStatus = () => {
        setCategory((prev) => ({
            ...prev,
            is_active: !prev.is_active,
        }));
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
                        Đang tải thông tin danh mục...
                    </p>
                </div>
            </div>
        );
    }

    if (!category) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-blue-50/50 to-gray-50 flex items-center justify-center p-6">
                <div className="text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-rose-100 to-pink-100 rounded-2xl mb-6">
                        <XCircleIcon className="h-10 w-10 text-rose-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Không tìm thấy danh mục
                    </h3>
                    <p className="text-gray-600 mb-6">
                        Danh mục bạn tìm kiếm không tồn tại hoặc đã bị xóa
                    </p>
                    <Link
                        to="/admin/categories"
                        className="inline-flex items-center px-5 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 shadow-lg hover:shadow-xl transition-all"
                    >
                        <ArrowLeftIcon className="h-5 w-5 mr-2" />
                        Quay lại danh sách
                    </Link>
                </div>
            </div>
        );
    }

    const StatCard = ({ icon, label, value, color }) => (
        <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center">
                <div className={`p-3 ${color} rounded-lg`}>{icon}</div>
                <div className="ml-4">
                    <p className="text-sm text-gray-600">{label}</p>
                    <p className="text-xl font-bold text-gray-900">{value}</p>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50/50 to-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <Link
                        to="/admin/categories"
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4 group"
                    >
                        <ArrowLeftIcon className="h-5 w-5 mr-2 transition-transform group-hover:-translate-x-1" />
                        Quay lại danh sách
                    </Link>

                    <div className="flex items-start justify-between">
                        <div>
                            <div className="flex items-center space-x-3 mb-3">
                                <div
                                    className={`p-3 rounded-xl`}
                                    style={{
                                        backgroundColor: category.color + "20",
                                    }}
                                >
                                    <span
                                        className="text-2xl"
                                        style={{ color: category.color }}
                                    >
                                        {category.icon}
                                    </span>
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900">
                                        {category.name}
                                    </h1>
                                    <div className="flex items-center space-x-3 mt-2">
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                                                category.is_active
                                                    ? "bg-emerald-100 text-emerald-800"
                                                    : "bg-rose-100 text-rose-800"
                                            }`}
                                        >
                                            {category.is_active ? (
                                                <span className="flex items-center">
                                                    <EyeIcon className="h-4 w-4 mr-1" />
                                                    Đang hiển thị
                                                </span>
                                            ) : (
                                                <span className="flex items-center">
                                                    <EyeSlashIcon className="h-4 w-4 mr-1" />
                                                    Đang ẩn
                                                </span>
                                            )}
                                        </span>
                                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                                            {category.level === 1
                                                ? "Danh mục cha"
                                                : "Danh mục con"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex space-x-3">
                            <button
                                onClick={handleDelete}
                                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-rose-50 to-pink-50 text-rose-700 border border-rose-200 rounded-xl hover:from-rose-100 hover:to-pink-100 transition-all"
                            >
                                <TrashIcon className="h-5 w-5 mr-2" />
                                Xóa
                            </button>
                            <Link
                                to={`/admin/categories/${id}/edit`}
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
                            <ShoppingBagIcon className="h-6 w-6 text-blue-600" />
                        }
                        label="Tổng sản phẩm"
                        value={category.product_count}
                        color="bg-blue-100"
                    />
                    <StatCard
                        icon={
                            <ChartBarIcon className="h-6 w-6 text-emerald-600" />
                        }
                        label="Lượt xem"
                        value={category.view_count?.toLocaleString() || "0"}
                        color="bg-emerald-100"
                    />
                    <StatCard
                        icon={
                            <SparklesIcon className="h-6 w-6 text-amber-600" />
                        }
                        label="Điểm SEO"
                        value={`${category.seo_score}/100`}
                        color="bg-amber-100"
                    />
                    <StatCard
                        icon={<CubeIcon className="h-6 w-6 text-purple-600" />}
                        label="Thuộc tính"
                        value={category.attributes?.length || 0}
                        color="bg-purple-100"
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
                                        "products",
                                        "attributes",
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
                                            {tab === "products" && "Sản phẩm"}
                                            {tab === "attributes" && (
                                                <span className="flex items-center">
                                                    <CubeIcon className="h-4 w-4 mr-2" />
                                                    Thuộc tính
                                                </span>
                                            )}
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
                                            <h3 className="text-lg font-medium text-gray-900 mb-3">
                                                Mô tả
                                            </h3>
                                            <div className="bg-gradient-to-r from-gray-50 to-white p-6 rounded-xl border border-gray-200">
                                                <p className="text-gray-700 leading-relaxed">
                                                    {category.description}
                                                </p>
                                            </div>
                                        </div>

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
                                                            #{category.id}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-blue-700">
                                                            Slug
                                                        </p>
                                                        <p className="text-sm text-gray-900 flex items-center">
                                                            <LinkIcon className="h-4 w-4 mr-2 text-blue-500" />
                                                            /{category.slug}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-blue-700">
                                                            Thứ tự hiển thị
                                                        </p>
                                                        <p className="text-lg font-bold text-gray-900">
                                                            {
                                                                category.sort_order
                                                            }
                                                        </p>
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
                                                            Hiển thị công khai
                                                        </span>
                                                        <button
                                                            onClick={
                                                                handleToggleStatus
                                                            }
                                                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                                                category.is_active
                                                                    ? "bg-emerald-500"
                                                                    : "bg-gray-300"
                                                            }`}
                                                        >
                                                            <span
                                                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                                                    category.is_active
                                                                        ? "translate-x-6"
                                                                        : "translate-x-1"
                                                                }`}
                                                            />
                                                        </button>
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm text-gray-700">
                                                            Hiển thị trong menu
                                                        </span>
                                                        <span
                                                            className={`px-2 py-1 text-xs rounded ${
                                                                category.show_in_menu
                                                                    ? "bg-emerald-100 text-emerald-800"
                                                                    : "bg-gray-100 text-gray-800"
                                                            }`}
                                                        >
                                                            {category.show_in_menu
                                                                ? "Có"
                                                                : "Không"}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Recent Products */}
                                        {category.recent_products &&
                                            category.recent_products.length >
                                                0 && (
                                                <div>
                                                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                                                        Sản phẩm gần đây
                                                    </h3>
                                                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                                                        <div className="divide-y divide-gray-200">
                                                            {category.recent_products.map(
                                                                (product) => (
                                                                    <div
                                                                        key={
                                                                            product.id
                                                                        }
                                                                        className="p-4 hover:bg-gray-50 transition-colors"
                                                                    >
                                                                        <div className="flex items-center justify-between">
                                                                            <div>
                                                                                <p className="font-medium text-gray-900">
                                                                                    {
                                                                                        product.name
                                                                                    }
                                                                                </p>
                                                                                <p className="text-sm text-gray-500">
                                                                                    ID:
                                                                                    #
                                                                                    {
                                                                                        product.id
                                                                                    }
                                                                                </p>
                                                                            </div>
                                                                            <div className="text-lg font-bold text-blue-600">
                                                                                {
                                                                                    product.price
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                ),
                                                            )}
                                                        </div>
                                                        <div className="p-4 bg-gray-50 border-t border-gray-200">
                                                            <Link
                                                                to="/admin/products"
                                                                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                                            >
                                                                Xem tất cả sản
                                                                phẩm →
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                    </div>
                                )}
                                {/* Products Tab */}
                                {activeTab === "products" && (
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="text-lg font-medium text-gray-900">
                                                    Tất cả sản phẩm
                                                </h3>
                                                <p className="text-sm text-gray-500">
                                                    {category.product_count} sản
                                                    phẩm trong danh mục
                                                </p>
                                            </div>
                                            <Link
                                                to="/admin/products/new"
                                                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600"
                                            >
                                                <PlusIcon className="h-5 w-5 mr-2" />
                                                Thêm sản phẩm
                                            </Link>
                                        </div>
                                        {/* Product list would go here */}
                                    </div>
                                )}
                                {/* Attributes Tab */}
                                {activeTab === "attributes" && (
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="text-lg font-medium text-gray-900">
                                                    Thuộc tính danh mục
                                                </h3>
                                                <p className="text-sm text-gray-500">
                                                    Quản lý các thuộc tính riêng
                                                    cho danh mục này
                                                </p>
                                            </div>
                                        </div>
                                        <CategoryAttributes categoryId={id} />
                                    </div>
                                )}
                                {/* Attributes Tab - Read Only */}
                                {activeTab === "attributes" && (
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="text-lg font-medium text-gray-900">
                                                    Thuộc tính danh mục
                                                </h3>
                                                <p className="text-sm text-gray-500">
                                                    Quản lý các thuộc tính riêng
                                                    cho danh mục này
                                                </p>
                                            </div>
                                            <Link
                                                to={`/admin/categories/${id}/edit#attributes`}
                                                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600"
                                            >
                                                <PencilIcon className="h-5 w-5 mr-2" />
                                                Chỉnh sửa thuộc tính
                                            </Link>
                                        </div>
                                        <CategoryAttributes
                                            attributes={
                                                category.attributes || []
                                            }
                                            readOnly={true}
                                            isCategorySaved={true}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Sidebar */}
                    <div className="space-y-6">
                        {/* Thumbnail */}
                        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                            <div className="p-6">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">
                                    Hình ảnh
                                </h3>
                                <div className="aspect-video rounded-xl overflow-hidden bg-gradient-to-r from-gray-100 to-gray-200 mb-4">
                                    {category.thumbnail ? (
                                        <img
                                            src={category.thumbnail}
                                            alt={category.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <PhotoIcon className="h-12 w-12 text-gray-400" />
                                        </div>
                                    )}
                                </div>
                                <div className="text-center">
                                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                        Thay đổi hình ảnh
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Child Categories */}
                        {category.children && category.children.length > 0 && (
                            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                                <div className="p-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                                        Danh mục con
                                    </h3>
                                    <div className="space-y-3">
                                        {category.children.map((child) => (
                                            <div
                                                key={child.id}
                                                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                            >
                                                <div className="flex items-center">
                                                    <div
                                                        className="w-8 h-8 rounded-lg flex items-center justify-center mr-3"
                                                        style={{
                                                            backgroundColor:
                                                                child.color +
                                                                "20",
                                                        }}
                                                    >
                                                        <span
                                                            style={{
                                                                color: child.color,
                                                            }}
                                                        >
                                                            📱
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-gray-900">
                                                            {child.name}
                                                        </p>
                                                        <p className="text-xs text-gray-500">
                                                            {
                                                                child.product_count
                                                            }{" "}
                                                            sản phẩm
                                                        </p>
                                                    </div>
                                                </div>
                                                <Link
                                                    to={`/admin/categories/${child.id}`}
                                                    className="text-blue-600 hover:text-blue-800 p-1"
                                                >
                                                    <ArrowRightIcon className="h-5 w-5" />
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

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
                                            {category.created_at}
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
                                            {category.created_by}
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
                                            {category.updated_at}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">
                                Thao tác nhanh
                            </h3>
                            <div className="space-y-3">
                                <Link
                                    to={`/admin/products?category=${id}`}
                                    className="block w-full text-center px-4 py-3 bg-white text-blue-700 border border-blue-200 rounded-xl hover:bg-blue-50 hover:border-blue-300 transition-all"
                                >
                                    Xem sản phẩm
                                </Link>
                                <button
                                    onClick={handleToggleStatus}
                                    className={`w-full px-4 py-3 rounded-xl text-center font-medium transition-all ${
                                        category.is_active
                                            ? "bg-gradient-to-r from-rose-50 to-pink-50 text-rose-700 border border-rose-200 hover:from-rose-100 hover:to-pink-100"
                                            : "bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 border border-emerald-200 hover:from-emerald-100 hover:to-teal-100"
                                    }`}
                                >
                                    {category.is_active
                                        ? "Vô hiệu hóa"
                                        : "Kích hoạt"}
                                </button>
                                <button
                                    onClick={() =>
                                        navigator.clipboard.writeText(
                                            `/${category.slug}`,
                                        )
                                    }
                                    className="w-full px-4 py-3 bg-white text-gray-700 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center justify-center"
                                >
                                    <ShareIcon className="h-5 w-5 mr-2" />
                                    Sao chép link
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryDetail;
