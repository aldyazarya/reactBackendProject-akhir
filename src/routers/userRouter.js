const router = require('express').Router()
const {userControl} = require ('../controllers/index')
const multer = require ('multer')
const path = require ('path')
const fs = require ('fs')



const uploadAvatar = path.join(__dirname + '/../uploadAvatar')
console.log(uploadAvatar);
const storagE = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, uploadAvatar)
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



//register
router.post('/users', userControl.register)
//verify email
router.get('/verify', userControl.verify_email)
//login
router.post('/users/login', userControl.login )
//edit user
router.patch('/users/:username', userControl.edit_user)
//get user
router.get('/users/:username', userControl.get_user )
//get All user
router.get('/getalluser', userControl.getAll_user)
//router get last user
router.get('/getlastuser', userControl.getlast_user)
//delete user by username
router.delete('/deleteuser/:id', userControl.delete_user)
//create profile
router.patch('/users/createprofile/:id', userControl.create_profileuser)
//create profile avatar
router.patch('/users/createprofile/avatar/:username', upstore.single('avatar'), userControl.create_profileAvatar)
//show avatar in browser
router.get('/avatar/:photo', userControl.show_avatar_browser)

module.exports = router

