import React from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { claimFormSchema, type ClaimFormData } from '../../lib/validation';
import { TimeSlotSelector } from './TimeSlotSelector';
import { AnimatedButton } from '../common/AnimatedButton';
import { formatDateForInput } from '../../utils/timeSlots';

interface ClaimFormProps {
  onSubmit: (data: ClaimFormData) => void;
  isLoading?: boolean;
}

const inputVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      type: "spring",
      stiffness: 300,
      damping: 24
    }
  })
};

const errorVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: { opacity: 1, height: 'auto', transition: { duration: 0.2 } }
};

export const ClaimForm: React.FC<ClaimFormProps> = ({ onSubmit, isLoading = false }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ClaimFormData>({
    resolver: zodResolver(claimFormSchema),
    defaultValues: {
      pickupDate: formatDateForInput(new Date()),
    }
  });

  const onFormSubmit: SubmitHandler<ClaimFormData> = (data) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6 w-full max-w-lg mx-auto">
      
      {/* Name Field */}
      <motion.div custom={0} variants={inputVariants} initial="hidden" animate="visible" className="space-y-1">
        <label htmlFor="userName" className="block text-sm font-medium text-gray-300">
          Full Name
        </label>
        <input
          id="userName"
          type="text"
          {...register('userName')}
          className={`w-full bg-white/5 border ${errors.userName ? 'border-red-500' : 'border-white/10'} rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`}
          placeholder="e.g. John Doe"
          autoFocus
        />
        <AnimatePresence>
          {errors.userName && (
            <motion.p variants={errorVariants} initial="hidden" animate="visible" exit="hidden" className="text-red-400 text-sm">
              {errors.userName.message}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Location Field */}
      <motion.div custom={1} variants={inputVariants} initial="hidden" animate="visible" className="space-y-1">
        <label htmlFor="pickupLocation" className="block text-sm font-medium text-gray-300">
          Pickup Location
        </label>
        <input
          id="pickupLocation"
          type="text"
          {...register('pickupLocation')}
          className={`w-full bg-white/5 border ${errors.pickupLocation ? 'border-red-500' : 'border-white/10'} rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`}
          placeholder="Enter pickup location"
        />
        <AnimatePresence>
          {errors.pickupLocation && (
            <motion.p variants={errorVariants} initial="hidden" animate="visible" exit="hidden" className="text-red-400 text-sm">
              {errors.pickupLocation.message}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Phone Field */}
      <motion.div custom={2} variants={inputVariants} initial="hidden" animate="visible" className="space-y-1">
        <label htmlFor="pickupNumber" className="block text-sm font-medium text-gray-300">
          Phone Number
        </label>
        <input
          id="pickupNumber"
          type="tel"
          {...register('pickupNumber')}
          className={`w-full bg-white/5 border ${errors.pickupNumber ? 'border-red-500' : 'border-white/10'} rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`}
          placeholder="+1 (555) 000-0000"
        />
        <AnimatePresence>
          {errors.pickupNumber && (
            <motion.p variants={errorVariants} initial="hidden" animate="visible" exit="hidden" className="text-red-400 text-sm">
              {errors.pickupNumber.message}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Date Field */}
      <motion.div custom={3} variants={inputVariants} initial="hidden" animate="visible" className="space-y-1">
        <label htmlFor="pickupDate" className="block text-sm font-medium text-gray-300">
          Pickup Date
        </label>
        <input
          id="pickupDate"
          type="date"
          min={formatDateForInput(new Date())}
          {...register('pickupDate')}
          className={`w-full bg-white/5 border ${errors.pickupDate ? 'border-red-500' : 'border-white/10'} rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`}
        />
        <AnimatePresence>
          {errors.pickupDate && (
            <motion.p variants={errorVariants} initial="hidden" animate="visible" exit="hidden" className="text-red-400 text-sm">
              {errors.pickupDate.message}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Time Slot Selector */}
      <motion.div custom={4} variants={inputVariants} initial="hidden" animate="visible">
        <TimeSlotSelector 
          control={control} 
          name="pickupTimeSlot" 
          error={errors.pickupTimeSlot?.message} 
        />
      </motion.div>

      {/* Submit Button */}
      <motion.div 
        custom={5} 
        variants={inputVariants} 
        initial="hidden" 
        animate="visible"
        className="pt-4"
      >
        <AnimatedButton 
          type="submit" 
          text="Submit Claim" 
          loading={isLoading} 
          className="w-full text-lg"
        />
      </motion.div>
    </form>
  );
};
