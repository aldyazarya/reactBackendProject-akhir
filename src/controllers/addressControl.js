const conn = require('../connection/connection')

module.exports = {
    show_address : (req, res) => {
        const sql = `SELECT * FROM address WHERE username =?`
        const data = req.params.username
    
        conn.query(sql, data, (err, result) => {
            if (err) return res.send(err.sqlMessage)
    
            res.send(result)
        })
    },
    edit_address : (req, res) => {
        const sql = `UPDATE address SET ? WHERE username = ?`
        const data = [req.body, req.params.username]
    
        conn.query(sql, data, (err, result) =>{
            if (err) return res.send(err)
    
            res.send(result)
        })
    },
    create_address : (req, res) => {
        const sql = `INSERT INTO address SET ?`
        const data = req.body
    
        conn.query(sql, data, (err, result) => {
            if(err) res.send(err)
    
            res.send(result)
        })
    }
}