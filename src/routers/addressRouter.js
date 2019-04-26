const router = require('express').Router()
const conn = require('../connection/connection')

//create address by userid
router.post('/address', (req, res) => {
    const sql = `INSERT INTO address SET ?`
    const data = req.body

    conn.query(sql, data, (err, result) => {
        if(err) return res.send(err)

        res.send(result)
    })
})

//get address by userid
router.get('/showaddress/:userid', (req, res) => {
    const sql = `SELECT * FROM address WHERE user_id =?`
    const data = req.params.userid

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