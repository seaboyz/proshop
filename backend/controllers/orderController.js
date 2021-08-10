import expressAsyncHandler from 'express-async-handler'
import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'

// @disc Create new order
// @route POST api/orders
// @access private

export const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body

  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No order items')
    return
  } else {
    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    })

    const createdOrder = await order.save()
    res.status(201).json(createdOrder)
  }
})

// @disc GET order by id
// @route GET api/orders/:id
// @access private
export const getOrderById = expressAsyncHandler(async (req, res) => {
  const id = req.params.id

  const order = await Order.findById(id).populate(
    'user',
    'name email'
  ) /* populate another document 'user' to get 'name' and 'email' fields */
  // https://mongoosejs.com/docs/populate.html#populate_multiple_documents

  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

// @disc Update order to paid
// @route PUT api/orders/pay
// @access Private
export const updateOrderToPaid = expressAsyncHandler(async (req, res) => {
  const id = req.params.id
  const paymentResult = req.body

  const order = await Order.findById(id)

  order.isPaid = true
  order.paidAt = Date.now()
  order.paymentResult = {
    id: paymentResult.id,
    status: paymentResult.status,
    update_time: paymentResult.update_time,
    email_address: paymentResult.payer.email_address,
  }

  const updatedOrder = await order.save()

  res.send(updatedOrder)
})
