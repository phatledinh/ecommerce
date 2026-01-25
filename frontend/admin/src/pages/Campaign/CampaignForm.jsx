// pages/admin/campaigns/CampaignForm.jsx
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
    ArrowLeftIcon,
    CalendarIcon,
    TagIcon,
    CurrencyDollarIcon,
    ShoppingCartIcon,
    EyeIcon,
    ArrowUpTrayIcon,
    CheckCircleIcon,
    XMarkIcon,
    PlusIcon,
    SparklesIcon,
    InformationCircleIcon,
    DocumentDuplicateIcon,
    CogIcon,
    ViewfinderCircleIcon,
    ChartBarIcon,
    ChevronUpIcon,
    ChevronDownIcon,
    TrashIcon,
    MagnifyingGlassIcon,
    FunnelIcon,
    PencilIcon,
} from "@heroicons/react/24/outline";

const CampaignForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = !!id;

    // State cho current step
    const [currentStep, setCurrentStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [saveStatus, setSaveStatus] = useState("draft"); // draft, active

    // State cho Step 1: Campaign Info
    const [campaignInfo, setCampaignInfo] = useState({
        name: "Flash Sale Tết 2026",
        start_time: "25/01/2026 00:00",
        end_time: "30/01/2026 23:59",
        is_active: true, // true = kích hoạt ngay, false = nháp
    });

    // State cho Step 2: Products
    const [allProducts, setAllProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedBrand, setSelectedBrand] = useState("");

    // State cho Step 3: Discount Config
    const [discountConfig, setDiscountConfig] = useState([]);

    // State cho Step 4: Preview
    const [previewData, setPreviewData] = useState({});

    // Mock data
    const [categories] = useState([
        { id: 1, name: "Điện thoại" },
        { id: 2, name: "Laptop" },
        { id: 3, name: "Tablet" },
        { id: 4, name: "Phụ kiện" },
    ]);

    const [brands] = useState([
        { id: 1, name: "Apple" },
        { id: 2, name: "Samsung" },
        { id: 3, name: "Xiaomi" },
        { id: 4, name: "Oppo" },
    ]);

    // Load data
    useEffect(() => {
        if (isEditMode) {
            setLoading(true);
            setTimeout(() => {
                // Mock campaign data
                setCampaignInfo({
                    name: "Flash Sale Tết 2026",
                    start_time: "25/01/2026 00:00",
                    end_time: "30/01/2026 23:59",
                    is_active: true,
                });

                // Mock all products
                const mockProducts = [
                    {
                        id: 1,
                        name: "iPhone 15 Pro",
                        variant: "256GB - Titanium",
                        category: "Điện thoại",
                        brand: "Apple",
                        original_price: 35000000,
                        has_variants: true,
                        variants: [
                            {
                                id: 101,
                                name: "256GB - Titanium",
                                price: 35000000,
                            },
                            {
                                id: 102,
                                name: "512GB - Titanium",
                                price: 38000000,
                            },
                        ],
                    },
                    {
                        id: 2,
                        name: "Samsung Galaxy S24 Ultra",
                        variant: "512GB - Black",
                        category: "Điện thoại",
                        brand: "Samsung",
                        original_price: 32000000,
                        has_variants: true,
                        variants: [
                            { id: 201, name: "256GB - Black", price: 30000000 },
                            { id: 202, name: "512GB - Black", price: 32000000 },
                        ],
                    },
                    {
                        id: 3,
                        name: "MacBook Air M2",
                        variant: "8GB/256GB - Midnight",
                        category: "Laptop",
                        brand: "Apple",
                        original_price: 28000000,
                        has_variants: false,
                        variants: [],
                    },
                    {
                        id: 4,
                        name: "iPad Pro 12.9",
                        variant: "256GB - Silver",
                        category: "Tablet",
                        brand: "Apple",
                        original_price: 25000000,
                        has_variants: false,
                        variants: [],
                    },
                    {
                        id: 5,
                        name: "Xiaomi 14 Pro",
                        variant: "12GB/256GB - Green",
                        category: "Điện thoại",
                        brand: "Xiaomi",
                        original_price: 18000000,
                        has_variants: false,
                        variants: [],
                    },
                ];

                setAllProducts(mockProducts);

                // Mock selected products (in edit mode, some products are already selected)
                setSelectedProducts([
                    {
                        product_id: 1,
                        variant_id: 101,
                        product_name: "iPhone 15 Pro",
                        variant_name: "256GB - Titanium",
                        original_price: 35000000,
                    },
                    {
                        product_id: 1,
                        variant_id: 102,
                        product_name: "iPhone 15 Pro",
                        variant_name: "512GB - Titanium",
                        original_price: 38000000,
                    },
                ]);

                // Mock discount config
                setDiscountConfig([
                    {
                        product_id: 1,
                        variant_id: 101,
                        discount_type: "percent",
                        discount_value: 10,
                        quantity_limit: 50,
                        sold_quantity: 0,
                    },
                    {
                        product_id: 1,
                        variant_id: 102,
                        discount_type: "fixed",
                        discount_value: 2000000,
                        quantity_limit: 30,
                        sold_quantity: 0,
                    },
                ]);

                setLoading(false);
            }, 1000);
        } else {
            // New campaign - load products
            const mockProducts = [
                {
                    id: 1,
                    name: "iPhone 15 Pro",
                    variant: "256GB - Titanium",
                    category: "Điện thoại",
                    brand: "Apple",
                    original_price: 35000000,
                    has_variants: true,
                    variants: [
                        { id: 101, name: "256GB - Titanium", price: 35000000 },
                        { id: 102, name: "512GB - Titanium", price: 38000000 },
                    ],
                },
                {
                    id: 2,
                    name: "Samsung Galaxy S24 Ultra",
                    variant: "512GB - Black",
                    category: "Điện thoại",
                    brand: "Samsung",
                    original_price: 32000000,
                    has_variants: true,
                    variants: [
                        { id: 201, name: "256GB - Black", price: 30000000 },
                        { id: 202, name: "512GB - Black", price: 32000000 },
                    ],
                },
                {
                    id: 3,
                    name: "MacBook Air M2",
                    variant: "8GB/256GB - Midnight",
                    category: "Laptop",
                    brand: "Apple",
                    original_price: 28000000,
                    has_variants: false,
                    variants: [],
                },
            ];
            setAllProducts(mockProducts);
        }
    }, [id, isEditMode]);

    // Khi selected products thay đổi, tạo discount config mới
    useEffect(() => {
        if (selectedProducts.length > 0) {
            const newDiscountConfig = selectedProducts.map((product) => {
                const existingConfig = discountConfig.find(
                    (config) =>
                        config.product_id === product.product_id &&
                        config.variant_id === product.variant_id,
                );

                if (existingConfig) {
                    return existingConfig;
                }

                return {
                    product_id: product.product_id,
                    variant_id: product.variant_id,
                    discount_type: "percent",
                    discount_value: 10,
                    quantity_limit: 50,
                    sold_quantity: 0,
                };
            });

            setDiscountConfig(newDiscountConfig);
        }
    }, [selectedProducts]);

    // Step 1: Campaign Info handlers
    const handleCampaignInfoChange = (field, value) => {
        setCampaignInfo((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    // Step 2: Product selection handlers
    const handleProductSelect = (productId, variantId = null) => {
        const product = allProducts.find((p) => p.id === productId);

        if (product.has_variants && product.variants.length > 0 && !variantId) {
            // Hiển thị modal hoặc dropdown để chọn variant
            // Ở đây tôi sẽ chọn tất cả variants cho đơn giản
            const newSelectedProducts = product.variants.map((variant) => ({
                product_id: product.id,
                variant_id: variant.id,
                product_name: product.name,
                variant_name: variant.name,
                original_price: variant.price,
            }));

            setSelectedProducts((prev) => [...prev, ...newSelectedProducts]);
        } else {
            const productToAdd = {
                product_id: product.id,
                variant_id: variantId,
                product_name: product.name,
                variant_name: variantId
                    ? product.variants.find((v) => v.id === variantId)?.name
                    : product.variant,
                original_price: variantId
                    ? product.variants.find((v) => v.id === variantId)?.price
                    : product.original_price,
            };

            setSelectedProducts((prev) => [...prev, productToAdd]);
        }
    };

    const handleRemoveProduct = (productId, variantId) => {
        setSelectedProducts((prev) =>
            prev.filter(
                (p) =>
                    !(p.product_id === productId && p.variant_id === variantId),
            ),
        );
    };

    // Step 3: Discount config handlers
    const handleDiscountChange = (productId, variantId, field, value) => {
        setDiscountConfig((prev) =>
            prev.map((config) => {
                if (
                    config.product_id === productId &&
                    config.variant_id === variantId
                ) {
                    return { ...config, [field]: value };
                }
                return config;
            }),
        );
    };

    const handleBulkDiscount = (field, value) => {
        setDiscountConfig((prev) =>
            prev.map((config) => ({
                ...config,
                [field]:
                    field === "discount_value" ? parseFloat(value) || 0 : value,
            })),
        );
    };

    // Filter products
    const filteredProducts = allProducts.filter((product) => {
        const matchesSearch =
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.variant.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory =
            !selectedCategory || product.category === selectedCategory;
        const matchesBrand = !selectedBrand || product.brand === selectedBrand;

        return matchesSearch && matchesCategory && matchesBrand;
    });

    // Calculate total discount value
    const calculateTotalDiscount = () => {
        return discountConfig.reduce((total, config) => {
            const product = selectedProducts.find(
                (p) =>
                    p.product_id === config.product_id &&
                    p.variant_id === config.variant_id,
            );

            if (!product) return total;

            if (config.discount_type === "percent") {
                return (
                    total +
                    (product.original_price * config.discount_value) / 100
                );
            } else {
                return total + config.discount_value;
            }
        }, 0);
    };

    // Format price
    const formatPrice = (price) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(price);
    };

    // Validation
    const validateStep1 = () => {
        if (!campaignInfo.name.trim()) {
            alert("Vui lòng nhập tên chiến dịch");
            return false;
        }
        if (!campaignInfo.start_time) {
            alert("Vui lòng chọn thời gian bắt đầu");
            return false;
        }
        if (!campaignInfo.end_time) {
            alert("Vui lòng chọn thời gian kết thúc");
            return false;
        }
        return true;
    };

    const validateStep2 = () => {
        if (selectedProducts.length === 0) {
            alert("Vui lòng chọn ít nhất một sản phẩm");
            return false;
        }
        return true;
    };

    const validateStep3 = () => {
        for (const config of discountConfig) {
            if (config.discount_value <= 0) {
                alert("Vui lòng nhập giá trị giảm giá hợp lệ");
                return false;
            }
            if (config.quantity_limit <= 0) {
                alert("Vui lòng nhập số lượng giới hạn hợp lệ");
                return false;
            }
        }
        return true;
    };

    // Navigation
    const handleNextStep = () => {
        switch (currentStep) {
            case 1:
                if (!validateStep1()) return;
                break;
            case 2:
                if (!validateStep2()) return;
                break;
            case 3:
                if (!validateStep3()) return;
                break;
        }

        if (currentStep < 4) {
            setCurrentStep(currentStep + 1);

            // Khi chuyển sang step 4, cập nhật preview data
            if (currentStep === 3) {
                updatePreviewData();
            }
        }
    };

    const handlePrevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const updatePreviewData = () => {
        const totalItems = selectedProducts.length;
        const totalDiscountValue = calculateTotalDiscount();
        const totalQuantityLimit = discountConfig.reduce(
            (sum, config) => sum + config.quantity_limit,
            0,
        );

        setPreviewData({
            totalItems,
            totalDiscountValue,
            totalQuantityLimit,
        });
    };

    // Save draft
    const handleSaveDraft = async () => {
        setLoading(true);

        const campaignData = {
            ...campaignInfo,
            is_active: false, // Draft status
            products: selectedProducts,
            discount_config: discountConfig,
            status: "draft",
        };

        console.log("Saving draft:", campaignData);

        // Mock API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setSaveStatus("draft");
        setLoading(false);
        alert("Đã lưu nháp chiến dịch!");
    };

    // Activate campaign
    const handleActivate = async () => {
        // Validate all steps
        if (!validateStep1() || !validateStep2() || !validateStep3()) {
            alert("Vui lòng kiểm tra lại tất cả thông tin trước khi kích hoạt");
            return;
        }

        setLoading(true);

        const campaignData = {
            ...campaignInfo,
            is_active: true,
            products: selectedProducts,
            discount_config: discountConfig,
            status: "active",
            activated_at: new Date().toISOString(),
        };

        console.log("Activating campaign:", campaignData);

        // Mock API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setSaveStatus("active");
        setLoading(false);
        alert("Đã kích hoạt chiến dịch thành công!");
        navigate("/admin/campaigns");
    };

    // Step Indicator
    const StepIndicator = () => {
        const steps = [
            { number: 1, label: "Thông tin chiến dịch", icon: TagIcon },
            { number: 2, label: "Sản phẩm áp dụng", icon: ShoppingCartIcon },
            { number: 3, label: "Cấu hình giảm giá", icon: CurrencyDollarIcon },
            { number: 4, label: "Xem trước & Kích hoạt", icon: EyeIcon },
        ];

        return (
            <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
                <div className="flex items-center justify-between">
                    {steps.map((step) => (
                        <div key={step.number} className="flex items-center">
                            <div
                                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                                    currentStep === step.number
                                        ? "bg-blue-500 border-blue-500 text-white"
                                        : currentStep > step.number
                                          ? "bg-emerald-500 border-emerald-500 text-white"
                                          : "border-gray-300 text-gray-500"
                                }`}
                            >
                                <step.icon className="h-5 w-5" />
                            </div>
                            <div className="ml-3">
                                <div className="text-sm font-medium text-gray-900">
                                    Bước {step.number}
                                </div>
                                <div className="text-xs text-gray-500">
                                    {step.label}
                                </div>
                            </div>
                            {step.number < 4 && (
                                <div className="h-0.5 w-12 bg-gray-300 mx-4"></div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    // Render Step 1: Campaign Info
    const renderStep1 = () => (
        <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-6 flex items-center">
                    <TagIcon className="h-5 w-5 mr-2 text-blue-500" />
                    Thông tin chiến dịch
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Campaign Name */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-900 mb-2">
                            Tên chiến dịch *
                        </label>
                        <input
                            type="text"
                            value={campaignInfo.name}
                            onChange={(e) =>
                                handleCampaignInfoChange("name", e.target.value)
                            }
                            className="w-full px-4 py-3 bg-gradient-to-r from-gray-50 to-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all"
                            placeholder="Ví dụ: Flash Sale Tết 2026"
                        />
                    </div>

                    {/* Start Date */}
                    <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">
                            Thời gian bắt đầu *
                        </label>
                        <div className="relative">
                            <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                value={campaignInfo.start_time}
                                onChange={(e) =>
                                    handleCampaignInfoChange(
                                        "start_time",
                                        e.target.value,
                                    )
                                }
                                className="w-full pl-10 pr-4 py-3 bg-gradient-to-r from-gray-50 to-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all"
                                placeholder="dd/mm/yyyy hh:mm"
                            />
                        </div>
                    </div>

                    {/* End Date */}
                    <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">
                            Thời gian kết thúc *
                        </label>
                        <div className="relative">
                            <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                value={campaignInfo.end_time}
                                onChange={(e) =>
                                    handleCampaignInfoChange(
                                        "end_time",
                                        e.target.value,
                                    )
                                }
                                className="w-full pl-10 pr-4 py-3 bg-gradient-to-r from-gray-50 to-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all"
                                placeholder="dd/mm/yyyy hh:mm"
                            />
                        </div>
                    </div>

                    {/* Status */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-900 mb-4">
                            Trạng thái
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <label
                                className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                                    !campaignInfo.is_active
                                        ? "border-blue-500 bg-blue-50"
                                        : "border-gray-200 hover:border-gray-300"
                                }`}
                            >
                                <input
                                    type="radio"
                                    checked={!campaignInfo.is_active}
                                    onChange={() =>
                                        handleCampaignInfoChange(
                                            "is_active",
                                            false,
                                        )
                                    }
                                    className="h-5 w-5 text-blue-600 focus:ring-blue-500"
                                />
                                <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900">
                                        Nháp
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        Lưu chiến dịch chưa kích hoạt
                                    </div>
                                </div>
                            </label>

                            <label
                                className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                                    campaignInfo.is_active
                                        ? "border-emerald-500 bg-emerald-50"
                                        : "border-gray-200 hover:border-gray-300"
                                }`}
                            >
                                <input
                                    type="radio"
                                    checked={campaignInfo.is_active}
                                    onChange={() =>
                                        handleCampaignInfoChange(
                                            "is_active",
                                            true,
                                        )
                                    }
                                    className="h-5 w-5 text-emerald-600 focus:ring-emerald-500"
                                />
                                <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900">
                                        Kích hoạt ngay
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        Chiến dịch sẽ hoạt động ngay lập tức
                                    </div>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    // Render Step 2: Products
    const renderStep2 = () => (
        <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-6 flex items-center">
                    <ShoppingCartIcon className="h-5 w-5 mr-2 text-blue-500" />
                    Sản phẩm áp dụng
                </h3>

                {/* Search Filters */}
                <div className="mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                Tìm sản phẩm
                            </label>
                            <div className="relative">
                                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    className="w-full pl-10 pr-4 py-3 bg-gradient-to-r from-gray-50 to-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all"
                                    placeholder="Tìm theo tên, SKU..."
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                Danh mục
                            </label>
                            <select
                                value={selectedCategory}
                                onChange={(e) =>
                                    setSelectedCategory(e.target.value)
                                }
                                className="w-full px-4 py-3 bg-gradient-to-r from-gray-50 to-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all"
                            >
                                <option value="">Tất cả danh mục</option>
                                {categories.map((category) => (
                                    <option
                                        key={category.id}
                                        value={category.name}
                                    >
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                Thương hiệu
                            </label>
                            <select
                                value={selectedBrand}
                                onChange={(e) =>
                                    setSelectedBrand(e.target.value)
                                }
                                className="w-full px-4 py-3 bg-gradient-to-r from-gray-50 to-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all"
                            >
                                <option value="">Tất cả thương hiệu</option>
                                {brands.map((brand) => (
                                    <option key={brand.id} value={brand.name}>
                                        {brand.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Products Table */}
                <div className="overflow-hidden rounded-xl border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Chọn
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Sản phẩm
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Biến thể
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Danh mục
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Thương hiệu
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Giá gốc
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredProducts.map((product) => (
                                <>
                                    <tr
                                        key={product.id}
                                        className="hover:bg-gray-50"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <input
                                                type="checkbox"
                                                checked={selectedProducts.some(
                                                    (p) =>
                                                        p.product_id ===
                                                        product.id,
                                                )}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        handleProductSelect(
                                                            product.id,
                                                        );
                                                    } else {
                                                        // Remove all variants of this product
                                                        const variantsToRemove =
                                                            selectedProducts.filter(
                                                                (p) =>
                                                                    p.product_id ===
                                                                    product.id,
                                                            );
                                                        variantsToRemove.forEach(
                                                            (variant) => {
                                                                handleRemoveProduct(
                                                                    product.id,
                                                                    variant.variant_id,
                                                                );
                                                            },
                                                        );
                                                    }
                                                }}
                                                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                            />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">
                                                {product.name}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                {product.variant}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                {product.category}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                {product.brand}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-bold text-gray-900">
                                                {formatPrice(
                                                    product.original_price,
                                                )}
                                            </div>
                                        </td>
                                    </tr>

                                    {/* Show variants if product has variants and is selected */}
                                    {product.has_variants &&
                                        product.variants.length > 0 &&
                                        product.variants.map((variant) => (
                                            <tr
                                                key={`${product.id}-${variant.id}`}
                                                className="hover:bg-gray-50 bg-gray-50"
                                            >
                                                <td className="px-6 py-2">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedProducts.some(
                                                            (p) =>
                                                                p.product_id ===
                                                                    product.id &&
                                                                p.variant_id ===
                                                                    variant.id,
                                                        )}
                                                        onChange={(e) => {
                                                            if (
                                                                e.target.checked
                                                            ) {
                                                                handleProductSelect(
                                                                    product.id,
                                                                    variant.id,
                                                                );
                                                            } else {
                                                                handleRemoveProduct(
                                                                    product.id,
                                                                    variant.id,
                                                                );
                                                            }
                                                        }}
                                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                    />
                                                </td>
                                                <td className="px-6 py-2 text-sm text-gray-500">
                                                    ↳ {product.name}
                                                </td>
                                                <td className="px-6 py-2">
                                                    <div className="text-sm text-gray-700">
                                                        {variant.name}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-2 text-sm text-gray-500">
                                                    {product.category}
                                                </td>
                                                <td className="px-6 py-2 text-sm text-gray-500">
                                                    {product.brand}
                                                </td>
                                                <td className="px-6 py-2">
                                                    <div className="text-sm font-bold text-gray-900">
                                                        {formatPrice(
                                                            variant.price,
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                </>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Selected Products Summary */}
                {selectedProducts.length > 0 && (
                    <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h4 className="text-lg font-medium text-gray-900">
                                    Đã chọn {selectedProducts.length} sản phẩm
                                </h4>
                                <p className="text-sm text-gray-600 mt-1">
                                    {selectedProducts
                                        .reduce((acc, curr) => {
                                            const productName =
                                                curr.product_name;
                                            if (!acc.includes(productName)) {
                                                acc.push(productName);
                                            }
                                            return acc;
                                        }, [])
                                        .join(", ")}
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setCurrentStep(3)}
                                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all"
                            >
                                Tiếp tục: Cấu hình giảm giá
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );

    // Render Step 3: Discount Config
    const renderStep3 = () => (
        <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-6 flex items-center">
                    <CurrencyDollarIcon className="h-5 w-5 mr-2 text-blue-500" />
                    Cấu hình giảm giá
                </h3>

                {/* Bulk Edit Controls */}
                <div className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
                    <h4 className="text-sm font-medium text-gray-900 mb-4">
                        Cấu hình hàng loạt:
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm text-gray-700 mb-2">
                                Kiểu giảm giá
                            </label>
                            <select
                                onChange={(e) =>
                                    handleBulkDiscount(
                                        "discount_type",
                                        e.target.value,
                                    )
                                }
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            >
                                <option value="">Giữ nguyên</option>
                                <option value="percent">Phần trăm (%)</option>
                                <option value="fixed">
                                    Số tiền cố định (VNĐ)
                                </option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm text-gray-700 mb-2">
                                Giá trị giảm
                            </label>
                            <input
                                type="number"
                                placeholder="Nhập giá trị"
                                onChange={(e) =>
                                    handleBulkDiscount(
                                        "discount_value",
                                        e.target.value,
                                    )
                                }
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-700 mb-2">
                                SL giới hạn
                            </label>
                            <input
                                type="number"
                                placeholder="Nhập số lượng"
                                onChange={(e) =>
                                    handleBulkDiscount(
                                        "quantity_limit",
                                        e.target.value,
                                    )
                                }
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            />
                        </div>
                    </div>
                </div>

                {/* Discount Table */}
                <div className="overflow-hidden rounded-xl border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Sản phẩm
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Biến thể
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Kiểu giảm
                                </th>
                                <th className="px6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Giá trị
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    SL giới hạn
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Đã bán
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {discountConfig.map((config, index) => {
                                const product = selectedProducts.find(
                                    (p) =>
                                        p.product_id === config.product_id &&
                                        p.variant_id === config.variant_id,
                                );

                                if (!product) return null;

                                const finalPrice =
                                    config.discount_type === "percent"
                                        ? product.original_price *
                                          (1 - config.discount_value / 100)
                                        : product.original_price -
                                          config.discount_value;

                                return (
                                    <tr
                                        key={index}
                                        className="hover:bg-gray-50"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">
                                                {product.product_name}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                {product.variant_name}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex space-x-4">
                                                <label className="flex items-center">
                                                    <input
                                                        type="radio"
                                                        checked={
                                                            config.discount_type ===
                                                            "percent"
                                                        }
                                                        onChange={() =>
                                                            handleDiscountChange(
                                                                config.product_id,
                                                                config.variant_id,
                                                                "discount_type",
                                                                "percent",
                                                            )
                                                        }
                                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                                                    />
                                                    <span className="ml-2 text-sm text-gray-700">
                                                        %
                                                    </span>
                                                </label>
                                                <label className="flex items-center">
                                                    <input
                                                        type="radio"
                                                        checked={
                                                            config.discount_type ===
                                                            "fixed"
                                                        }
                                                        onChange={() =>
                                                            handleDiscountChange(
                                                                config.product_id,
                                                                config.variant_id,
                                                                "discount_type",
                                                                "fixed",
                                                            )
                                                        }
                                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                                                    />
                                                    <span className="ml-2 text-sm text-gray-700">
                                                        VNĐ
                                                    </span>
                                                </label>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center space-x-2">
                                                <input
                                                    type="number"
                                                    value={
                                                        config.discount_value
                                                    }
                                                    onChange={(e) =>
                                                        handleDiscountChange(
                                                            config.product_id,
                                                            config.variant_id,
                                                            "discount_value",
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="w-32 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                />
                                                <div className="text-sm text-gray-500">
                                                    {config.discount_type ===
                                                    "percent"
                                                        ? "%"
                                                        : "đ"}
                                                </div>
                                            </div>
                                            <div className="text-xs text-gray-500 mt-1">
                                                Giá sau giảm:{" "}
                                                {formatPrice(finalPrice)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <input
                                                type="number"
                                                value={config.quantity_limit}
                                                onChange={(e) =>
                                                    handleDiscountChange(
                                                        config.product_id,
                                                        config.variant_id,
                                                        "quantity_limit",
                                                        e.target.value,
                                                    )
                                                }
                                                className="w-24 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                            />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                {config.sold_quantity} /{" "}
                                                {config.quantity_limit}
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {/* Summary */}
                <div className="mt-6 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-sm text-gray-600">
                                Tổng sản phẩm:
                            </div>
                            <div className="text-lg font-bold text-gray-900">
                                {selectedProducts.length}
                            </div>
                        </div>
                        <div>
                            <div className="text-sm text-gray-600">
                                Tổng giảm giá:
                            </div>
                            <div className="text-lg font-bold text-blue-600">
                                {formatPrice(calculateTotalDiscount())}
                            </div>
                        </div>
                        <div>
                            <div className="text-sm text-gray-600">
                                Tổng SL giới hạn:
                            </div>
                            <div className="text-lg font-bold text-gray-900">
                                {discountConfig.reduce(
                                    (sum, config) =>
                                        sum + config.quantity_limit,
                                    0,
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    // Render Step 4: Preview & Activate
    const renderStep4 = () => (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left column - Preview */}
            <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-6 flex items-center">
                        <EyeIcon className="h-5 w-5 mr-2 text-blue-500" />
                        Xem trước chiến dịch
                    </h3>

                    {/* Campaign Overview */}
                    <div className="mb-8">
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-6">
                            <h4 className="text-xl font-bold text-gray-900 mb-2">
                                {campaignInfo.name}
                            </h4>
                            <div className="flex items-center text-gray-600 mb-4">
                                <CalendarIcon className="h-5 w-5 mr-2" />
                                <span>
                                    {campaignInfo.start_time} →{" "}
                                    {campaignInfo.end_time}
                                </span>
                            </div>
                            <div
                                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                    campaignInfo.is_active
                                        ? "bg-emerald-100 text-emerald-800"
                                        : "bg-blue-100 text-blue-800"
                                }`}
                            >
                                {campaignInfo.is_active
                                    ? "Kích hoạt ngay"
                                    : "Bản nháp"}
                            </div>
                        </div>

                        {/* Products Preview */}
                        <h4 className="text-lg font-medium text-gray-900 mb-4">
                            Sản phẩm áp dụng:
                        </h4>
                        <div className="overflow-hidden rounded-xl border border-gray-200">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Sản phẩm
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Giá gốc
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Giá sau giảm
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Giảm
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            SL giới hạn
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {discountConfig.map((config, index) => {
                                        const product = selectedProducts.find(
                                            (p) =>
                                                p.product_id ===
                                                    config.product_id &&
                                                p.variant_id ===
                                                    config.variant_id,
                                        );

                                        if (!product) return null;

                                        const finalPrice =
                                            config.discount_type === "percent"
                                                ? product.original_price *
                                                  (1 -
                                                      config.discount_value /
                                                          100)
                                                : product.original_price -
                                                  config.discount_value;
                                        const discountAmount =
                                            config.discount_type === "percent"
                                                ? (product.original_price *
                                                      config.discount_value) /
                                                  100
                                                : config.discount_value;

                                        return (
                                            <tr key={index}>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {product.product_name}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {product.variant_name}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {formatPrice(
                                                            product.original_price,
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-lg font-bold text-emerald-600">
                                                        {formatPrice(
                                                            finalPrice,
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm font-medium text-rose-600">
                                                        {config.discount_type ===
                                                        "percent"
                                                            ? `${config.discount_value}%`
                                                            : formatPrice(
                                                                  config.discount_value,
                                                              )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm text-gray-900">
                                                        {config.quantity_limit}{" "}
                                                        sản phẩm
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Validation Status */}
                    <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-100 p-6">
                        <h4 className="text-lg font-medium text-emerald-900 mb-4">
                            Kiểm tra trạng thái:
                        </h4>
                        <div className="space-y-3">
                            <div className="flex items-center">
                                <div
                                    className={`h-6 w-6 rounded-full flex items-center justify-center mr-3 ${
                                        campaignInfo.name
                                            ? "bg-emerald-100 text-emerald-600"
                                            : "bg-rose-100 text-rose-600"
                                    }`}
                                >
                                    {campaignInfo.name ? (
                                        <CheckCircleIcon className="h-4 w-4" />
                                    ) : (
                                        <XMarkIcon className="h-4 w-4" />
                                    )}
                                </div>
                                <span className="text-sm text-gray-900">
                                    Thông tin chiến dịch
                                </span>
                            </div>
                            <div className="flex items-center">
                                <div
                                    className={`h-6 w-6 rounded-full flex items-center justify-center mr-3 ${
                                        selectedProducts.length > 0
                                            ? "bg-emerald-100 text-emerald-600"
                                            : "bg-rose-100 text-rose-600"
                                    }`}
                                >
                                    {selectedProducts.length > 0 ? (
                                        <CheckCircleIcon className="h-4 w-4" />
                                    ) : (
                                        <XMarkIcon className="h-4 w-4" />
                                    )}
                                </div>
                                <span className="text-sm text-gray-900">
                                    Sản phẩm áp dụng ({selectedProducts.length}{" "}
                                    sản phẩm)
                                </span>
                            </div>
                            <div className="flex items-center">
                                <div
                                    className={`h-6 w-6 rounded-full flex items-center justify-center mr-3 ${
                                        discountConfig.length > 0
                                            ? "bg-emerald-100 text-emerald-600"
                                            : "bg-rose-100 text-rose-600"
                                    }`}
                                >
                                    {discountConfig.length > 0 ? (
                                        <CheckCircleIcon className="h-4 w-4" />
                                    ) : (
                                        <XMarkIcon className="h-4 w-4" />
                                    )}
                                </div>
                                <span className="text-sm text-gray-900">
                                    Cấu hình giảm giá
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right column - Actions */}
            <div className="space-y-6">
                {/* Summary card */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                        Tóm tắt chiến dịch
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <div className="text-sm text-gray-600 mb-1">
                                Thời gian:
                            </div>
                            <div className="text-sm font-medium text-gray-900">
                                {campaignInfo.start_time} -{" "}
                                {campaignInfo.end_time}
                            </div>
                        </div>
                        <div>
                            <div className="text-sm text-gray-600 mb-1">
                                Số sản phẩm:
                            </div>
                            <div className="text-lg font-bold text-gray-900">
                                {selectedProducts.length}
                            </div>
                        </div>
                        <div>
                            <div className="text-sm text-gray-600 mb-1">
                                Tổng giảm giá:
                            </div>
                            <div className="text-lg font-bold text-blue-600">
                                {formatPrice(calculateTotalDiscount())}
                            </div>
                        </div>
                        <div>
                            <div className="text-sm text-gray-600 mb-1">
                                Tổng SL giới hạn:
                            </div>
                            <div className="text-lg font-bold text-gray-900">
                                {discountConfig.reduce(
                                    (sum, config) =>
                                        sum + config.quantity_limit,
                                    0,
                                )}
                            </div>
                        </div>
                        <div>
                            <div className="text-sm text-gray-600 mb-1">
                                Trạng thái:
                            </div>
                            <div
                                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                    campaignInfo.is_active
                                        ? "bg-emerald-100 text-emerald-800"
                                        : "bg-blue-100 text-blue-800"
                                }`}
                            >
                                {campaignInfo.is_active
                                    ? "Kích hoạt ngay"
                                    : "Bản nháp"}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Actions card */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                        Thao tác
                    </h3>
                    <div className="space-y-3">
                        <button
                            type="button"
                            onClick={handleSaveDraft}
                            disabled={loading}
                            className="w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            {loading ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3 inline-block"></div>
                                    Đang xử lý...
                                </>
                            ) : (
                                "Lưu nháp"
                            )}
                        </button>

                        <button
                            type="button"
                            onClick={handleActivate}
                            disabled={
                                loading ||
                                !campaignInfo.name ||
                                selectedProducts.length === 0
                            }
                            className="w-full px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl hover:from-emerald-600 hover:to-teal-600 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            {loading ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3 inline-block"></div>
                                    Đang xử lý...
                                </>
                            ) : (
                                "Kích hoạt chiến dịch"
                            )}
                        </button>

                        <Link
                            to="/admin/campaigns"
                            className="w-full block text-center px-6 py-3 bg-white text-gray-700 border-2 border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all"
                        >
                            Hủy bỏ
                        </Link>
                    </div>
                </div>

                {/* Tips card */}
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-100 p-6">
                    <div className="flex items-center mb-3">
                        <InformationCircleIcon className="h-5 w-5 text-amber-600 mr-2" />
                        <h3 className="text-sm font-medium text-amber-900">
                            Lưu ý khi kích hoạt
                        </h3>
                    </div>
                    <ul className="text-sm text-amber-700 space-y-2">
                        <li>• Chiến dịch sẽ hoạt động ngay lập tức</li>
                        <li>• Kiểm tra kỹ thời gian bắt đầu/kết thúc</li>
                        <li>• Đảm bảo giá giảm hợp lý với sản phẩm</li>
                        <li>• Kiểm tra số lượng giới hạn cho từng sản phẩm</li>
                    </ul>
                </div>
            </div>
        </div>
    );

    // Render current step
    const renderCurrentStep = () => {
        switch (currentStep) {
            case 1:
                return renderStep1();
            case 2:
                return renderStep2();
            case 3:
                return renderStep3();
            case 4:
                return renderStep4();
            default:
                return renderStep1();
        }
    };

    if (loading && isEditMode) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-blue-50/50 to-gray-50 flex items-center justify-center p-6">
                <div className="text-center">
                    <div className="relative">
                        <div className="w-20 h-20 border-4 border-blue-200 rounded-full"></div>
                        <div className="absolute top-0 left-0 w-20 h-20 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
                    </div>
                    <p className="mt-6 text-lg text-gray-600">
                        Đang tải dữ liệu chiến dịch...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50/50 to-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <Link
                        to="/admin/campaigns"
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4 group"
                    >
                        <ArrowLeftIcon className="h-5 w-5 mr-2 transition-transform group-hover:-translate-x-1" />
                        Quay lại danh sách chiến dịch
                    </Link>

                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                {isEditMode
                                    ? "Chỉnh Sửa Chiến Dịch"
                                    : "Tạo Chiến Dịch Mới"}
                            </h1>
                            <p className="text-gray-600 mt-2">
                                {isEditMode
                                    ? "Cập nhật thông tin chiến dịch"
                                    : "Thêm chiến dịch khuyến mãi mới"}
                            </p>
                        </div>

                        <div className="flex items-center space-x-3">
                            <div
                                className={`px-3 py-1 rounded-full text-sm font-medium ${
                                    saveStatus === "active"
                                        ? "bg-emerald-100 text-emerald-800"
                                        : "bg-blue-100 text-blue-800"
                                }`}
                            >
                                {saveStatus === "active"
                                    ? "Đã kích hoạt"
                                    : "Bản nháp"}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Step Indicator */}
                <StepIndicator />

                {/* Main Form Content */}
                <div className="mb-8">{renderCurrentStep()}</div>

                {/* Navigation Buttons */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex justify-between">
                        <div>
                            {currentStep > 1 && (
                                <button
                                    type="button"
                                    onClick={handlePrevStep}
                                    className="px-6 py-3 bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 rounded-xl hover:from-gray-100 hover:to-gray-200 border border-gray-300 transition-all"
                                >
                                    Quay lại
                                </button>
                            )}
                        </div>

                        <div className="flex space-x-3">
                            {currentStep < 4 ? (
                                <>
                                    <button
                                        type="button"
                                        onClick={handleSaveDraft}
                                        className="px-6 py-3 bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 rounded-xl hover:from-gray-100 hover:to-gray-200 border border-gray-300 transition-all"
                                    >
                                        Lưu nháp
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleNextStep}
                                        className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all"
                                    >
                                        Tiếp theo:{" "}
                                        {currentStep === 1
                                            ? "Sản phẩm áp dụng"
                                            : currentStep === 2
                                              ? "Cấu hình giảm giá"
                                              : "Xem trước & Kích hoạt"}
                                    </button>
                                </>
                            ) : (
                                <div className="flex space-x-3">
                                    <button
                                        type="button"
                                        onClick={handleSaveDraft}
                                        className="px-6 py-3 bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 rounded-xl hover:from-gray-100 hover:to-gray-200 border border-gray-300 transition-all"
                                    >
                                        Lưu nháp
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleActivate}
                                        disabled={
                                            !campaignInfo.name ||
                                            selectedProducts.length === 0
                                        }
                                        className={`px-6 py-3 rounded-xl transition-all ${
                                            !campaignInfo.name ||
                                            selectedProducts.length === 0
                                                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                                : "bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600"
                                        }`}
                                    >
                                        Kích hoạt chiến dịch
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CampaignForm;
