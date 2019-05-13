const router = require ('express').Router()
const {profileControl} = require ('../controllers/index')
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

//upload avatar
router.post('/upstore', upstore.single('avatar'), profileControl.upload_avatar )
//delete avatar
router.get('/deleteavatar', profileControl.delete_avatar )
//show avatar
router.get('/showavatar/:username', profileControl.show_avatar )
//show avatar in browser
router.get('/avatar/:photo', profileControl.show_avatar_browser)
//edit profile by username
router.patch('/profile/:username', profileControl.edit_profile )
//create profile by username
router.post('/profile/', profileControl.create_profile )
//get profile by username
router.get('/profile/:username', profileControl.get_profile )

module.exports = router