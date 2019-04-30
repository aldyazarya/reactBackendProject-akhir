const router = require ('express').Router()
const conn = require ('../connection/connection')

//create profile by user id
router.post('/profile', (req, res) => {
    const sql = `INSERT INTO profile SET ?`
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