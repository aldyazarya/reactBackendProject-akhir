const router = require('express').Router()
const {cartControl} = require ('../controllers/index')



// create cart for user
router.post('/cartuser', cartControl.create_userCart)
// get cart by user
router.get('/getcartuser/:username', cartControl.get_usercart)
//create quantity and product id for user
router.post('/postcart', cartControl.post_cartForQuantity)
// change quantity cart for user
router.patch('/addquantitycart/:username', cartControl.change_cartQuantity)
//add cart
router.post('/cart/add', cartControl.add_cart)
//show product on cart
router.get('/getproductforcart/:username', cartControl.show_productonCart)
// delete cart by id
router.delete('/deletecart/:id', cartControl.delete_cart)
//delete all cart
router.delete('/deleteusercart/:username', cartControl.delete_allcart)




module.exports = router