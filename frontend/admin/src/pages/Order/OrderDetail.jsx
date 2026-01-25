// pages/orders/OrderDetail.jsx
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    ArrowLeftIcon,
    PrinterIcon,
    EnvelopeIcon,
    PhoneIcon,
    MapPinIcon,
    ClockIcon,
    CheckCircleIcon,
    XCircleIcon,
    TruckIcon,
    CreditCardIcon,
    BanknotesIcon,
    CurrencyDollarIcon,
    DocumentTextIcon,
    ExclamationTriangleIcon,
    UserCircleIcon,
} from "@heroicons/react/24/outline";

const OrderDetail = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("overview");

    // Dữ liệu mẫu - thực tế sẽ fetch từ API theo orderId
    const order = {
        id: orderId || "ORD-10234",
        customer: {
            name: "John Doe",
            phone: "0901234567",
            email: "john@example.com",
            address: "123 Main Street, District 1, Ho Chi Minh City",
            note: "Giao hàng giờ hành chính",
        },
        status: "processing",
        paymentStatus: "paid",
        paymentMethod: "credit_card",
        paymentDetails: {
            transactionId: "TXN-789012",
            amount: 120.5,
            paidAmount: 120.5,
            paidAt: "2023-10-27 14:30:00",
        },
        timeline: [
            {
                time: "2023-10-27 10:15:00",
                action: "Đơn hàng được tạo",
                status: "completed",
            },
            {
                time: "2023-10-27 14:30:00",
                action: "Thanh toán thành công",
                status: "completed",
            },
            {
                time: "2023-10-27 15:45:00",
                action: "Đang xử lý đơn hàng",
                status: "completed",
            },
            {
                time: "2023-10-28 09:00:00",
                action: "Đang đóng gói",
                status: "current",
            },
            { time: null, action: "Giao hàng", status: "pending" },
            { time: null, action: "Hoàn thành", status: "pending" },
        ],
        items: [
            {
                id: 1,
                product: "iPhone 14 Pro Max",
                sku: "IP14PM-256GB",
                variant: "256GB, Deep Purple",
                price: 1099.99,
                quantity: 1,
                total: 1099.99,
                image: "https://via.placeholder.com/64",
            },
            {
                id: 2,
                product: "AirPods Pro 2",
                sku: "APP2-2022",
                variant: "MagSafe Charging Case",
                price: 249.99,
                quantity: 2,
                total: 499.98,
                image: "https://via.placeholder.com/64",
            },
        ],
        shipping: {
            method: "Express",
            fee: 10.5,
            trackingNumber: "TRK-7890123456",
            estimatedDelivery: "2023-10-30",
        },
        summary: {
            subtotal: 1599.97,
            shipping: 10.5,
            tax: 160.0,
            discount: 50.0,
            total: 1720.47,
        },
        notes: [
            {
                id: 1,
                author: "Admin",
                content: "Khách hàng yêu cầu đổi màu sản phẩm",
                time: "2023-10-27 11:30:00",
            },
            {
                id: 2,
                author: "Staff",
                content: "Đã xác nhận với khách về thời gian giao hàng",
                time: "2023-10-27 16:00:00",
            },
        ],
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "new":
                return "bg-blue-100 text-blue-800";
            case "processing":
                return "bg-yellow-100 text-yellow-800";
            case "shipped":
                return "bg-indigo-100 text-indigo-800";
            case "completed":
                return "bg-green-100 text-green-800";
            case "cancelled":
                return "bg-red-100 text-red-800";
            case "refunded":
                return "bg-gray-100 text-gray-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const getStatusLabel = (status) => {
        switch (status) {
            case "new":
                return "Mới";
            case "processing":
                return "Đang xử lý";
            case "shipped":
                return "Đang giao hàng";
            case "completed":
                return "Hoàn thành";
            case "cancelled":
                return "Đã hủy";
            case "refunded":
                return "Đã hoàn tiền";
            default:
                return status;
        }
    };

    const getPaymentMethodIcon = (method) => {
        switch (method) {
            case "credit_card":
                return <CreditCardIcon className="h-5 w-5" />;
            case "bank_transfer":
                return <BanknotesIcon className="h-5 w-5" />;
            case "paypal":
                return <CurrencyDollarIcon className="h-5 w-5" />;
            default:
                return <CreditCardIcon className="h-5 w-5" />;
        }
    };

    return (
        <div className="p-6">
            {/* Header with Back Button */}
            <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center">
                    <button
                        onClick={() => navigate("/admin/orders")}
                        className="mr-4 p-2 rounded-lg hover:bg-gray-100"
                    >
                        <ArrowLeftIcon className="h-5 w-5 text-gray-600" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Chi tiết đơn hàng
                        </h1>
                        <p className="text-gray-600">Mã đơn: {order.id}</p>
                    </div>
                </div>
                <div className="flex space-x-2">
                    <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                        <PrinterIcon className="h-5 w-5 mr-2" />
                        In đơn hàng
                    </button>
                    <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        <EnvelopeIcon className="h-5 w-5 mr-2" />
                        Gửi email
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 mb-6">
                <nav className="-mb-px flex space-x-8">
                    {[
                        "overview",
                        "products",
                        "timeline",
                        "notes",
                        "refunds",
                    ].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`py-4 px-1 border-b-2 font-medium text-sm ${
                                activeTab === tab
                                    ? "border-blue-500 text-blue-600"
                                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                            }`}
                        >
                            {tab === "overview" && "Tổng quan"}
                            {tab === "products" && "Sản phẩm"}
                            {tab === "timeline" && "Lịch sử"}
                            {tab === "notes" && "Ghi chú"}
                            {tab === "refunds" && "Hoàn tiền"}
                        </button>
                    ))}
                </nav>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Order Info */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Order Status Timeline */}
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">
                            Trạng thái đơn hàng
                        </h2>
                        <div className="relative">
                            {order.timeline.map((step, index) => (
                                <div
                                    key={index}
                                    className="flex items-start mb-8 last:mb-0"
                                >
                                    <div
                                        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                                            step.status === "completed"
                                                ? "bg-green-100"
                                                : step.status === "current"
                                                  ? "bg-blue-100"
                                                  : "bg-gray-100"
                                        }`}
                                    >
                                        {step.status === "completed" ? (
                                            <CheckCircleIcon className="h-5 w-5 text-green-600" />
                                        ) : step.status === "current" ? (
                                            <ClockIcon className="h-5 w-5 text-blue-600" />
                                        ) : (
                                            <div className="h-3 w-3 rounded-full bg-gray-300" />
                                        )}
                                    </div>
                                    <div className="ml-4">
                                        <p className="font-medium text-gray-900">
                                            {step.action}
                                        </p>
                                        {step.time && (
                                            <p className="text-sm text-gray-500">
                                                {step.time}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Products Table */}
                    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h2 className="text-lg font-semibold text-gray-900">
                                Sản phẩm trong đơn
                            </h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Sản phẩm
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            SKU
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Giá
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Số lượng
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Thành tiền
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {order.items.map((item) => (
                                        <tr key={item.id}>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                    <img
                                                        src={item.image}
                                                        alt={item.product}
                                                        className="h-10 w-10 rounded-lg object-cover"
                                                    />
                                                    <div className="ml-4">
                                                        <div className="font-medium text-gray-900">
                                                            {item.product}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            {item.variant}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {item.sku}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    ${item.price.toFixed(2)}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    {item.quantity}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="font-medium text-gray-900">
                                                    ${item.total.toFixed(2)}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Right Column - Customer & Actions */}
                <div className="space-y-6">
                    {/* Customer Info */}
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">
                            Thông tin khách hàng
                        </h2>
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <UserCircleIcon className="h-5 w-5 text-gray-400 mr-3" />
                                <div>
                                    <p className="font-medium text-gray-900">
                                        {order.customer.name}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Khách hàng
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <PhoneIcon className="h-5 w-5 text-gray-400 mr-3" />
                                <p className="text-gray-700">
                                    {order.customer.phone}
                                </p>
                            </div>
                            <div className="flex items-center">
                                <EnvelopeIcon className="h-5 w-5 text-gray-400 mr-3" />
                                <p className="text-gray-700">
                                    {order.customer.email}
                                </p>
                            </div>
                            <div className="flex items-start">
                                <MapPinIcon className="h-5 w-5 text-gray-400 mr-3 mt-1" />
                                <p className="text-gray-700">
                                    {order.customer.address}
                                </p>
                            </div>
                            {order.customer.note && (
                                <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                                    <p className="text-sm text-yellow-800">
                                        <ExclamationTriangleIcon className="h-4 w-4 inline mr-1" />
                                        {order.customer.note}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">
                            Tổng kết đơn hàng
                        </h2>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Tạm tính:</span>
                                <span className="font-medium">
                                    ${order.summary.subtotal.toFixed(2)}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">
                                    Phí vận chuyển:
                                </span>
                                <span className="font-medium">
                                    ${order.summary.shipping.toFixed(2)}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">
                                    Thuế (10%):
                                </span>
                                <span className="font-medium">
                                    ${order.summary.tax.toFixed(2)}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Giảm giá:</span>
                                <span className="font-medium text-green-600">
                                    -${order.summary.discount.toFixed(2)}
                                </span>
                            </div>
                            <div className="border-t pt-3 mt-3">
                                <div className="flex justify-between">
                                    <span className="text-lg font-semibold">
                                        Tổng cộng:
                                    </span>
                                    <span className="text-lg font-bold text-gray-900">
                                        ${order.summary.total.toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Payment Info */}
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">
                            Thông tin thanh toán
                        </h2>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600">
                                    Phương thức:
                                </span>
                                <div className="flex items-center">
                                    {getPaymentMethodIcon(order.paymentMethod)}
                                    <span className="ml-2 font-medium">
                                        {order.paymentMethod === "credit_card"
                                            ? "Thẻ tín dụng"
                                            : order.paymentMethod}
                                    </span>
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">
                                    Trạng thái:
                                </span>
                                <span
                                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                                        order.paymentStatus === "paid"
                                            ? "bg-green-100 text-green-800"
                                            : "bg-red-100 text-red-800"
                                    }`}
                                >
                                    {order.paymentStatus === "paid"
                                        ? "Đã thanh toán"
                                        : "Chưa thanh toán"}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">
                                    Mã giao dịch:
                                </span>
                                <span className="font-medium">
                                    {order.paymentDetails.transactionId}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">
                                    Đã thanh toán:
                                </span>
                                <span className="font-medium">
                                    $
                                    {order.paymentDetails.paidAmount.toFixed(2)}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">
                                    Thời gian:
                                </span>
                                <span className="font-medium">
                                    {order.paymentDetails.paidAt}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Admin Actions */}
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">
                            Thao tác
                        </h2>
                        <div className="space-y-3">
                            {order.status === "new" && (
                                <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                                    Xác nhận đơn hàng
                                </button>
                            )}
                            {order.status === "processing" && (
                                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                    Cập nhật trạng thái giao hàng
                                </button>
                            )}
                            {["new", "processing"].includes(order.status) && (
                                <button className="w-full px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50">
                                    Hủy đơn hàng
                                </button>
                            )}
                            {order.paymentStatus === "paid" && (
                                <button className="w-full px-4 py-2 border border-orange-300 text-orange-700 rounded-lg hover:bg-orange-50">
                                    Tạo yêu cầu hoàn tiền
                                </button>
                            )}
                            <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                                Thêm ghi chú nội bộ
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetail;
