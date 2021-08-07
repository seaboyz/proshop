import express from 'express'
import { addOrderItems, getOrderById } from '../controllers/orderController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

// @disc Create new order
// @route POST api/orders
// @access Private

router.route('/').post(protect, addOrderItems)

// @disc Get order by id
// @route GET api/orders/:id
// @access Private
router.route('/:id').get(protect, getOrderById)

export default router
