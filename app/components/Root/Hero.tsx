import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import { BiSearch } from "react-icons/bi";

type Props = {};

const Hero: FC<Props> = () => {
  return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row items-center justify-between px-6 lg:px-12">
      
      {/* Image Section */}
      <div className="w-full lg:w-1/2 flex justify-center lg:justify-end mt-10 lg:mt-0">
        <div className="relative w-full max-w-md lg:max-w-none">
          <div className="rounded-full hero_animation w-full max-w-lg aspect-square flex items-center justify-center">
            <Image
              src={require("../../../public/asset/banner-img-1 (1).png")}
              alt="Hero Banner"
              className="w-3/4 h-auto z-10"
              priority
            />
          </div>
        </div>
      </div>

      {/* Text Section */}
      <div className="w-full lg:w-1/2 flex flex-col items-start justify-center mt-10 lg:mt-0 pr-0 lg:pr-4 xl:pr-8">
        <h2 className="dark:text-white text-[#000000c7] text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight mb-4">
          Improve Your Online Learning Experience Better Instantly
        </h2>
        <p className="text-base text-gray-600 dark:text-gray-300 mb-6">
          We have 40k+ Online courses & 500K+ Online registered students. Find
          your desired courses from them.
        </p>

        {/* Search bar */}
        <div className="w-full max-w-lg h-14 relative mb-8">
          <input
            type="search"
            placeholder="Search Courses..."
            className="w-full h-full pl-5 pr-14 rounded-lg border-2 border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:border-blue-500 transition-all"
          />
          <button className="absolute right-0 top-0 h-full w-14 bg-blue-500 hover:bg-blue-600 text-white rounded-r-lg flex items-center justify-center transition-colors">
            <BiSearch size={24} />
          </button>
        </div>

        {/* Client Images */}
        <div className="flex items-center">
          <div className="flex -space-x-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-800 overflow-hidden">
                <Image
                  src={require(`../../../public/asset/client-${i}.jpg`)}
                  alt={`Client ${i}`}
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          <p className="ml-4 text-gray-600 dark:text-gray-300">
            500K+ People already trusted us.{" "}
            <a href="/courses" className="text-blue-600 dark:text-blue-400 font-medium hover:underline">
              View Courses
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;