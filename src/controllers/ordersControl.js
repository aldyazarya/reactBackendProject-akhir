const conn = require ('../connection/connection')
const path = require ('path')

const uploadPaymentReceipt = path.join(__dirname + '/../uploadPaymentReceipt')

module.exports = {
    create_usernameOrder: (req, res) => {
        const data = req.body
        const sql = `insert into orders set ?`

        conn.query(sql, data, (err, result) => {
            if(err) return res.send(err)
            res.send(result)
        })
    },
    get_ProfileForOrders: ( req, res) => {
        const data = req.params.username
        const sql = `select u.name, u.address, u.postalcode, u.cityordistrict, u.country from user u
                    join orders o on u.username = o.username
                    where o.username = ?;`

        conn.query(sql, data, (err, result) => {
            if(err) return res.send(err)

            res.send(result)
        })
    },
    create_Orders: (req, res) => {
        const data = [ req.body, req.params.username]
        const sql = `update orders set ? where username = ?`
        const sql2 = `select * from cart where username = ?`

        conn.query(sql, data, (err, result) => {
            if(err) return res.send(err.sqlMessage)

            conn.query(sql2, data, (err, result) => {
                if(err) return res.send(err)

                res.send(result)
            })
        })
    },
    selectall_notpaid: (req, res) => {
        const data =req.params.username 
        const sql = `select * from orders where status = 'not paid' and username = ?`

        conn.query(sql, data, (err, result) => {
            if(err) return res.send(err.sqlMessage)

            res.send(result)
        })
    },
    select_notpaid: (req, res) => {
        const data =req.params.username 
        const sql = `select * from orders where status = 'not paid'`

        conn.query(sql, data, (err, result) => {
            if(err) return res.send(err.sqlMessage)

            res.send(result)
        })
    },

    selectall_paid: (req, res) => {
        const data = req.params.username 
        const sql = `select * from orders where status = 'paid' and username = ?`

        conn.query(sql, data, (err, result) =>{
            if(err) return res.send(err)

            res.send(result)
        })
    },
    upload_paymentreceipt: (req,res) => {
        const sql2 = `update orders set payment_receipt = '${req.file.filename}' where id = ?`
        const data = req.params.id


            conn.query(sql2, data ,(err, result) => {
                if(err) return res.send(err)

                res.send({filename: req.file.filename})
            })
        
    },
    update_status: (req, res) => {
        const sql = `update orders set status = 'paid' where id = ?`
        const sql2 = `update orders set shipping_status = 'proceed to load' where id = ?`
        const data = [req.params.id, req.body]

        conn.query(sql, data, (err, result) => {
            if(err) return res.send(err)

            conn.query(sql2, data, (err, result) => {
                if(err) return res.send(err)

                res.send(result)
            })
        })
    },
    select_paid: (req, res) => {
        const data =req.params.username 
        const sql = `select * from orders where status = 'paid'`

        conn.query(sql, data, (err, result) => {
            if(err) return res.send(err.sqlMessage)

            res.send(result)
        })
    },
    select_image: (req, res) => {
        const data = req.params.id
        const sql = `select payment_receipt where id =?`

        conn.query(sql, data, (err, result) => {
            if(err) return  res.send(err)

            res.send(result)
        })
    }
}