// pages/customers/CustomerList.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import {
    MagnifyingGlassIcon,
    FunnelIcon,
    EnvelopeIcon,
    PhoneIcon,
    UserCircleIcon,
    ArrowDownTrayIcon,
    EyeIcon,
    CheckCircleIcon,
    XCircleIcon,
    StarIcon,
    UserPlusIcon,
    CalendarDaysIcon,
} from "@heroicons/react/24/outline";

const CustomerList = () => {
    const [filters, setFilters] = useState({
        search: "",
        accountStatus: "all",
        customerType: "all",
        dateFrom: "",
        dateTo: "",
    });

    const [selectedCustomers, setSelectedCustomers] = useState([]);

    // Dữ liệu mẫu
    const customers = [
        {
            id: 1001,
            name: "Alice Johnson",
            email: "alicejohnson@gmail.com",
            phone: "(837) 337-4565",
            orderCount: 2,
            totalSpent: 100.0,
            customerType: "vip",
            status: "active",
            registrationDate: "2023-01-15",
            lastOrderDate: "2023-10-25",
        },
        {
            id: 1002,
            name: "Bob Smith",
            email: "bobsmith@example.com",
            phone: "(833) 342-1333",
            orderCount: 3,
            totalSpent: 200.0,
            customerType: "new",
            status: "blocked",
            registrationDate: "2023-10-10",
            lastOrderDate: "2023-10-20",
        },
        {
            id: 1003,
            name: "Mary Flamers",
            email: "maryflamers@example.com",
            phone: "(867) 239-1799",
            orderCount: 4,
            totalSpent: 250.0,
            customerType: "new",
            status: "active",
            registrationDate: "2023-10-12",
            lastOrderDate: "2023-10-24",
        },
        {
            id: 1004,
            name: "Eric Ramos",
            email: "eric.ramos@gmail.com",
            phone: "(837) 237-6670",
            orderCount: 3,
            totalSpent: 250.0,
            customerType: "returning",
            status: "active",
            registrationDate: "2022-11-05",
            lastOrderDate: "2023-10-22",
        },
        {
            id: 1005,
            name: "Anne Smith",
            email: "anne.smith@example.com",
            phone: "(837) 341-7937",
            orderCount: 2,
            totalSpent: 200.0,
            customerType: "vip",
            status: "blocked",
            registrationDate: "2023-09-18",
            lastOrderDate: "2023-10-18",
        },
        {
            id: 1006,
            name: "Mary Vise",
            email: "maryvise@gmail.com",
            phone: "(957) 239-4331",
            orderCount: 2,
            totalSpent: 200.0,
            customerType: "new",
            status: "active",
            registrationDate: "2023-10-15",
            lastOrderDate: "2023-10-21",
        },
        {
            id: 1007,
            name: "Alex Fommon",
            email: "alexfommon@gmail.com",
            phone: "(837) 752-5100",
            orderCount: 1,
            totalSpent: 310.0,
            customerType: "returning",
            status: "active",
            registrationDate: "2023-08-22",
            lastOrderDate: "2023-10-19",
        },
        {
            id: 1008,
            name: "Maria Smith",
            email: "mbsmith@gmail.com",
            phone: "(837) 345-4629",
            orderCount: 1,
            totalSpent: 200.0,
            customerType: "vip",
            status: "blocked",
            registrationDate: "2023-07-30",
            lastOrderDate: "2023-10-17",
        },
    ];

    const statusOptions = [
        { value: "all", label: "Tất cả trạng thái" },
        {
            value: "active",
            label: "Active",
            color: "bg-green-100 text-green-800",
        },
        {
            value: "blocked",
            label: "Blocked",
            color: "bg-red-100 text-red-800",
        },
        {
            value: "inactive",
            label: "Inactive",
            color: "bg-gray-100 text-gray-800",
        },
    ];

    const customerTypeOptions = [
        { value: "all", label: "Tất cả loại khách" },
        {
            value: "new",
            label: "Khách mới",
            color: "bg-blue-100 text-blue-800",
        },
        {
            value: "returning",
            label: "Khách quay lại",
            color: "bg-purple-100 text-purple-800",
        },
        { value: "vip", label: "VIP", color: "bg-amber-100 text-amber-800" },
    ];

    const getStatusBadge = (status) => {
        const statusInfo = statusOptions.find((s) => s.value === status) || {
            label: status,
            color: "bg-gray-100 text-gray-800",
        };
        return (
            <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusInfo.color}`}
            >
                {status === "active" ? (
                    <CheckCircleIcon className="h-3 w-3 mr-1" />
                ) : (
                    <XCircleIcon className="h-3 w-3 mr-1" />
                )}
                {statusInfo.label}
            </span>
        );
    };

    const getCustomerTypeBadge = (type) => {
        const typeInfo = customerTypeOptions.find((t) => t.value === type) || {
            label: type,
            color: "bg-gray-100 text-gray-800",
        };
        return (
            <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${typeInfo.color}`}
            >
                {type === "vip" && <StarIcon className="h-3 w-3 mr-1" />}
                {type === "new" && <UserPlusIcon className="h-3 w-3 mr-1" />}
                {typeInfo.label}
            </span>
        );
    };

    const handleFilterChange = (field, value) => {
        setFilters((prev) => ({ ...prev, [field]: value }));
    };

    const handleResetFilters = () => {
        setFilters({
            search: "",
            accountStatus: "all",
            customerType: "all",
            dateFrom: "",
            dateTo: "",
        });
    };

    const exportCustomers = () => {
        // Logic export to CSV/Excel
        console.log("Exporting customers...");
    };

    return (
        <div className="p-6">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">
                    Quản lý Khách hàng
                </h1>
                <p className="text-gray-600">
                    Quản lý thông tin và theo dõi hành vi mua sắm của khách hàng
                </p>
            </div>

            {/* Filter Section */}
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Search */}
                    <div className="lg:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Tìm kiếm theo Tên, Email, SĐT
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                value={filters.search}
                                onChange={(e) =>
                                    handleFilterChange("search", e.target.value)
                                }
                                placeholder="Nhập tên, email hoặc số điện thoại..."
                                className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>

                    {/* Account Status */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Trạng thái tài khoản
                        </label>
                        <select
                            value={filters.accountStatus}
                            onChange={(e) =>
                                handleFilterChange(
                                    "accountStatus",
                                    e.target.value,
                                )
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            {statusOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Customer Type */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Loại khách hàng
                        </label>
                        <select
                            value={filters.customerType}
                            onChange={(e) =>
                                handleFilterChange(
                                    "customerType",
                                    e.target.value,
                                )
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            {customerTypeOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Date Range */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Từ ngày đăng ký
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
                            Đến ngày đăng ký
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

                    {/* Action Buttons */}
                    <div className="flex items-end space-x-2">
                        <button
                            onClick={handleResetFilters}
                            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                            Reset
                        </button>
                        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                            <FunnelIcon className="h-5 w-5 mr-2" />
                            Lọc
                        </button>
                    </div>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center">
                        <div className="bg-blue-100 p-3 rounded-lg">
                            <UserCircleIcon className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm text-gray-500">
                                Tổng khách hàng
                            </p>
                            <p className="text-2xl font-bold text-gray-900">
                                1,248
                            </p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center">
                        <div className="bg-green-100 p-3 rounded-lg">
                            <CheckCircleIcon className="h-6 w-6 text-green-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm text-gray-500">
                                Đang hoạt động
                            </p>
                            <p className="text-2xl font-bold text-gray-900">
                                1,024
                            </p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center">
                        <div className="bg-amber-100 p-3 rounded-lg">
                            <StarIcon className="h-6 w-6 text-amber-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm text-gray-500">Khách VIP</p>
                            <p className="text-2xl font-bold text-gray-900">
                                56
                            </p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center">
                        <div className="bg-purple-100 p-3 rounded-lg">
                            <UserPlusIcon className="h-6 w-6 text-purple-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm text-gray-500">
                                Khách mới (7 ngày)
                            </p>
                            <p className="text-2xl font-bold text-gray-900">
                                42
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Customers Table */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-gray-900">
                        Danh sách Khách hàng
                    </h2>
                    <button
                        onClick={exportCustomers}
                        className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                        <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
                        Xuất Excel
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    ID
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Khách hàng
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Email
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    SĐT
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Số đơn
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Tổng chi tiêu
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Loại khách
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Trạng thái
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Thao tác
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {customers.map((customer) => (
                                <tr
                                    key={customer.id}
                                    className="hover:bg-gray-50"
                                >
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {customer.id}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <div className="h-10 w-10 flex-shrink-0">
                                                <UserCircleIcon className="h-10 w-10 text-gray-400" />
                                            </div>
                                            <div className="ml-4">
                                                <div className="font-medium text-gray-900">
                                                    {customer.name}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    Đăng ký:{" "}
                                                    {customer.registrationDate}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <EnvelopeIcon className="h-4 w-4 text-gray-400 mr-2" />
                                            <span className="text-sm text-gray-900">
                                                {customer.email}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <PhoneIcon className="h-4 w-4 text-gray-400 mr-2" />
                                            <span className="text-sm text-gray-900">
                                                {customer.phone}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-800 font-semibold">
                                            {customer.orderCount}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="font-semibold text-gray-900">
                                            ${customer.totalSpent.toFixed(2)}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            AOV: $
                                            {(
                                                customer.totalSpent /
                                                    customer.orderCount || 0
                                            ).toFixed(2)}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {getCustomerTypeBadge(
                                            customer.customerType,
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {getStatusBadge(customer.status)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <Link
                                            to={`/admin/customers/${customer.id}`}
                                            className="text-blue-600 hover:text-blue-900 mr-3"
                                        >
                                            <EyeIcon className="h-5 w-5 inline" />
                                        </Link>
                                        <button className="text-gray-600 hover:text-gray-900">
                                            <EnvelopeIcon className="h-5 w-5 inline" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-6 py-4 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-700">
                                Hiển thị <span className="font-medium">1</span>{" "}
                                đến <span className="font-medium">8</span> trong
                                tổng số{" "}
                                <span className="font-medium">1,248</span> khách
                                hàng
                            </p>
                        </div>
                        <nav className="flex items-center space-x-2">
                            <button className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                                Previous
                            </button>
                            <button className="px-3 py-2 border border-blue-500 bg-blue-50 text-blue-600 rounded-md text-sm font-medium">
                                1
                            </button>
                            <button className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                                2
                            </button>
                            <button className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                                3
                            </button>
                            <span className="px-3 py-2 text-sm text-gray-700">
                                ...
                            </span>
                            <button className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                                10
                            </button>
                            <button className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                                Next
                            </button>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerList;
