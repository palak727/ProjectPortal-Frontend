"use client";
// LogoutConfirmation.tsx
import React from "react";

const LogoutConfirmation: React.FC = () => {
  const handleLogout = async () => {
    try {
      const response = await fetch("http://0.0.0.0:3045/api/v1/prof/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        console.log("Logout successful");
        window.location.href = "/login"; // Navigate to login page
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("An error occurred during logout:", error);
    }
  };

  const handleCancel = () => {
    window.location.href = "/"; // Redirect to home page
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-80 rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-xl font-semibold">Confirm Logout</h2>
        <p className="mb-4 text-gray-600">
          Are you sure you want to log out? This will end your session.
        </p>
        <div className="flex justify-between">
          <button
            onClick={handleCancel}
            className="rounded bg-gray-300 px-4 py-2 text-gray-800 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleLogout}
            className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutConfirmation;
