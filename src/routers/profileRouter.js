const router = require ('express').Router()
const conn = require ('../connection/connection')
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
router.post('/upstore', upstore.single('avatar'), (req, res) => {
    const sql = `SELECT * FROM profile WHERE username = ?`
    const sql2 = `UPDATE profile SET avatar = '${req.file.filename}' WHERE username = '${req.body.username}'`
    const data = req.body.username

    conn.query(sql, data, (err, result) => {
        if (err) return res.send(err)

        conn.query(sql2, (err, result) => {
            if (err) return res.send(err)

            res.send({filename: req.file.filename})
        })
    })
})
//delete avatar
router.get('/deleteavatar', (req, res) => {
    const data = req.query.username
    const sql = `SELECT * FROM profile WHERE username = '${data}'`
    const sql2 = `UPDATE users SET avatar = null where username = '${data}'`

    conn.query(sql, data, (err, result) => {
        if (err) return res.send(err.sqlMessage)

        fs.unlink(`${uploadAvatar}/${result[0].avatar}`, (err) => {
            if(err) throw Error
            res.send('Avatar Succesfully Deleted')
        })
        conn.query(sql2, (err, result) => {
            if(err) return res.send(err)

            res.send(result)
        })
    })
})
//show avatar
router.get('/showavatar/:username', (req, res) => {
    const data = req.params.username
    const sql = `SELECT avatar FROM profile WHERE username = ?`

    conn.query (sql, data, (err, result) => {
        if(err) return res.send (err.sqlMessage)

        res.send(`http://localhost:1994/avatar/${result[0].avatar}`)
    })
})
//show avatar in browser
router.get('/avatar/:photo', (req, res) => {
    res.sendFile(`${uploadAvatar}/${req.params.photo}`)
})

//edit profile by username
router.patch('/profile/:username', (req, res) => {
    const sql = `update profile SET ? where username = ?`
    const data = [req.body, req.params.username]

    conn.query(sql, data, (err, result) => {
        if(err) return res.send(err)

        res.send(result)
    })
})

//create profile by username
router.post('/profile/', (req, res) => {
    const sql = `INSERT INTO profile SET ? `
    const data = req.body

    conn.query(sql, data, (err, result) => {
        if(err) return res.send(err)

        res.send(result)
    })
})

//get profile by username
router.get('/profile/:username', (req, res) => {
    const sql = `SELECT * FROM profile WHERE username = ?`
    const data = req.params.username

    conn.query(sql, data, (err, result) => {
        if (err) return res.send(err.sqlMessage)

        res.send(result)
    })
})

module.exports = router