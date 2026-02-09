// src/utils/menuConfig.js
import {
    HomeIcon,
    ShoppingCartIcon,
    UserGroupIcon,
    DevicePhoneMobileIcon,
    CubeIcon,
    TagIcon,
    MegaphoneIcon,
    ChartBarIcon,
    CogIcon,
    RectangleStackIcon,
    ReceiptPercentIcon,
    UserCircleIcon,
} from "@heroicons/react/24/outline";
import { ROLES } from "./roles";

export const MENU_CONFIG = [
    {
        heading: "Tổng quan",
        items: [
            {
                name: "Bảng điều khiển",
                icon: HomeIcon,
                href: "/admin",
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
                allowedRoles: [
                    ROLES.ADMIN,
                    ROLES.ORDER_MANAGER,
                    ROLES.CUSTOMER_SUPPORT,
                ],
            },
            {
                name: "Khách hàng",
                icon: UserGroupIcon,
                href: "/admin/customers",
                allowedRoles: [
                    ROLES.ADMIN,
                    ROLES.ORDER_MANAGER,
                    ROLES.CUSTOMER_SUPPORT,
                ],
            },
        ],
    },
    {
        heading: "Quản lý sản phẩm",
        items: [
            {
                name: "Sản phẩm",
                icon: DevicePhoneMobileIcon,
                key: "products",
                collapsed: true,
                allowedRoles: [
                    ROLES.ADMIN,
                    ROLES.PRODUCT_MANAGER,
                    ROLES.CONTENT_EDITOR,
                ],
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
                allowedRoles: [ROLES.ADMIN, ROLES.PRODUCT_MANAGER],
            },
        ],
    },
    {
        heading: "Quản lý kho",
        items: [
            {
                name: "Kho hàng",
                icon: CubeIcon,
                key: "inventory",
                collapsed: true,
                allowedRoles: [
                    ROLES.ADMIN,
                    ROLES.WAREHOUSE_STAFF,
                    ROLES.INVENTORY_MANAGER,
                ],
                subItems: [
                    { name: "Tồn kho", href: "/admin/inventory" },
                    { name: "Nhập hàng", href: "/admin/inventory/receipts" },
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
                allowedRoles: [ROLES.ADMIN, ROLES.MARKETING_STAFF],
            },
            {
                name: "Khuyến mãi",
                icon: ReceiptPercentIcon,
                key: "marketing",
                collapsed: true,
                allowedRoles: [
                    ROLES.ADMIN,
                    ROLES.PROMOTION_MANAGER,
                    ROLES.MARKETING_STAFF,
                ],
                subItems: [
                    { name: "Mã giảm giá", href: "/admin/discounts" },
                    {
                        name: "Sản phẩm khuyến mãi",
                        href: "/admin/campaign-products",
                    },
                ],
            },
            {
                name: "Quảng cáo (Banner)",
                icon: RectangleStackIcon,
                href: "/admin/banners",
                allowedRoles: [ROLES.ADMIN, ROLES.MARKETING_STAFF],
            },
        ],
    },
    {
        heading: "Hệ thống & Phân quyền",
        items: [
            {
                name: "Người dùng",
                icon: UserCircleIcon,
                key: "system",
                collapsed: true,
                allowedRoles: [ROLES.ADMIN],
                subItems: [
                    { name: "Tài khoản", href: "/admin/users" },
                    { name: "Vai trò", href: "/admin/roles" },
                    { name: "Quyền hạn", href: "/admin/permissions" },
                ],
            },
            {
                name: "Cấu hình",
                icon: CogIcon,
                key: "settings",
                collapsed: true,
                allowedRoles: [ROLES.ADMIN],
                subItems: [
                    { name: "Chung", href: "/admin/settings/general" },
                    { name: "Vận chuyển", href: "/admin/settings/shipping" },
                    { name: "Thanh toán", href: "/admin/settings/payment" },
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
                key: "reports",
                collapsed: true,
                allowedRoles: [ROLES.ADMIN, ROLES.ORDER_MANAGER],
                subItems: [
                    { name: "Doanh thu", href: "/admin/reports/sales" },
                    { name: "Sản phẩm", href: "/admin/reports/products" },
                    { name: "Khách hàng", href: "/admin/reports/customers" },
                ],
            },
        ],
    },
];
