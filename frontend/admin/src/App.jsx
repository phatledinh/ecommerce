import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoadingSpinner from "./components/common/LoadingSpinner";
import PrivateRoute from "./components/auth/PrivateRoute";
import AdminRoutes from "./routes/AdminRoutes";

// Auth
import Login from "./pages/Auth/Login";
import ForgotPasswordPage from "./pages/Auth/ForgotPasswordPage";

// Layout
const AdminLayout = lazy(() => import("./components/layout/AdminLayout"));

function App() {
    return (
        <Suspense fallback={<LoadingSpinner fullscreen />}>
            <Routes>
                {/* ===== PUBLIC ROUTES ===== */}
                <Route path="/admin/login" element={<Login />} />
                <Route
                    path="/admin/forgot-password"
                    element={<ForgotPasswordPage />}
                />

                {/* ===== PROTECTED ADMIN AREA ===== */}
                <Route element={<PrivateRoute />}>
                    <Route path="/admin" element={<AdminLayout />}>
                        {/* Gọi toàn bộ cấu hình route con ở đây */}
                        {AdminRoutes()}
                    </Route>
                </Route>

                {/* ===== DEFAULT REDIRECT ===== */}
                <Route
                    path="/"
                    element={<Navigate to="/admin/login" replace />}
                />
                <Route path="*" element={<Navigate to="/admin" replace />} />
            </Routes>
        </Suspense>
    );
}

export default App;
