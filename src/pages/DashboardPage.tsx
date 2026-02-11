import React from 'react';
import { DashboardLayout } from '../components/admin/DashboardLayout';
import { motion } from 'framer-motion';

export const DashboardPage: React.FC = () => {
  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
          Dashboard
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel p-6">
            <h3 className="text-gray-400 text-sm mb-2">Total Links</h3>
            <p className="text-3xl font-bold">12</p>
          </div>
          <div className="glass-panel p-6">
            <h3 className="text-gray-400 text-sm mb-2">Total Claims</h3>
            <p className="text-3xl font-bold">8</p>
          </div>
          <div className="glass-panel p-6">
            <h3 className="text-gray-400 text-sm mb-2">Pending Pickups</h3>
            <p className="text-3xl font-bold">5</p>
          </div>
        </div>

        <div className="glass-panel p-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-white/10">
              <span className="text-gray-300">New claim from John Doe</span>
              <span className="text-sm text-gray-500">2 hours ago</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-white/10">
              <span className="text-gray-300">Link created: Special Gift</span>
              <span className="text-sm text-gray-500">5 hours ago</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-300">Claim completed by Jane Smith</span>
              <span className="text-sm text-gray-500">1 day ago</span>
            </div>
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};
