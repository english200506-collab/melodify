import { Navigate } from "react-router-dom";
import { useAuth } from "@/providers/AuthProvider.tsx";
import type { JSX } from "react";

interface ProtectedRouteProps {
    children: JSX.Element;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // если есть пользователь — рендерим страницу
    return children;
};

export default ProtectedRoute;
