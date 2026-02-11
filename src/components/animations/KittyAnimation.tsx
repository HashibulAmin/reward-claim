import React from 'react';
import { motion } from 'framer-motion';

interface KittyProps {
  className?: string;
}

export const KittyAnimation: React.FC<KittyProps> = ({ className = "" }) => {
  return (
    <motion.div 
      className={`fixed bottom-0 right-10 z-10 w-32 h-32 cursor-pointer ${className}`}
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 1, type: "spring" }}
      whileHover={{ y: 20 }}
    >
      <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-lg">
        <g>
          {/* Body */}
          <ellipse cx="100" cy="180" rx="60" ry="50" fill="#333" />
          
          {/* Head */}
          <circle cx="100" cy="120" r="45" fill="#333" />
          
          {/* Ears */}
          <path d="M60 90 L70 50 L100 80 Z" fill="#333" />
          <path d="M140 90 L130 50 L100 80 Z" fill="#333" />
          
          {/* Eyes */}
          <g className="animate-blink">
            <ellipse cx="85" cy="115" rx="5" ry="8" fill="#fff" />
            <ellipse cx="115" cy="115" rx="5" ry="8" fill="#fff" />
            <circle cx="85" cy="115" r="2" fill="#000" />
            <circle cx="115" cy="115" r="2" fill="#000" />
          </g>
          
          {/* Nose */}
          <polygon points="95,128 105,128 100,135" fill="pink" />
          
          {/* Whiskers */}
          <path d="M70 130 L40 120 M70 135 L40 135 M70 140 L40 150" stroke="white" strokeWidth="2" />
          <path d="M130 130 L160 120 M130 135 L160 135 M130 140 L160 150" stroke="white" strokeWidth="2" />
          
          {/* Paws */}
          <ellipse cx="70" cy="180" rx="15" ry="10" fill="#fff" />
          <ellipse cx="130" cy="180" rx="15" ry="10" fill="#fff" />
        </g>
      </svg>
      
      {/* Meow Bubble */}
      <motion.div
        className="absolute -top-10 -left-10 bg-white text-black text-xs font-bold px-3 py-1 rounded-lg rounded-br-none shadow-md"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: [0, 1, 1, 0], scale: [0, 1, 1, 0] }}
        transition={{ duration: 4, repeat: Infinity, repeatDelay: 5 }}
      >
        Meow! 🐱
      </motion.div>
    </motion.div>
  );
};
