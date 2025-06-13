import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  User, 
  Mail, 
  Calendar, 
  LogOut, 
  Settings, 
  Bell, 
  Shield,
  Activity,
  TrendingUp,
  Users,
  Sparkles,
  Edit3
} from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';

const Dashboard: React.FC = () => {
  const { user, logout, updateProfile, isLoading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: user?.profile?.firstName || '',
    lastName: user?.profile?.lastName || ''
  });
  const [isSaving, setIsSaving] = useState(false);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  const handleProfileSave = async () => {
    setIsSaving(true);
    try {
      await updateProfile(profileData);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const stats = [
    {
      label: 'Total Logins',
      value: user.loginCount.toString(),
      icon: Activity,
      color: 'bg-cyan-400'
    },
    {
      label: 'Account Status',
      value: 'Active',
      icon: Shield,
      color: 'bg-green-400'
    },
    {
      label: 'Member Since',
      value: new Date(user.createdAt).toLocaleDateString('en-US', { 
        month: 'short', 
        year: 'numeric' 
      }),
      icon: Calendar,
      color: 'bg-cyan-400'
    },
    {
      label: 'Profile Score',
      value: '98%',
      icon: TrendingUp,
      color: 'bg-cyan-400'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-400 rounded-full mix-blend-screen filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-300 rounded-full mix-blend-screen filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 bg-black/80 backdrop-blur-sm border-b border-cyan-400/30 sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-black to-gray-800 border-2 border-cyan-400 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-cyan-400" />
              </div>
              <h1 className="ml-3 text-xl font-bold text-white">FlowGen Dashboard</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-cyan-400 transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-cyan-400 transition-colors">
                <Settings className="w-5 h-5" />
              </button>
              <button
                onClick={logout}
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white">
            Welcome back, {user.fullName || user.username}!
          </h2>
          <p className="mt-2 text-gray-400">
            Here's what's happening with your account today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={index}
                className="backdrop-blur-sm bg-black/80 border border-cyan-400/30 rounded-2xl p-6 shadow-lg shadow-cyan-400/10 hover:shadow-cyan-400/20 transition-shadow"
              >
                <div className="flex items-center">
                  <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                    <IconComponent className="w-6 h-6 text-black" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-400">{stat.label}</p>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Profile Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Profile Card */}
          <div className="backdrop-blur-sm bg-black/80 border border-cyan-400/30 rounded-2xl p-6 shadow-lg shadow-cyan-400/10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">Profile Information</h3>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center px-3 py-1.5 text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                <Edit3 className="w-4 h-4 mr-1" />
                {isEditing ? 'Cancel' : 'Edit'}
              </button>
            </div>

            <div className="space-y-4">
              {/* Avatar */}
              <div className="flex items-center">
                <div className="w-16 h-16 bg-gradient-to-r from-black to-gray-800 border-2 border-cyan-400 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-cyan-400" />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-white">
                    {user.fullName || user.username}
                  </h4>
                  <p className="text-sm text-gray-400">@{user.username}</p>
                </div>
              </div>

              {/* Profile Details */}
              <div className="space-y-3">
                {isEditing ? (
                  <>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          First Name
                        </label>
                        <input
                          type="text"
                          value={profileData.firstName}
                          onChange={(e) => setProfileData(prev => ({ ...prev, firstName: e.target.value }))}
                          className="w-full px-3 py-2 bg-gray-900 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
                          placeholder="First name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          Last Name
                        </label>
                        <input
                          type="text"
                          value={profileData.lastName}
                          onChange={(e) => setProfileData(prev => ({ ...prev, lastName: e.target.value }))}
                          className="w-full px-3 py-2 bg-gray-900 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
                          placeholder="Last name"
                        />
                      </div>
                    </div>
                    <div className="flex space-x-3">
                      <button
                        onClick={handleProfileSave}
                        disabled={isSaving}
                        className="px-4 py-2 bg-cyan-400 text-black rounded-lg hover:bg-cyan-300 transition-colors disabled:opacity-50"
                      >
                        {isSaving ? <LoadingSpinner size="small" /> : 'Save Changes'}
                      </button>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center text-gray-400">
                      <Mail className="w-5 h-5 mr-3" />
                      <span>{user.email}</span>
                    </div>
                    <div className="flex items-center text-gray-400">
                      <Calendar className="w-5 h-5 mr-3" />
                      <span>Joined {new Date(user.createdAt).toLocaleDateString()}</span>
                    </div>
                    {user.lastLogin && (
                      <div className="flex items-center text-gray-400">
                        <Activity className="w-5 h-5 mr-3" />
                        <span>Last login: {new Date(user.lastLogin).toLocaleDateString()}</span>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Activity Card */}
          <div className="backdrop-blur-sm bg-black/80 border border-cyan-400/30 rounded-2xl p-6 shadow-lg shadow-cyan-400/10">
            <h3 className="text-xl font-semibold text-white mb-6">Recent Activity</h3>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-green-400/20 border border-green-400/50 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-green-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Account created</p>
                  <p className="text-xs text-gray-400">
                    {new Date(user.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>

              {user.lastLogin && (
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-cyan-400/20 border border-cyan-400/50 rounded-full flex items-center justify-center">
                    <Activity className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Last login</p>
                    <p className="text-xs text-gray-400">
                      {new Date(user.lastLogin).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-cyan-400/20 border border-cyan-400/50 rounded-full flex items-center justify-center">
                  <Shield className="w-4 h-4 text-cyan-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Security check passed</p>
                  <p className="text-xs text-gray-400">All systems secure</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-white mb-6">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="backdrop-blur-sm bg-black/80 border border-cyan-400/30 rounded-2xl p-6 shadow-lg shadow-cyan-400/10 hover:shadow-cyan-400/20 transition-all hover:scale-[1.02] text-left">
              <div className="w-12 h-12 bg-cyan-400/20 border border-cyan-400/50 rounded-xl flex items-center justify-center mb-4">
                <Settings className="w-6 h-6 text-cyan-400" />
              </div>
              <h4 className="font-semibold text-white mb-2">Account Settings</h4>
              <p className="text-sm text-gray-400">Manage your account preferences and security settings.</p>
            </button>

            <button className="backdrop-blur-sm bg-black/80 border border-cyan-400/30 rounded-2xl p-6 shadow-lg shadow-cyan-400/10 hover:shadow-cyan-400/20 transition-all hover:scale-[1.02] text-left">
              <div className="w-12 h-12 bg-cyan-400/20 border border-cyan-400/50 rounded-xl flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-cyan-400" />
              </div>
              <h4 className="font-semibold text-white mb-2">Team Management</h4>
              <p className="text-sm text-gray-400">Invite team members and manage permissions.</p>
            </button>

            <button className="backdrop-blur-sm bg-black/80 border border-cyan-400/30 rounded-2xl p-6 shadow-lg shadow-cyan-400/10 hover:shadow-cyan-400/20 transition-all hover:scale-[1.02] text-left">
              <div className="w-12 h-12 bg-green-400/20 border border-green-400/50 rounded-xl flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-green-400" />
              </div>
              <h4 className="font-semibold text-white mb-2">Analytics</h4>
              <p className="text-sm text-gray-400">View detailed analytics and performance metrics.</p>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;