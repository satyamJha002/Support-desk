const express = require('express')
const {registerUser, loginUser, getMe} = require('../controllers/userControllers')
const router = express.Router()


const {protectRoute} = require('../middleware/authMiddleware' ) 

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protectRoute, getMe)

module.exports= router