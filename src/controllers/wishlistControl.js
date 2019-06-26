const conn = require ('../connection/connection')


module.exports ={
    create_wishlist: (req, res) => {
        const data = {
            username: req.body.username,
            product_cart: req.body.product_cart
        }
        const sql = `insert into wishlist set ?`

        conn.query(sql, data, (err, result) => {
            if(err) return res.send(err)
            res.send(result)
            console.log(result);
            
        })
    },
    get_wishlistbyusername: (req, res) => {

        var sql = `SELECT wishlist.id, users.id, users.username,
        products.product_id, products.product_name, products.category_name, products.image_product, products.price, products.quantity
        FROM wishlist
        JOIN users ON wishlist.username = users.username
        JOIN products ON wishlist.product_id = products.id
        WHERE wishlist.username = ?`
    
    
        conn.query(sql, req.params.username, (err, result) => {
            if (err) return res.send(err)
    
            res.send(result)
            console.log(result)
        })
    }
    
}