import React, { FC } from 'react'
import Image from 'next/image'
import avatarDefault from "../../../public/asset/user.webp";
import { Avatar } from '@mui/material';
import { Lock } from 'lucide-react';
import { SiCoursera } from "react-icons/si";
import { FiLogOut } from 'react-icons/fi';
type Props = {
    user: any;
    active: number;
    avatar: string | null;
    setActive: (active: number) => void;
    logoutHandler: any;

}

const SideBarProfile: FC<Props> = ({ user, active, avatar, setActive, logoutHandler }) => {
    return (
        <div className="w-full">
            <div
                className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 1 ? "dark:bg-state-800" : ""
                    }`}
                onClick={() => setActive(1)}
            >
                <Image
                    src={avatar || user?.avatar || avatarDefault}
                    alt=""
                    className="w-[20px] h-[20px] 800px:w-[30px] 800px:h-[30px] cursor-pointer rounded-full"
                />

                <h5 className="pl-2 font-Poppins dark:text-white text-black">
                    My Account
                </h5>
            </div>

            <div
                className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 2 ? "dark:bg-slate-800 bg-white" : "bg-transparent"
                    }`}
                onClick={() => setActive(2)}
            >
                <Lock size={20} className="text-white" />
                <h5 className="pl-2 font-Poppins dark:text-white text-black">
                    Change Password
                </h5>
            </div>



            <div
                className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 3 ? "dark:bg-slate-800 bg-white" : "bg-transparent"
                    }`}
                onClick={() => setActive(3)}
            >
                <SiCoursera size={20} className="text-white" />
                <h5 className="pl-2 font-Poppins dark:text-white text-black">
                    Enrolled Courses
                </h5>
            </div>


            <div
                className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 4 ? "dark:bg-slate-800 bg-white" : "bg-transparent"
                    }`}
                onClick={logoutHandler}
            >
                <FiLogOut size={20} className="text-white" />
                <h5 className="pl-2 font-Poppins dark:text-white text-black">
                    Log Out
                </h5>
            </div>
        </div>

    )
}

export default SideBarProfile
