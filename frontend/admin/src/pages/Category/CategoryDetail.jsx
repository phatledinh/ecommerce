// pages/admin/categories/CategoryDetail.jsx
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import CategoryAttributes from "./CategoryAttributes";
import categoryService from "../../services/categoryService";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

const CategoryDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("overview");

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const data = await categoryService.getById(id);
                setCategory(data);
            } catch (error) {
                console.error("Load detail failed", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCategory();
    }, [id]);

    const handleDelete = async () => {
        if (window.confirm("Bạn có chắc muốn xóa?")) {
            await categoryService.delete(id);
            navigate("/admin/categories");
        }
    };

    if (loading) return <div className="p-20 text-center">Đang tải...</div>;
    if (!category)
        return <div className="p-20 text-center">Không tìm thấy danh mục</div>;

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                <Link
                    to="/admin/categories"
                    className="flex items-center text-blue-600 mb-6"
                >
                    <ArrowLeftIcon className="h-5 w-5 mr-2" /> Quay lại
                </Link>

                <div className="flex justify-between items-start mb-8">
                    <div className="flex items-center space-x-4">
                        <div className="text-4xl p-4 bg-white rounded-2xl shadow-sm">
                            {category.icon}
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">
                                {category.name}
                            </h1>
                            <div className="flex space-x-2 mt-2">
                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-medium ${category.isActive ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"}`}
                                >
                                    {category.isActive ? "Hoạt động" : "Ẩn"}
                                </span>
                                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                                    Cấp {category.level}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex space-x-3">
                        <button
                            onClick={handleDelete}
                            className="px-4 py-2 border border-rose-200 text-rose-600 rounded-xl hover:bg-rose-50"
                        >
                            Xóa
                        </button>
                        <Link
                            to={`/admin/categories/${id}/edit`}
                            className="px-4 py-2 bg-blue-600 text-white rounded-xl shadow-md"
                        >
                            Chỉnh sửa
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                            <nav className="flex border-b">
                                <button
                                    onClick={() => setActiveTab("overview")}
                                    className={`px-6 py-4 text-sm font-medium ${activeTab === "overview" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500"}`}
                                >
                                    Tổng quan
                                </button>
                                <button
                                    onClick={() => setActiveTab("attributes")}
                                    className={`px-6 py-4 text-sm font-medium ${activeTab === "attributes" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500"}`}
                                >
                                    Thuộc tính
                                </button>
                            </nav>

                            <div className="p-6">
                                {activeTab === "overview" ? (
                                    <div className="space-y-6">
                                        <p className="text-gray-700 leading-relaxed">
                                            {category.description ||
                                                "Không có mô tả"}
                                        </p>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="p-4 bg-gray-50 rounded-xl">
                                                <p className="text-xs text-gray-500 uppercase">
                                                    Slug
                                                </p>
                                                <p className="font-medium">
                                                    /{category.slug}
                                                </p>
                                            </div>
                                            <div className="p-4 bg-gray-50 rounded-xl">
                                                <p className="text-xs text-gray-500 uppercase">
                                                    Thứ tự
                                                </p>
                                                <p className="font-medium">
                                                    {category.sortOrder}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <CategoryAttributes
                                        attributes={category.attributes}
                                        readOnly={true}
                                    />
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl border border-gray-200 p-6">
                            <h3 className="text-lg font-medium mb-4">
                                Thumbnail
                            </h3>
                            <img
                                src={category.thumbnail}
                                alt=""
                                className="w-full h-48 object-cover rounded-xl"
                            />
                        </div>
                        <div className="bg-white rounded-2xl border border-gray-200 p-6">
                            <h3 className="text-lg font-medium mb-4">
                                Thông tin hệ thống
                            </h3>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-500">
                                        Ngày tạo:
                                    </span>{" "}
                                    <span>{category.createdAt}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">
                                        Người tạo:
                                    </span>{" "}
                                    <span>{category.createdBy}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">
                                        Cập nhật:
                                    </span>{" "}
                                    <span>{category.updatedAt}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryDetail;
