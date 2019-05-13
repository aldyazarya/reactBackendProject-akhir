const conn = require ('../connection/connection')


module.exports = {
    upload_avatar: (req, res) => {
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
    },
    delete_avatar: (req, res) => {
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
    },
    show_avatar: (req, res) => {
        const data = req.params.username
        const sql = `SELECT avatar FROM profile WHERE username = ?`
    
        conn.query (sql, data, (err, result) => {
            if(err) return res.send (err.sqlMessage)
    
            res.send(`http://localhost:1994/avatar/${result[0].avatar}`)
        })
    },
    show_avatar_browser: (req, res) => {
        res.sendFile(`${uploadAvatar}/${req.params.photo}`)
    },
    edit_profile: (req, res) => {
        const sql = `update profile SET ? where username = ?`
        const data = [req.body, req.params.username]
    
        conn.query(sql, data, (err, result) => {
            if(err) return res.send(err)
    
            res.send(result)
        })
    },
    create_profile: (req, res) => {
        const sql = `INSERT INTO profile SET ? `
        const data = req.body
    
        conn.query(sql, data, (err, result) => {
            if(err) return res.send(err)
    
            res.send(result)
        })
    },
    get_profile: (req, res) => {
        const sql = `SELECT * FROM profile WHERE username = ?`
        const data = req.params.username
    
        conn.query(sql, data, (err, result) => {
            if (err) return res.send(err.sqlMessage)
    
            res.send(result)
        })
    }

}