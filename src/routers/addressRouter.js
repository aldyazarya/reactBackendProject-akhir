const router = require('express').Router()
const conn = require('../connection/connection')

//create address by username
router.post('/address', (req, res) => {
    const sql = `INSERT INTO address SET ?`
    const data = req.body

    conn.query(sql, data, (err, result) => {
        if(err) return res.send(err)

        res.send(result)
    })
})

//get address by username
router.get('/showaddress/:username', (req, res) => {
    const sql = `SELECT * FROM address WHERE username =?`
    const data = req.params.username

    conn.query(sql, data, (err, result) => {
        if (err) return res.send(err.sqlMessage)

        res.send(result)
    })
})

//edit address by addressid
router.patch('/address/:addressid', (req, res) => {
    const sql = `UPDATE address SET ? WHERE id = ?`
    const data = [req.body, req.params.addressid]

    conn.query(sql, data, (err, result) =>{
        if (err) return res.send(err)

        res.send(result)
    })
})



module.exports = router