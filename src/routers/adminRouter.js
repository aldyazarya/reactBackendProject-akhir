const router = require('express').Router()
const {adminControl} = require ('../controllers/index')
const multer = require ('multer')
const path = require ('path')
const fs =require ('fs')

const avatarAdmin = path.join(__dirname + '/../avatarAdmin')
console.log(avatarAdmin);
const storagE2 = multer.diskStorage({
    destination: function (req,file, cb){
        cb(null, avatarAdmin)
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + file.fieldname + path.extname(file.originalname))
    }
})
const upstore = multer({
    storage: storagE2,
    limits: {
        fileSize: 5000000
    },
    size: {
        width: 180,
        height: 180
    },
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb (new Error('Please Upload Image File (jpg, jpeg, png'))
        }
        cb(undefined, true)
    }
})


//upload avatar
router.post('/uploadavataradmin', upstore.single('avatar'), adminControl.upload_avatar)
//delete avatar
router.get('/deleteavataradmin', adminControl.delete_avatar)
//show avatar
router.get('/showavataradmin/:email', adminControl.show_avatar)
//show avatar in browser
router.get('/avataradmin/:photo', adminControl.show_avatar_browser)
//register
router.post('/admin', adminControl.register)
//login
router.post('/loginadmins', adminControl.login)
//verifadmin
router.get('/verifadmin', adminControl.verifadmin)
//edit admin
router.patch('/admin/:email', adminControl.edit_admin)
//get admin
router.get('/admin/:email', adminControl.get_admin)

module.exports = router

  