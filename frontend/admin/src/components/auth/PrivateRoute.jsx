import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ allowedRoles = [] }) => {
    const token = localStorage.getItem("accessToken");
    const userStr = localStorage.getItem("user");

    let user = null;

    if (userStr && userStr !== "undefined") {
        try {
            user = JSON.parse(userStr);
        } catch (e) {
            console.error("Lỗi parse user data:", e);
            localStorage.removeItem("user");
        }
    }

    if (!token || !user) {
        return <Navigate to="/admin/login" replace />;
    }

    if (allowedRoles.length > 0) {
        const roles = Array.isArray(user.roles) ? user.roles : [];

        const userRoleCodes = roles.map((r) => r.code || r);

        const hasPermission = allowedRoles.some((role) =>
            userRoleCodes.includes(role),
        );

        if (!hasPermission) {
            return <Navigate to="/admin/unauthorized" replace />;
        }
    }

    return <Outlet />;
};

export default PrivateRoute;
