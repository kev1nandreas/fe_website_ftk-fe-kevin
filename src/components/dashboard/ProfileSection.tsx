"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons

interface User {
  id: string;
  username: string;
  password: string;
}

const ProfileSection = () => {
  const [user, setUser] = useState<User | null>(null);
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false); // State to toggle password visibility
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");

        if (!token) {
          alert("Please login first");
          router.push("/login");
          return;
        }

        const response = await fetch(`/auth/users/${userId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const result = await response.json();
          setUser(result.data);
          setNewUsername(result.data.username);
          setNewPassword(result.data.password);
        } else {
          const errorResult = await response.json();
          alert(`Error: ${errorResult.message}`);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [router]);

  const handleEditUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      if (!token || !userId || !user) return;

      const data = {
        username: newUsername,
        password: newPassword,
      };

      const response = await fetch(`/auth/users/${userId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.status === "success") {
        alert("Profile successfully updated!");
        setUser(result.data);
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error("Failed to edit profile:", error);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-slate-50 px-4 py-10 sm:w-4/5 sm:px-20">
      <form onSubmit={handleEditUser} className="flex w-full flex-col gap-4 bg-white p-4 shadow sm:p-6">
        <h2 className="font-secondary text-lg font-bold text-blue-main sm:text-2xl">Edit Profile</h2>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-y-2">
            <label htmlFor="username" className="font-secondary text-sm font-medium sm:text-lg">Username</label>
            <input
              id="username"
              type="text"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              className="w-full rounded border p-2"
            />
          </div>
          <div className="flex flex-col gap-y-2 relative">
            <label htmlFor="password" className="font-secondary text-sm font-medium sm:text-lg">Password</label>
            <div className="relative w-full">
              <input
                id="password"
                type={passwordVisible ? "text" : "password"} // Toggle between password and text
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full rounded border p-2 pr-10" // Add padding to avoid overlap with the icon
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600"
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />} {/* Change icon based on visibility */}
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <button type="submit" className="mt-4 rounded bg-blue-main px-4 py-2 font-medium text-white hover:bg-blue-600">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileSection;
