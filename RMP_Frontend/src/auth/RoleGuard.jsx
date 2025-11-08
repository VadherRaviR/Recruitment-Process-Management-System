import { useContext } from "react";
import { AuthContext } from "./AuthContext";

export default function RoleGuard({ roles, children }) {
  const { user } = useContext(AuthContext);
  if (!user) return <div className="text-center mt-10">Please login first</div>;
  if (!roles.includes(user.role))
    return <div className="text-center mt-10 text-red-500">Access Denied</div>;
  return children;
}
