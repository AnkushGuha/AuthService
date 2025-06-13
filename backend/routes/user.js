import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import User from '../models/User.js';

const router = express.Router();

// GET /api/user - Get current user data
router.get('/', authenticateToken, async (req, res) => {
  try {
    // User is already attached to req by auth middleware
    const user = req.user;

    const userData = {
      id: user._id,
      username: user.username,
      email: user.email,
      profile: user.profile,
      fullName: user.fullName,
      createdAt: user.createdAt,
      lastLogin: user.lastLogin,
      loginCount: user.loginCount,
      isActive: user.isActive
    };

    res.json({
      success: true,
      user: userData
    });

  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user data'
    });
  }
});

// PUT /api/user/profile - Update user profile
router.put('/profile', authenticateToken, async (req, res) => {
  try {
    const { firstName, lastName } = req.body;
    const userId = req.user._id;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        'profile.firstName': firstName?.trim() || '',
        'profile.lastName': lastName?.trim() || ''
      },
      { new: true, runValidators: true }
    );

    const userData = {
      id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      profile: updatedUser.profile,
      fullName: updatedUser.fullName,
      createdAt: updatedUser.createdAt,
      lastLogin: updatedUser.lastLogin,
      loginCount: updatedUser.loginCount
    };

    res.json({
      success: true,
      message: 'Profile updated successfully',
      user: userData
    });

  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update profile'
    });
  }
});

export default router;