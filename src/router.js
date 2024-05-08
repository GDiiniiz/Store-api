const express = require('express')
const usersController = require('./controllers/userController')
const userMiddleware = require('./middlewares/userMiddlewares')
const router = express.Router()

router.get('/users', usersController.getAll)
router.post('/create/user', userMiddleware.validateCreateUser, usersController.createUser )
router.post('/signIn', usersController.signIn)

router.get('/foods' ,usersController.foods)
router.get('/cart/:id', usersController.getCartById )
router.post('/add/cart', usersController.addCart)


module.exports = router