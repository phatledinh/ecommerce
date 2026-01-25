// pages/customers/CustomerDetail.jsx
import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
    ArrowLeftIcon,
    EnvelopeIcon,
    PhoneIcon,
    MapPinIcon,
    CalendarDaysIcon,
    StarIcon,
    CheckCircleIcon,
    XCircleIcon,
    CreditCardIcon,
    BanknotesIcon,
    CurrencyDollarIcon,
    ShoppingBagIcon,
    UserCircleIcon,
    PencilIcon,
    TrashIcon,
} from "@heroicons/react/24/outline";

const CustomerDetail = () => {
    const { customerId } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("overview");

    // Dữ liệu mẫu
    const customer = {
        id: customerId || "1001",
        name: "Alex Chen",
        email: "alex.chen@email.com",
        phone: "+1 555-0123",
        registrationDate: "Jan 15, 2022",
        status: "active",
        totalOrders: 24,
        totalSpent: 4500.0,
        averageOrderValue: 187.5,
        lastPurchaseDate: "Oct 25, 2023",
        customerType: "vip",
        shippingAddresses: [
            {
                id: 1,
                name: "Alex Chen",
                phone: "+1 555-0123",
                address: "123 Main St, Apt 4B, New York, NY 10001",
                isDefault: true,
            },
            {
                id: 2,
                name: "Alex Chen",
                phone: "+1 555-0123",
                address: "455 Oak Ave, Suite 200, San Francisco, CA 94105",
                isDefault: false,
            },
        ],
        orderHistory: [
            {
                id: "ORD-7890",
                date: "Oct 25, 2023",
                total: 250.0,
                status: "delivered",
                paymentStatus: "paid",
                items: 3,
            },
            {
                id: "ORD-7889",
                date: "Sep 10, 2023",
                total: 150.0,
                status: "completed",
                paymentStatus: "paid",
                items: 2,
            },
            {
                id: "ORD-7888",
                date: "Aug 22, 2023",
                total: 320.0,
                status: "completed",
                paymentStatus: "paid",
                items: 4,
            },
            {
                id: "ORD-7887",
                date: "Jul 15, 2023",
                total: 89.9,
                status: "completed",
                paymentStatus: "paid",
                items: 1,
            },
        ],
        paymentHistory: [
            {
                id: "TXN-1234",
                method: "Visa ****4242",
                amount: 250.0,
                status: "success",
                date: "Oct 25, 2023",
            },
            {
                id: "TXN-1233",
                method: "PayPal",
                amount: 150.0,
                status: "success",
                date: "Sep 10, 2023",
            },
            {
                id: "TXN-1232",
                method: "Credit Card",
                amount: 320.0,
                status: "success",
                date: "Aug 22, 2023",
            },
        ],
        notes: [
            {
                id: 1,
                author: "Admin",
                content: "Khách hàng VIP, ưu tiên xử lý đơn hàng",
                date: "2023-10-26",
            },
            {
                id: 2,
                author: "Support",
                content: "Yêu cầu hỗ trợ kỹ thuật sản phẩm",
                date: "2023-09-15",
            },
        ],
    };

    const getStatusBadge = (status) => {
        const isActive =
            status === "active" ||
            status === "delivered" ||
            status === "completed" ||
            status === "paid" ||
            status === "success";
        return (
            <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    isActive
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                }`}
            >
                {isActive ? (
                    <CheckCircleIcon className="h-3 w-3 mr-1" />
                ) : (
                    <XCircleIcon className="h-3 w-3 mr-1" />
                )}
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    return (
        <div className="p-6">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center">
                    <button
                        onClick={() => navigate("/admin/customers")}
                        className="mr-4 p-2 rounded-lg hover:bg-gray-100"
                    >
                        <ArrowLeftIcon className="h-5 w-5 text-gray-600" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Chi tiết Khách hàng
                        </h1>
                        <p className="text-gray-600">ID: {customer.id}</p>
                    </div>
                </div>
                <div className="flex space-x-2">
                    <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                        <EnvelopeIcon className="h-5 w-5 mr-2" />
                        Gửi email
                    </button>
                    <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        <PencilIcon className="h-5 w-5 mr-2" />
                        Chỉnh sửa
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 mb-6">
                <nav className="-mb-px flex space-x-8">
                    {[
                        "overview",
                        "orders",
                        "payments",
                        "addresses",
                        "notes",
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
                            {tab === "orders" && "Đơn hàng"}
                            {tab === "payments" && "Thanh toán"}
                            {tab === "addresses" && "Địa chỉ"}
                            {tab === "notes" && "Ghi chú"}
                        </button>
                    ))}
                </nav>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Customer Info & Stats */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Customer Info */}
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <div className="flex items-start justify-between mb-6">
                            <div className="flex items-center">
                                <UserCircleIcon className="h-16 w-16 text-gray-400 mr-4" />
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900">
                                        {customer.name}
                                    </h2>
                                    <div className="flex items-center space-x-2 mt-1">
                                        {customer.customerType === "vip" && (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                                                <StarIcon className="h-3 w-3 mr-1" />
                                                VIP Customer
                                            </span>
                                        )}
                                        {getStatusBadge(customer.status)}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center">
                                <EnvelopeIcon className="h-5 w-5 text-gray-400 mr-3" />
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Email
                                    </p>
                                    <p className="font-medium">
                                        {customer.email}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <PhoneIcon className="h-5 w-5 text-gray-400 mr-3" />
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Số điện thoại
                                    </p>
                                    <p className="font-medium">
                                        {customer.phone}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <CalendarDaysIcon className="h-5 w-5 text-gray-400 mr-3" />
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Ngày đăng ký
                                    </p>
                                    <p className="font-medium">
                                        {customer.registrationDate}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <CalendarDaysIcon className="h-5 w-5 text-gray-400 mr-3" />
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Mua gần nhất
                                    </p>
                                    <p className="font-medium">
                                        {customer.lastPurchaseDate}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-gray-900">
                                    {customer.totalOrders}
                                </div>
                                <p className="text-sm text-gray-500">
                                    Tổng đơn hàng
                                </p>
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-gray-900">
                                    ${customer.totalSpent.toFixed(2)}
                                </div>
                                <p className="text-sm text-gray-500">
                                    Tổng chi tiêu
                                </p>
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-gray-900">
                                    ${customer.averageOrderValue.toFixed(2)}
                                </div>
                                <p className="text-sm text-gray-500">
                                    Giá trị đơn trung bình
                                </p>
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-gray-900">
                                    4.8
                                </div>
                                <p className="text-sm text-gray-500">
                                    Đánh giá trung bình
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Order History */}
                    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h2 className="text-lg font-semibold text-gray-900">
                                Lịch sử Đơn hàng
                            </h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Mã đơn
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Ngày
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Số lượng
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Tổng tiền
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Trạng thái
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Thanh toán
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {customer.orderHistory.map((order) => (
                                        <tr
                                            key={order.id}
                                            className="hover:bg-gray-50"
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <Link
                                                    to={`/admin/orders/${order.id}`}
                                                    className="text-blue-600 hover:text-blue-900 font-medium"
                                                >
                                                    {order.id}
                                                </Link>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {order.date}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    {order.items} sản phẩm
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="font-medium text-gray-900">
                                                    ${order.total.toFixed(2)}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {getStatusBadge(order.status)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {getStatusBadge(
                                                    order.paymentStatus,
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Right Column - Addresses, Payments, Notes */}
                <div className="space-y-6">
                    {/* Shipping Addresses */}
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-gray-900">
                                Địa chỉ giao hàng
                            </h2>
                            <button className="text-blue-600 hover:text-blue-900 text-sm">
                                + Thêm địa chỉ
                            </button>
                        </div>
                        <div className="space-y-4">
                            {customer.shippingAddresses.map((address) => (
                                <div
                                    key={address.id}
                                    className="p-3 border border-gray-200 rounded-lg"
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <p className="font-medium">
                                                {address.name}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {address.phone}
                                            </p>
                                        </div>
                                        {address.isDefault && (
                                            <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                                                Mặc định
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex items-start">
                                        <MapPinIcon className="h-4 w-4 text-gray-400 mr-2 mt-1 flex-shrink-0" />
                                        <p className="text-sm text-gray-700">
                                            {address.address}
                                        </p>
                                    </div>
                                    <div className="flex space-x-2 mt-3">
                                        <button className="text-blue-600 hover:text-blue-900 text-sm">
                                            Chỉnh sửa
                                        </button>
                                        {!address.isDefault && (
                                            <button className="text-red-600 hover:text-red-900 text-sm">
                                                Xóa
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Payment History */}
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">
                            Lịch sử Thanh toán
                        </h2>
                        <div className="space-y-4">
                            {customer.paymentHistory.map((payment) => (
                                <div
                                    key={payment.id}
                                    className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                                >
                                    <div>
                                        <p className="font-medium">
                                            {payment.id}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {payment.method}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-medium">
                                            ${payment.amount.toFixed(2)}
                                        </p>
                                        <div className="mt-1">
                                            {getStatusBadge(payment.status)}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Customer Notes */}
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-gray-900">
                                Ghi chú nội bộ
                            </h2>
                            <button className="text-blue-600 hover:text-blue-900 text-sm">
                                + Thêm ghi chú
                            </button>
                        </div>
                        <div className="space-y-4">
                            {customer.notes.map((note) => (
                                <div
                                    key={note.id}
                                    className="p-3 bg-gray-50 rounded-lg"
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <p className="font-medium">
                                            {note.author}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {note.date}
                                        </p>
                                    </div>
                                    <p className="text-sm text-gray-700">
                                        {note.content}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Customer Actions */}
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">
                            Thao tác
                        </h2>
                        <div className="space-y-3">
                            {customer.status === "active" ? (
                                <button className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                                    <XCircleIcon className="h-5 w-5 inline mr-2" />
                                    Khóa tài khoản
                                </button>
                            ) : (
                                <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                                    <CheckCircleIcon className="h-5 w-5 inline mr-2" />
                                    Mở khóa tài khoản
                                </button>
                            )}
                            {customer.customerType !== "vip" ? (
                                <button className="w-full px-4 py-2 border border-amber-300 text-amber-700 rounded-lg hover:bg-amber-50">
                                    <StarIcon className="h-5 w-5 inline mr-2" />
                                    Nâng cấp lên VIP
                                </button>
                            ) : (
                                <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                                    <StarIcon className="h-5 w-5 inline mr-2" />
                                    Hạ cấp VIP
                                </button>
                            )}
                            <button className="w-full px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50">
                                <TrashIcon className="h-5 w-5 inline mr-2" />
                                Xóa tài khoản
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerDetail;
