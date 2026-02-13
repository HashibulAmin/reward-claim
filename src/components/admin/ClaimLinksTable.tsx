import React from 'react';
import { motion } from 'framer-motion';
import { useClaimLinks } from '../../hooks/useClaimLinks';
import { useAuth } from '../../contexts/AuthContext';
import { Copy, Link as LinkIcon, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';

export const ClaimLinksTable: React.FC = () => {
  const { user } = useAuth();
  const { links, isLoading, error } = useClaimLinks(user?.email);

  const copyToClipboard = (linkId: string) => {
    const link = `${window.location.origin}/claim/${linkId}`;
    navigator.clipboard.writeText(link);
    toast.success('Link copied to clipboard!');
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-400 text-sm py-4">{error}</div>;
  }

  if (links.length === 0) {
    return null;
  }

  return (
    <motion.div
      className="glass-panel p-8 mt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h3 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
        <LinkIcon className="h-5 w-5 text-purple-400" />
        Previously Created Links
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/10">
              <th className="py-3 px-4 text-gray-400 font-medium text-sm">Reward Name</th>
              <th className="py-3 px-4 text-gray-400 font-medium text-sm">Created At</th>
              <th className="py-3 px-4 text-gray-400 font-medium text-sm text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {links.map((link) => (
              <tr key={link.linkId} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 text-white font-medium">{link.title || 'Untitled Reward'}</td>
                <td className="py-4 px-4 text-gray-400 text-sm">
                  {link.createdAt?.toDate ? link.createdAt.toDate().toLocaleDateString() : 'N/A'}
                </td>
                <td className="py-4 px-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => copyToClipboard(link.linkId)}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors text-purple-400"
                      title="Copy Link"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                    <a
                      href={`/claim/${link.linkId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors text-pink-400"
                      title="Open Link"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};
