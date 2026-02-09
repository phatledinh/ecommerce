import { lazy } from "react";
import { Route } from "react-router-dom";
import PrivateRoute from "../components/auth/PrivateRoute";
import { ROLES } from "../utils/roles";

// Layout
const Dashboard = lazy(() => import("../pages/Dashboard/Dashboard"));

// Products
import ProductList from "../pages/Product/ProductList";
import ProductForm from "../pages/Product/ProductForm";
import ProductDetail from "../pages/Product/ProductDetail";

// Categories
const CategoryList = lazy(() => import("../pages/Category/CategoryList"));
const CategoryForm = lazy(() => import("../pages/Category/CategoryForm"));
import CategoryDetail from "../pages/Category/CategoryDetail";

// Attributes
const AttributeList = lazy(() => import("../pages/Attribute/AttributeList"));
const AttributeForm = lazy(() => import("../pages/Attribute/AttributeForm"));
import AttributeDetail from "../pages/Attribute/AttributeDetail";

// Banners
import BannerListPage from "../pages/Banner/BannerListPage";
import BannerFormPage from "../pages/Banner/BannerFormPage";
import BannerPreviewPage from "../pages/Banner/BannerPreviewPage";

// Brands
import BrandList from "../pages/Brand/BrandList";
import BrandForm from "../pages/Brand/BrandForm";

// Orders
import OrderList from "../pages/Order/OrderList";
import OrderDetail from "../pages/Order/OrderDetail";

// Customers
import CustomerList from "../pages/Customer/CustomerList";
import CustomerDetail from "../pages/Customer/CustomerDetail";

const AdminRoutes = () => {
    return (
        <>
            <Route index element={<Dashboard />} />

            <Route
                path="unauthorized"
                element={
                    <div className="p-10 text-center text-red-500 font-bold">
                        Bạn không có quyền truy cập trang này (403)
                    </div>
                }
            />

            {/* --- NHÓM CATALOG (Sản phẩm, Danh mục, Thuộc tính, Thương hiệu) --- 
                Cho phép: ADMIN, PRODUCT_MANAGER
            */}
            <Route
                element={
                    <PrivateRoute
                        allowedRoles={[ROLES.ADMIN, ROLES.PRODUCT_MANAGER]}
                    />
                }
            >
                {/* Products */}
                <Route path="products" element={<ProductList />} />
                <Route path="products/new" element={<ProductForm />} />
                <Route path="products/:id" element={<ProductDetail />} />
                <Route path="products/:id/edit" element={<ProductForm />} />

                {/* Categories */}
                <Route path="categories" element={<CategoryList />} />
                <Route path="categories/new" element={<CategoryForm />} />
                <Route path="categories/:id" element={<CategoryDetail />} />
                <Route path="categories/:id/edit" element={<CategoryForm />} />

                {/* Attributes (Đã fix quyền cho Product Manager) */}
                <Route path="attributes" element={<AttributeList />} />
                <Route path="attributes/new" element={<AttributeForm />} />
                <Route path="attributes/:id" element={<AttributeDetail />} />
                <Route path="attributes/:id/edit" element={<AttributeForm />} />

                {/* Brands */}
                <Route path="brands" element={<BrandList />} />
                <Route path="brands/new" element={<BrandForm />} />
            </Route>

            {/* --- NHÓM MARKETING (Banner) --- 
                Cho phép: ADMIN, MARKETING_STAFF
            */}
            <Route
                element={
                    <PrivateRoute
                        allowedRoles={[ROLES.ADMIN, ROLES.MARKETING_STAFF]}
                    />
                }
            >
                <Route path="banners" element={<BannerListPage />} />
                <Route path="banners/create" element={<BannerFormPage />} />
                <Route path="banners/edit/:id" element={<BannerFormPage />} />
                <Route
                    path="banners/preview/:id"
                    element={<BannerPreviewPage />}
                />
            </Route>

            {/* --- NHÓM SALES (Đơn hàng) --- 
                Cho phép: ADMIN, ORDER_MANAGER
            */}
            <Route
                element={
                    <PrivateRoute
                        allowedRoles={[ROLES.ADMIN, ROLES.ORDER_MANAGER]}
                    />
                }
            >
                <Route path="orders" element={<OrderList />} />
                <Route path="orders/:orderId" element={<OrderDetail />} />
            </Route>

            {/* --- NHÓM CSKH (Khách hàng) --- 
                Cho phép: ADMIN, CUSTOMER_SUPPORT
            */}
            <Route
                element={
                    <PrivateRoute
                        allowedRoles={[ROLES.ADMIN, ROLES.CUSTOMER_SUPPORT]}
                    />
                }
            >
                <Route path="customers" element={<CustomerList />} />
                <Route
                    path="customers/:customerId"
                    element={<CustomerDetail />}
                />
            </Route>
        </>
    );
};

export default AdminRoutes;
