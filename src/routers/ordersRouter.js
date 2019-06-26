const router = require('express').Router()
const {ordersControl} = require ('../controllers/index')
const multer = require ('multer')
const path = require ('path')
const fs = require ('fs')

const uploadPaymentReceipt = path.join(__dirname + '/../uploadPaymentReceipt')
console.log(uploadPaymentReceipt);
const storagE = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, uploadPaymentReceipt)
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + file.fieldname + path.extname(file.originalname))
    }
})
const upstore = multer({
    storage: storagE,
    limits: {
        fileSize: 5000000
    },
    size: {
        width: 180,
        height:180
    },
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb (new Error('Please Upload Image File(jpg, jpeg, png)'))
        }
        cb(undefined, true)
    }
})

//create username order
router.post('/createusernameorder', ordersControl.create_usernameOrder)
//get profile for order
router.get('/getprofilefororders/:username', ordersControl.get_ProfileForOrders)
//create orders
router.patch('/createorders/:username', ordersControl.create_Orders)
//select all not paid for user
router.get('/shownotpaid/:username', ordersControl.selectall_notpaid)
//select all paid for user
router.get('/showpaid/:username', ordersControl.selectall_paid)
//upload avatar
router.patch('/paymentreceipt/:id', upstore.single('payment_receipt'), ordersControl.upload_paymentreceipt)

router.get('/payment', ordersControl.select_notpaid)

router.patch('/paidstatus/:id', ordersControl.update_status)

router.get('/orders', ordersControl.select_paid)

module.exports = router