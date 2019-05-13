const router = require('express').Router()
const {userControl} = require ('../controllers/index')




//register
router.post('/users', userControl.register)
//verify email
router.get('/verify', userControl.verify_email)
//login
router.post('/users/login', userControl.login )
//edit user
router.patch('/users/:username', userControl.edit_user)
//get user
router.get('/users/:username', )


module.exports = router