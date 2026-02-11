import React from 'react';
import { motion } from 'framer-motion';

interface Claim {
  id: string;
  userName: string;
  pickupLocation: string;
  pickupNumber: string;
  pickupDate: string;
  pickupTimeSlot: string;
  claimedAt: string;
}

// Mock data for demonstration
const mockClaims: Claim[] = [
  {
    id: '1',
    userName: 'John Doe',
    pickupLocation: 'Main Office',
    pickupNumber: '+1 (555) 123-4567',
    pickupDate: '2026-02-15',
    pickupTimeSlot: 'morning',
    claimedAt: '2026-02-12T10:30:00Z'
  },
  {
    id: '2',
    userName: 'Jane Smith',
    pickupLocation: 'North Branch',
    pickupNumber: '+1 (555) 987-6543',
    pickupDate: '2026-02-16',
    pickupTimeSlot: 'afternoon',
    claimedAt: '2026-02-12T14:20:00Z'
  }
];

export const ClaimsTable: React.FC = () => {
  return (
    <motion.div
      className="glass-panel p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
        Claimed Rewards
      </h2>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-3 px-4 text-gray-400 font-medium">Name</th>
              <th className="text-left py-3 px-4 text-gray-400 font-medium">Phone</th>
              <th className="text-left py-3 px-4 text-gray-400 font-medium">Location</th>
              <th className="text-left py-3 px-4 text-gray-400 font-medium">Pickup Date</th>
              <th className="text-left py-3 px-4 text-gray-400 font-medium">Time Slot</th>
              <th className="text-left py-3 px-4 text-gray-400 font-medium">Claimed At</th>
            </tr>
          </thead>
          <tbody>
            {mockClaims.map((claim) => (
              <tr key={claim.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-3 px-4 text-white">{claim.userName}</td>
                <td className="py-3 px-4 text-gray-300">{claim.pickupNumber}</td>
                <td className="py-3 px-4 text-gray-300">{claim.pickupLocation}</td>
                <td className="py-3 px-4 text-gray-300">{claim.pickupDate}</td>
                <td className="py-3 px-4 text-gray-300">{claim.pickupTimeSlot}</td>
                <td className="py-3 px-4 text-gray-300">
                  {new Date(claim.claimedAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {mockClaims.map((claim) => (
          <div key={claim.id} className="bg-white/5 border border-white/10 rounded-lg p-4 space-y-2">
            <div className="flex justify-between items-start">
              <h3 className="font-semibold text-white">{claim.userName}</h3>
              <span className="text-xs text-gray-400">
                {new Date(claim.claimedAt).toLocaleDateString()}
              </span>
            </div>
            <div className="text-sm text-gray-300 space-y-1">
              <p><span className="text-gray-400">Phone:</span> {claim.pickupNumber}</p>
              <p><span className="text-gray-400">Location:</span> {claim.pickupLocation}</p>
              <p><span className="text-gray-400">Date:</span> {claim.pickupDate}</p>
              <p><span className="text-gray-400">Time:</span> {claim.pickupTimeSlot}</p>
            </div>
          </div>
        ))}
      </div>

      {mockClaims.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          No claims yet
        </div>
      )}
    </motion.div>
  );
};
