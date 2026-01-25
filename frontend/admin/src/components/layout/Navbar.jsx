import { useState } from "react";
import {
    Bars3Icon,
    MagnifyingGlassIcon,
    UserCircleIcon,
} from "@heroicons/react/24/outline";

const Navbar = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        // Xử lý tìm kiếm
        console.log("Searching for:", searchQuery);
    };

    const menuItems = [
        { label: "Settings", href: "#" },
        { label: "Activity Log", href: "#" },
        { label: "Logout", href: "#" },
    ];

    return (
        <nav className="bg-gray-800 text-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/*Left section Search Form */}
                    <div className="hidden md:block flex-1 max-w-xl mx-4">
                        <form onSubmit={handleSearch} className="relative">
                            <div className="flex">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                    placeholder="Search for..."
                                    className="w-full px-4 py-2 rounded-l-md bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    aria-label="Search"
                                />
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors"
                                    aria-label="Search"
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
                                className="flex items-center text-sm rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                                aria-expanded={isDropdownOpen}
                                aria-haspopup="true"
                                aria-label="User menu"
                            >
                                <span className="sr-only">Open user menu</span>
                                <UserCircleIcon className="h-8 w-8" />
                            </button>

                            {/* Dropdown Menu */}
                            {isDropdownOpen && (
                                <>
                                    {/* Backdrop for mobile */}
                                    <div
                                        className="fixed inset-0 z-10"
                                        onClick={() => setIsDropdownOpen(false)}
                                        aria-hidden="true"
                                    />

                                    <div className="absolute right-0 z-20 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5">
                                        {menuItems.map((item, index) => (
                                            <div key={item.label}>
                                                <a
                                                    href={item.href}
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    onClick={() =>
                                                        setIsDropdownOpen(false)
                                                    }
                                                >
                                                    {item.label}
                                                </a>
                                                {index ===
                                                    menuItems.length - 2 && (
                                                    <hr className="my-1 border-gray-200" />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Mobile Search (hidden on larger screens) */}
                <div className="md:hidden py-3">
                    <form onSubmit={handleSearch} className="relative">
                        <div className="flex">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search for..."
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
