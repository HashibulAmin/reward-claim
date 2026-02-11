import React, { useState } from 'react';
import { AnimatedButton } from '../common/AnimatedButton';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useCreateClaimLink } from '../../hooks/useCreateClaimLink';
import { useAuth } from '../../contexts/AuthContext';

export const CreateLinkForm: React.FC = () => {
  const [rewardName, setRewardName] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const { createLink, isLoading } = useCreateClaimLink();
  const { user } = useAuth();

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user?.email) {
      toast.error('You must be logged in to create a link');
      return;
    }

    try {
      const link = await createLink(rewardName, user.email);
      setGeneratedLink(link);
      toast.success('Link generated successfully!');
      setRewardName(''); // Clear form
    } catch (error: any) {
      toast.error(error.message || 'Failed to generate link');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLink);
    toast.success('Link copied to clipboard!');
  };

  return (
    <motion.div
      className="glass-panel p-8 max-w-2xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
        Generate Claim Link
      </h2>

      <form onSubmit={handleGenerate} className="space-y-6">
        <div>
          <label htmlFor="rewardName" className="block text-sm font-medium text-gray-300 mb-2">
            Reward Name
          </label>
          <input
            id="rewardName"
            type="text"
            value={rewardName}
            onChange={(e) => setRewardName(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="e.g., Special Gift Package"
            required
          />
        </div>

        <AnimatedButton
          type="submit"
          text="Generate Link"
          loading={isLoading}
          className="w-full"
        />
      </form>

      {generatedLink && (
        <motion.div
          className="mt-6 p-4 bg-white/5 border border-white/10 rounded-lg"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <p className="text-sm text-gray-400 mb-2">Generated Link:</p>
          <div className="flex gap-2">
            <input
              type="text"
              value={generatedLink}
              readOnly
              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white text-sm"
            />
            <button
              onClick={copyToClipboard}
              className="px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg transition-colors text-sm font-medium"
            >
              Copy
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};
