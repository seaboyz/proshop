import jwt from 'jsonwebtoken'
import expressAsyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

// use token to identify and verify the user
// decode token to id
export const protect = expressAsyncHandler(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]

      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      // add dedcoded user id to req object
      req.user = await User.findById(decoded.id).select('-password')

      next() /* => getUserProfile or updateUserProfile */
    } catch (error) {
      console.error(error)
      res.status(401)
      throw new Error('Not authorized, token failed')
    }

    if (!token) {
      res.status(401)
      throw new Error('Not authorized, no token')
    }
  }
})
