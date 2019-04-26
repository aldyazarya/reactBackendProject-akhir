const router = require('express').Router()
const bcrypt = require ('bcryptjs')
const conn = require ('../connection/connection')
const multer = require ('multer')
const path = require ('path')
const fs = require ('fs')
const isEmail = require ('validator/lib/isEmail')
const {sendVerify} = require ('../emails/nodemailer')

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
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb (new Error('Please Upload Image File(jpg, jpeg, png)'))
        }
        cb(undefined, true)
    }
})

//upload avatar
router.post('/upstore', upstore.single('avatar'), (req, res) => {
    const sql = `SELECT * FROM users WHERE username = ?`
    const sql2 = `UPDATE users SET avatar = '${req.file.filename}' WHERE username = '${req.body.uname}'`
    const data = req.body.uname

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
    const sql = `SELECT * FROM users WHERE username = '${data}'`
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
router.get('/showavatar', (req, res) => {
    const data = req.query.username
    const sql = `SELECT avatar FROM users WHERE username = '${data}'`

    conn.query (sql, (err, result) => {
        if(err) return res.send (err.sqlMessage)

        res.send({user: result, photo: `http://localhost:1994/avatar/${result[0].avatar}`})
    })
})
//show avatar in browser
router.get('/avatar/:photo', (req, res) => {
    res.sendFile(`${uploadAvatar}/${req.params.photo}`)
})

//create user
router.post('/users', async (req, res) => {
    var sql = `INSERT INTO users SET ?;`
    var sql2 = `SELECT * FROM users`
    var data = req.body

    if(!isEmail(req.body.email)) return res.send("Email is not valid !")
    req.body.password = await bcrypt.hash(req.body.password, 8)

    conn.query(sql, data, (err, result) => {
        if (err) return res.send(err)

        //tempat taro sendVerify
        sendVerify(req.body.username, req.body.name, req.body.email)

        conn.query(sql2, (err, result) => {
            if(err) return res.send(err)

            res.send(result)
        })
    })
})

//verify email
router.get('/verify', (req, res) => {
    const username = req.query.username
    const sql = `UPDATE users SET verified = true WHERE username = '${username}'`
    const sql2 = `SELECT * FROM users WHERE username = '${username}'`

    conn.query (sql, (err, result) => {
        if(err) return res.send(err.sqlMessage)

        conn.query(sql2, (err, result) => {
            if (err) return res.send(err.sqlMessage)

            res.send('<h1> Verification Successful</h1>')
        })
    })
})

module.exports = router