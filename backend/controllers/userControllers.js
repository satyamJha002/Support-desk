const asyncHandler = require('express-async-handler')

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

  res.send('Register route')
})

/* @description Login a user
@route /api/users/login
@access Public
*/
const loginUser = asyncHandler( async(req, res)=>{
  res.send('Login Route')
})

module.exports = {registerUser, loginUser}