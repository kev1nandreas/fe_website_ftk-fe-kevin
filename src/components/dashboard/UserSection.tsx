"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaPlus, FaTrashAlt, FaEdit, FaEye, FaEyeSlash } from "react-icons/fa"; // Import Eye icons
import { v4 as uuidv4 } from "uuid";

interface User {
  id: string;
  username: string;
  password: string;
  role: string | null;
  createdAt: string;
  updatedAt: string;
}

const UserSection = () => {
  const [users, setusers] = useState<User[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState<User | null>(null);
  const [newusername, setNewusername] = useState("");
  const [newpassword, setNewpassword] = useState("");
  const [newrole, setNewrole] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false); // Toggle for create form
  const [editPasswordVisible, setEditPasswordVisible] = useState(false); // Toggle for edit form
  const router = useRouter();

  useEffect(() => {
    const fetchusers = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          alert("Please login first");
          router.push("/login");
          return;
        }

        const response = await fetch("/auth/users", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const result = await response.json();
          setusers(result.data);
        } else {
          const errorResult = await response.json();
          alert(`Error: ${errorResult.message}`);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchusers();
  }, [router]);

  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        router.push("/login");
        return;
      }

      const response = await fetch(
        `/auth/users/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const result = await response.json();
      if (result.status === "success") {
        setusers(users.filter((user) => user.id !== id.toString()));
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  const handleCreateuser = async (e: React.FormEvent) => {
    e.preventDefault();

    try {   
      const data = {
        id: uuidv4(),
        username: newusername,
        password: newpassword,
        role: newrole,
      };
  
      console.log("Data yang dikirim dalam JSON:", data);
  
      const token = localStorage.getItem("token");
      const response = await fetch("/auth/register", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"},
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
      console.log("Response dari server:", result);
  
      if (result.status === "success") {
        alert("User berhasil ditambahkan!");
        setIsCreating(false);
        setusers([...users, result.data]);
      } else {
        console.log("Error dari server:", result.message);
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error("Failed to create user:", error);
    }
  };

  useEffect(() => {
    if (isEditing) {
      setNewusername(isEditing.username);
      setNewpassword(isEditing.password);
      setNewrole(isEditing.role || "");
    }
  }, [isEditing]);

  useEffect(() => {
    if (isCreating) {
      setNewusername("");
      setNewpassword("");
      setNewrole("");
    }
  }, [isCreating]);

  const handleEdituser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!isEditing) return;
 
      const data = {
        username: newusername,
        password: newpassword,
        role: newrole,
      };
  
      console.log("Data yang dikirim dalam JSON untuk update:", data);
  
      const token = localStorage.getItem("token");
      const response = await fetch(
        `/auth/users/${isEditing.id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),  
        },
      );
  
      const result = await response.json();
      console.log("Response dari server:", result);
  
      if (result.status === "success") {
        alert("User berhasil diubah!");
        setIsEditing(null);
        setusers(
          users.map((user) => (user.id === isEditing.id ? result.data : user)),
        );
      } else {
        console.log("Error dari server:", result.message);
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error("Failed to edit user:", error);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleEditPasswordVisibility = () => {
    setEditPasswordVisible(!editPasswordVisible);
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-slate-50 px-4 py-10 sm:w-4/5 sm:px-20">
      {!isCreating && !isEditing ? (
        <>
          <div className="flex h-fit w-full flex-col items-center justify-between sm:flex-row">
            <h1 className="font-secondary text-2xl font-bold text-base-dark sm:text-3xl">
              User
            </h1>
            <button
              onClick={() => setIsCreating(true)}
              className="mt-4 flex w-full items-center gap-x-2 rounded-md bg-slate-200 px-3 py-2 hover:bg-slate-300 sm:mt-0 sm:w-auto sm:px-5 sm:py-3"
            >
              <FaPlus className="fill-blue-main" />
              <p className="font-secondary text-sm font-normal text-blue-main sm:text-lg">
                Tambah User
              </p>
            </button>
          </div>

          <div className="mt-6 w-full overflow-x-auto rounded-lg bg-white p-4 shadow-md sm:mt-10 sm:p-6">
            <table className="min-w-full table-auto border-collapse text-sm sm:text-base">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-4 py-2 text-left">ID</th>
                  <th className="border px-4 py-2 text-left">Username</th>
                  <th className="border px-4 py-2 text-center">Role</th>
                  <th className="border px-4 py-2 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="border px-4 py-2">{user.id}</td>
                    <td className="border px-4 py-2">{user.username}</td>
                    <td className="border px-4 py-2">{user.role}</td>
                    <td className="flex justify-center gap-2 border px-4 py-2">
                      <button
                        onClick={() => setIsEditing(user)}
                        className="flex items-center gap-x-1 rounded bg-yellow-500 px-3 py-1 text-white hover:bg-yellow-700"
                      >
                        <FaEdit />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="flex items-center gap-x-1 rounded bg-red-500 px-3 py-1 text-white hover:bg-red-700"
                      >
                        <FaTrashAlt />
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : isCreating ? (
        <form
          onSubmit={handleCreateuser}
          className="flex w-full flex-col gap-4 bg-white p-4 shadow sm:p-6"
        >
          <h2 className="font-secondary text-lg font-bold text-blue-main sm:text-2xl">
            Buat User Baru
          </h2>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-y-2">
              <label
                htmlFor="username"
                className="font-secondary text-sm font-medium sm:text-lg"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                value={newusername}
                onChange={(e) => setNewusername(e.target.value)}
                className="w-full rounded border p-2"
                placeholder="Enter username"
              />
            </div>
            <div className="flex flex-col gap-y-2 relative">
              <label
                htmlFor="password"
                className="font-secondary text-sm font-medium sm:text-lg"
              >
                Password
              </label>
              <div className="relative w-full">
                <input
                  id="password"
                  type={passwordVisible ? "text" : "password"}
                  value={newpassword}
                  onChange={(e) => setNewpassword(e.target.value)}
                  className="w-full rounded border p-2 pr-10"
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600"
                >
                  {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-y-2">
              <label
                htmlFor="role"
                className="font-secondary text-sm font-medium sm:text-lg"
              >
                Role
              </label>
              <select
                id="role"
                value={newrole}
                onChange={(e) => setNewrole(e.target.value)}
                className="w-full rounded border p-2"
              >
                <option value="" disabled>
                  Select Role
                </option>
                <option value="admin">admin</option>
                <option value="user">user</option>
              </select>
            </div>
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => setIsCreating(false)}
              className="mt-4 rounded bg-gray-300 px-4 py-2 font-medium text-black hover:bg-gray-500"
            >
              Batal
            </button>
            <button
              type="submit"
              className="mt-4 rounded bg-blue-main px-4 py-2 font-medium text-white hover:bg-blue-600"
            >
              Simpan
            </button>
          </div>
        </form>
      ) : isEditing ? (
        <form
          onSubmit={handleEdituser}
          className="flex w-full flex-col gap-4 bg-white p-4 shadow sm:p-6"
        >
          <h2 className="font-secondary text-lg font-bold text-blue-main sm:text-2xl">
            Edit User
          </h2>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-y-2">
              <label
                htmlFor="username"
                className="font-secondary text-sm font-medium sm:text-lg"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                value={newusername}
                onChange={(e) => setNewusername(e.target.value)}
                className="w-full rounded border p-2"
              />
            </div>
            <div className="flex flex-col gap-y-2 relative">
              <label
                htmlFor="password"
                className="font-secondary text-sm font-medium sm:text-lg"
              >
                Password
              </label>
              <div className="relative w-full">
                <input
                  id="password"
                  type={editPasswordVisible ? "text" : "password"}
                  value={newpassword}
                  onChange={(e) => setNewpassword(e.target.value)}
                  className="w-full rounded border p-2 pr-10"
                />
                <button
                  type="button"
                  onClick={toggleEditPasswordVisibility}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600"
                >
                  {editPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-y-2">
              <label
                htmlFor="role"
                className="font-secondary text-sm font-medium sm:text-lg"
              >
                Role
              </label>
              <select
                id="role"
                value={newrole}
                onChange={(e) => setNewrole(e.target.value)}
                className="w-full rounded border p-2"
              >
                <option value="" disabled>
                  Select Role
                </option>
                <option value="admin">admin</option>
                <option value="user">user</option>
              </select>
            </div>
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => setIsEditing(null)}
              className="mt-4 rounded bg-gray-300 px-4 py-2 font-medium text-black hover:bg-gray-500"
            >
              Batal
            </button>
            <button
              type="submit"
              className="mt-4 rounded bg-blue-main px-4 py-2 font-medium text-white hover:bg-blue-600"
            >
              Simpan
            </button>
          </div>
        </form>
      ) : null}
    </div>
  );
};

export default UserSection;
