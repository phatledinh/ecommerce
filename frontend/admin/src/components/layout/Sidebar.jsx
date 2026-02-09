import { useState, useMemo } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
    ChevronDownIcon,
    ChevronRightIcon,
    Bars3Icon,
} from "@heroicons/react/24/outline";
import { MENU_CONFIG } from "../../utils/menuConfig";

const Sidebar = ({ onSidebarToggle }) => {
    const location = useLocation();

    const [expandedSections, setExpandedSections] = useState({});

    const toggleSection = (key) => {
        setExpandedSections((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    const filteredMenu = useMemo(() => {
        const userStr = localStorage.getItem("user");
        const user = userStr ? JSON.parse(userStr) : null;

        if (!user || !user.roles) return [];

        const userRoleCodes = user.roles.map((r) => r.code || r);

        const hasPermission = (item) => {
            if (!item.allowedRoles || item.allowedRoles.length === 0)
                return true;

            return item.allowedRoles.some((role) =>
                userRoleCodes.includes(role),
            );
        };

        return MENU_CONFIG.map((section) => {
            const visibleItems = section.items.filter(hasPermission);
            return { ...section, items: visibleItems };
        }).filter((section) => section.items.length > 0);
    }, []);

    const getNavLinkClass = (isActive) => {
        return `flex items-center px-3 py-2 text-sm rounded-lg transition-colors ${
            isActive
                ? "bg-gray-800 text-white"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
        }`;
    };

    return (
        <nav className="bg-gray-900 text-gray-300 w-64 min-h-screen flex flex-col flex-shrink-0 transition-all duration-300 h-full">
            <div className="flex-1 overflow-y-auto custom-scrollbar">
                <div className="p-4">
                    {/* Header Sidebar */}
                    <div className="flex items-center justify-between mb-8">
                        <div className="text-xl font-bold text-white tracking-wider">
                            DPShop Admin
                        </div>
                        {onSidebarToggle && (
                            <button
                                onClick={onSidebarToggle}
                                className="lg:hidden p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700"
                            >
                                <Bars3Icon className="h-6 w-6" />
                            </button>
                        )}
                    </div>

                    {/* Menu Items Render */}
                    <div className="space-y-6">
                        {filteredMenu.map((section, sectionIndex) => (
                            <div key={sectionIndex}>
                                {/* Section Heading */}
                                {section.heading && (
                                    <div className="px-3 mb-2">
                                        <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                                            {section.heading}
                                        </h3>
                                    </div>
                                )}

                                <div className="space-y-1">
                                    {section.items.map((item, itemIndex) => {
                                        if (
                                            item.subItems &&
                                            item.subItems.length > 0
                                        ) {
                                            const isExpanded =
                                                expandedSections[item.key];
                                            const isChildActive =
                                                item.subItems.some(
                                                    (sub) =>
                                                        location.pathname ===
                                                        sub.href,
                                                );

                                            return (
                                                <div key={itemIndex}>
                                                    <button
                                                        onClick={() =>
                                                            toggleSection(
                                                                item.key,
                                                            )
                                                        }
                                                        className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors hover:bg-gray-800 hover:text-white ${
                                                            isExpanded ||
                                                            isChildActive
                                                                ? "text-white bg-gray-800/50"
                                                                : ""
                                                        }`}
                                                    >
                                                        <div className="flex items-center">
                                                            <item.icon className="h-5 w-5 mr-3" />
                                                            <span>
                                                                {item.name}
                                                            </span>
                                                        </div>
                                                        {isExpanded ? (
                                                            <ChevronDownIcon className="h-4 w-4" />
                                                        ) : (
                                                            <ChevronRightIcon className="h-4 w-4" />
                                                        )}
                                                    </button>

                                                    {/* Submenu List */}
                                                    {isExpanded && (
                                                        <div className="mt-1 ml-4 space-y-1 border-l border-gray-700 pl-2">
                                                            {item.subItems.map(
                                                                (
                                                                    subItem,
                                                                    subIndex,
                                                                ) => (
                                                                    <NavLink
                                                                        key={
                                                                            subIndex
                                                                        }
                                                                        to={
                                                                            subItem.href
                                                                        }
                                                                        className={({
                                                                            isActive,
                                                                        }) =>
                                                                            `block px-3 py-2 text-sm rounded-lg transition-colors ${
                                                                                isActive
                                                                                    ? "text-blue-400 font-medium"
                                                                                    : "text-gray-400 hover:text-white"
                                                                            }`
                                                                        }
                                                                    >
                                                                        {
                                                                            subItem.name
                                                                        }
                                                                    </NavLink>
                                                                ),
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        }

                                        return (
                                            <NavLink
                                                key={itemIndex}
                                                to={item.href}
                                                className={({ isActive }) =>
                                                    getNavLinkClass(isActive)
                                                }
                                            >
                                                <item.icon className="h-5 w-5 mr-3" />
                                                <span>{item.name}</span>
                                            </NavLink>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export const MobileSidebar = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="relative z-50 lg:hidden">
            {/* Backdrop  */}
            <div
                className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Sidebar Container */}
            <div className="fixed inset-0 flex">
                <div className="relative mr-16 flex w-full max-w-xs flex-1">
                    {/* Close Button (X) */}
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                        <button
                            type="button"
                            className="-m-2.5 p-2.5 text-white hover:text-gray-300"
                            onClick={onClose}
                        >
                            <span className="sr-only">Close sidebar</span>
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>

                    <Sidebar onSidebarToggle={onClose} />
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
