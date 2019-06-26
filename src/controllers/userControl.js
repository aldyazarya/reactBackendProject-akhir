const bcrypt = require ('bcryptjs')
const conn = require ('../connection/connection')
const isEmail = require ('validator/lib/isEmail')
const path = require ('path')
const {sendVerify} = require ('../emails/nodemailer')

const uploadAvatar = path.join(__dirname + '/../uploadAvatar')

module.exports = {
    register: async (req, res) => {
        var sql = `INSERT INTO user SET ?;`
        var sql2 = `SELECT * FROM user ORDER BY id DESC LIMIT 1`
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
    
    },
    create_profile: async (req, res) => {
        const data2 = [req.params.username, req.body]
        const sql2 = `select * from user where id = ${req.params.username}`
        

        const sql = `UPDATE user SET  ? WHERE username = ${req.params.username}`
        conn.query(sql,  (err, result) => {
            if(err) return res.send(err.sqlMessage)
            conn.query(sql2, (err, result) => {
                if(err) return res.send(err.sqlMessage)

                res.send(result)
            })

        })
    },
    create_profileAvatar: async (req, res) => {
        const data = req.params.username
        const sql = `UPDATE user set avatar = '${req.file.filename}' where username='${data}'`

        conn.query(sql, data, (err, result) => {
            if(err) res.send(err.sqlMessage)

            res.send({filename: req.file.filename})
        })
    },
    verify_email:  (req, res) => {
        const username = req.query.username
        const sql = `UPDATE user SET verified = true WHERE username = '${username}'`
        const sql2 = `SELECT * FROM user WHERE username = '${username}'`
    
        conn.query (sql, (err, result) => {
            if(err) return res.send(err.sqlMessage)
    
            conn.query(sql2, (err, result) => {
                if (err) return res.send(err.sqlMessage)
    
                res.send('<h1> Verification Successful</h1>')
            })
        })
    },
    login: (req, res) => {
        const {username, password} = req.body
        const sql = `SELECT * FROM user WHERE username = '${username}'`
    
        conn.query(sql, async (err, result) => {
            if (err) return res.send (err.sqlMessage)
    
            const user = result
    
            if(!user[0]) return res.send("User Not Found")
    
            if(!user[0].verified) return res.send("Please, Verify your Account") //untuk mengecek apakah sudah verifikasi apa belum
    
            const hash = await bcrypt.compare(password, user[0].password) //password adalah apa yang ditulis saat login, user.password adalaah yang ada di database
            if(!hash) return res.send("Wrong Password")
    
            res.send(user)
        })
    },
    edit_user: (req, res) => {
        const sql = `UPDATE user SET ? WHERE username = ?`
        const data= [req.body, req.params.username]
    
        conn.query(sql, data, (err, result) => {
            if (err) return res.send(err.sqlMessage)
    
            res.send(result)
        })
    },
    get_user: (req, res) => {
        const sql = `SELECT * FROM user where username = ?`
        const data = req.params.username
    
        conn.query(sql, data, (err, result) => {
            if (err) return res.send(err.sqlMessage)
    
            res.send(result)
        })
    },
    getAll_user: (req, res) => {
        const sql = `SELECT * FROM user`

        conn.query(sql, (err, result) => {
            if(err) return res.send(err.sqlMessage)

            res.send(result)
        })
    },
    delete_user: (req, res) => {
        const sql = `DELETE FROM user where id = ?`
        const data = req.params.id

        conn.query(sql, data, (err, result) => {
            if(err) return res.send(err.sqlMessage)

            res.send(result)
        })
    },
    getlast_user: async (req, res) => {
        const sql = `SELECT * FROM user ORDER BY id DESC LIMIT 1`

        conn.query(sql, (err, result) => {
            if(err) return res.send(err.sqlMessage)

            res.send(result)
        })
    },
    create_profileuser:  (req, res) => {
        
        const data = [req.body, req.params.id]
        

        const sql = `UPDATE user SET ? WHERE id = ?`
        const sql2 = `SELECT * FROM user WHERE id = ${req.params.id}`

        conn.query(sql, data, (err, result) => {
            if(err) return res.send(err.sqlMessage)

            conn.query(sql2, data, (err, result) => {
                if(err) return res.send(err.sqlMessage)

                res.send(result)
            })
        })
    },
    show_avatar_browser: (req, res) => {
        res.sendFile(`${uploadAvatar}/${req.params.photo}`)
    }

}