import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Signed out successfully');
      navigate('/admin/login');
    } catch (error: any) {
      toast.error('Failed to sign out');
    }
  };

  const navItems = [
    { path: '/admin', label: 'Dashboard', icon: '📊' },
    { path: '/admin/create-link', label: 'Create Link', icon: '🔗' },
    { path: '/admin/claims', label: 'View Claims', icon: '📋' },
  ];

  return (
    <div className="min-h-screen bg-[#050a1a] text-white">
      {/* Top Navigation */}
      <nav className="glass-panel border-b border-white/10 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
            Reward Admin
          </h1>
          
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400 hidden sm:block">{user?.email}</span>
            <button
              onClick={handleSignOut}
              className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors text-sm"
            >
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="w-full md:w-64 glass-panel border-r border-white/10 md:min-h-[calc(100vh-73px)]">
          <nav className="p-4 space-y-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link key={item.path} to={item.path}>
                  <motion.div
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                        : 'hover:bg-white/5 text-gray-300'
                    }`}
                    whileHover={{ x: 4 }}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </motion.div>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};
