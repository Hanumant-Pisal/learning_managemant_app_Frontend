'use client'
import React, { FC, useState, useEffect } from 'react'
import SideBarProfile from './SideBarProfile';

type User = {
    avatar?: string;  // Make it optional with ?
    // Add other user properties as needed
};

type Props = {
    user: User | null;
}

const Profile: FC<Props> = ({ user }) => {
    const [scroll, setScroll] = useState(false);
    const [avatar, setAvatar] = useState<string | null>(null);
    const [active, setActive] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            setAvatar(user.avatar || null);
            setLoading(false);
        }
    }, [user]);

    const logoutHandler = async() => {
        // Logout logic will be implemented here
    }

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 85) {
                setScroll(true);
            } else {
                setScroll(false);
            }
        };

        // Only add event listener on client-side
        window.addEventListener("scroll", handleScroll);
        
        // Clean up the event listener when the component unmounts
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    if (loading) {
        return <div>Loading profile...</div>;
    }

    if (!user) {
        return <div>User not found</div>;
    }

    return (
        <div className="w-[85%] flex mx-auto mt-10">
            <div
                className={`w-[25%] 800px:w-[110px] h-[450px] [Dig-state-000 bg-opacity-00 border [lborder-[ffffffid] rounded-[5px] shadow-sn mt-[80px] mb-[80px] sticky screen] ${scroll ? "top-[120px]" : "top-[30px]"} left-[30px]`}
            >
                <SideBarProfile 
                    user={user}
                    active={active}
                    avatar={avatar}
                    setActive={setActive}
                    logoutHandler={logoutHandler}
                />
            </div>
        </div>
    )
}

export default Profile
