import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050a1a] px-4">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500 mb-4">
          404
        </h1>
        <h2 className="text-2xl text-white mb-4">Page Not Found</h2>
        <p className="text-gray-400 mb-8">The page you're looking for doesn't exist.</p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
        >
          Go Home
        </Link>
      </motion.div>
    </div>
  );
};
