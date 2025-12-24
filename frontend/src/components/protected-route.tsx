import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";


export default function ProtectedRoutes () {
  const isAdmin = useAuth();

  return isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace />
  )
}