import React, { useMemo } from 'react';
import { DashboardLayout } from '../components/admin/DashboardLayout';
import { motion } from 'framer-motion';
import { useClaims } from '../hooks/useClaims';
import { useClaimLinks } from '../hooks/useClaimLinks';
import { useAuth } from '../contexts/AuthContext';
import { formatDistanceToNow } from 'date-fns';
import { Package, Link as LinkIcon, Clock, Activity } from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { claims, isLoading: claimsLoading } = useClaims(user?.email);
  const { links, isLoading: linksLoading } = useClaimLinks(user?.email);

  const stats = useMemo(() => {
    return {
      totalLinks: links.length,
      totalClaims: claims.length,
      pendingPickups: claims.filter(c => c.status === 'pending').length
    };
  }, [links, claims]);

  const recentActivity = useMemo(() => {
    const linkActivities = links.map(l => ({
      id: l.linkId,
      text: `Link created: ${l.title || 'Untitled'}`,
      date: l.createdAt?.toDate ? l.createdAt.toDate() : new Date(0),
      type: 'link'
    }));

    const claimActivities = claims.map(c => ({
      id: c.claimId,
      text: `New claim from ${c.userName}`,
      date: c.claimedAt?.toDate ? c.claimedAt.toDate() : new Date(0),
      type: 'claim'
    }));

    return [...linkActivities, ...claimActivities]
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(0, 5);
  }, [links, claims]);

  const isLoading = claimsLoading || linksLoading;

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
          Dashboard Overview
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <LinkIcon size={48} />
            </div>
            <h3 className="text-gray-400 text-sm mb-2 flex items-center gap-2">
              <LinkIcon size={14} className="text-purple-400" />
              Total Links
            </h3>
            <p className="text-3xl font-bold">{isLoading ? '...' : stats.totalLinks}</p>
          </div>
          
          <div className="glass-panel p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Package size={48} />
            </div>
            <h3 className="text-gray-400 text-sm mb-2 flex items-center gap-2">
              <Package size={14} className="text-pink-400" />
              Total Claims
            </h3>
            <p className="text-3xl font-bold">{isLoading ? '...' : stats.totalClaims}</p>
          </div>
          
          <div className="glass-panel p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Clock size={48} />
            </div>
            <h3 className="text-gray-400 text-sm mb-2 flex items-center gap-2">
              <Clock size={14} className="text-orange-400" />
              Pending Pickups
            </h3>
            <p className="text-3xl font-bold">{isLoading ? '...' : stats.pendingPickups}</p>
          </div>
        </div>

        <div className="glass-panel p-6 mt-6">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Activity size={20} className="text-purple-400" />
            Recent Activity
          </h2>
          
          {isLoading ? (
            <div className="py-4 text-gray-500 animate-pulse">Loading activity...</div>
          ) : recentActivity.length === 0 ? (
            <div className="py-8 text-center text-gray-500 border border-dashed border-white/10 rounded-lg">
              No recent activity to show
            </div>
          ) : (
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div 
                  key={activity.id} 
                  className="flex justify-between items-center py-3 px-4 rounded-lg bg-white/5 border border-white/5 hover:border-white/10 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${activity.type === 'link' ? 'bg-purple-500' : 'bg-pink-500'}`} />
                    <span className="text-gray-200">{activity.text}</span>
                  </div>
                  <span className="text-xs text-gray-500 font-medium whitespace-nowrap ml-4">
                    {formatDistanceToNow(activity.date, { addSuffix: true })}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </DashboardLayout>
  );
};
