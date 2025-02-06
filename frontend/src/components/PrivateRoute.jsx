import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, role }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default PrivateRoute;
