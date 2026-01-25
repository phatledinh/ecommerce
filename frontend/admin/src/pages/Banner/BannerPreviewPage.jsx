// pages/admin/BannerPreviewPage.jsx
import { useParams, useNavigate } from "react-router-dom";
import {
    ArrowLeftIcon,
    DevicePhoneMobileIcon,
    ComputerDesktopIcon,
} from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";

const BannerPreviewPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [banner, setBanner] = useState(null);
    const [viewMode, setViewMode] = useState("desktop"); // 'desktop' or 'mobile'

    useEffect(() => {
        // Fetch banner data
        fetchBanner();
    }, [id]);

    const fetchBanner = async () => {
        // Mock data
        const mockBanner = {
            id: 1,
            title: "Summer Sale 2024",
            image_url:
                "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&h=400&fit=crop",
            link_url: "/summer-sale",
            position: "HOME_MAIN",
        };
        setBanner(mockBanner);
    };

    if (!banner) {
        return (
            <div className="flex justify-center items-center h-96">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-6">
            {/* Header */}
            <div className="mb-8">
                <button
                    onClick={() => navigate("/admin/banners")}
                    className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
                >
                    <ArrowLeftIcon className="h-5 w-5 mr-2" />
                    Quay lại danh sách
                </button>

                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            Xem trước Banner
                        </h1>
                        <p className="text-gray-600 mt-2">{banner.title}</p>
                    </div>

                    <div className="flex space-x-2">
                        <button
                            onClick={() => setViewMode("desktop")}
                            className={`px-4 py-2 rounded-lg flex items-center ${
                                viewMode === "desktop"
                                    ? "bg-blue-100 text-blue-700"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                        >
                            <ComputerDesktopIcon className="h-5 w-5 mr-2" />
                            Desktop
                        </button>
                        <button
                            onClick={() => setViewMode("mobile")}
                            className={`px-4 py-2 rounded-lg flex items-center ${
                                viewMode === "mobile"
                                    ? "bg-blue-100 text-blue-700"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                        >
                            <DevicePhoneMobileIcon className="h-5 w-5 mr-2" />
                            Mobile
                        </button>
                    </div>
                </div>
            </div>

            {/* Preview Container */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
                {/* Mock Browser/Device */}
                <div className="bg-gray-100 border-b border-gray-200 p-4">
                    <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                        <div className="flex-1 text-center text-sm text-gray-600">
                            https://dpshop.com{banner.link_url}
                        </div>
                    </div>
                </div>

                {/* Preview Content */}
                <div
                    className={`${viewMode === "mobile" ? "max-w-sm mx-auto" : ""} p-8`}
                >
                    <div
                        className={`relative overflow-hidden rounded-lg ${viewMode === "mobile" ? "aspect-[9/16]" : "aspect-[21/9]"}`}
                    >
                        <img
                            src={banner.image_url}
                            alt={banner.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center">
                            <div className="opacity-0 hover:opacity-100 transition-opacity duration-300">
                                <button className="px-6 py-3 bg-white text-gray-900 rounded-lg font-medium shadow-lg">
                                    Click để xem chi tiết
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Stats Info */}
                    <div className="mt-8 grid grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <div className="text-2xl font-bold text-gray-900">
                                150,000
                            </div>
                            <div className="text-sm text-gray-600">
                                Lượt xem
                            </div>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <div className="text-2xl font-bold text-gray-900">
                                15,000
                            </div>
                            <div className="text-sm text-gray-600">
                                Lượt click
                            </div>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <div className="text-2xl font-bold text-gray-900">
                                10.0%
                            </div>
                            <div className="text-sm text-gray-600">
                                Tỷ lệ click
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BannerPreviewPage;
