"use client";
import Link from "next/link";
import React, { FC, useState } from "react";
import NavItems from "../utils/NavItems";
import { ThemeSwitcher } from "../utils/ThemeSwitcher";
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";
import CustomModal from "../utils/CustomModal";
import Login from "../components/Auth/Login";
import Signup from "../components/Auth/Signup";
import Verification from "../components/Auth/Verification"

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: number;
  route: string;
  setRoute: (route: string) => void;
};

const Header: FC<Props> = ({ activeItem, setOpen, route, setRoute, open }) => {
  const [active, setActive] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 80) {
        setActive(true);
      } else {
        setActive(false);
      }
    });
  }

  const handleClose = (e: any) => {
    if (e.target.id === "screen") {
      setOpenSidebar(false);
    }
  };

  return (
    <div className="w-full relative">
      <div
        className={`fixed top-0 left-0 w-full h-[80px] z-[80] transition duration-500 border-b border-gray-200 dark:border-gray-700 ${
          active
            ? "dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black"
            : "bg-white dark:bg-gray-900"
        }`}
      >
        <div className="w-[95%] 800px:w-[92%] m-auto py-2 h-full">
          <div className="w-full h-[80px] flex items-center justify-between p-3">
            <div>
              <Link
                href={"/"}
                className={`text-[25px] font-Poppins font-[500] text-black dark:text-white`}
              >
                ELearning
              </Link>
            </div>
            <div className="flex items-center">
              <div className="flex">
                <div className="hidden md:block">
                  <NavItems activeItem={activeItem} isMobile={false} />
                </div>
                <ThemeSwitcher />

                <div className="md:hidden">
                  <HiOutlineMenuAlt3
                    size={25}
                    className="cursor-pointer dark:text-white text-black"
                    onClick={() => setOpenSidebar(true)}
                  />
                </div>
                <HiOutlineUserCircle
                  size={25}
                  className="cursor-pointer dark:text-white text-black"
                  onClick={() => {
                    setRoute("login");
                    setOpen(true);
                  }}
                />
              </div>
            </div>

            {/* mobile sidebar */}
            {openSidebar && (
              <div
                className="fixed w-full h-screen top-0 left-0 z-[99999] dark:bg-[unset] bg-[#00000024]"
                onClick={handleClose}
                id="screen"
              >
                <div className="w-[70%] fixed z-[999999999] h-screen bg-white dark:bg-slate-900 dark:bg-opacity-90 top-0 right-0">
                  <NavItems activeItem={activeItem} isMobile={true} />

                  <HiOutlineUserCircle
                    size={25}
                    className="cursor-pointer ml-5 my-2 text-black dark:text-white"
                    onClick={() => {
                      setRoute("login");
                      setOpen(true);
                    }}
                  />

                  <p className="text-[16px] px-2 pl-5 text-black dark:text-white">
                    Copyright © 2025 ELearning
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {route === "login" && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={Login}
            />
          )}
        </>
      )}

      {route === "signup" && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={Signup}
            />
          )}
        </>
      )}

{route === "verification" && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={Verification}
            />
          )}
        </>
      )}





    </div>
  );
};

export default Header;
