import Image from "next/image";
import Link from "next/link";
import React, { FC, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BiSearch } from "react-icons/bi";
import dynamic from "next/dynamic";

// Typing animation hook
const useTypingAnimation = (phrases: string[], typingSpeed = 150, deletingSpeed = 50, delayBetween = 2000) => {
  const [displayText, setDisplayText] = useState("");
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingPaused, setTypingPaused] = useState(false);

  useEffect(() => {
    if (typingPaused) return;

    const currentPhrase = phrases[currentPhraseIndex];
    const speed = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && displayText === currentPhrase) {
      // Done typing, pause before deleting
      const timeout = setTimeout(() => {
        setIsDeleting(true);
      }, delayBetween);
      return () => clearTimeout(timeout);
    } else if (isDeleting && displayText === "") {
      // Done deleting, move to next phrase
      setIsDeleting(false);
      setCurrentPhraseIndex((currentPhraseIndex + 1) % phrases.length);
      return;
    }

    const timeout = setTimeout(() => {
      setDisplayText(isDeleting
        ? currentPhrase.substring(0, displayText.length - 1)
        : currentPhrase.substring(0, displayText.length + 1)
      );
    }, speed);

    return () => clearTimeout(timeout);
  }, [displayText, currentPhraseIndex, isDeleting, typingPaused, phrases, typingSpeed, deletingSpeed, delayBetween]);

  // Pause typing when component is not in view
  useEffect(() => {
    const handleScroll = () => {
      const searchBar = document.querySelector('input[type="search"]');
      if (searchBar) {
        const rect = searchBar.getBoundingClientRect();
        const isInView = (
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
          rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
        setTypingPaused(!isInView);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return displayText;
};

// Dynamically import Chatbot with no SSR
const Chatbot = dynamic(
  () => import("../Chatbot/Chatbot"),
  { ssr: false }
);

type Props = {};

const Hero: FC<Props> = () => {
  const placeholderTexts = [
    "Search for web development courses...",
    "Looking for data science tutorials?",
    "Find your perfect programming course...",
    "Search for AI & machine learning..."
  ];

  const animatedPlaceholder = useTypingAnimation(placeholderTexts, 100, 50, 2000);
  return (
    <div className="w-full min-h-screen flex flex-col">

      <div className="flex-1 flex flex-col lg:flex-row items-center justify-between px-6 lg:px-12">

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
        <motion.div
          className="w-full lg:w-1/2 flex flex-col items-start justify-center mt-10 lg:mt-0 pr-0 lg:pr-4 xl:pr-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h2
            className="text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight mb-4 text-yellow-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
          >
            Improve Your Online Learning Experience Better Instantly
          </motion.h2>
          <motion.p
            className="text-base mb-6 text-yellow-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
          >
            We have 40k+ Online courses & 500K+ Online registered students. Find
            your desired courses from them.
          </motion.p>

          {/* Search bar */}
          <div className="w-full max-w-lg h-14 relative mb-8">
            <input
              type="search"
              placeholder={animatedPlaceholder}
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
        </motion.div>

        {/* Chatbot */}
        <Chatbot />
      </div>

      {/* Chatbot */}
      <Chatbot />

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-container {
          width: 100%;
          overflow: hidden;
        }
        .marquee-content {
          display: inline-block;
          white-space: nowrap;
          animation: marquee 30s linear infinite;
        }
        .marquee-content:hover {
          animation-play-state: paused;
        }
        @media (max-width: 768px) {
          .marquee-content {
            animation: marquee 20s linear infinite;
          }
        }
      `}</style>
    </div>
  );
};

export default Hero;