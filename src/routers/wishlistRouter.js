const router = require('express').Router()
const {wishlistcontrol} = require ('../controllers/index')

//create wishlist
router.post('/addwishlist', wishlistcontrol.create_wishlist)
//show wishlist by username
router.get('/wishlist/:username', wishlistcontrol.get_wishlistbyusername)






module.exports = router