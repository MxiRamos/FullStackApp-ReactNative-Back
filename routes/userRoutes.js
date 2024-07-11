const express = require('express')
const { registerController, loginController, updateUserController, requireSingIn } = require('../controllers/userController')

//router object
const router = express.Router()

//routes
router.post('/register', registerController)

// LOGIN || POST
router.post('/login', loginController)

// UPDATE || PUT
router.put('/update-user', requireSingIn, updateUserController)

//export 
module.exports = router