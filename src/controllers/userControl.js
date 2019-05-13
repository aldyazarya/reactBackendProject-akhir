const bcrypt = require ('bcryptjs')
const conn = require ('../connection/connection')
const isEmail = require ('validator/lib/isEmail')
const {sendVerify} = require ('../emails/nodemailer')



module.exports = {
    register: async (req, res) => {
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
    
    },
    verify_email:  (req, res) => {
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
    },
    login: (req, res) => {
        const {username, password} = req.body
        const sql = `SELECT * FROM users WHERE username = '${username}'`
    
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
        const sql = `UPDATE users SET ? WHERE username = ?`
        const data= [req.body, req.params.username]
    
        conn.query(sql, data, (err, result) => {
            if (err) return res.send(err.sqlMessage)
    
            res.send(result)
        })
    },
    get_user: (req, res) => {
        const sql = `SELECT * FROM users where username = ?`
        const data = req.params.username
    
        conn.query(sql, data, (err, result) => {
            if (err) return res.send(err.sqlMessage)
    
            res.send(result)
        })
    }

}