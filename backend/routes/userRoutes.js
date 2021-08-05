import express from 'express'
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
} from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

// @desc  Auth user & get token
// @route Post /api/users/login
// @access Public
router.post('/login', authUser)

// @desc  Register a new user
// @route Post /api/users
// @access Public
router.post('/', registerUser)

// @desc  Get user profile
// @route GET /api/users/profile
// @access Private
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)

export default router
