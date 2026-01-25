// pages/admin/products/ProductList.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    PencilIcon,
    TrashIcon,
    EyeIcon,
    PlusIcon,
    MagnifyingGlassIcon,
    FunnelIcon,
    TagIcon,
    BuildingLibraryIcon,
    FolderIcon,
    CheckCircleIcon,
    XCircleIcon,
    ArrowPathIcon,
    CurrencyDollarIcon,
    CubeIcon,
    ChartBarIcon,
    AdjustmentsHorizontalIcon,
} from "@heroicons/react/24/outline";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [viewMode, setViewMode] = useState("grid");
    const [categories] = useState([
        { id: 1, name: "Điện Thoại" },
        { id: 2, name: "Laptop" },
        { id: 3, name: "Tablet" },
        { id: 4, name: "Phụ Kiện" },
    ]);
    const [brands] = useState([
        { id: 1, name: "Apple" },
        { id: 2, name: "Samsung" },
        { id: 3, name: "Xiaomi" },
        { id: 4, name: "Sony" },
    ]);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [selectedBrand, setSelectedBrand] = useState("all");
    const [priceRange, setPriceRange] = useState({ min: "", max: "" });
    const [statusFilter, setStatusFilter] = useState("all");

    // Mock data với cấu trúc từ database
    useEffect(() => {
        setTimeout(() => {
            setProducts([
                {
                    id: 1,
                    sku_base: "IPHONE14PRO",
                    name: "iPhone 14 Pro Max",
                    slug: "iphone-14-pro-max",
                    description:
                        "iPhone 14 Pro Max với chip A16 Bionic, camera 48MP và màn hình Dynamic Island",
                    thumbnail:
                        "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=300&h=300&fit=crop",
                    is_active: true,
                    brand_id: 1,
                    brand_name: "Apple",
                    category_id: 1,
                    category_name: "Điện Thoại",
                    price: 29990000,
                    sale_price: 27990000,
                    stock_quantity: 45,
                    variant_count: 3,
                    created_at: "2024-01-15T10:30:00Z",
                    updated_at: "2024-01-20T14:20:00Z",
                    promotion_info: "Giảm 2 triệu, tặng tai nghe",
                    free_gifts: "Tai nghe AirPods",
                    other_offers: "Bảo hành 2 năm",
                    images_count: 5,
                    specs_count: 8,
                },
                {
                    id: 2,
                    sku_base: "SAMSS23ULTRA",
                    name: "Samsung Galaxy S23 Ultra",
                    slug: "samsung-galaxy-s23-ultra",
                    description:
                        "Điện thoại flagship với camera 200MP, bút S-Pen và chip Snapdragon 8 Gen 2",
                    thumbnail:
                        "https://images.unsplash.com/photo-1678950668498-5d018903135f?w=300&h=300&fit=crop",
                    is_active: true,
                    brand_id: 2,
                    brand_name: "Samsung",
                    category_id: 1,
                    category_name: "Điện Thoại",
                    price: 26990000,
                    sale_price: 24990000,
                    stock_quantity: 32,
                    variant_count: 4,
                    created_at: "2024-01-10T14:20:00Z",
                    updated_at: "2024-01-18T09:15:00Z",
                    promotion_info: "Trả góp 0%",
                    free_gifts: "Ốp lưng chính hãng",
                    other_offers: "Thu cũ đổi mới",
                    images_count: 6,
                    specs_count: 10,
                },
                {
                    id: 3,
                    sku_base: "MACBOOKPRO14",
                    name: "MacBook Pro 14 inch",
                    slug: "macbook-pro-14-inch",
                    description:
                        "MacBook Pro với chip M2 Pro, màn hình Liquid Retina XDR và thời lượng pin lên đến 18 giờ",
                    thumbnail:
                        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=300&fit=crop",
                    is_active: true,
                    brand_id: 1,
                    brand_name: "Apple",
                    category_id: 2,
                    category_name: "Laptop",
                    price: 42990000,
                    sale_price: 40990000,
                    stock_quantity: 18,
                    variant_count: 2,
                    created_at: "2024-01-05T09:15:00Z",
                    updated_at: "2024-01-12T11:45:00Z",
                    promotion_info: "Giảm 3 triệu",
                    free_gifts: "Balo Apple",
                    other_offers: "Miễn phí cài đặt",
                    images_count: 7,
                    specs_count: 12,
                },
                {
                    id: 4,
                    sku_base: "XIAOMI13PRO",
                    name: "Xiaomi 13 Pro",
                    slug: "xiaomi-13-pro",
                    description:
                        "Flagship Xiaomi với camera Leica, chip Snapdragon 8 Gen 2 và sạc siêu nhanh 120W",
                    thumbnail:
                        "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=300&h=300&fit=crop",
                    is_active: false,
                    brand_id: 3,
                    brand_name: "Xiaomi",
                    category_id: 1,
                    category_name: "Điện Thoại",
                    price: 18990000,
                    sale_price: null,
                    stock_quantity: 0,
                    variant_count: 1,
                    created_at: "2024-01-02T11:45:00Z",
                    updated_at: "2024-01-02T11:45:00Z",
                    promotion_info: null,
                    free_gifts: null,
                    other_offers: null,
                    images_count: 4,
                    specs_count: 9,
                },
                {
                    id: 5,
                    sku_base: "SONYWH1000XM5",
                    name: "Sony WH-1000XM5",
                    slug: "sony-wh-1000xm5",
                    description:
                        "Tai nghe chống ồn tốt nhất thế giới với công nghệ ANC tiên tiến",
                    thumbnail:
                        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
                    is_active: true,
                    brand_id: 4,
                    brand_name: "Sony",
                    category_id: 4,
                    category_name: "Phụ Kiện",
                    price: 7990000,
                    sale_price: 6990000,
                    stock_quantity: 67,
                    variant_count: 1,
                    created_at: "2024-01-01T08:30:00Z",
                    updated_at: "2024-01-10T16:20:00Z",
                    promotion_info: "Giảm 1 triệu",
                    free_gifts: "Hộp đựng cao cấp",
                    other_offers: "Bảo hành 3 năm",
                    images_count: 5,
                    specs_count: 6,
                },
                {
                    id: 6,
                    sku_base: "IPADPRO11",
                    name: "iPad Pro 11 inch",
                    slug: "ipad-pro-11-inch",
                    description:
                        "iPad Pro với chip M2, màn hình Liquid Retina và hỗ trợ Apple Pencil 2",
                    thumbnail:
                        "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&h=300&fit=crop",
                    is_active: true,
                    brand_id: 1,
                    brand_name: "Apple",
                    category_id: 3,
                    category_name: "Tablet",
                    price: 22990000,
                    sale_price: 20990000,
                    stock_quantity: 25,
                    variant_count: 2,
                    created_at: "2023-12-28T16:20:00Z",
                    updated_at: "2024-01-05T14:30:00Z",
                    promotion_info: "Tặng bàn phím Magic Keyboard",
                    free_gifts: "Apple Pencil 2",
                    other_offers: "Trả góp 0%",
                    images_count: 6,
                    specs_count: 11,
                },
            ]);
            setLoading(false);
        }, 800);
    }, []);

    const handleDelete = (id) => {
        if (window.confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
            setProducts(products.filter((product) => product.id !== id));
        }
    };

    const handleToggleStatus = (id) => {
        setProducts(
            products.map((product) =>
                product.id === id
                    ? { ...product, is_active: !product.is_active }
                    : product,
            ),
        );
    };

    const toggleSelectProduct = (id) => {
        setSelectedProducts((prev) =>
            prev.includes(id)
                ? prev.filter((productId) => productId !== id)
                : [...prev, id],
        );
    };

    const handleBulkAction = (action) => {
        if (selectedProducts.length === 0) {
            alert("Vui lòng chọn ít nhất một sản phẩm");
            return;
        }

        switch (action) {
            case "activate":
                setProducts(
                    products.map((product) =>
                        selectedProducts.includes(product.id)
                            ? { ...product, is_active: true }
                            : product,
                    ),
                );
                break;
            case "deactivate":
                setProducts(
                    products.map((product) =>
                        selectedProducts.includes(product.id)
                            ? { ...product, is_active: false }
                            : product,
                    ),
                );
                break;
            case "delete":
                if (
                    window.confirm(`Xóa ${selectedProducts.length} sản phẩm?`)
                ) {
                    setProducts(
                        products.filter(
                            (product) => !selectedProducts.includes(product.id),
                        ),
                    );
                    setSelectedProducts([]);
                }
                break;
        }
    };

    const filteredProducts = products.filter((product) => {
        // Search filter
        const searchMatch =
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.sku_base.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description
                .toLowerCase()
                .includes(searchTerm.toLowerCase());

        // Category filter
        const categoryMatch =
            selectedCategory === "all" ||
            product.category_id.toString() === selectedCategory;

        // Brand filter
        const brandMatch =
            selectedBrand === "all" ||
            product.brand_id.toString() === selectedBrand;

        // Price filter
        let priceMatch = true;
        if (priceRange.min) {
            const minPrice = parseFloat(priceRange.min) * 1000000;
            priceMatch = priceMatch && product.price >= minPrice;
        }
        if (priceRange.max) {
            const maxPrice = parseFloat(priceRange.max) * 1000000;
            priceMatch = priceMatch && product.price <= maxPrice;
        }

        // Status filter
        const statusMatch =
            statusFilter === "all" ||
            (statusFilter === "active" && product.is_active) ||
            (statusFilter === "inactive" && !product.is_active) ||
            (statusFilter === "out_of_stock" && product.stock_quantity === 0) ||
            (statusFilter === "in_stock" && product.stock_quantity > 0);

        return (
            searchMatch &&
            categoryMatch &&
            brandMatch &&
            priceMatch &&
            statusMatch
        );
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
        });
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
        const totalProducts = products.length;
        const activeProducts = products.filter((p) => p.is_active).length;
        const outOfStock = products.filter(
            (p) => p.stock_quantity === 0,
        ).length;
        const totalValue = products.reduce(
            (sum, p) => sum + p.price * p.stock_quantity,
            0,
        );

        return {
            totalProducts,
            activeProducts,
            outOfStock,
            totalValue: formatCurrency(totalValue),
        };
    };

    const stats = calculateStats();

    return (
        <div className="p-6">
            {/* Header with Stats */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Quản Lý Sản Phẩm
                        </h1>
                        <p className="text-gray-600 mt-2">
                            Quản lý danh sách sản phẩm và biến thể trong cửa
                            hàng
                        </p>
                    </div>
                    <div className="flex space-x-3">
                        <Link
                            to="/admin/products/import"
                            className="inline-flex items-center px-5 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl hover:from-emerald-600 hover:to-teal-600 shadow-lg hover:shadow-xl transition-all"
                        >
                            <CubeIcon className="h-5 w-5 mr-2" />
                            Import
                        </Link>
                        <Link
                            to="/admin/products/new"
                            className="inline-flex items-center px-5 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
                        >
                            <PlusIcon className="h-5 w-5 mr-2" />
                            Thêm Sản Phẩm Mới
                        </Link>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <StatsCard
                        title="Tổng Sản Phẩm"
                        value={stats.totalProducts}
                        icon="📦"
                        color="bg-gradient-to-r from-blue-400 to-cyan-400"
                        subtitle={`${products.reduce((sum, p) => sum + p.variant_count, 0)} biến thể`}
                    />
                    <StatsCard
                        title="Đang Bán"
                        value={stats.activeProducts}
                        icon="✅"
                        color="bg-gradient-to-r from-emerald-400 to-teal-400"
                        subtitle={`${products.filter((p) => p.is_active && p.stock_quantity > 0).length} có hàng`}
                    />
                    <StatsCard
                        title="Hết Hàng"
                        value={stats.outOfStock}
                        icon="⚠️"
                        color="bg-gradient-to-r from-amber-400 to-orange-400"
                        subtitle="Cần nhập thêm"
                    />
                    <StatsCard
                        title="Tổng Giá Trị"
                        value={stats.totalValue}
                        icon="💰"
                        color="bg-gradient-to-r from-purple-400 to-pink-400"
                        subtitle="Giá trị tồn kho"
                    />
                </div>
            </div>

            {/* Search and Filters */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 mb-6 border border-blue-100">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-4">
                    {/* Search */}
                    <div className="lg:col-span-2">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <MagnifyingGlassIcon className="h-5 w-5 text-blue-500" />
                            </div>
                            <input
                                type="text"
                                placeholder="Tìm kiếm sản phẩm theo tên, SKU, mô tả..."
                                className="w-full pl-12 pr-4 py-3 bg-white rounded-xl border border-blue-200 focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Category Filter */}
                    <div>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <FolderIcon className="h-5 w-5 text-blue-500" />
                            </div>
                            <select
                                value={selectedCategory}
                                onChange={(e) =>
                                    setSelectedCategory(e.target.value)
                                }
                                className="w-full pl-12 pr-4 py-3 bg-white rounded-xl border border-blue-200 focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                            >
                                <option value="all">Tất cả danh mục</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Brand Filter */}
                    <div>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <BuildingLibraryIcon className="h-5 w-5 text-blue-500" />
                            </div>
                            <select
                                value={selectedBrand}
                                onChange={(e) =>
                                    setSelectedBrand(e.target.value)
                                }
                                className="w-full pl-12 pr-4 py-3 bg-white rounded-xl border border-blue-200 focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                            >
                                <option value="all">Tất cả thương hiệu</option>
                                {brands.map((brand) => (
                                    <option key={brand.id} value={brand.id}>
                                        {brand.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Status Filter */}
                    <div>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <AdjustmentsHorizontalIcon className="h-5 w-5 text-blue-500" />
                            </div>
                            <select
                                value={statusFilter}
                                onChange={(e) =>
                                    setStatusFilter(e.target.value)
                                }
                                className="w-full pl-12 pr-4 py-3 bg-white rounded-xl border border-blue-200 focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                            >
                                <option value="all">Tất cả trạng thái</option>
                                <option value="active">Đang hoạt động</option>
                                <option value="inactive">
                                    Ngừng hoạt động
                                </option>
                                <option value="in_stock">Còn hàng</option>
                                <option value="out_of_stock">Hết hàng</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Price Range and Actions */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                    {/* Price Range */}
                    <div className="lg:col-span-2 grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Giá từ (triệu)
                            </label>
                            <input
                                type="number"
                                placeholder="Min"
                                className="w-full px-4 py-2 bg-white rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                                value={priceRange.min}
                                onChange={(e) =>
                                    setPriceRange({
                                        ...priceRange,
                                        min: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Đến (triệu)
                            </label>
                            <input
                                type="number"
                                placeholder="Max"
                                className="w-full px-4 py-2 bg-white rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                                value={priceRange.max}
                                onChange={(e) =>
                                    setPriceRange({
                                        ...priceRange,
                                        max: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>

                    {/* View Mode Toggle */}
                    <div className="flex space-x-2">
                        <button
                            onClick={() => setViewMode("grid")}
                            className={`flex-1 px-4 py-2 rounded-xl border transition-all ${
                                viewMode === "grid"
                                    ? "bg-white border-blue-400 text-blue-600 shadow-sm"
                                    : "bg-gray-100 border-gray-200 text-gray-600 hover:bg-gray-200"
                            }`}
                        >
                            Grid View
                        </button>
                        <button
                            onClick={() => setViewMode("list")}
                            className={`flex-1 px-4 py-2 rounded-xl border transition-all ${
                                viewMode === "list"
                                    ? "bg-white border-blue-400 text-blue-600 shadow-sm"
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
                            className="w-full px-4 py-3 bg-white rounded-xl border border-blue-200 focus:ring-2 focus:ring-blue-300 focus:border-transparent"
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
                        <div className="w-20 h-20 border-4 border-blue-200 rounded-full"></div>
                        <div className="absolute top-0 left-0 w-20 h-20 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
                    </div>
                    <p className="mt-6 text-lg text-gray-600">
                        Đang tải sản phẩm...
                    </p>
                    <p className="text-sm text-gray-400">
                        Vui lòng đợi trong giây lát
                    </p>
                </div>
            ) : (
                <>
                    {/* Grid View */}
                    {viewMode === "grid" ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredProducts.map((product) => (
                                <div
                                    key={product.id}
                                    className={`bg-white rounded-2xl overflow-hidden border-2 transition-all hover:shadow-xl hover:-translate-y-1 ${
                                        selectedProducts.includes(product.id)
                                            ? "border-blue-400 ring-2 ring-blue-100"
                                            : "border-gray-100 hover:border-blue-200"
                                    }`}
                                >
                                    <div className="relative">
                                        {/* Thumbnail */}
                                        <div className="h-48 relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                                            <img
                                                src={product.thumbnail}
                                                alt={product.name}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>

                                            {/* Selection Checkbox */}
                                            <div className="absolute top-4 left-4">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedProducts.includes(
                                                        product.id,
                                                    )}
                                                    onChange={() =>
                                                        toggleSelectProduct(
                                                            product.id,
                                                        )
                                                    }
                                                    className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                                />
                                            </div>

                                            {/* Status Badge */}
                                            <div className="absolute top-4 right-4">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                        product.is_active
                                                            ? product.stock_quantity >
                                                              0
                                                                ? "bg-emerald-100 text-emerald-800"
                                                                : "bg-amber-100 text-amber-800"
                                                            : "bg-rose-100 text-rose-800"
                                                    }`}
                                                >
                                                    {product.is_active
                                                        ? product.stock_quantity >
                                                          0
                                                            ? "Đang bán"
                                                            : "Hết hàng"
                                                        : "Ngừng bán"}
                                                </span>
                                            </div>

                                            {/* Promotion Badge */}
                                            {product.promotion_info && (
                                                <div className="absolute bottom-4 left-4">
                                                    <span className="px-3 py-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full text-xs font-semibold">
                                                        Khuyến mãi
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="p-5">
                                            {/* SKU and Category */}
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                                                    {product.sku_base}
                                                </span>
                                                <div className="flex items-center text-xs text-gray-500">
                                                    <FolderIcon className="h-3 w-3 mr-1" />
                                                    {product.category_name}
                                                </div>
                                            </div>

                                            {/* Product Name */}
                                            <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                                                {product.name}
                                            </h3>

                                            {/* Brand */}
                                            <div className="flex items-center text-sm text-gray-600 mb-3">
                                                <BuildingLibraryIcon className="h-4 w-4 mr-2" />
                                                {product.brand_name}
                                            </div>

                                            {/* Price */}
                                            <div className="mb-4">
                                                <div className="flex items-center space-x-2">
                                                    {product.sale_price ? (
                                                        <>
                                                            <span className="text-xl font-bold text-rose-600">
                                                                {formatCurrency(
                                                                    product.sale_price,
                                                                )}
                                                            </span>
                                                            <span className="text-lg text-gray-400 line-through">
                                                                {formatCurrency(
                                                                    product.price,
                                                                )}
                                                            </span>
                                                            <span className="text-sm font-medium bg-rose-100 text-rose-800 px-2 py-1 rounded">
                                                                -
                                                                {Math.round(
                                                                    (1 -
                                                                        product.sale_price /
                                                                            product.price) *
                                                                        100,
                                                                )}
                                                                %
                                                            </span>
                                                        </>
                                                    ) : (
                                                        <span className="text-xl font-bold text-gray-900">
                                                            {formatCurrency(
                                                                product.price,
                                                            )}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Stats */}
                                            <div className="grid grid-cols-3 gap-2 mb-4">
                                                <div className="bg-gray-50 rounded-lg p-2 text-center">
                                                    <p className="text-xs text-gray-600">
                                                        Tồn kho
                                                    </p>
                                                    <p
                                                        className={`text-sm font-bold ${product.stock_quantity > 0 ? "text-emerald-600" : "text-rose-600"}`}
                                                    >
                                                        {product.stock_quantity}
                                                    </p>
                                                </div>
                                                <div className="bg-gray-50 rounded-lg p-2 text-center">
                                                    <p className="text-xs text-gray-600">
                                                        Biến thể
                                                    </p>
                                                    <p className="text-sm font-bold text-blue-600">
                                                        {product.variant_count}
                                                    </p>
                                                </div>
                                                <div className="bg-gray-50 rounded-lg p-2 text-center">
                                                    <p className="text-xs text-gray-600">
                                                        Hình ảnh
                                                    </p>
                                                    <p className="text-sm font-bold text-purple-600">
                                                        {product.images_count}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Actions */}
                                            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                                <div className="flex space-x-2">
                                                    <Link
                                                        to={`/admin/products/${product.id}`}
                                                        className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                        title="Xem chi tiết"
                                                    >
                                                        <EyeIcon className="h-5 w-5" />
                                                    </Link>
                                                    <Link
                                                        to={`/admin/products/${product.id}/edit`}
                                                        className="p-2 text-gray-600 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                                                        title="Chỉnh sửa"
                                                    >
                                                        <PencilIcon className="h-5 w-5" />
                                                    </Link>
                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                product.id,
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
                                                            product.id,
                                                        )
                                                    }
                                                    className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                                                        product.is_active
                                                            ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                                    }`}
                                                >
                                                    {product.is_active
                                                        ? "Ngừng bán"
                                                        : "Kích hoạt"}
                                                </button>
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
                                    <thead className="bg-gradient-to-r from-blue-50 to-indigo-50">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">
                                                <input
                                                    type="checkbox"
                                                    className="h-4 w-4 rounded border-gray-300 text-blue-600"
                                                />
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">
                                                SẢN PHẨM
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">
                                                DANH MỤC
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">
                                                GIÁ
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">
                                                TỒN KHO
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">
                                                TRẠNG THÁI
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">
                                                THAO TÁC
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {filteredProducts.map((product) => (
                                            <tr
                                                key={product.id}
                                                className="hover:bg-blue-50/50 transition-colors"
                                            >
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedProducts.includes(
                                                            product.id,
                                                        )}
                                                        onChange={() =>
                                                            toggleSelectProduct(
                                                                product.id,
                                                            )
                                                        }
                                                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                                    />
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center">
                                                        <div className="h-12 w-12 rounded-lg overflow-hidden mr-3">
                                                            <img
                                                                src={
                                                                    product.thumbnail
                                                                }
                                                                alt={
                                                                    product.name
                                                                }
                                                                className="h-full w-full object-cover"
                                                            />
                                                        </div>
                                                        <div>
                                                            <div className="font-medium text-gray-900">
                                                                {product.name}
                                                            </div>
                                                            <div className="text-sm text-gray-500">
                                                                SKU:{" "}
                                                                {
                                                                    product.sku_base
                                                                }
                                                            </div>
                                                            <div className="text-xs text-gray-400 flex items-center">
                                                                <BuildingLibraryIcon className="h-3 w-3 mr-1" />
                                                                {
                                                                    product.brand_name
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center text-gray-600">
                                                        <FolderIcon className="h-4 w-4 mr-2" />
                                                        {product.category_name}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div>
                                                        {product.sale_price ? (
                                                            <div>
                                                                <div className="font-bold text-rose-600">
                                                                    {formatCurrency(
                                                                        product.sale_price,
                                                                    )}
                                                                </div>
                                                                <div className="text-sm text-gray-400 line-through">
                                                                    {formatCurrency(
                                                                        product.price,
                                                                    )}
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div className="font-bold text-gray-900">
                                                                {formatCurrency(
                                                                    product.price,
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div
                                                        className={`flex items-center ${product.stock_quantity > 0 ? "text-emerald-600" : "text-rose-600"}`}
                                                    >
                                                        <CubeIcon className="h-5 w-5 mr-2" />
                                                        <span className="font-medium">
                                                            {
                                                                product.stock_quantity
                                                            }
                                                        </span>
                                                        <span className="text-xs ml-2 text-gray-500">
                                                            (
                                                            {
                                                                product.variant_count
                                                            }{" "}
                                                            biến thể)
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div
                                                            className={`flex items-center ${product.is_active ? "text-emerald-600" : "text-rose-600"}`}
                                                        >
                                                            {product.is_active ? (
                                                                <>
                                                                    <CheckCircleIcon className="h-5 w-5 mr-2" />
                                                                    <span className="font-medium">
                                                                        {product.stock_quantity >
                                                                        0
                                                                            ? "Đang bán"
                                                                            : "Hết hàng"}
                                                                    </span>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <XCircleIcon className="h-5 w-5 mr-2" />
                                                                    <span className="font-medium">
                                                                        Ngừng
                                                                        bán
                                                                    </span>
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center space-x-3">
                                                        <Link
                                                            to={`/admin/products/${product.id}`}
                                                            className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-100 rounded-lg transition-colors"
                                                            title="Xem chi tiết"
                                                        >
                                                            <EyeIcon className="h-5 w-5" />
                                                        </Link>
                                                        <Link
                                                            to={`/admin/products/${product.id}/edit`}
                                                            className="text-amber-600 hover:text-amber-800 p-2 hover:bg-amber-100 rounded-lg transition-colors"
                                                            title="Chỉnh sửa"
                                                        >
                                                            <PencilIcon className="h-5 w-5" />
                                                        </Link>
                                                        <button
                                                            onClick={() =>
                                                                handleToggleStatus(
                                                                    product.id,
                                                                )
                                                            }
                                                            className="text-emerald-600 hover:text-emerald-800 p-2 hover:bg-emerald-100 rounded-lg transition-colors"
                                                            title={
                                                                product.is_active
                                                                    ? "Ngừng bán"
                                                                    : "Kích hoạt"
                                                            }
                                                        >
                                                            <ArrowPathIcon className="h-5 w-5" />
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                handleDelete(
                                                                    product.id,
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
                    {filteredProducts.length === 0 && (
                        <div className="text-center py-16">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl mb-6">
                                <CubeIcon className="h-10 w-10 text-blue-500" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                Không tìm thấy sản phẩm
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Thử thay đổi bộ lọc hoặc tạo sản phẩm mới
                            </p>
                            <Link
                                to="/admin/products/new"
                                className="inline-flex items-center px-5 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 shadow-lg hover:shadow-xl transition-all"
                            >
                                <PlusIcon className="h-5 w-5 mr-2" />
                                Tạo Sản Phẩm Đầu Tiên
                            </Link>
                        </div>
                    )}
                </>
            )}

            {/* Floating Action Button */}
            <Link
                to="/admin/products/new"
                className="fixed bottom-8 right-8 inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all z-50"
            >
                <PlusIcon className="h-6 w-6" />
            </Link>
        </div>
    );
};

export default ProductList;
