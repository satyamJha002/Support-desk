const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')

const UserModel = require('../model/userModel')

/* @description Register a new user
@route /api/users
@access Public
*/
const registerUser = asyncHandler( async (req, res) => {
  const {name, email, password} = req.body;

  if(!name || !email || !password){
    res.status(400)
    throw new Error('Please include all the fields.')
  }

  //Find if user already exist
  const userExist = await UserModel.findOne({email})

  if(userExist){
    res.status(400)
    throw new Error('User already exist!')
  }

  // hashing password
  const salt = await bcrypt.genSalt(10)

  const hashedPassword = await bcrypt.hash(password, salt)

  // create user

  const createUser = await UserModel.create({
    name,
    email,
    password: hashedPassword
  })

  if(createUser){
    res.status(201).json({
      _id: createUser._id,
      name: createUser.name,
      email: createUser.email
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }

})

/* @description Login a user
@route /api/users/login
@access Public
*/
const loginUser = asyncHandler( async(req, res)=>{
  res.send('Login Route')
})

module.exports = {registerUser, loginUser}