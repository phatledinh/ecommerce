// components/layout/AdminLayout.jsx
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar, { MobileSidebar } from "./Sidebar";
import Footer from "./Footer";
import { useState } from "react";

const AdminLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Sidebar cho desktop */}
            <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64">
                <Sidebar />
            </div>

            {/* Sidebar cho mobile */}
            <MobileSidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            {/* Main content với padding left bằng width của sidebar */}
            <div className="lg:pl-64">
                {/* Navbar cố định ở trên cùng */}
                <div className="sticky top-0 z-40">
                    <Navbar onSidebarToggle={() => setSidebarOpen(true)} />
                </div>

                {/* Main content area với chiều cao cố định và scroll */}
                <main className="min-h-[calc(100vh-4rem)]">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                        <div className="bg-white rounded-lg shadow-sm border">
                            {/* Outlet sẽ render nội dung trang con */}
                            <Outlet />
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <Footer />
            </div>
        </div>
    );
};

export default AdminLayout;
