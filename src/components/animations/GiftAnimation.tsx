import React from 'react';
import { motion, type Variants } from 'framer-motion';

interface GiftAnimationProps {
  size?: number;
  autoPlay?: boolean;
  className?: string;
}

export const GiftAnimation: React.FC<GiftAnimationProps> = ({ 
  size = 200, 
  autoPlay = true,
  className = "" 
}) => {
  const containerVariants: Variants = {
    idle: {
      y: [0, -10, 0],
      scale: [1, 1.02, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    hover: {
      scale: 1.1,
      rotate: [0, -5, 5, -5, 0],
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Glow Effect */}
      <motion.div
        className="absolute w-full h-full bg-purple-500/30 blur-3xl rounded-full"
        animate={{
          opacity: [0.5, 0.8, 0.5],
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Gift Box */}
      <motion.div
        variants={containerVariants}
        animate={autoPlay ? "idle" : undefined}
        whileHover="hover"
        style={{ width: size, height: size }}
        className="relative z-10 cursor-pointer"
      >
        <svg
          viewBox="0 0 512 512"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-2xl"
        >
          {/* Box Body */}
          <motion.path
            d="M80 160h352v288a32 32 0 0 1-32 32H112a32 32 0 0 1-32-32V160z"
            fill="url(#boxGradient)"
          />
          
          {/* Box Lid */}
          <motion.path
            d="M48 112h416v48a16 16 0 0 1-16 16H64a16 16 0 0 1-16-16v-48z"
            fill="url(#lidGradient)"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
          />
          
          {/* Ribbon Vertical */}
          <path
            d="M224 160h64v320h-64z"
            fill="#facc15"
          />
          <path
            d="M224 112h64v64h-64z"
            fill="#facc15"
          />
          
          {/* Bow */}
          <motion.path
            d="M256 112c0-40-32-64-64-64s-64 24-64 64 32 64 64 64 64-64 64-64zm0 0c0-40 32-64 64-64s64 24 64 64-32 64-64 64-64-64-64-64z"
            fill="#fbbf24"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
          />
          
          {/* Gradients */}
          <defs>
            <linearGradient id="boxGradient" x1="256" y1="160" x2="256" y2="480" gradientUnits="userSpaceOnUse">
              <stop stopColor="#a855f7" />
              <stop offset="1" stopColor="#7e22ce" />
            </linearGradient>
            <linearGradient id="lidGradient" x1="256" y1="112" x2="256" y2="176" gradientUnits="userSpaceOnUse">
              <stop stopColor="#c084fc" />
              <stop offset="1" stopColor="#a855f7" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>
    </div>
  );
};
