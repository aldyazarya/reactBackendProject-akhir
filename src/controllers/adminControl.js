const bcrypt = require ('bcryptjs')
const conn = require ('../connection/connection')
const isEmail = require ('validator/lib/isEmail')


module.exports = {
    register: async (req, res) => {
        var sql = `INSERT INTO admins SET ?;`
        var sql2 = `SELECT * FROM admins`
        var data = req.body

        req.body.password = await bcrypt.hash(req.body.password, 8)

        conn.query(sql, data, (err, result) => {
            if(err) return res.send(err)

            conn.query(sql2, (err, result) => {
                if(err) return res.send(err)

                res.send(result)
            })
        })
    },
    login: (req, res) => {
        const {username, password} = req.body
        const sql = `SELECT * FROM admins WHERE username = '${username}'`

        conn.query(sql,  async (err, result) => {
            if (err) return res.send(err.sqlMessage)

            const user = result

            if(!user[0]) return res.send("User Not Found")

            const hash = await bcrypt.compare(password, user[0].password)
            if(!hash) return res.send("Wrong Password")

            res.send(user)
        })
    },
    edit_admin: (req, res) => {
        const sql = `UPDATE admins SET ? WHERE email = ?`
        const data = [req.body, req.params.username]

        conn.query(sql, data, (err, result) => {
            if (err) return res.send(err.sqlMessage)

            res.send(result)
        })
    },
    get_admin: (req, res) => {
        const sql = `SELECT * FROM admins WHERE email = ?`
        const data = req.params.email

        conn.query(sql, data, (err, result) => {
            if (err) return res.send(err.sqlMessage)

            res.send(result)
        })
    },
    verifadmin: (req, res) => {
        const sql = `SELECT * FROM admins`

        conn.query(sql, (err, result) => {
            if (err) return res.send(err.sqlMessage)
            res.send(result)
        })
    },
    upload_avatar: (req, res) => {
        const sql = `SELECT * FROM admins WHERE email = ?`
        const sql2 = `UPDATE admins SET avatar = '${req.file.filename}' WHERE email = '${req.body.email}'`
        const data = req.body.email

        conn.query(sql, data, (err, result) => {
            if (err) return res.send(err)

            conn.query(sql2, (err, result) => {
                if (err) return res.send(err)

                res.send({filename: req.file.filename})
            })
        })
    },
    delete_avatar: (req, res) => {
        const data = req.query.username
        const sql = `SELECT * FROM admins WHERE email = '${data}'`
        const sql2 = `UPDATE admins SET avatar = null WHERE email = '${data}'`

        conn.query(sql, data, (err,result) => {
            if(err) return res.send(err.sqlMessage)

            fs.unlink(`${avatarAdmin}/${result[0].avatar}`, (err) => {
                if (err) throw Error
                res.send('Avatar Succesfully Deleted')
            })
            conn.query(sql2, (err, result) => {
                if(err) return res.send(err)

                res.send(result)
            })
        })
    },
    show_avatar: (req, res) => {
        const data = req.params.email
        const sql = `SELECT avatar FROM admins WHERE email = ?`

        conn.query(sql, data, (err, result) =>{
            if(err) return res.send(err.sqlMessage)

            res.send(`http://localhost:1994/avatar/${result[0].avatar}`)
        })
    },
    show_avatar_browser: (req, res) => {
        res.sedFile(`${avatarAdmin}/${req.params.photo}`)
    }
}