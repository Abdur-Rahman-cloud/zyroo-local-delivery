import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Wrap any route element: <ProtectedRoute roles={["Business"]}><Dashboard /></ProtectedRoute>
// Omit `roles` to just require being logged in (any role).
export default function ProtectedRoute({ roles, children }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(user.role)) {
    return (
      <div style={{ padding: 60, textAlign: "center" }}>
        <h2>Unauthorized</h2>
        <p>Your role ({user.role}) doesn't have access to this page.</p>
      </div>
    );
  }

  return children;
}
