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

module.exports = router