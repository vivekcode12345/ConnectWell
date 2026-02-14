import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl rounded-3xl bg-white p-8 text-center shadow">
        <p className="text-lg">Checking your session...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
