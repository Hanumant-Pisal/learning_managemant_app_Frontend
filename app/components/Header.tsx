"use client";
import Link from "next/link";
import React, { FC, useState, useEffect } from "react";
import NavItems from "../utils/NavItems";
import { ThemeSwitcher } from "../utils/ThemeSwitcher";
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";
import CustomModal from "../utils/CustomModal";
import Login from "../components/Auth/Login";
import Signup from "../components/Auth/Signup";
import Verification from "../components/Auth/Verification"
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import Image from "next/image";
import avatar from "../../public/asset/avatar.webp";

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
  const { user } = useSelector((state: any) => state.auth)

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

  console.log(user)

  return (
    <div className="w-full relative">
      <div
        className={`fixed top-0 left-0 w-full h-[80px] z-[80] transition duration-500 border-b border-gray-200 dark:border-gray-700 ${active
          ? "dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black"
          : "bg-white dark:bg-gray-900"
          }`}
      >
        <div className="w-[95%] 800px:w-[92%] m-auto py-2 h-full">
          <div className="w-full h-[80px] flex items-center justify-between p-3">
            <div>
              <Link href={"/"} className={`text-[25px] font-Poppins font-[500] text-black dark:text-white`}>
                <TypewriterEffect text="< LmsAi />" delay={100} />
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
                {
                  user ? (
                    <Link href={"/profile"}>
                      <Image
                        src={user.avatar ? user.avatar : avatar}
                        alt=""
                        className="w-[30px] h-[30px] rounded-full cursor-pointer"
                      />

                    </Link>

                  ) : (
                    <HiOutlineUserCircle
                      size={25}
                      className="hidden 800px:block cursor-pointer dark:text-white text-black"
                      onClick={() => setOpen(true)}
                    />
                  )
                }

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

const TypewriterEffect: FC<{ text: string; delay?: number }> = ({ text, delay = 100 }) => {
  const [displayText, setDisplayText] = useState<{ char: string; color: string }[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [pause, setPause] = useState(0);

  const rainbowColors = [
    'text-red-500',
    'text-orange-500',
    'text-yellow-500',
    'text-green-500',
    'text-blue-500',
    'text-indigo-500',
    'text-purple-500',
    'text-pink-500',
  ];

  const getRandomColor = () => {
    return rainbowColors[Math.floor(Math.random() * rainbowColors.length)];
  };

  useEffect(() => {
    const typeSpeed = isDeleting ? delay / 2 : delay;
    const pauseTime = 2000; // Pause for 2 seconds at the end

    if (pause > 0) {
      const timeout = setTimeout(() => setPause(pause - 100), 100);
      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(() => {
      if (isDeleting) {
        // Deleting text
        if (currentIndex > 0) {
          setDisplayText(prev => prev.slice(0, -1));
          setCurrentIndex(currentIndex - 1);
        } else {
          setIsDeleting(false);
        }
      } else {
        // Typing text
        if (currentIndex < text.length) {
          const char = text[currentIndex];
          setDisplayText(prev => [...prev, { char, color: getRandomColor() }]);
          setCurrentIndex(currentIndex + 1);
        } else {
          // At the end of typing, pause then start deleting
          if (pause === 0) {
            setPause(pauseTime);
            setIsDeleting(true);
          }
        }
      }
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [currentIndex, isDeleting, pause, text, delay]);

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="inline-flex"
    >
      {displayText.map((item, index) => (
        <motion.span
          key={index}
          className={item.color}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {item.char}
        </motion.span>
      ))}
      <motion.span
        className="text-current"
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 1 }}
      >
        |
      </motion.span>
    </motion.span>
  );
};

export default Header;
