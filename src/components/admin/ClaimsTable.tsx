import React from 'react';
import { motion } from 'framer-motion';
import { useClaims } from '../../hooks/useClaims';
import { useAuth } from '../../contexts/AuthContext';
import { TIME_SLOTS } from '../../utils/timeSlots';

// Helper function to get readable time slot label
const getTimeSlotLabel = (timeSlotId: string): string => {
  const slot = TIME_SLOTS.find(s => s.id === timeSlotId);
  return slot ? slot.label : timeSlotId;
};

export const ClaimsTable: React.FC = () => {
  const { user } = useAuth();
  const { claims, isLoading, error } = useClaims(user?.email);

  if (isLoading) {
    return (
      <motion.div
        className="glass-panel p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
          Claimed Rewards
        </h2>
        <div className="text-center py-12 text-gray-400">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
          <p className="mt-4">Loading claims...</p>
        </div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        className="glass-panel p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
          Claimed Rewards
        </h2>
        <div className="text-center py-12 text-red-400">
          <p>Error loading claims: {error}</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="glass-panel p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
        Claimed Rewards
      </h2>

      {claims.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          No claims yet
        </div>
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                   <th className="text-left py-3 px-4 text-gray-400 font-medium">Reward</th>
                   <th className="text-left py-3 px-4 text-gray-400 font-medium">Name</th>
                   <th className="text-left py-3 px-4 text-gray-400 font-medium">Phone</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Location</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Pickup Date</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Time Slot</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Claimed At</th>
                </tr>
              </thead>
              <tbody>
                {claims.map((claim) => (
                   <tr key={claim.claimId} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                     <td className="py-3 px-4 text-white font-medium">{claim.rewardName}</td>
                     <td className="py-3 px-4 text-gray-300">{claim.userName}</td>
                     <td className="py-3 px-4 text-gray-300">{claim.pickupNumber}</td>
                    <td className="py-3 px-4 text-gray-300">{claim.pickupLocation}</td>
                    <td className="py-3 px-4 text-gray-300">{claim.pickupDate}</td>
                    <td className="py-3 px-4 text-gray-300">{getTimeSlotLabel(claim.pickupTimeSlot)}</td>
                    <td className="py-3 px-4 text-gray-300">
                      {claim.claimedAt?.toDate ? claim.claimedAt.toDate().toLocaleString() : 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-4">
            {claims.map((claim) => (
              <div key={claim.claimId} className="bg-white/5 border border-white/10 rounded-lg p-4 space-y-2">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-white">{claim.userName}</h3>
                  <span className="text-xs text-gray-400">
                    {claim.claimedAt?.toDate ? claim.claimedAt.toDate().toLocaleDateString() : 'N/A'}
                  </span>
                </div>
                 <div className="text-sm text-gray-300 space-y-1">
                   <p><span className="text-gray-400 font-medium">Reward:</span> <span className="text-purple-400">{claim.rewardName}</span></p>
                   <p><span className="text-gray-400">Phone:</span> {claim.pickupNumber}</p>
                  <p><span className="text-gray-400">Location:</span> {claim.pickupLocation}</p>
                  <p><span className="text-gray-400">Date:</span> {claim.pickupDate}</p>
                  <p><span className="text-gray-400">Time:</span> {getTimeSlotLabel(claim.pickupTimeSlot)}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </motion.div>
  );
};
