"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MdSpaceDashboard } from "react-icons/md";
import { FaUser, FaBars, FaTimes } from "react-icons/fa";
import { TbCategoryFilled } from "react-icons/tb";
import { BiLogOut } from "react-icons/bi";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [role, setRole] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    setRole(userRole);
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch(`/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        localStorage.clear();
        router.push("/");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("An error occurred during logout:", error);
    }
  };

  return (
    <>
      {/* Tombol Hamburger untuk Mobile */}
      <div className="flex items-center justify-between bg-white px-4 py-2 sm:hidden">
        <Image
          src="/images/logo-kabinet-secondary.png"
          width={40}
          height={40}
          alt="Logo Kabinet"
        />
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-xl text-yellow-main"
        >
          <FaBars />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } w-full flex-col gap-y-6 bg-white px-4 py-6 sm:relative sm:flex sm:w-1/5 sm:px-6 sm:py-10`}
      >
        <div className="flex justify-end sm:hidden">
          <button
            onClick={() => setIsOpen(false)}
            className="text-xl text-yellow-main"
          >
            <FaTimes />
          </button>
        </div>

        <Link
          href="/"
          className="flex w-full items-center justify-center gap-x-4"
        >
          <Image
            src="/icons/FTKIcon.png"
            width={40}
            height={40}
            alt="Logo Kabinet"
            className="md:w-[65px] md:h-[65px]"
          />
          <h1 className="w-24 font-primary text-lg font-extrabold text-base-dark sm:w-28 sm:text-xl">
            Bentang Layar
          </h1>
        </Link>

        <div className="h-full w-full">
          <Link
            href="/login/dashboard"
            className="flex w-full items-center gap-x-3 rounded-md px-4 py-3 hover:bg-base-gray sm:gap-x-4 sm:px-5"
          >
            <MdSpaceDashboard className="scale-[1.5] fill-yellow-main sm:scale-[1.75]" />
            <p className="font-secondary text-sm font-semibold text-yellow-main sm:text-lg">
              Artikel
            </p>
          </Link>

          {/* {role === "admin" && ( */}
            <Link
              href="/login/category"
              className="flex w-full items-center gap-x-3 rounded-md px-4 py-3 hover:bg-base-gray sm:gap-x-4 sm:px-5"
            >
              <TbCategoryFilled className="scale-[1.5] fill-yellow-main sm:scale-[1.75]" />
              <p className="font-secondary text-sm font-semibold text-yellow-main sm:text-lg">
                Kategori
              </p>
            </Link>
          {/* )} */}

          {role === "admin" && (
            <Link
              href="/login/user"
              className="flex w-full items-center gap-x-3 rounded-md px-4 py-3 hover:bg-base-gray sm:gap-x-4 sm:px-5"
            >
              <FaUser className="scale-[1.5] fill-yellow-main sm:scale-[1.75]" />
              <p className="font-secondary text-sm font-semibold text-yellow-main sm:text-lg">
                Users
              </p>
            </Link>
          )}

          {role === "user" && (
            <Link
              href="/login/profile"
              className="flex w-full items-center gap-x-3 rounded-md px-4 py-3 hover:bg-base-gray sm:gap-x-4 sm:px-5"
            >
              <FaUser className="scale-[1.5] fill-yellow-main sm:scale-[1.75]" />
              <p className="font-secondary text-sm font-semibold text-yellow-main sm:text-lg">
                Edit Profile
              </p>
            </Link>
          )}
        </div>

        <button
          className="flex w-full items-center gap-x-3 rounded-md bg-yellow-main px-4 py-3 hover:bg-yellow-dark-1 sm:gap-x-4 sm:px-5"
          onClick={handleLogout}
        >
          <BiLogOut className="scale-[1.25] fill-white sm:scale-[1.5]" />
          <p className="font-secondary text-sm font-normal text-white sm:text-base">
            Logout
          </p>
        </button>
      </div>
    </>
  );
};

export default Sidebar;
