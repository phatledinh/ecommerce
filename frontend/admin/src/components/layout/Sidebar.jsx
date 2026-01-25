import { useState } from "react";
import {
    HomeIcon,
    ShoppingCartIcon,
    UserGroupIcon,
    DevicePhoneMobileIcon,
    ChevronDownIcon,
    ChevronRightIcon,
    CubeIcon,
    TagIcon,
    MegaphoneIcon,
    ChartBarIcon,
    CogIcon,
    ShieldCheckIcon,
    Bars3Icon,
    RectangleStackIcon,
    ReceiptPercentIcon,
    TruckIcon,
    ClipboardDocumentCheckIcon,
    KeyIcon,
    UserCircleIcon,
    Squares2X2Icon,
} from "@heroicons/react/24/outline";

const Sidebar = ({ onSidebarToggle }) => {
    const [expandedSections, setExpandedSections] = useState({
        products: false,
        inventory: false,
        marketing: false,
        reports: false,
        system: false,
    });

    const toggleSection = (section) => {
        setExpandedSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    const menuSections = [
        {
            heading: "Tổng quan",
            items: [
                {
                    name: "Bảng điều khiển",
                    icon: HomeIcon,
                    href: "/admin",
                    active: true,
                },
            ],
        },
        {
            heading: "Quản lý bán hàng",
            items: [
                {
                    name: "Đơn hàng",
                    icon: ShoppingCartIcon,
                    href: "/admin/orders",
                },
                {
                    name: "Khách hàng",
                    icon: UserGroupIcon,
                    href: "/admin/customers",
                },
            ],
        },
        {
            heading: "Quản lý sản phẩm",
            color: "from-purple-500 to-pink-400",
            items: [
                {
                    name: "Sản phẩm",
                    icon: DevicePhoneMobileIcon,
                    collapsed: true,
                    key: "products",
                    subItems: [
                        { name: "Tất cả sản phẩm", href: "/admin/products" },
                        { name: "Danh mục", href: "/admin/categories" },
                        { name: "Thương hiệu", href: "/admin/brands" },
                        { name: "Biến thể", href: "/admin/variants" },
                        { name: "Đánh giá", href: "/admin/reviews" },
                    ],
                },
                {
                    name: "Thuộc tính",
                    icon: TagIcon,
                    href: "/admin/attributes",
                },
            ],
        },
        {
            heading: "Quản lý kho",
            items: [
                {
                    name: "Kho hàng",
                    icon: CubeIcon,
                    collapsed: true,
                    key: "inventory",
                    subItems: [
                        { name: "Tồn kho", href: "/admin/inventory" },
                        {
                            name: "Nhập hàng",
                            href: "/admin/inventory/receipts",
                        },
                        { name: "Nhật ký kho", href: "/admin/inventory/logs" },
                        { name: "Nhà cung cấp", href: "/admin/suppliers" },
                    ],
                },
            ],
        },
        {
            heading: "Marketing & Khuyến mãi",
            items: [
                {
                    name: "Chiến dịch",
                    icon: MegaphoneIcon,
                    href: "/admin/campaigns",
                },
                {
                    name: "Khuyến mãi",
                    icon: ReceiptPercentIcon,
                    collapsed: true,
                    key: "marketing",
                    subItems: [
                        { name: "Mã giảm giá", href: "/admin/discounts" },
                        {
                            name: "Sản phẩm khuyến mãi",
                            href: "/admin/campaign-products",
                        },
                    ],
                },
                {
                    name: "Quảng cáo",
                    icon: RectangleStackIcon,
                    href: "/admin/banners",
                },
            ],
        },
        {
            heading: "Hệ thống & Phân quyền",
            items: [
                {
                    name: "Người dùng",
                    icon: UserCircleIcon,
                    collapsed: true,
                    key: "system",
                    subItems: [
                        { name: "Tài khoản", href: "/admin/users" },
                        { name: "Vai trò", href: "/admin/roles" },
                        { name: "Quyền hạn", href: "/admin/permissions" },
                    ],
                },
                {
                    name: "Cấu hình",
                    icon: CogIcon,
                    collapsed: true,
                    key: "settings",
                    subItems: [
                        { name: "Chung", href: "/admin/settings/general" },
                        {
                            name: "Vận chuyển",
                            href: "/admin/settings/shipping",
                        },
                        { name: "Thanh toán", href: "/admin/settings/payment" },
                        {
                            name: "Địa chỉ người dùng",
                            href: "/admin/user-addresses",
                        },
                    ],
                },
            ],
        },
        {
            heading: "Báo cáo & Phân tích",
            items: [
                {
                    name: "Báo cáo",
                    icon: ChartBarIcon,
                    collapsed: true,
                    key: "reports",
                    subItems: [
                        { name: "Doanh thu", href: "/admin/reports/sales" },
                        { name: "Sản phẩm", href: "/admin/reports/products" },
                        {
                            name: "Khách hàng",
                            href: "/admin/reports/customers",
                        },
                        {
                            name: "Giao dịch",
                            href: "/admin/reports/transactions",
                        },
                    ],
                },
            ],
        },
    ];

    return (
        <nav className="bg-gray-900 text-gray-300 w-64 min-h-screen flex flex-col flex-shrink-0">
            <div className="flex-1 overflow-y-auto">
                <div className="p-4">
                    {/* Logo/Brand */}
                    <div className="flex items-center justify-between mb-8">
                        <div className="text-xl font-bold text-white">
                            DPShop Admin
                        </div>
                        {/* Sidebar Toggle */}
                        <button
                            onClick={onSidebarToggle}
                            className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                            aria-label="Toggle sidebar"
                        >
                            <Bars3Icon className="h-6 w-6" />
                        </button>
                    </div>
                    {/* Menu Items */}
                    <div className="space-y-6">
                        {menuSections.map((section, sectionIndex) => (
                            <div key={sectionIndex}>
                                {/* Section Heading */}
                                {section.heading && (
                                    <div className="px-3 mb-2">
                                        <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                                            {section.heading}
                                        </h3>
                                    </div>
                                )}

                                {/* Menu Items */}
                                <div className="space-y-1">
                                    {section.items.map((item, itemIndex) => (
                                        <div key={itemIndex}>
                                            {item.collapsed ? (
                                                // Collapsible Item
                                                <div>
                                                    <button
                                                        onClick={() =>
                                                            toggleSection(
                                                                item.key,
                                                            )
                                                        }
                                                        className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors hover:bg-gray-800 hover:text-white ${
                                                            expandedSections[
                                                                item.key
                                                            ]
                                                                ? "bg-gray-800 text-white"
                                                                : ""
                                                        }`}
                                                    >
                                                        <div className="flex items-center">
                                                            <item.icon className="h-5 w-5 mr-3" />
                                                            <span>
                                                                {item.name}
                                                            </span>
                                                        </div>
                                                        {expandedSections[
                                                            item.key
                                                        ] ? (
                                                            <ChevronDownIcon className="h-4 w-4" />
                                                        ) : (
                                                            <ChevronRightIcon className="h-4 w-4" />
                                                        )}
                                                    </button>

                                                    {/* Submenu Items */}
                                                    {expandedSections[
                                                        item.key
                                                    ] && (
                                                        <div className="mt-1 ml-4 space-y-1">
                                                            {item.subItems.map(
                                                                (
                                                                    subItem,
                                                                    subIndex,
                                                                ) => (
                                                                    <a
                                                                        key={
                                                                            subIndex
                                                                        }
                                                                        href={
                                                                            subItem.href
                                                                        }
                                                                        className="block px-3 py-2 text-sm rounded-lg transition-colors hover:bg-gray-800 hover:text-white"
                                                                    >
                                                                        {
                                                                            subItem.name
                                                                        }
                                                                    </a>
                                                                ),
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            ) : (
                                                // Regular Link Item
                                                <a
                                                    href={item.href}
                                                    className={`flex items-center px-3 py-2 text-sm rounded-lg transition-colors hover:bg-gray-800 hover:text-white ${
                                                        item.active
                                                            ? "bg-gray-800 text-white"
                                                            : ""
                                                    }`}
                                                >
                                                    <item.icon className="h-5 w-5 mr-3" />
                                                    <span>{item.name}</span>
                                                </a>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
};

// Mobile Sidebar Version
export const MobileSidebar = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                onClick={onClose}
            />

            {/* Sidebar */}
            <div className="fixed inset-y-0 left-0 z-50 w-64 lg:hidden">
                <div className="relative h-full">
                    <Sidebar />

                    {/* Close Button for Mobile */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white lg:hidden"
                    >
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
