// pages/orders/OrderList.jsx
import { useState } from "react";
import {
    MagnifyingGlassIcon,
    FunnelIcon,
    ArrowDownTrayIcon,
    EyeIcon,
    CheckCircleIcon,
    XCircleIcon,
    ClockIcon,
    TruckIcon,
    CheckBadgeIcon,
    ArrowPathIcon,
    CurrencyDollarIcon,
    BanknotesIcon,
    CreditCardIcon,
    PhoneIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const OrderList = () => {
    const [filters, setFilters] = useState({
        orderId: "",
        customerPhone: "",
        orderStatus: "all",
        paymentStatus: "all",
        paymentMethod: "all",
        dateFrom: "2023-10-20",
        dateTo: "2023-10-27",
    });

    const [selectedOrders, setSelectedOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Dữ liệu mẫu - thực tế sẽ fetch từ API
    const orders = [
        {
            id: "ORD-10234",
            customerName: "John Doe",
            customerPhone: "0901234567",
            customerEmail: "john@example.com",
            date: "2023-10-27",
            totalAmount: 120.5,
            orderStatus: "new",
            paymentStatus: "paid",
            paymentMethod: "credit_card",
            items: 2,
            shippingAddress: "123 Main St, Hanoi",
        },
        {
            id: "ORD-10235",
            customerName: "Jane Smith",
            customerPhone: "0907654321",
            customerEmail: "jane@example.com",
            date: "2023-10-26",
            totalAmount: 45.0,
            orderStatus: "processing",
            paymentStatus: "paid",
            paymentMethod: "paypal",
            items: 1,
            shippingAddress: "456 Oak Ave, HCMC",
        },
        {
            id: "ORD-10236",
            customerName: "Robert Johnson",
            customerPhone: "0901122334",
            customerEmail: "robert@example.com",
            date: "2023-10-26",
            totalAmount: 210.75,
            orderStatus: "cancelled",
            paymentStatus: "unpaid",
            paymentMethod: "bank_transfer",
            items: 3,
            shippingAddress: "789 Pine Rd, Da Nang",
        },
        {
            id: "ORD-10237",
            customerName: "Emily Davis",
            customerPhone: "0904455667",
            customerEmail: "emily@example.com",
            date: "2023-10-25",
            totalAmount: 89.9,
            orderStatus: "shipped",
            paymentStatus: "paid",
            paymentMethod: "credit_card",
            items: 2,
            shippingAddress: "321 Elm St, Hai Phong",
        },
        {
            id: "ORD-10238",
            customerName: "Michael Brown",
            customerPhone: "0907788990",
            customerEmail: "michael@example.com",
            date: "2023-10-24",
            totalAmount: 15.2,
            orderStatus: "processing",
            paymentStatus: "paid",
            paymentMethod: "paypal",
            items: 1,
            shippingAddress: "654 Maple Dr, Can Tho",
        },
        // Thêm nhiều đơn hàng khác...
    ];

    const orderStatusOptions = [
        { value: "all", label: "Tất cả trạng thái" },
        { value: "new", label: "Mới", color: "bg-blue-100 text-blue-800" },
        {
            value: "paid",
            label: "Đã thanh toán",
            color: "bg-purple-100 text-purple-800",
        },
        {
            value: "processing",
            label: "Đang xử lý",
            color: "bg-yellow-100 text-yellow-800",
        },
        {
            value: "shipped",
            label: "Đang giao hàng",
            color: "bg-indigo-100 text-indigo-800",
        },
        {
            value: "completed",
            label: "Hoàn thành",
            color: "bg-green-100 text-green-800",
        },
        {
            value: "cancelled",
            label: "Đã hủy",
            color: "bg-red-100 text-red-800",
        },
        {
            value: "refunded",
            label: "Đã hoàn tiền",
            color: "bg-gray-100 text-gray-800",
        },
    ];

    const paymentStatusOptions = [
        { value: "all", label: "Tất cả trạng thái" },
        {
            value: "unpaid",
            label: "Chưa thanh toán",
            color: "bg-red-100 text-red-800",
        },
        {
            value: "paid",
            label: "Đã thanh toán",
            color: "bg-green-100 text-green-800",
        },
        {
            value: "failed",
            label: "Thất bại",
            color: "bg-orange-100 text-orange-800",
        },
        {
            value: "refunded",
            label: "Đã hoàn tiền",
            color: "bg-gray-100 text-gray-800",
        },
    ];

    const paymentMethodOptions = [
        { value: "all", label: "Tất cả phương thức" },
        { value: "cod", label: "Thanh toán khi nhận hàng" },
        { value: "vnpay", label: "VNPAY" },
        { value: "momo", label: "MOMO" },
        { value: "banking", label: "Chuyển khoản ngân hàng" },
        { value: "credit_card", label: "Thẻ tín dụng" },
        { value: "paypal", label: "PayPal" },
    ];

    const getStatusBadge = (status, type = "order") => {
        const statusMap = {
            order: {
                new: { label: "Mới", className: "bg-blue-100 text-blue-800" },
                paid: {
                    label: "Đã thanh toán",
                    className: "bg-purple-100 text-purple-800",
                },
                processing: {
                    label: "Đang xử lý",
                    className: "bg-yellow-100 text-yellow-800",
                },
                shipped: {
                    label: "Đang giao hàng",
                    className: "bg-indigo-100 text-indigo-800",
                },
                completed: {
                    label: "Hoàn thành",
                    className: "bg-green-100 text-green-800",
                },
                cancelled: {
                    label: "Đã hủy",
                    className: "bg-red-100 text-red-800",
                },
                refunded: {
                    label: "Đã hoàn tiền",
                    className: "bg-gray-100 text-gray-800",
                },
            },
            payment: {
                unpaid: {
                    label: "Chưa thanh toán",
                    className: "bg-red-100 text-red-800",
                },
                paid: {
                    label: "Đã thanh toán",
                    className: "bg-green-100 text-green-800",
                },
                failed: {
                    label: "Thất bại",
                    className: "bg-orange-100 text-orange-800",
                },
                refunded: {
                    label: "Đã hoàn tiền",
                    className: "bg-gray-100 text-gray-800",
                },
            },
        };

        const statusInfo = statusMap[type][status] || {
            label: status,
            className: "bg-gray-100 text-gray-800",
        };
        return (
            <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusInfo.className}`}
            >
                {statusInfo.label}
            </span>
        );
    };

    const getPaymentMethodIcon = (method) => {
        switch (method) {
            case "credit_card":
                return <CreditCardIcon className="h-4 w-4 mr-1" />;
            case "paypal":
                return <CurrencyDollarIcon className="h-4 w-4 mr-1" />;
            case "bank_transfer":
                return <BanknotesIcon className="h-4 w-4 mr-1" />;
            case "cod":
                return <PhoneIcon className="h-4 w-4 mr-1" />;
            default:
                return <CurrencyDollarIcon className="h-4 w-4 mr-1" />;
        }
    };

    const handleFilterChange = (field, value) => {
        setFilters((prev) => ({ ...prev, [field]: value }));
    };

    const handleResetFilters = () => {
        setFilters({
            orderId: "",
            customerPhone: "",
            orderStatus: "all",
            paymentStatus: "all",
            paymentMethod: "all",
            dateFrom: "",
            dateTo: "",
        });
    };

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedOrders(orders.map((order) => order.id));
        } else {
            setSelectedOrders([]);
        }
    };

    const handleSelectOrder = (orderId) => {
        setSelectedOrders((prev) =>
            prev.includes(orderId)
                ? prev.filter((id) => id !== orderId)
                : [...prev, orderId],
        );
    };

    const handleBulkAction = (action) => {
        // Xử lý hành động hàng loạt
        console.log(`Bulk ${action} for orders:`, selectedOrders);
    };

    return (
        <div className="p-6">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">
                    Quản lý Đơn hàng
                </h1>
                <p className="text-gray-600">
                    Theo dõi và quản lý toàn bộ đơn hàng của cửa hàng
                </p>
            </div>

            {/* Filter Section */}
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-800">
                        Bộ lọc & Tìm kiếm
                    </h2>
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={handleResetFilters}
                            className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900"
                        >
                            Reset bộ lọc
                        </button>
                        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                            <MagnifyingGlassIcon className="h-4 w-4 mr-2" />
                            Tìm kiếm
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Order ID Filter */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Mã đơn hàng
                        </label>
                        <input
                            type="text"
                            value={filters.orderId}
                            onChange={(e) =>
                                handleFilterChange("orderId", e.target.value)
                            }
                            placeholder="Nhập mã đơn hàng"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Customer Phone Filter */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Số điện thoại khách hàng
                        </label>
                        <input
                            type="text"
                            value={filters.customerPhone}
                            onChange={(e) =>
                                handleFilterChange(
                                    "customerPhone",
                                    e.target.value,
                                )
                            }
                            placeholder="Nhập số điện thoại"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Order Status Filter */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Trạng thái đơn hàng
                        </label>
                        <select
                            value={filters.orderStatus}
                            onChange={(e) =>
                                handleFilterChange(
                                    "orderStatus",
                                    e.target.value,
                                )
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            {orderStatusOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Payment Status Filter */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Trạng thái thanh toán
                        </label>
                        <select
                            value={filters.paymentStatus}
                            onChange={(e) =>
                                handleFilterChange(
                                    "paymentStatus",
                                    e.target.value,
                                )
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            {paymentStatusOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Payment Method Filter */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Phương thức thanh toán
                        </label>
                        <select
                            value={filters.paymentMethod}
                            onChange={(e) =>
                                handleFilterChange(
                                    "paymentMethod",
                                    e.target.value,
                                )
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            {paymentMethodOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Date Range Filter */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Từ ngày
                        </label>
                        <input
                            type="date"
                            value={filters.dateFrom}
                            onChange={(e) =>
                                handleFilterChange("dateFrom", e.target.value)
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Đến ngày
                        </label>
                        <input
                            type="date"
                            value={filters.dateTo}
                            onChange={(e) =>
                                handleFilterChange("dateTo", e.target.value)
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>
            </div>

            {/* Bulk Actions */}
            {selectedOrders.length > 0 && (
                <div className="bg-blue-50 p-4 rounded-lg mb-6 flex items-center justify-between">
                    <div className="flex items-center">
                        <span className="text-blue-700 font-medium">
                            Đã chọn {selectedOrders.length} đơn hàng
                        </span>
                    </div>
                    <div className="flex space-x-2">
                        <select
                            onChange={(e) => handleBulkAction(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            defaultValue=""
                        >
                            <option value="" disabled>
                                Chọn hành động
                            </option>
                            <option value="confirm">Xác nhận đơn hàng</option>
                            <option value="cancel">Hủy đơn hàng</option>
                            <option value="print">In vận đơn</option>
                            <option value="export">Xuất dữ liệu</option>
                        </select>
                        <button
                            onClick={() => handleBulkAction("confirm")}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                        >
                            Áp dụng
                        </button>
                    </div>
                </div>
            )}

            {/* Orders Table */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    <input
                                        type="checkbox"
                                        checked={
                                            selectedOrders.length ===
                                            orders.length
                                        }
                                        onChange={handleSelectAll}
                                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Mã đơn
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Khách hàng
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Ngày đặt
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Tổng tiền
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Trạng thái đơn
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Trạng thái thanh toán
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Phương thức
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Thao tác
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {orders.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <input
                                            type="checkbox"
                                            checked={selectedOrders.includes(
                                                order.id,
                                            )}
                                            onChange={() =>
                                                handleSelectOrder(order.id)
                                            }
                                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="font-medium text-gray-900">
                                            {order.id}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {order.items} sản phẩm
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-gray-900">
                                            {order.customerName}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {order.customerPhone}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {order.date}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="font-semibold text-gray-900">
                                            ${order.totalAmount.toFixed(2)}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {getStatusBadge(
                                            order.orderStatus,
                                            "order",
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {getStatusBadge(
                                            order.paymentStatus,
                                            "payment",
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            {getPaymentMethodIcon(
                                                order.paymentMethod,
                                            )}
                                            <span className="text-sm text-gray-600">
                                                {paymentMethodOptions.find(
                                                    (m) =>
                                                        m.value ===
                                                        order.paymentMethod,
                                                )?.label || order.paymentMethod}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <Link
                                            to={`/admin/orders/${order.id}`}
                                            className="text-blue-600 hover:text-blue-900 mr-3"
                                        >
                                            <EyeIcon className="h-5 w-5 inline" />
                                        </Link>
                                        <button className="text-gray-600 hover:text-gray-900">
                                            <ArrowDownTrayIcon className="h-5 w-5 inline" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                    <div className="flex-1 flex justify-between sm:hidden">
                        <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                            Previous
                        </button>
                        <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                            Next
                        </button>
                    </div>
                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm text-gray-700">
                                Hiển thị <span className="font-medium">1</span>{" "}
                                đến <span className="font-medium">5</span> trong
                                tổng số <span className="font-medium">50</span>{" "}
                                đơn hàng
                            </p>
                        </div>
                        <div>
                            <nav
                                className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                                aria-label="Pagination"
                            >
                                <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                    <span className="sr-only">Previous</span>
                                    <ArrowPathIcon className="h-5 w-5" />
                                </button>
                                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                                    1
                                </button>
                                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                                    2
                                </button>
                                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                                    3
                                </button>
                                <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                                    ...
                                </span>
                                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                                    10
                                </button>
                                <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                    <span className="sr-only">Next</span>
                                    <ArrowPathIcon className="h-5 w-5 transform rotate-180" />
                                </button>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>

            {/* Export Button */}
            <div className="mt-6 flex justify-end">
                <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                    <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
                    Xuất Excel
                </button>
            </div>
        </div>
    );
};

export default OrderList;
