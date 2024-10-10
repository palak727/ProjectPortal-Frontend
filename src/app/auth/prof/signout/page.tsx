"use client"
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
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white shadow-md rounded-lg p-6 w-80">
                <h2 className="text-xl font-semibold mb-4">Confirm Logout</h2>
                <p className="text-gray-600 mb-4">
                    Are you sure you want to log out? This will end your session.
                </p>
                <div className="flex justify-between">
                    <button
                        onClick={handleCancel}
                        className="bg-gray-300 text-gray-800 hover:bg-gray-400 rounded px-4 py-2"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleLogout}
                        className="bg-red-600 text-white hover:bg-red-700 rounded px-4 py-2"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LogoutConfirmation;
