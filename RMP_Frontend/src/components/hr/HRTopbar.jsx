import React, { useContext } from "react";
import { AuthContext } from "../../auth/AuthContext";

export default function HRTopbar() {
  const { user, logout } = useContext(AuthContext);
  const name = user?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] || user?.sub;

  return (
    <div className="flex items-center justify-between bg-white p-4 rounded shadow">
      <div>
        <h2 className="text-lg font-semibold">HR Panel</h2>
        <p className="text-sm text-gray-500">Manage jobs, candidates & interviews</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <div className="text-sm font-medium">{name}</div>
          <div className="text-xs text-gray-500">HR</div>
        </div>

        <button
          onClick={() => logout && logout()}
          className="px-3 py-1 bg-red-50 text-red-600 border border-red-100 rounded hover:bg-red-100 text-sm"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
