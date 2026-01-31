import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    Bars3Icon,
    MagnifyingGlassIcon,
    UserCircleIcon,
    ArrowRightOnRectangleIcon,
    Cog6ToothIcon,
    ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";
import axiosClient from "../../api/axiosClient";

const Navbar = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [user, setUser] = useState(null);

    // Lấy thông tin user khi component mount
    useEffect(() => {
        const userStr = localStorage.getItem("user");
        if (userStr) {
            try {
                setUser(JSON.parse(userStr));
            } catch (e) {
                console.error("Lỗi parse user", e);
            }
        }
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        console.log("Searching for:", searchQuery);
    };

    const handleLogout = async () => {
        try {
            await axiosClient.post("/auth/logout");
        } catch (error) {
            console.error("Lỗi khi logout:", error);
        } finally {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("user");

            setIsDropdownOpen(false);

            navigate("/admin/login");
        }
    };

    return (
        <nav className="bg-gray-800 text-white shadow-lg z-50 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Left section Search Form */}
                    <div className="hidden md:block flex-1 max-w-xl mx-4">
                        <form onSubmit={handleSearch} className="relative">
                            <div className="flex">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                    placeholder="Tìm kiếm..."
                                    className="w-full px-4 py-2 rounded-l-md bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors"
                                >
                                    <MagnifyingGlassIcon className="h-5 w-5" />
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Right section - User Dropdown */}
                    <div className="flex items-center">
                        <div className="relative">
                            <button
                                onClick={() =>
                                    setIsDropdownOpen(!isDropdownOpen)
                                }
                                className="flex items-center gap-2 text-sm rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white transition-all"
                            >
                                <span className="sr-only">Open user menu</span>
                                {/* Hiển thị Avatar nếu có, không thì icon mặc định */}
                                {user?.avatar ? (
                                    <img
                                        src={user.avatar}
                                        alt="Avatar"
                                        className="h-8 w-8 rounded-full object-cover border border-gray-600"
                                    />
                                ) : (
                                    <UserCircleIcon className="h-8 w-8" />
                                )}
                                <span className="hidden md:block font-medium">
                                    {user?.fullName || "Admin"}
                                </span>
                            </button>

                            {/* Dropdown Menu */}
                            {isDropdownOpen && (
                                <>
                                    {/* Backdrop để click ra ngoài thì đóng menu */}
                                    <div
                                        className="fixed inset-0 z-10 cursor-default"
                                        onClick={() => setIsDropdownOpen(false)}
                                    />

                                    <div className="absolute right-0 z-20 mt-2 w-56 bg-white rounded-lg shadow-xl py-2 ring-1 ring-black ring-opacity-5 transform origin-top-right transition-all">
                                        {/* User Info Header in Dropdown */}
                                        <div className="px-4 py-3 border-b border-gray-100">
                                            <p className="text-sm text-gray-500">
                                                Đăng nhập với
                                            </p>
                                            <p className="text-sm font-medium text-gray-900 truncate">
                                                {user?.email ||
                                                    "admin@dpshop.com"}
                                            </p>
                                        </div>

                                        <div className="py-1">
                                            <button
                                                onClick={() => {
                                                    navigate("/admin/settings");
                                                    setIsDropdownOpen(false);
                                                }}
                                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 flex items-center gap-2"
                                            >
                                                <Cog6ToothIcon className="h-4 w-4" />
                                                Cài đặt
                                            </button>

                                            <button
                                                onClick={() => {
                                                    navigate(
                                                        "/admin/activity-log",
                                                    );
                                                    setIsDropdownOpen(false);
                                                }}
                                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 flex items-center gap-2"
                                            >
                                                <ClipboardDocumentListIcon className="h-4 w-4" />
                                                Nhật ký hoạt động
                                            </button>
                                        </div>

                                        <div className="border-t border-gray-100 py-1">
                                            <button
                                                onClick={handleLogout}
                                                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 flex items-center gap-2"
                                            >
                                                <ArrowRightOnRectangleIcon className="h-4 w-4" />
                                                Đăng xuất
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Mobile Search */}
                <div className="md:hidden py-3">
                    <form onSubmit={handleSearch} className="relative">
                        <div className="flex">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Tìm kiếm..."
                                className="flex-1 px-4 py-2 rounded-l-md bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <MagnifyingGlassIcon className="h-5 w-5" />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
