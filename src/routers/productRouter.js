const router = require('express').Router()
const {productControl} = require ('../controllers/index')
const multer = require ('multer')
const path = require ('path')
const fs = require ('fs')

const uploadImageProduct = path.join(__dirname + '/../uploadImageProduct')
console.log(uploadImageProduct);
const storagEE = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, uploadImageProduct)
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + file.fieldname + path.extname(file.originalname))
    }
})
const upstore = multer({
    storage: storagEE,
    limits: {
        fileSize: 5000000
    },
    size: {
        width: 300,
        height: 300
    },
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb (new Error('Please Upload Image File(jpg, jpeg, png'))
        }
        cb(undefined, true)
    }
})

//upload imageProduct
router.post('/uploadimageproduct', upstore.single('image_product'), productControl.upload_imageProduct)
//delete imagePorduct
router.get('/deleteimageproduct', productControl.delete_imageProduct)
//show imageproduct
router.get('/showimageproduct/:id', productControl.show_imageProduct)
//show imageProduct in browser
router.get('/imageproduct/:photo', productControl.show_imageProduct_browser)
//create product by id
router.post('/product', upstore.single('image_product'), productControl.create_product)
// get product
router.get('/getproduct', productControl.get_product)
// verify get all product
router.get('/verifygetproduct', productControl.verifygetAll_product)
//get product by id
router.get('/getproduct/:id', productControl.get_productbyId)
//edit product
router.put('/product/:id', productControl.edit_product)
//delete product
router.delete('/deleteproduct/:id', productControl.delete_productbyId)

//get product by product name
// router.get('/getproductname/:id', productControl.get_productName)



module.exports = router