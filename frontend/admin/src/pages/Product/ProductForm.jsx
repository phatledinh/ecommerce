// pages/admin/products/ProductForm.jsx
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {
    ArrowLeftIcon,
    PhotoIcon,
    DocumentTextIcon,
    TagIcon,
    CurrencyDollarIcon,
    CubeIcon,
    EyeIcon,
    ArrowUpTrayIcon,
    TrashIcon,
    ChevronUpIcon,
    ChevronDownIcon,
    PlusIcon,
    SparklesIcon,
    CheckCircleIcon,
    XMarkIcon,
    ShoppingCartIcon,
    CogIcon,
    ViewfinderCircleIcon,
    DocumentDuplicateIcon,
    ChartBarIcon,
    InformationCircleIcon,
} from "@heroicons/react/24/outline";

const ProductForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = !!id;

    // State cho current step
    const [currentStep, setCurrentStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [saveStatus, setSaveStatus] = useState("draft"); // draft, published

    // State cho Step 1: Basic Info
    const [basicInfo, setBasicInfo] = useState({
        name: "",
        slug: "",
        sku_base: "",
        category_id: "",
        brand_id: "",
        short_description: "",
        description: "",
        promotion_info: "",
        gifts: "",
        other_offers: "",
        is_active: true,
    });

    // State cho Step 2: Images
    const [productImages, setProductImages] = useState([]);
    const [uploadingImages, setUploadingImages] = useState(false);

    // State cho Step 3: Variants
    const [selectedAttributes, setSelectedAttributes] = useState([]);
    const [variants, setVariants] = useState([]);
    const [attributeOptions, setAttributeOptions] = useState({});

    // State cho Step 4: Specs
    const [specGroups, setSpecGroups] = useState([]);
    const [specs, setSpecs] = useState([]);

    // State cho categories và brands
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [categoryAttributes, setCategoryAttributes] = useState([]);

    // Refs cho file upload
    const fileInputRef = useRef(null);

    // Mock data cho danh mục và thương hiệu
    useEffect(() => {
        // Fetch categories
        const mockCategories = [
            { id: 1, name: "Điện thoại", parent_id: null },
            { id: 2, name: "Laptop", parent_id: null },
            { id: 3, name: "Tablet", parent_id: null },
            { id: 4, name: "iPhone", parent_id: 1 },
            { id: 5, name: "Samsung", parent_id: 1 },
            { id: 6, name: "Xiaomi", parent_id: 1 },
        ];
        setCategories(mockCategories);

        // Fetch brands
        const mockBrands = [
            { id: 1, name: "Apple" },
            { id: 2, name: "Samsung" },
            { id: 3, name: "Xiaomi" },
            { id: 4, name: "Oppo" },
            { id: 5, name: "Dell" },
            { id: 6, name: "HP" },
        ];
        setBrands(mockBrands);

        // Nếu là edit mode, fetch product data
        if (isEditMode) {
            setLoading(true);
            setTimeout(() => {
                // Mock data cho sản phẩm đang edit
                setBasicInfo({
                    name: "iPhone 15 Pro Max",
                    slug: "iphone-15-pro-max",
                    sku_base: "IP15PM",
                    category_id: 4,
                    brand_id: 1,
                    short_description:
                        "iPhone 15 Pro Max - Flagship smartphone từ Apple với nhiều tính năng đột phá",
                    description:
                        "<h2>Thiết kế cao cấp</h2><p>iPhone 15 Pro Max được làm từ titanium nguyên khối, nhẹ hơn 10% so với thép không gỉ nhưng vẫn đảm bảo độ bền vượt trội.</p><h2>Hiệu năng mạnh mẽ</h2><p>Trang bị chip A17 Pro, mang đến trải nghiệm mượt mà trong mọi tác vụ.</p><h2>Camera chuyên nghiệp</h2><p>Hệ thống camera 48MP với ống kính tele 5x, cho chất lượng ảnh xuất sắc trong mọi điều kiện ánh sáng.</p>",
                    promotion_info: "Giảm 2 triệu cho thẻ VISA",
                    gifts: "Ốp lưng, cường lực",
                    other_offers: "Trả góp 0%",
                    is_active: true,
                });

                // Mock product images
                setProductImages([
                    {
                        id: 1,
                        url: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&h=800&fit=crop",
                        sort_order: 1,
                    },
                    {
                        id: 2,
                        url: "https://images.unsplash.com/photo-1694868707783-2f0e8cf8bf3e?w-800&h=800&fit=crop",
                        sort_order: 2,
                    },
                    {
                        id: 3,
                        url: "https://images.unsplash.com/photo-1694695365794-2a5ce6fd54c8?w=800&h=800&fit=crop",
                        sort_order: 3,
                    },
                ]);

                // Mock category attributes
                const mockCategoryAttributes = [
                    {
                        id: 1,
                        name: "RAM",
                        type: "select",
                        options: ["8GB", "12GB", "16GB"],
                    },
                    {
                        id: 2,
                        name: "Dung lượng",
                        type: "select",
                        options: ["256GB", "512GB", "1TB"],
                    },
                    {
                        id: 3,
                        name: "Màu sắc",
                        type: "select",
                        options: ["Đen", "Trắng", "Xanh", "Tím"],
                    },
                ];
                setCategoryAttributes(mockCategoryAttributes);

                // Mock variants
                const mockVariants = [
                    {
                        id: 1,
                        sku: "IP15PM-8-256",
                        ram: "8GB",
                        storage: "256GB",
                        price: 32000000,
                        sale_price: 30000000,
                        stock: 50,
                        image_url: "",
                    },
                    {
                        id: 2,
                        sku: "IP15PM-8-512",
                        ram: "8GB",
                        storage: "512GB",
                        price: 35000000,
                        sale_price: 33000000,
                        stock: 30,
                        image_url: "",
                    },
                    {
                        id: 3,
                        sku: "IP15PM-12-256",
                        ram: "12GB",
                        storage: "256GB",
                        price: 37000000,
                        sale_price: 35000000,
                        stock: 20,
                        image_url: "",
                    },
                    {
                        id: 4,
                        sku: "IP15PM-12-512",
                        ram: "12GB",
                        storage: "512GB",
                        price: 40000000,
                        sale_price: 38000000,
                        stock: 15,
                        image_url: "",
                    },
                    {
                        id: 5,
                        sku: "IP15PM-12-1TB",
                        ram: "12GB",
                        storage: "1TB",
                        price: 45000000,
                        sale_price: 42000000,
                        stock: 10,
                        image_url: "",
                    },
                ];
                setVariants(mockVariants);
                setSelectedAttributes([1, 2]); // RAM và Dung lượng

                // Mock specs
                setSpecGroups([
                    { id: 1, name: "Màn hình", icon: "📱" },
                    { id: 2, name: "Camera", icon: "📷" },
                    { id: 3, name: "Pin & Sạc", icon: "🔋" },
                    { id: 4, name: "Hiệu năng", icon: "⚡" },
                ]);

                setSpecs([
                    {
                        id: 1,
                        group_id: 1,
                        name: "Kích thước",
                        value: "6.7 inch",
                    },
                    {
                        id: 2,
                        group_id: 1,
                        name: "Độ phân giải",
                        value: "2796 x 1290 pixels",
                    },
                    { id: 3, group_id: 1, name: "Tần số quét", value: "120Hz" },
                    {
                        id: 4,
                        group_id: 1,
                        name: "Công nghệ",
                        value: "Super Retina XDR OLED",
                    },
                    { id: 5, group_id: 2, name: "Camera chính", value: "48MP" },
                    {
                        id: 6,
                        group_id: 2,
                        name: "Camera tele",
                        value: "12MP (5x)",
                    },
                    {
                        id: 7,
                        group_id: 2,
                        name: "Camera góc siêu rộng",
                        value: "12MP",
                    },
                    {
                        id: 8,
                        group_id: 3,
                        name: "Dung lượng pin",
                        value: "4422 mAh",
                    },
                    { id: 9, group_id: 3, name: "Sạc nhanh", value: "20W" },
                    {
                        id: 10,
                        group_id: 4,
                        name: "Chip",
                        value: "Apple A17 Pro",
                    },
                    { id: 11, group_id: 4, name: "RAM", value: "8GB" },
                    {
                        id: 12,
                        group_id: 4,
                        name: "Hệ điều hành",
                        value: "iOS 17",
                    },
                ]);

                setLoading(false);
            }, 1000);
        }
    }, [id, isEditMode]);

    // Khi category thay đổi, load attributes của category đó
    useEffect(() => {
        if (basicInfo.category_id) {
            // Trong thực tế, bạn sẽ gọi API để lấy attributes của category
            const mockAttributes = [
                {
                    id: 1,
                    name: "RAM",
                    type: "select",
                    options: ["4GB", "8GB", "12GB", "16GB"],
                },
                {
                    id: 2,
                    name: "Dung lượng",
                    type: "select",
                    options: ["128GB", "256GB", "512GB", "1TB"],
                },
                {
                    id: 3,
                    name: "Màu sắc",
                    type: "select",
                    options: ["Đen", "Trắng", "Xanh", "Đỏ", "Tím"],
                },
                {
                    id: 4,
                    name: "Kích thước",
                    type: "select",
                    options: ["6.1 inch", "6.7 inch"],
                },
            ];
            setCategoryAttributes(mockAttributes);
        }
    }, [basicInfo.category_id]);

    // Hàm xử lý thay đổi basic info
    const handleBasicInfoChange = (e) => {
        const { name, value, type, checked } = e.target;
        setBasicInfo((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));

        // Auto generate slug từ tên sản phẩm
        if (name === "name" && !isEditMode) {
            const slug = value
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/[^a-z0-9\s]/g, "")
                .replace(/\s+/g, "-");
            setBasicInfo((prev) => ({ ...prev, slug }));
        }

        // Auto generate SKU base từ tên sản phẩm
        if (name === "name" && !isEditMode) {
            const skuBase = value
                .replace(/[^a-zA-Z0-9]/g, "")
                .toUpperCase()
                .substring(0, 8);
            setBasicInfo((prev) => ({ ...prev, sku_base: skuBase }));
        }
    };

    // Hàm xử lý upload ảnh
    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        setUploadingImages(true);

        // Mock upload process
        setTimeout(() => {
            const newImages = files.map((file, index) => ({
                id: Date.now() + index,
                url: URL.createObjectURL(file),
                file: file,
                sort_order: productImages.length + index + 1,
            }));

            setProductImages((prev) => [...prev, ...newImages]);
            setUploadingImages(false);
        }, 500);
    };

    // Hàm xóa ảnh
    const handleRemoveImage = (id) => {
        setProductImages((prev) => prev.filter((img) => img.id !== id));
    };

    // Hàm di chuyển ảnh lên/xuống
    const handleMoveImage = (id, direction) => {
        const index = productImages.findIndex((img) => img.id === id);
        if (direction === "up" && index > 0) {
            const newImages = [...productImages];
            [newImages[index], newImages[index - 1]] = [
                newImages[index - 1],
                newImages[index],
            ];
            newImages[index].sort_order = index + 1;
            newImages[index - 1].sort_order = index;
            setProductImages(newImages);
        } else if (direction === "down" && index < productImages.length - 1) {
            const newImages = [...productImages];
            [newImages[index], newImages[index + 1]] = [
                newImages[index + 1],
                newImages[index],
            ];
            newImages[index].sort_order = index + 1;
            newImages[index + 1].sort_order = index + 2;
            setProductImages(newImages);
        }
    };

    // Hàm chọn attribute để tạo biến thể
    const handleAttributeToggle = (attributeId) => {
        setSelectedAttributes((prev) => {
            if (prev.includes(attributeId)) {
                return prev.filter((id) => id !== attributeId);
            } else {
                return [...prev, attributeId];
            }
        });
    };

    // Hàm thay đổi option của attribute
    const handleAttributeOptionToggle = (attributeId, option) => {
        setAttributeOptions((prev) => {
            const currentOptions = prev[attributeId] || [];
            if (currentOptions.includes(option)) {
                return {
                    ...prev,
                    [attributeId]: currentOptions.filter(
                        (opt) => opt !== option,
                    ),
                };
            } else {
                return {
                    ...prev,
                    [attributeId]: [...currentOptions, option],
                };
            }
        });
    };

    // Hàm sinh biến thể tự động
    const generateVariants = () => {
        const selectedAttrs = categoryAttributes.filter((attr) =>
            selectedAttributes.includes(attr.id),
        );

        if (selectedAttrs.length === 0) {
            alert("Vui lòng chọn ít nhất một thuộc tính để tạo biến thể");
            return;
        }

        // Kiểm tra mỗi attribute đã có option nào được chọn chưa
        for (const attr of selectedAttrs) {
            if (
                !attributeOptions[attr.id] ||
                attributeOptions[attr.id].length === 0
            ) {
                alert(
                    `Vui lòng chọn ít nhất một tùy chọn cho thuộc tính "${attr.name}"`,
                );
                return;
            }
        }

        // Tạo tất cả các tổ hợp
        let combinations = [[]];

        for (const attr of selectedAttrs) {
            const newCombinations = [];
            for (const combination of combinations) {
                for (const option of attributeOptions[attr.id]) {
                    newCombinations.push([
                        ...combination,
                        {
                            attributeId: attr.id,
                            attributeName: attr.name,
                            option,
                        },
                    ]);
                }
            }
            combinations = newCombinations;
        }

        // Tạo variants từ combinations
        const newVariants = combinations.map((combination, index) => {
            // Tạo SKU từ SKU base và combination
            const skuParts = combination.map((item) =>
                item.option.replace(/\s+/g, "").substring(0, 4),
            );
            const sku = `${basicInfo.sku_base || "PROD"}-${skuParts.join("-")}`;

            // Tạo tên variant
            const variantName = combination
                .map((item) => `${item.option}`)
                .join(" / ");

            // Tạo giá mặc định
            const basePrice = 10000000; // Giá base, có thể lấy từ basic info
            const priceIncrement = index * 2000000; // Tăng giá theo index

            return {
                id: Date.now() + index,
                combination,
                name: variantName,
                sku,
                price: basePrice + priceIncrement,
                sale_price:
                    Math.round(((basePrice + priceIncrement) * 0.9) / 100000) *
                    100000, // Giảm 10%
                stock: 50,
                image_url: "",
                is_active: true,
            };
        });

        setVariants(newVariants);
    };

    // Hàm thay đổi thông tin variant
    const handleVariantChange = (variantId, field, value) => {
        setVariants((prev) =>
            prev.map((variant) => {
                if (variant.id === variantId) {
                    return { ...variant, [field]: value };
                }
                return variant;
            }),
        );
    };

    // Hàm bulk edit variants
    const handleBulkEdit = (field, value) => {
        setVariants((prev) =>
            prev.map((variant) => ({
                ...variant,
                [field]:
                    field === "price" || field === "sale_price"
                        ? parseFloat(value) || 0
                        : value,
            })),
        );
    };

    // Hàm thêm spec group
    const handleAddSpecGroup = () => {
        const newGroup = {
            id: Date.now(),
            name: "Nhóm mới",
            icon: "📝",
        };
        setSpecGroups((prev) => [...prev, newGroup]);
    };

    // Hàm thêm spec
    const handleAddSpec = (groupId) => {
        const newSpec = {
            id: Date.now(),
            group_id: groupId,
            name: "Thông số mới",
            value: "",
        };
        setSpecs((prev) => [...prev, newSpec]);
    };

    // Hàm thay đổi spec
    const handleSpecChange = (specId, field, value) => {
        setSpecs((prev) =>
            prev.map((spec) => {
                if (spec.id === specId) {
                    return { ...spec, [field]: value };
                }
                return spec;
            }),
        );
    };

    // Hàm xóa spec
    const handleRemoveSpec = (specId) => {
        setSpecs((prev) => prev.filter((spec) => spec.id !== specId));
    };

    // Hàm thay đổi spec group
    const handleSpecGroupChange = (groupId, field, value) => {
        setSpecGroups((prev) =>
            prev.map((group) => {
                if (group.id === groupId) {
                    return { ...group, [field]: value };
                }
                return group;
            }),
        );
    };

    // Hàm xóa spec group
    const handleRemoveSpecGroup = (groupId) => {
        setSpecGroups((prev) => prev.filter((group) => group.id !== groupId));
        // Xóa tất cả specs thuộc group này
        setSpecs((prev) => prev.filter((spec) => spec.group_id !== groupId));
    };

    // Hàm validate step 1
    const validateStep1 = () => {
        if (!basicInfo.name.trim()) {
            alert("Vui lòng nhập tên sản phẩm");
            return false;
        }
        if (!basicInfo.category_id) {
            alert("Vui lòng chọn danh mục");
            return false;
        }
        if (!basicInfo.brand_id) {
            alert("Vui lòng chọn thương hiệu");
            return false;
        }
        return true;
    };

    // Hàm validate step 2
    const validateStep2 = () => {
        if (productImages.length === 0) {
            alert("Vui lòng upload ít nhất một hình ảnh");
            return false;
        }
        return true;
    };

    // Hàm validate step 3
    const validateStep3 = () => {
        if (variants.length === 0) {
            alert("Vui lòng tạo ít nhất một biến thể");
            return false;
        }

        for (const variant of variants) {
            if (!variant.sku.trim()) {
                alert(`Vui lòng nhập SKU cho biến thể: ${variant.name}`);
                return false;
            }
            if (variant.price <= 0) {
                alert(`Vui lòng nhập giá hợp lệ cho biến thể: ${variant.name}`);
                return false;
            }
            if (variant.stock < 0) {
                alert(
                    `Vui lòng nhập số lượng tồn kho hợp lệ cho biến thể: ${variant.name}`,
                );
                return false;
            }
        }
        return true;
    };

    // Hàm chuyển step
    const handleNextStep = () => {
        // Validate current step trước khi chuyển
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

        if (currentStep < 5) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePrevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    // Hàm lưu nháp
    const handleSaveDraft = async () => {
        setLoading(true);

        // Chuẩn bị dữ liệu để gửi lên server
        const productData = {
            ...basicInfo,
            images: productImages,
            variants: variants,
            specs: specs,
            spec_groups: specGroups,
            status: "draft",
        };

        console.log("Saving draft:", productData);

        // Mock API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setSaveStatus("draft");
        setLoading(false);
        alert("Đã lưu nháp thành công!");
    };

    // Hàm xuất bản sản phẩm
    const handlePublish = async () => {
        // Validate tất cả các bước trước khi publish
        if (!validateStep1() || !validateStep2() || !validateStep3()) {
            alert("Vui lòng kiểm tra lại tất cả thông tin trước khi xuất bản");
            return;
        }

        setLoading(true);

        const productData = {
            ...basicInfo,
            is_active: true, // Đánh dấu là đang bán
            images: productImages,
            variants: variants.map((v) => ({ ...v, is_active: true })),
            specs: specs,
            spec_groups: specGroups,
            status: "published",
            published_at: new Date().toISOString(),
        };

        console.log("Publishing product:", productData);

        // Mock API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setSaveStatus("published");
        setLoading(false);
        alert("Đã xuất bản sản phẩm thành công!");
        navigate("/admin/products");
    };

    // Hàm format tiền
    const formatPrice = (price) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(price);
    };

    // Tính giá thấp nhất và cao nhất từ các variants
    const getPriceRange = () => {
        if (variants.length === 0) return { min: 0, max: 0 };

        const prices = variants.map((v) => v.sale_price || v.price);
        return {
            min: Math.min(...prices),
            max: Math.max(...prices),
        };
    };

    // Step indicator component
    const StepIndicator = () => {
        const steps = [
            { number: 1, label: "Thông tin chung", icon: DocumentTextIcon },
            { number: 2, label: "Hình ảnh", icon: PhotoIcon },
            { number: 3, label: "Biến thể & Giá", icon: CubeIcon },
            { number: 4, label: "Thông số kỹ thuật", icon: CogIcon },
            { number: 5, label: "Xem trước & Lưu", icon: EyeIcon },
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
                            {step.number < 5 && (
                                <div className="h-0.5 w-12 bg-gray-300 mx-4"></div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    // Render Step 1: Basic Info
    const renderStep1 = () => (
        <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                    <DocumentTextIcon className="h-5 w-5 mr-2 text-blue-500" />
                    Thông tin cơ bản
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Tên sản phẩm */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-900 mb-2">
                            Tên sản phẩm *
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={basicInfo.name}
                            onChange={handleBasicInfoChange}
                            className="w-full px-4 py-3 bg-gradient-to-r from-gray-50 to-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all"
                            placeholder="Ví dụ: iPhone 15 Pro Max"
                        />
                    </div>

                    {/* Slug */}
                    <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">
                            Slug (tự động)
                        </label>
                        <div className="flex">
                            <span className="inline-flex items-center px-4 py-3 bg-gray-100 border-2 border-r-0 border-gray-200 rounded-l-xl text-gray-500">
                                /
                            </span>
                            <input
                                type="text"
                                name="slug"
                                value={basicInfo.slug}
                                onChange={handleBasicInfoChange}
                                className="flex-1 px-4 py-3 bg-gradient-to-r from-gray-50 to-white border-2 border-l-0 border-gray-200 rounded-r-xl focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all"
                                placeholder="iphone-15-pro-max"
                            />
                        </div>
                    </div>

                    {/* SKU base */}
                    <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">
                            SKU base *
                        </label>
                        <input
                            type="text"
                            name="sku_base"
                            value={basicInfo.sku_base}
                            onChange={handleBasicInfoChange}
                            className="w-full px-4 py-3 bg-gradient-to-r from-gray-50 to-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all"
                            placeholder="Ví dụ: IP15PM"
                        />
                    </div>

                    {/* Danh mục */}
                    <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">
                            Danh mục *
                        </label>
                        <select
                            name="category_id"
                            value={basicInfo.category_id}
                            onChange={handleBasicInfoChange}
                            className="w-full px-4 py-3 bg-gradient-to-r from-gray-50 to-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all"
                        >
                            <option value="">Chọn danh mục</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.parent_id ? `  ${cat.name}` : cat.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Thương hiệu */}
                    <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">
                            Thương hiệu *
                        </label>
                        <select
                            name="brand_id"
                            value={basicInfo.brand_id}
                            onChange={handleBasicInfoChange}
                            className="w-full px-4 py-3 bg-gradient-to-r from-gray-50 to-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all"
                        >
                            <option value="">Chọn thương hiệu</option>
                            {brands.map((brand) => (
                                <option key={brand.id} value={brand.id}>
                                    {brand.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Mô tả ngắn */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-900 mb-2">
                            Mô tả ngắn
                        </label>
                        <textarea
                            name="short_description"
                            value={basicInfo.short_description}
                            onChange={handleBasicInfoChange}
                            rows={3}
                            className="w-full px-4 py-3 bg-gradient-to-r from-gray-50 to-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all"
                            placeholder="Mô tả ngắn cho trang danh sách sản phẩm..."
                        />
                    </div>

                    {/* Mô tả chi tiết */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-900 mb-2">
                            Mô tả chi tiết
                        </label>
                        <div className="border border-gray-200 rounded-xl overflow-hidden">
                            <CKEditor
                                editor={ClassicEditor}
                                data={basicInfo.description}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    setBasicInfo((prev) => ({
                                        ...prev,
                                        description: data,
                                    }));
                                }}
                                config={{
                                    toolbar: [
                                        "heading",
                                        "|",
                                        "bold",
                                        "italic",
                                        "link",
                                        "bulletedList",
                                        "numberedList",
                                        "blockQuote",
                                        "insertTable",
                                        "undo",
                                        "redo",
                                    ],
                                }}
                            />
                        </div>
                    </div>

                    {/* Thông tin khuyến mãi */}
                    <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">
                            Thông tin khuyến mãi
                        </label>
                        <textarea
                            name="promotion_info"
                            value={basicInfo.promotion_info}
                            onChange={handleBasicInfoChange}
                            rows={2}
                            className="w-full px-4 py-3 bg-gradient-to-r from-gray-50 to-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all"
                            placeholder="Ví dụ: Giảm 2 triệu cho thẻ VISA"
                        />
                    </div>

                    {/* Quà tặng kèm */}
                    <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">
                            Quà tặng kèm
                        </label>
                        <textarea
                            name="gifts"
                            value={basicInfo.gifts}
                            onChange={handleBasicInfoChange}
                            rows={2}
                            className="w-full px-4 py-3 bg-gradient-to-r from-gray-50 to-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all"
                            placeholder="Ví dụ: Ốp lưng, cường lực"
                        />
                    </div>

                    {/* Ưu đãi khác */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-900 mb-2">
                            Ưu đãi khác
                        </label>
                        <textarea
                            name="other_offers"
                            value={basicInfo.other_offers}
                            onChange={handleBasicInfoChange}
                            rows={2}
                            className="w-full px-4 py-3 bg-gradient-to-r from-gray-50 to-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all"
                            placeholder="Ví dụ: Trả góp 0%"
                        />
                    </div>

                    {/* Trạng thái */}
                    <div className="md:col-span-2">
                        <label className="flex items-center p-3 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200">
                            <input
                                type="checkbox"
                                name="is_active"
                                checked={basicInfo.is_active}
                                onChange={handleBasicInfoChange}
                                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <span className="ml-3">
                                <span className="block text-sm font-medium text-gray-900">
                                    Đang bán
                                </span>
                                <span className="block text-sm text-gray-500">
                                    Sản phẩm sẽ hiển thị trên website
                                </span>
                            </span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );

    // Render Step 2: Images
    const renderStep2 = () => (
        <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                    <PhotoIcon className="h-5 w-5 mr-2 text-blue-500" />
                    Hình ảnh sản phẩm
                </h3>

                {/* Upload area */}
                <div className="mb-8">
                    <div
                        className="border-3 border-dashed border-gray-300 rounded-2xl p-12 text-center hover:border-blue-400 transition-colors cursor-pointer"
                        onClick={() => fileInputRef.current.click()}
                    >
                        <ArrowUpTrayIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h4 className="text-lg font-medium text-gray-900 mb-2">
                            Kéo thả ảnh vào đây hoặc click để chọn
                        </h4>
                        <p className="text-gray-500 mb-4">
                            Hỗ trợ PNG, JPG, GIF. Tối đa 10MB mỗi ảnh
                        </p>
                        <button
                            type="button"
                            className="inline-flex items-center px-5 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all"
                        >
                            <PlusIcon className="h-5 w-5 mr-2" />
                            Chọn ảnh
                        </button>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleImageUpload}
                            accept="image/*"
                            multiple
                            className="hidden"
                        />
                    </div>
                    {uploadingImages && (
                        <div className="mt-4 text-center">
                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                            <p className="mt-2 text-gray-600">
                                Đang tải ảnh lên...
                            </p>
                        </div>
                    )}
                </div>

                {/* Image list */}
                {productImages.length > 0 ? (
                    <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-4">
                            Đã tải lên ({productImages.length} ảnh)
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {productImages
                                .sort((a, b) => a.sort_order - b.sort_order)
                                .map((image, index) => (
                                    <div
                                        key={image.id}
                                        className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden border border-gray-200"
                                    >
                                        {/* Ảnh đại diện badge */}
                                        {image.sort_order === 1 && (
                                            <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-md z-10">
                                                Ảnh chính
                                            </div>
                                        )}

                                        <img
                                            src={image.url}
                                            alt={`Product ${index + 1}`}
                                            className="w-full h-48 object-cover"
                                        />

                                        <div className="p-3">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-sm font-medium text-gray-900">
                                                    Ảnh #{image.sort_order}
                                                </span>
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <div className="flex space-x-1">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleMoveImage(
                                                                image.id,
                                                                "up",
                                                            )
                                                        }
                                                        disabled={
                                                            image.sort_order ===
                                                            1
                                                        }
                                                        className={`p-1 rounded ${image.sort_order === 1 ? "text-gray-300 cursor-not-allowed" : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"}`}
                                                    >
                                                        <ChevronUpIcon className="h-5 w-5" />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleMoveImage(
                                                                image.id,
                                                                "down",
                                                            )
                                                        }
                                                        disabled={
                                                            image.sort_order ===
                                                            productImages.length
                                                        }
                                                        className={`p-1 rounded ${image.sort_order === productImages.length ? "text-gray-300 cursor-not-allowed" : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"}`}
                                                    >
                                                        <ChevronDownIcon className="h-5 w-5" />
                                                    </button>
                                                </div>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleRemoveImage(
                                                            image.id,
                                                        )
                                                    }
                                                    className="p-1 text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded"
                                                >
                                                    <TrashIcon className="h-5 w-5" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <PhotoIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">
                            Chưa có ảnh nào được tải lên
                        </p>
                    </div>
                )}
            </div>
        </div>
    );

    // Render Step 3: Variants & Pricing
    const renderStep3 = () => (
        <div className="space-y-6">
            {/* Attribute Selection */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                    <CubeIcon className="h-5 w-5 mr-2 text-blue-500" />
                    1. Chọn thuộc tính tạo biến thể
                </h3>

                <div className="mb-6">
                    <p className="text-sm text-gray-600 mb-4">
                        Chọn các thuộc tính từ danh mục để tạo biến thể sản phẩm
                    </p>

                    {categoryAttributes.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {categoryAttributes.map((attribute) => (
                                <div
                                    key={attribute.id}
                                    className="border border-gray-200 rounded-xl p-4"
                                >
                                    <label className="flex items-center justify-between mb-3">
                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={selectedAttributes.includes(
                                                    attribute.id,
                                                )}
                                                onChange={() =>
                                                    handleAttributeToggle(
                                                        attribute.id,
                                                    )
                                                }
                                                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                            />
                                            <span className="ml-3 font-medium text-gray-900">
                                                {attribute.name}
                                            </span>
                                        </div>
                                        <span className="text-xs text-gray-500">
                                            {attribute.type === "select"
                                                ? "Select"
                                                : "Text"}
                                        </span>
                                    </label>

                                    {selectedAttributes.includes(
                                        attribute.id,
                                    ) && (
                                        <div className="mt-3">
                                            <p className="text-sm text-gray-600 mb-2">
                                                Chọn giá trị:
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {attribute.options.map(
                                                    (option) => (
                                                        <button
                                                            key={option}
                                                            type="button"
                                                            onClick={() =>
                                                                handleAttributeOptionToggle(
                                                                    attribute.id,
                                                                    option,
                                                                )
                                                            }
                                                            className={`px-3 py-1.5 text-sm rounded-lg transition-all ${
                                                                attributeOptions[
                                                                    attribute.id
                                                                ]?.includes(
                                                                    option,
                                                                )
                                                                    ? "bg-blue-500 text-white"
                                                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                                            }`}
                                                        >
                                                            {option}
                                                        </button>
                                                    ),
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-6 bg-gray-50 rounded-xl">
                            <CubeIcon className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                            <p className="text-gray-500">
                                Danh mục này chưa có thuộc tính nào. Vui lòng
                                thêm thuộc tính trong quản lý danh mục trước.
                            </p>
                        </div>
                    )}
                </div>

                {/* Generate Button */}
                <div className="flex justify-center">
                    <button
                        type="button"
                        onClick={generateVariants}
                        disabled={selectedAttributes.length === 0}
                        className={`px-6 py-3 rounded-xl font-medium transition-all ${
                            selectedAttributes.length === 0
                                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                : "bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600"
                        }`}
                    >
                        <SparklesIcon className="h-5 w-5 inline mr-2" />
                        Tạo biến thể tự động
                    </button>
                </div>
            </div>

            {/* Variants Table */}
            {variants.length > 0 && (
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <div className="p-6 border-b border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                            <DocumentDuplicateIcon className="h-5 w-5 mr-2 text-blue-500" />
                            2. Bảng biến thể ({variants.length} biến thể)
                        </h3>

                        {/* Bulk Edit Controls */}
                        <div className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4">
                            <h4 className="text-sm font-medium text-gray-900 mb-3">
                                Chỉnh sửa hàng loạt:
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                                <div>
                                    <label className="block text-xs text-gray-500 mb-1">
                                        Giá
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="Nhập giá"
                                        onChange={(e) =>
                                            handleBulkEdit(
                                                "price",
                                                e.target.value,
                                            )
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-500 mb-1">
                                        Giá sale
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="Nhập giá sale"
                                        onChange={(e) =>
                                            handleBulkEdit(
                                                "sale_price",
                                                e.target.value,
                                            )
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-500 mb-1">
                                        Kho
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="Nhập số lượng"
                                        onChange={(e) =>
                                            handleBulkEdit(
                                                "stock",
                                                e.target.value,
                                            )
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-500 mb-1">
                                        Trạng thái
                                    </label>
                                    <select
                                        onChange={(e) =>
                                            handleBulkEdit(
                                                "is_active",
                                                e.target.value === "true",
                                            )
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                    >
                                        <option value="">Giữ nguyên</option>
                                        <option value="true">Kích hoạt</option>
                                        <option value="false">
                                            Vô hiệu hóa
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
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
                                        Kho
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Ảnh
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {variants.map((variant) => (
                                    <tr
                                        key={variant.id}
                                        className="hover:bg-gray-50"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">
                                                {variant.name}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <input
                                                type="text"
                                                value={variant.sku}
                                                onChange={(e) =>
                                                    handleVariantChange(
                                                        variant.id,
                                                        "sku",
                                                        e.target.value,
                                                    )
                                                }
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                            />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <input
                                                type="number"
                                                value={variant.price}
                                                onChange={(e) =>
                                                    handleVariantChange(
                                                        variant.id,
                                                        "price",
                                                        e.target.value,
                                                    )
                                                }
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                            />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <input
                                                type="number"
                                                value={variant.sale_price}
                                                onChange={(e) =>
                                                    handleVariantChange(
                                                        variant.id,
                                                        "sale_price",
                                                        e.target.value,
                                                    )
                                                }
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                            />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <input
                                                type="number"
                                                value={variant.stock}
                                                onChange={(e) =>
                                                    handleVariantChange(
                                                        variant.id,
                                                        "stock",
                                                        e.target.value,
                                                    )
                                                }
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                            />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center space-x-2">
                                                {variant.image_url ? (
                                                    <>
                                                        <img
                                                            src={
                                                                variant.image_url
                                                            }
                                                            alt=""
                                                            className="w-10 h-10 rounded object-cover"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleVariantChange(
                                                                    variant.id,
                                                                    "image_url",
                                                                    "",
                                                                )
                                                            }
                                                            className="text-rose-600 hover:text-rose-800"
                                                        >
                                                            <TrashIcon className="h-4 w-4" />
                                                        </button>
                                                    </>
                                                ) : (
                                                    <button
                                                        type="button"
                                                        className="text-sm text-blue-600 hover:text-blue-800"
                                                        onClick={() => {
                                                            // Trong thực tế, đây sẽ là logic upload ảnh cho variant
                                                            const url = prompt(
                                                                "Nhập URL ảnh cho biến thể:",
                                                            );
                                                            if (url) {
                                                                handleVariantChange(
                                                                    variant.id,
                                                                    "image_url",
                                                                    url,
                                                                );
                                                            }
                                                        }}
                                                    >
                                                        + Thêm ảnh
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );

    // Render Step 4: Technical Specs
    const renderStep4 = () => (
        <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-medium text-gray-900 flex items-center">
                        <CogIcon className="h-5 w-5 mr-2 text-blue-500" />
                        Thông số kỹ thuật
                    </h3>
                    <button
                        type="button"
                        onClick={handleAddSpecGroup}
                        className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600"
                    >
                        <PlusIcon className="h-5 w-5 mr-2" />
                        Thêm nhóm
                    </button>
                </div>

                {specGroups.length > 0 ? (
                    <div className="space-y-6">
                        {specGroups.map((group) => (
                            <div
                                key={group.id}
                                className="border border-gray-200 rounded-xl overflow-hidden"
                            >
                                <div className="bg-gradient-to-r from-gray-50 to-white p-4 border-b border-gray-200">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <input
                                                type="text"
                                                value={group.icon}
                                                onChange={(e) =>
                                                    handleSpecGroupChange(
                                                        group.id,
                                                        "icon",
                                                        e.target.value,
                                                    )
                                                }
                                                className="w-12 text-center text-2xl bg-transparent border-b border-gray-300"
                                            />
                                            <input
                                                type="text"
                                                value={group.name}
                                                onChange={(e) =>
                                                    handleSpecGroupChange(
                                                        group.id,
                                                        "name",
                                                        e.target.value,
                                                    )
                                                }
                                                className="ml-3 text-lg font-medium text-gray-900 bg-transparent border-b border-gray-300 px-2 py-1"
                                            />
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleAddSpec(group.id)
                                                }
                                                className="text-blue-600 hover:text-blue-800 p-1 hover:bg-blue-50 rounded"
                                            >
                                                <PlusIcon className="h-5 w-5" />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleRemoveSpecGroup(
                                                        group.id,
                                                    )
                                                }
                                                className="text-rose-600 hover:text-rose-800 p-1 hover:bg-rose-50 rounded"
                                            >
                                                <TrashIcon className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4">
                                    {specs.filter(
                                        (spec) => spec.group_id === group.id,
                                    ).length > 0 ? (
                                        <div className="space-y-3">
                                            {specs
                                                .filter(
                                                    (spec) =>
                                                        spec.group_id ===
                                                        group.id,
                                                )
                                                .map((spec) => (
                                                    <div
                                                        key={spec.id}
                                                        className="grid grid-cols-12 gap-3 items-center"
                                                    >
                                                        <div className="col-span-4">
                                                            <input
                                                                type="text"
                                                                value={
                                                                    spec.name
                                                                }
                                                                onChange={(e) =>
                                                                    handleSpecChange(
                                                                        spec.id,
                                                                        "name",
                                                                        e.target
                                                                            .value,
                                                                    )
                                                                }
                                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                                placeholder="Tên thông số"
                                                            />
                                                        </div>
                                                        <div className="col-span-7">
                                                            <input
                                                                type="text"
                                                                value={
                                                                    spec.value
                                                                }
                                                                onChange={(e) =>
                                                                    handleSpecChange(
                                                                        spec.id,
                                                                        "value",
                                                                        e.target
                                                                            .value,
                                                                    )
                                                                }
                                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                                placeholder="Giá trị"
                                                            />
                                                        </div>
                                                        <div className="col-span-1">
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    handleRemoveSpec(
                                                                        spec.id,
                                                                    )
                                                                }
                                                                className="text-rose-600 hover:text-rose-800 p-2 hover:bg-rose-50 rounded"
                                                            >
                                                                <TrashIcon className="h-5 w-5" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-6 text-gray-500">
                                            <p>
                                                Chưa có thông số nào trong nhóm
                                                này
                                            </p>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleAddSpec(group.id)
                                                }
                                                className="mt-2 text-blue-600 hover:text-blue-800 text-sm"
                                            >
                                                + Thêm thông số đầu tiên
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 bg-gray-50 rounded-xl">
                        <CogIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 mb-4">
                            Chưa có nhóm thông số kỹ thuật nào
                        </p>
                        <button
                            type="button"
                            onClick={handleAddSpecGroup}
                            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600"
                        >
                            <PlusIcon className="h-5 w-5 mr-2" />
                            Thêm nhóm đầu tiên
                        </button>
                    </div>
                )}
            </div>
        </div>
    );

    // Render Step 5: Preview & Save
    const renderStep5 = () => {
        const priceRange = getPriceRange();

        return (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left column - Preview */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-6 flex items-center">
                            <EyeIcon className="h-5 w-5 mr-2 text-blue-500" />
                            Xem trước sản phẩm
                        </h3>

                        {/* Product preview */}
                        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 mb-6">
                            {/* Product images */}
                            <div className="mb-6">
                                {productImages.length > 0 ? (
                                    <div className="flex space-x-4 overflow-x-auto pb-4">
                                        {productImages
                                            .slice(0, 4)
                                            .map((image, index) => (
                                                <div
                                                    key={image.id}
                                                    className="flex-shrink-0"
                                                >
                                                    <img
                                                        src={image.url}
                                                        alt={`Preview ${index + 1}`}
                                                        className="w-48 h-48 rounded-xl object-cover shadow-md"
                                                    />
                                                </div>
                                            ))}
                                    </div>
                                ) : (
                                    <div className="w-full h-48 bg-gray-200 rounded-xl flex items-center justify-center">
                                        <PhotoIcon className="h-12 w-12 text-gray-400" />
                                    </div>
                                )}
                            </div>

                            {/* Product name and price */}
                            <div className="mb-6">
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                    {basicInfo.name || "Tên sản phẩm"}
                                </h2>
                                <div className="flex items-center mb-4">
                                    <span className="text-3xl font-bold text-blue-600">
                                        {formatPrice(priceRange.min)}
                                    </span>
                                    {priceRange.max > priceRange.min && (
                                        <>
                                            <span className="mx-2 text-gray-400">
                                                -
                                            </span>
                                            <span className="text-3xl font-bold text-blue-600">
                                                {formatPrice(priceRange.max)}
                                            </span>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Variants preview */}
                            {variants.length > 0 && (
                                <div className="mb-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-3">
                                        Các biến thể có sẵn:
                                    </h3>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                        {variants.slice(0, 6).map((variant) => (
                                            <div
                                                key={variant.id}
                                                className="border border-gray-200 rounded-lg p-3"
                                            >
                                                <div className="text-sm font-medium text-gray-900 mb-1">
                                                    {variant.name}
                                                </div>
                                                <div className="text-lg font-bold text-blue-600">
                                                    {formatPrice(
                                                        variant.sale_price ||
                                                            variant.price,
                                                    )}
                                                </div>
                                                <div className="text-xs text-gray-500 mt-1">
                                                    SKU: {variant.sku}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    {variants.length > 6 && (
                                        <p className="text-sm text-gray-500 mt-3">
                                            + {variants.length - 6} biến thể
                                            khác
                                        </p>
                                    )}
                                </div>
                            )}

                            {/* Specs preview */}
                            {specs.length > 0 && (
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-3">
                                        Thông số kỹ thuật:
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {specGroups.map((group) => {
                                            const groupSpecs = specs.filter(
                                                (spec) =>
                                                    spec.group_id === group.id,
                                            );
                                            if (groupSpecs.length === 0)
                                                return null;

                                            return (
                                                <div
                                                    key={group.id}
                                                    className="border border-gray-200 rounded-lg p-4"
                                                >
                                                    <div className="flex items-center mb-3">
                                                        <span className="text-xl mr-2">
                                                            {group.icon}
                                                        </span>
                                                        <h4 className="font-medium text-gray-900">
                                                            {group.name}
                                                        </h4>
                                                    </div>
                                                    <div className="space-y-2">
                                                        {groupSpecs
                                                            .slice(0, 3)
                                                            .map((spec) => (
                                                                <div
                                                                    key={
                                                                        spec.id
                                                                    }
                                                                    className="flex justify-between"
                                                                >
                                                                    <span className="text-sm text-gray-600">
                                                                        {
                                                                            spec.name
                                                                        }
                                                                    </span>
                                                                    <span className="text-sm font-medium text-gray-900">
                                                                        {
                                                                            spec.value
                                                                        }
                                                                    </span>
                                                                </div>
                                                            ))}
                                                        {groupSpecs.length >
                                                            3 && (
                                                            <p className="text-xs text-gray-500 mt-2">
                                                                +{" "}
                                                                {groupSpecs.length -
                                                                    3}{" "}
                                                                thông số khác
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Status check */}
                        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-100 p-6">
                            <h4 className="text-lg font-medium text-emerald-900 mb-4">
                                Kiểm tra trạng thái:
                            </h4>
                            <div className="space-y-3">
                                <div className="flex items-center">
                                    <div
                                        className={`h-6 w-6 rounded-full flex items-center justify-center mr-3 ${basicInfo.name ? "bg-emerald-100 text-emerald-600" : "bg-rose-100 text-rose-600"}`}
                                    >
                                        {basicInfo.name ? (
                                            <CheckCircleIcon className="h-4 w-4" />
                                        ) : (
                                            <XMarkIcon className="h-4 w-4" />
                                        )}
                                    </div>
                                    <span className="text-sm text-gray-900">
                                        Thông tin sản phẩm
                                    </span>
                                </div>
                                <div className="flex items-center">
                                    <div
                                        className={`h-6 w-6 rounded-full flex items-center justify-center mr-3 ${productImages.length > 0 ? "bg-emerald-100 text-emerald-600" : "bg-rose-100 text-rose-600"}`}
                                    >
                                        {productImages.length > 0 ? (
                                            <CheckCircleIcon className="h-4 w-4" />
                                        ) : (
                                            <XMarkIcon className="h-4 w-4" />
                                        )}
                                    </div>
                                    <span className="text-sm text-gray-900">
                                        Hình ảnh sản phẩm (
                                        {productImages.length} ảnh)
                                    </span>
                                </div>
                                <div className="flex items-center">
                                    <div
                                        className={`h-6 w-6 rounded-full flex items-center justify-center mr-3 ${variants.length > 0 ? "bg-emerald-100 text-emerald-600" : "bg-rose-100 text-rose-600"}`}
                                    >
                                        {variants.length > 0 ? (
                                            <CheckCircleIcon className="h-4 w-4" />
                                        ) : (
                                            <XMarkIcon className="h-4 w-4" />
                                        )}
                                    </div>
                                    <span className="text-sm text-gray-900">
                                        Biến thể & Giá ({variants.length} biến
                                        thể)
                                    </span>
                                </div>
                                <div className="flex items-center">
                                    <div
                                        className={`h-6 w-6 rounded-full flex items-center justify-center mr-3 ${specs.length > 0 ? "bg-emerald-100 text-emerald-600" : "bg-rose-100 text-rose-600"}`}
                                    >
                                        {specs.length > 0 ? (
                                            <CheckCircleIcon className="h-4 w-4" />
                                        ) : (
                                            <XMarkIcon className="h-4 w-4" />
                                        )}
                                    </div>
                                    <span className="text-sm text-gray-900">
                                        Thông số kỹ thuật ({specs.length} thông
                                        số)
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
                            Tóm tắt
                        </h3>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-sm text-gray-600">
                                    Tên sản phẩm:
                                </span>
                                <span className="text-sm font-medium text-gray-900 truncate ml-2">
                                    {basicInfo.name || "Chưa có"}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-gray-600">
                                    Danh mục:
                                </span>
                                <span className="text-sm font-medium text-gray-900">
                                    {categories.find(
                                        (c) => c.id === basicInfo.category_id,
                                    )?.name || "Chưa chọn"}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-gray-600">
                                    Thương hiệu:
                                </span>
                                <span className="text-sm font-medium text-gray-900">
                                    {brands.find(
                                        (b) => b.id === basicInfo.brand_id,
                                    )?.name || "Chưa chọn"}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-gray-600">
                                    SKU base:
                                </span>
                                <span className="text-sm font-medium text-gray-900">
                                    {basicInfo.sku_base || "Chưa có"}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-gray-600">
                                    Số ảnh:
                                </span>
                                <span className="text-sm font-medium text-gray-900">
                                    {productImages.length}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-gray-600">
                                    Số biến thể:
                                </span>
                                <span className="text-sm font-medium text-gray-900">
                                    {variants.length}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-gray-600">
                                    Giá từ:
                                </span>
                                <span className="text-sm font-bold text-blue-600">
                                    {formatPrice(priceRange.min)}
                                </span>
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
                                onClick={handlePublish}
                                disabled={
                                    loading ||
                                    !basicInfo.name ||
                                    productImages.length === 0 ||
                                    variants.length === 0
                                }
                                className="w-full px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl hover:from-emerald-600 hover:to-teal-600 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                                {loading ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3 inline-block"></div>
                                        Đang xử lý...
                                    </>
                                ) : (
                                    "Xuất bản sản phẩm"
                                )}
                            </button>

                            <Link
                                to="/admin/products"
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
                                Mẹo xuất bản
                            </h3>
                        </div>
                        <ul className="text-sm text-amber-700 space-y-2">
                            <li>• Kiểm tra kỹ thông tin trước khi xuất bản</li>
                            <li>• Đảm bảo giá cả hợp lý với thị trường</li>
                            <li>• Thêm đầy đủ hình ảnh chất lượng cao</li>
                            <li>• Cập nhật số lượng tồn kho chính xác</li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    };

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
            case 5:
                return renderStep5();
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
                        Đang tải dữ liệu sản phẩm...
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
                        to="/admin/products"
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4 group"
                    >
                        <ArrowLeftIcon className="h-5 w-5 mr-2 transition-transform group-hover:-translate-x-1" />
                        Quay lại danh sách sản phẩm
                    </Link>

                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                {isEditMode
                                    ? "Chỉnh Sửa Sản Phẩm"
                                    : "Tạo Sản Phẩm Mới"}
                            </h1>
                            <p className="text-gray-600 mt-2">
                                {isEditMode
                                    ? "Cập nhật thông tin sản phẩm"
                                    : "Thêm sản phẩm mới vào cửa hàng"}
                            </p>
                        </div>

                        <div className="flex items-center space-x-3">
                            <div
                                className={`px-3 py-1 rounded-full text-sm font-medium ${
                                    saveStatus === "published"
                                        ? "bg-emerald-100 text-emerald-800"
                                        : "bg-blue-100 text-blue-800"
                                }`}
                            >
                                {saveStatus === "published"
                                    ? "Đã xuất bản"
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
                            {currentStep < 5 ? (
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
                                            ? "Hình ảnh"
                                            : currentStep === 2
                                              ? "Biến thể & Giá"
                                              : currentStep === 3
                                                ? "Thông số kỹ thuật"
                                                : "Xem trước & Lưu"}
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
                                        onClick={handlePublish}
                                        disabled={
                                            !basicInfo.name ||
                                            productImages.length === 0 ||
                                            variants.length === 0
                                        }
                                        className={`px-6 py-3 rounded-xl transition-all ${
                                            !basicInfo.name ||
                                            productImages.length === 0 ||
                                            variants.length === 0
                                                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                                : "bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600"
                                        }`}
                                    >
                                        Xuất bản sản phẩm
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

export default ProductForm;
