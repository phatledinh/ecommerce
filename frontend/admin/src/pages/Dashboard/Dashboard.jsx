import { useState, useEffect } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from "chart.js";

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
);

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalCustomer: 0,
        totalCategory: 0,
        totalProduct: 0,
        totalNews: 0,
    });
    const [products, setProducts] = useState([]);
    const [revenueData, setRevenueData] = useState({});
    const [topCustomers, setTopCustomers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const response = await fetch("/api/admin/dashboard");
            const data = await response.json();

            setStats({
                totalCustomer: data.totalCustomer,
                totalCategory: data.totalCategory,
                totalProduct: data.totalProduct,
                totalNews: data.totalNews,
            });
            setProducts(data.products || []);
            setRevenueData(data.revenueData || {});
            setTopCustomers(data.topCustomers || []);
        } catch (error) {
            console.error("Error fetching dashboard data:", error);
        } finally {
            setLoading(false);
        }
    };

    // Revenue Chart Configuration
    const revenueChartData = {
        labels: revenueData.labels || [],
        datasets: [
            {
                label: "Doanh thu (VND)",
                data: revenueData.data || [],
                backgroundColor: "rgba(54, 162, 235, 0.6)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
            },
        ],
    };

    const revenueChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Doanh thu theo tháng (2025)",
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function (value) {
                        return new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                        }).format(value);
                    },
                },
            },
        },
    };

    // Top Customers Chart Configuration
    const topCustomersChartData = {
        labels: topCustomers.map((customer) => customer.name),
        datasets: [
            {
                label: "Tổng chi tiêu (VND)",
                data: topCustomers.map((customer) => customer.total_spent),
                backgroundColor: [
                    "rgba(255, 99, 132, 0.6)",
                    "rgba(54, 162, 235, 0.6)",
                    "rgba(255, 206, 86, 0.6)",
                    "rgba(75, 192, 192, 0.6)",
                    "rgba(153, 102, 255, 0.6)",
                    "rgba(255, 159, 64, 0.6)",
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                ],
                borderWidth: 1,
            },
        ],
    };

    const topCustomersChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Top 10 khách hàng tiềm năng",
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function (value) {
                        return new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                        }).format(value);
                    },
                },
            },
        },
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(price);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <main className="flex-1 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">
                        Dashboard
                    </h1>
                    <nav className="flex" aria-label="Breadcrumb">
                        <ol className="flex items-center space-x-2">
                            <li>
                                <div className="flex items-center">
                                    <span className="text-gray-500">
                                        Dashboard
                                    </span>
                                </div>
                            </li>
                        </ol>
                    </nav>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    {/* Customers Card */}
                    <div className="bg-blue-500 rounded-lg shadow-md overflow-hidden">
                        <div className="p-6 flex items-center justify-between text-white">
                            <div>
                                <p className="text-lg font-semibold">
                                    Khách hàng
                                </p>
                                <h3 className="text-3xl font-bold">
                                    {stats.totalCustomer}
                                </h3>
                            </div>
                            <div className="text-blue-200">
                                <svg
                                    className="w-8 h-8"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Categories Card */}
                    <div className="bg-red-500 rounded-lg shadow-md overflow-hidden">
                        <div className="p-6 flex items-center justify-between text-white">
                            <div>
                                <p className="text-lg font-semibold">
                                    Danh mục
                                </p>
                                <h3 className="text-3xl font-bold">
                                    {stats.totalCategory}
                                </h3>
                            </div>
                            <div className="text-red-200">
                                <svg
                                    className="w-8 h-8"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Products Card */}
                    <div className="bg-yellow-500 rounded-lg shadow-md overflow-hidden">
                        <div className="p-6 flex items-center justify-between text-white">
                            <div>
                                <p className="text-lg font-semibold">
                                    Sản phẩm
                                </p>
                                <h3 className="text-3xl font-bold">
                                    {stats.totalProduct}
                                </h3>
                            </div>
                            <div className="text-yellow-200">
                                <svg
                                    className="w-8 h-8"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* News Card */}
                    <div className="bg-green-500 rounded-lg shadow-md overflow-hidden">
                        <div className="p-6 flex items-center justify-between text-white">
                            <div>
                                <p className="text-lg font-semibold">
                                    Bài viết
                                </p>
                                <h3 className="text-3xl font-bold">
                                    {stats.totalNews}
                                </h3>
                            </div>
                            <div className="text-green-200">
                                <svg
                                    className="w-8 h-8"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9m0 0v12m0-12a2 2 0 012-2h2a2 2 0 012 2m-6 6h6m-6 4h6m2 5h-4m0 0l2 2 2-2m-4-8l2 2 2-2"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    {/* Revenue Chart */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center mb-4">
                            <svg
                                className="w-5 h-5 text-gray-500 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                />
                            </svg>
                            <h3 className="text-lg font-semibold text-gray-900">
                                Biểu đồ Doanh thu theo Tháng (2025)
                            </h3>
                        </div>
                        <div className="h-80">
                            <Bar
                                data={revenueChartData}
                                options={revenueChartOptions}
                            />
                        </div>
                    </div>

                    {/* Top Customers Chart */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center mb-4">
                            <svg
                                className="w-5 h-5 text-gray-500 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                            </svg>
                            <h3 className="text-lg font-semibold text-gray-900">
                                Top 10 Khách hàng tiềm năng nhất (Tháng này)
                            </h3>
                        </div>
                        <div className="h-80">
                            <Bar
                                data={topCustomersChartData}
                                options={topCustomersChartOptions}
                            />
                        </div>
                    </div>
                </div>

                {/* Best Selling Products Table */}
                <div className="bg-white rounded-lg shadow-md">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <div className="flex items-center">
                            <svg
                                className="w-5 h-5 text-gray-500 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                                />
                            </svg>
                            <h3 className="text-lg font-semibold text-gray-900">
                                Sản phẩm bán chạy nhất
                            </h3>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        STT
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Ảnh
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Tên sản phẩm
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Danh mục
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Hãng
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Giá
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Trong kho
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Đã bán
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {products.map((product, index) => (
                                    <tr
                                        key={product.id}
                                        className="hover:bg-gray-50"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {index + 1}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <img
                                                src={product.thumbnail}
                                                alt={product.product_name}
                                                className="w-15 h-20 object-contain"
                                            />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {product.product_name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {product.category?.name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {product.brand?.name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            <div className="space-y-1">
                                                <div className="font-semibold">
                                                    {formatPrice(
                                                        product.price_new,
                                                    )}
                                                </div>
                                                {product.price_old &&
                                                    product.price_old > 0 && (
                                                        <div className="text-red-500 line-through text-xs">
                                                            {formatPrice(
                                                                product.price_old,
                                                            )}
                                                        </div>
                                                    )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {product.stock}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {product.sold}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Dashboard;
