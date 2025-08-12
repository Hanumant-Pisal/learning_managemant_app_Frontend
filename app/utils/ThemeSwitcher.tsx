"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { BiMoon, BiSun } from "react-icons/bi";

export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  // Ensure we're using the resolved theme for UI updates
  const currentTheme = resolvedTheme || theme;

  useEffect(() => {
    setMounted(true);
  }, []);

  // Add a debug effect to log theme changes
  useEffect(() => {
    console.log('Current theme:', currentTheme);
  }, [currentTheme]);

  if (!mounted) {
    return (
      <div className="w-6 h-6 mx-4">
        {/* Empty div to prevent layout shift */}
      </div>
    );
  }

  const toggleTheme = () => {
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="flex items-center justify-center mx-4">
      <button
        onClick={toggleTheme}
        className="p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        aria-label={`Switch to ${currentTheme === 'dark' ? 'light' : 'dark'} mode`}
      >
        {currentTheme === 'dark' ? (
          <BiSun size={25} className="text-yellow-300" />
        ) : (
          <BiMoon size={25} className="text-gray-600" />
        )}
      </button>
    </div>
  );
};
