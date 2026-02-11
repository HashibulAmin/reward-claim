import React from 'react';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { GiftAnimation } from '../components/animations/GiftAnimation';
import { BalloonAnimation } from '../components/animations/BalloonAnimation';
import { KittyAnimation } from '../components/animations/KittyAnimation';
import { AnimatedButton } from '../components/common/AnimatedButton';
import { ClaimForm } from '../components/claim/ClaimForm';
import { SuccessScreen } from '../components/claim/SuccessScreen';
import { type ClaimFormData } from '../lib/validation';
import { motion, AnimatePresence } from 'framer-motion';
import { useClaimSubmit } from '../hooks/useClaimSubmit';
import toast from 'react-hot-toast';

export const ClaimPage: React.FC = () => {
  const { linkId } = useParams<{ linkId?: string }>();
  const [view, setView] = useState<'landing' | 'form' | 'success'>('landing');
  const [claimData, setClaimData] = useState<ClaimFormData | null>(null);
  const { submitClaim, isLoading, error } = useClaimSubmit();

  const startClaim = () => setView('form');

  const handleClaimSubmit = async (data: ClaimFormData) => {
    if (!linkId) {
      toast.error('Invalid claim link');
      return;
    }

    try {
      await submitClaim(linkId, data);
      setClaimData(data);
      setView('success');
    } catch (err: any) {
      toast.error(err.message || 'Failed to submit claim');
    }
  };

  const resetFlow = () => {
    setView('landing');
    setClaimData(null);
  };

  return (
    <div className="relative min-h-screen text-white selection:bg-purple-500/30">
      <BalloonAnimation count={15} />

      <AnimatePresence mode="wait">
        {view === 'landing' && (
          <motion.div 
            key="landing"
            className="relative z-10 container mx-auto px-4 flex flex-col items-center justify-center min-h-screen gap-12"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 animate-pulse-slow text-center drop-shadow-lg">
              You've Won a Gift!
            </h1>
            
            <div className="glass-panel p-12 flex flex-col items-center gap-8 animate-drift transform hover:scale-[1.02] transition-transform duration-500">
              <GiftAnimation size={250} />
              <div className="text-center space-y-2">
                <p className="text-xl text-gray-300">Open your surprise now</p>
                <p className="text-sm text-gray-500">Valid until tomorrow</p>
              </div>
              <AnimatedButton 
                text="Claim Reward" 
                onClick={startClaim} 
                className="text-lg w-full max-w-xs"
              />
            </div>
          </motion.div>
        )}

        {view === 'form' && (
          <motion.div 
            key="form"
            className="relative z-10 container mx-auto px-4 py-8 md:py-16 flex flex-col items-center min-h-screen"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
          >
            <div className="glass-panel w-full max-w-2xl p-8 md:p-12 mt-10">
              <h2 className="text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                Claim Details
              </h2>
              <ClaimForm onSubmit={handleClaimSubmit} isLoading={isLoading} />
              <button 
                onClick={() => setView('landing')}
                className="w-full mt-6 text-gray-500 hover:text-white transition-colors text-sm"
              >
                Cancel and go back
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {view === 'success' && claimData && (
          <SuccessScreen 
            userName={claimData.userName}
            pickupDetails={{
              location: claimData.pickupLocation,
              date: claimData.pickupDate,
              timeSlotId: claimData.pickupTimeSlot
            }}
            onClose={resetFlow}
          />
        )}
      </AnimatePresence>

      <KittyAnimation />
    </div>
  );
};
