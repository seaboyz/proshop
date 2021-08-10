import express from 'express'
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
} from '../controllers/orderController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

// @disc Create new order
// @route POST api/orders
// @access Private
router.route('/').post(protect, addOrderItems)

// @disc Get all the orders for the logged in user
// @route GET api/orders
// @access Private
router.route('/').get(protect, addOrderItems)

// @disc Update order to paid
// @route PUT api/orders/pay
// @access Private
router.route('/:id/pay').put(protect, updateOrderToPaid)

// @disc Get order by id
// @route GET api/orders/:id
// @access Private
router.route('/:id').get(protect, getOrderById)

export default router
