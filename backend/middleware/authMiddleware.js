const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const UserModel = require('../model/userModel')

const protectRoute = asyncHandler(async(req, res, next)=>{
  let token;

  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    try {
      // get token from header
      token = req.headers.authorization.split(' ')[1] // ['Bearer' ,'generated token ex: enrorown43q58rrt']

      // verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      console.log(decoded.id)
      req.user = await UserModel.findById(decoded.id).select('-password')

      
      next()
    } catch (error) {
      console.log(error)
      res.status(401)
      throw new Error('Not authorized')
    }
  }

  if(!token){
    res.status(401)
    throw new Error('Not authorized')
  }
})

module.exports = {protectRoute}