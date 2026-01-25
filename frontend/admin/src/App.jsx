import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoadingSpinner from "./components/common/LoadingSpinner";

import BannerListPage from "./pages/Banner/BannerListPage";
import BannerFormPage from "./pages/Banner/BannerFormPage";
import BannerPreviewPage from "./pages/Banner/BannerPreviewPage";

import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import PrivateRoute from "./components/auth/PrivateRoute";

import ProductList from "./pages/Product/ProductList";
import ProductForm from "./pages/Product/ProductForm";
import ProductDetail from "./pages/Product/ProductDetail";

const CategoryList = lazy(() => import("./pages/Category/CategoryList"));
const CategoryForm = lazy(() => import("./pages/Category/CategoryForm"));
import CategoryDetail from "./pages/Category/CategoryDetail";

import BrandList from "./pages/Brand/BrandList";
import BrandForm from "./pages/Brand/BrandForm";

import AttributeList from "./pages/Attribute/AttributeList";
import AttributeForm from "./pages/Attribute/AttributeForm";
import AttributeDetail from "./pages/Attribute/AttributeDetail";
import AttributeOptionForm from "./pages/Attribute/AttributeOptionForm";

import CampaignList from "./pages/Campaign/CampaignList";
import CampaignForm from "./pages/Campaign/CampaignForm";

import DiscountList from "./pages/Discount/DiscountList";
import DiscountForm from "./pages/Discount/DiscountForm";
import DiscountDetail from "./pages/Discount/DiscountDetail";

import SupplierList from "./pages/Supplier/SupplierList";
import SupplierForm from "./pages/Supplier/SupplierForm";
import SupplierDetail from "./pages/Supplier/SupplierDetail";

import CustomerList from "./pages/Customer/CustomerList";
import CustomerDetail from "./pages/Customer/CustomerDetail";

import OrderList from "./pages/Order/OrderList";
import OrderDetail from "./pages/Order/OrderDetail";

const AdminLayout = lazy(() => import("./components/layout/AdminLayout"));
const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));

function App() {
    return (
        <Suspense fallback={<LoadingSpinner fullscreen />}>
            <Routes>
                {/* Auth Router */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                {/* Admin routes */}
                <Route
                    path="/admin"
                    element={
                        <PrivateRoute>
                            <AdminLayout />
                        </PrivateRoute>
                    }
                >
                    <Route index element={<Dashboard />} />

                    {/* Product Router*/}
                    <Route path="products" element={<ProductList />} />
                    <Route path="products/:id" element={<ProductDetail />} />
                    <Route path="products/new" element={<ProductForm />} />
                    <Route path="products/:id/edit" element={<ProductForm />} />

                    {/* Category Router*/}
                    <Route path="categories" element={<CategoryList />} />
                    <Route path="categories/new" element={<CategoryForm />} />
                    <Route path="categories/:id" element={<CategoryDetail />} />
                    <Route
                        path="categories/:id/edit"
                        element={<CategoryForm />}
                    />

                    {/* Brand Router*/}
                    <Route path="brands" element={<BrandList />} />
                    <Route path="brands/new" element={<BrandForm />} />
                    <Route path="brands/:id/edit" element={<BrandForm />} />

                    {/* Banner Router*/}
                    <Route path="/admin/banners" element={<BannerListPage />} />
                    <Route
                        path="/admin/banners/create"
                        element={<BannerFormPage />}
                    />
                    <Route
                        path="/admin/banners/edit/:id"
                        element={<BannerFormPage />}
                    />
                    <Route
                        path="/admin/banners/preview/:id"
                        element={<BannerPreviewPage />}
                    />

                    {/* Marketing Campaign Routes */}
                    <Route path="campaigns" element={<CampaignList />} />
                    <Route path="campaigns/new" element={<CampaignForm />} />
                    <Route
                        path="campaigns/:id/edit"
                        element={<CampaignForm />}
                    />

                    {/* Discount Management Routes */}
                    <Route path="discounts" element={<DiscountList />} />
                    <Route path="discounts/new" element={<DiscountForm />} />
                    <Route path="discounts/:id" element={<DiscountDetail />} />
                    <Route
                        path="discounts/:id/edit"
                        element={<DiscountForm />}
                    />

                    {/* Supplier Management Routes */}
                    <Route path="suppliers" element={<SupplierList />} />
                    <Route path="suppliers/new" element={<SupplierForm />} />
                    <Route path="suppliers/:id" element={<SupplierDetail />} />
                    <Route
                        path="suppliers/:id/edit"
                        element={<SupplierForm />}
                    />

                    {/* Order Management Routes */}
                    <Route path="orders" element={<OrderList />} />
                    <Route path="orders/:orderId" element={<OrderDetail />} />

                    {/* Customers Routes */}
                    <Route path="customers" element={<CustomerList />} />
                    <Route
                        path="customers/:customerId"
                        element={<CustomerDetail />}
                    />

                    {/* Attributes Routes */}
                    <Route path="attributes" element={<AttributeList />} />
                    <Route path="attributes/new" element={<AttributeForm />} />
                    <Route
                        path="attributes/:id"
                        element={<AttributeDetail />}
                    />
                    <Route
                        path="attributes/:id/edit"
                        element={<AttributeForm />}
                    />
                    <Route
                        path="attributes/:id/options/new"
                        element={<AttributeOptionForm />}
                    />
                    <Route
                        path="attributes/:id/options/:optionId/edit"
                        element={<AttributeOptionForm />}
                    />
                </Route>

                {/* Redirects */}
                <Route path="/" element={<Navigate to="/admin" />} />
            </Routes>
        </Suspense>
    );
}

export default App;
