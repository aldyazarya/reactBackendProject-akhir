const router = require('express').Router()
const {addressControl} = require ('../controllers/index')


//get address by username
router.get('/showaddress/:username', addressControl.show_address )
//edit address by username
router.patch('/address/:username', addressControl.edit_address )
//create address
router.post('/address/', addressControl.create_address )


module.exports = router