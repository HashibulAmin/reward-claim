import React from 'react';
import { motion } from 'framer-motion';
import { ConfettiEffect } from '../animations/ConfettiEffect';
import { AnimatedButton } from '../common/AnimatedButton';
import { formatDisplayDate, TIME_SLOTS } from '../../utils/timeSlots';

interface SuccessScreenProps {
  userName: string;
  pickupDetails: {
    location: string;
    date: string;
    timeSlotId: string;
  };
  onClose: () => void;
}

export const SuccessScreen: React.FC<SuccessScreenProps> = ({ 
  userName, 
  pickupDetails, 
  onClose 
}) => {
  // Find time slot label
  const timeSlot = TIME_SLOTS.find(s => s.id === pickupDetails.timeSlotId);

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050a1a]/95 backdrop-blur-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <ConfettiEffect active={true} />
      
      <motion.div 
        className="glass-panel max-w-lg w-full p-8 text-center relative overflow-hidden"
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", duration: 0.8 }}
      >
        {/* Animated Checkmark */}
        <div className="flex justify-center mb-6">
          <svg className="w-24 h-24 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <motion.path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, ease: "easeInOut" }}
            />
          </svg>
        </div>

        <motion.h2 
          className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500 mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Congratulations, {userName}!
        </motion.h2>
        
        <motion.p 
          className="text-gray-300 text-lg mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Your reward has been successfully claimed.
        </motion.p>

        <motion.div 
          className="bg-white/5 rounded-2xl p-6 text-left space-y-4 mb-8 border border-white/10"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7 }}
        >
          <div className="flex justify-between items-center border-b border-white/10 pb-3">
            <span className="text-gray-400">Pickup Location</span>
            <span className="font-semibold text-white">{pickupDetails.location}</span>
          </div>
          <div className="flex justify-between items-center border-b border-white/10 pb-3">
            <span className="text-gray-400">Date</span>
            <span className="font-semibold text-white">{formatDisplayDate(pickupDetails.date)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Time</span>
            <span className="font-semibold text-white">{timeSlot?.label}</span>
          </div>
        </motion.div>

        <AnimatedButton 
          text="Complete" 
          onClick={onClose} 
          className="w-full"
        />
        
        <p className="mt-4 text-xs text-gray-500">
          A confirmation email has been sent to your registered address.
        </p>
      </motion.div>
    </motion.div>
  );
};
