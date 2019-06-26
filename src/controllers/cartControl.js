const conn = require ('../connection/connection')



module.exports = {

    create_userCart : (req, res) => {
        const {
            username,
            quantity
        } = req.body
        const sql = `insert into cart set username='${username}', quantity='${quantity}'`
        const sql2 = `select * from cart`

        conn.query(sql, (err, result) => {
            if (err) return res.send(err.sqlMessage)

            conn.query(sql2, (err, result) => {
                if(err) return res.send(err.sqlMessage)

                res.send(result)
            })
        })
    },
    get_usercart: (req, res) => {
        const sql = `select * from cart where username = ? `
        const data = req.params.username

        conn.query(sql, data, (err, result) => {
            if(err) return res.send(err.sqlMessage)

            res.send(result)
        })
    },
    post_cartForQuantity: (req, res) => {
        const {
            quantity,
            product_id,
            username
        } = req.body
        const data = req.params.username
        const sql = `insert into cart set ?`

        conn.query(sql, data, (err, result) => {
            if(err) return res.send(err.sqlMessage)

            res.send(result)
        })
    },
    change_cartQuantity: (req, res) => {
        const data = [req.body, req.params.id]
        const sql = `update cart set ? where username = ?`
        const sql2 = `select * from cart where username = ${req.params.username}`

        conn.query(sql, data, (err, result) => {
            if(err) return res.send(err.sqlMessage)

            conn.query(sql2, data, (err, result) => {
                if(err) return res.send(err.sqlMessage)

                res.send(result)
            })

            })
    },
    add_cart: (req, res) => {
        const{username, product_id, quantity,price, total_price} = req.body
        

        const sql = `insert into cart set username = '${username}', product_id=${product_id}, quantity=${quantity}, total_price=${total_price}, price=${price} `

        conn.query( sql, (err, result) => {
            if(err) return res.send(err)

            res.send(result)
        })
    },
    show_productonCart: (req, res) => {
        const data = req.params.username
        const sql = `select c.id, c.quantity, c.price, c.total_price, p.product_name, p.detail_product, p.image_product from products p
        join cart c on c.product_id = p.id
        where c.username = ?;`

        conn.query( sql, data, (err,result) => {
            if(err) return res.send(err)

            res.send(result)
        }) 
    },
    delete_cart: (req, res) => {
        const data = req.params.id
        const sql = `delete from cart where id = ?`

        conn.query(sql, data, (err, result) => {
            if(err) return res.send(err)

            res.send(result)
        })
    },
    delete_allcart: (req, res) => {
        const data = req.params.username
        const sql = `delete from cart where username = ?`

        conn.query(sql, data, (err, result) => {
            if(err) return res.send(err)

            res.send(result)
        })
    }





}