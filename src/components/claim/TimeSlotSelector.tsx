import React from 'react';
import { useController, type Control } from 'react-hook-form';
import { TIME_SLOTS } from '../../utils/timeSlots';
import { motion } from 'framer-motion';

interface TimeSlotSelectorProps {
  control: Control<any>;
  name: string;
  className?: string;
  error?: string;
}

export const TimeSlotSelector: React.FC<TimeSlotSelectorProps> = ({ 
  control, 
  name, 
  className = "",
  error 
}) => {
  const { field } = useController({
    name,
    control,
    rules: { required: 'Please select a time slot' },
  });

  return (
    <div className={`space-y-3 ${className}`}>
      <label className="block text-sm font-medium text-gray-300">
        Preferred Pickup Time
      </label>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {TIME_SLOTS.map((slot) => {
          const isSelected = field.value === slot.id;
          
          return (
            <div key={slot.id} className="relative">
              <input
                type="radio"
                id={slot.id}
                {...field}
                value={slot.id}
                className="sr-only"
                checked={isSelected}
              />
              <motion.label
                htmlFor={slot.id}
                className={`flex flex-col p-4 rounded-xl border cursor-pointer transition-colors relative overflow-hidden ${
                  isSelected 
                    ? 'border-purple-500 bg-purple-500/20 text-white shadow-[0_0_15px_rgba(168,85,247,0.3)]' 
                    : 'border-white/10 bg-white/5 text-gray-400 hover:bg-white/10 hover:border-white/20'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSelected && (
                  <motion.div
                    layoutId="selected-glow"
                    className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                <span className="font-semibold text-base relative z-10">{slot.label}</span>
                <span className="text-xs opacity-70 relative z-10 mt-1">
                  {slot.startTime} - {slot.endTime}
                </span>
              </motion.label>
            </div>
          );
        })}
      </div>
      
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-400 text-sm mt-1 ml-1"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};
