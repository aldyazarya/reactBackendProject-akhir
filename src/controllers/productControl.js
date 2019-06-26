const conn = require ('../connection/connection')
const path = require ('path')

const uploadImageProduct = path.join(__dirname + '/../uploadImageProduct')

module.exports = {
    upload_imageProduct: (req, res) => {
        const sql = `SELECT * FROM products WHERE product_name =?`
        const sql2 = `UPDATE products SET image_product = '${req.file.filename}' WHERE product_name = '${req.body.product_name}'`
        const data = req.body.product_name

        conn.query(sql, data, (err, result) => {
            if(err) return res.send(err)

            conn.query(sql2, (err, result) => {
                if (err) return res.send(err)

                res.send({filename: req.file.filename})
            })
        })
    },
    delete_imageProduct: (req, res) => {
        const data = req.query.id
        const sql = `SELECT * FROM products WHERE id = '${data}'`
        const sql2 = `UPDATE products SET image_product = null WHERE id = '${data}'`

        conn.query(sql, data, (err, result) => {
            if (err) return res.send(err.sqlMessage)

            fs.unlink(`${uploadImageProduct}/${result[0].image_product}`, (err) => {
                if(err) throw Error
                res.send('Image Product Succesfully Deleted')
            })

            conn.query(sql2, (err, result) => {
                if(err) return res.send(err)

                res.send(result)
            })
        })
    },
    show_imageProduct: (req, res) => {
        const data = req.params.id
        const sql = `SELECT image_product FROM products WHERE id ='${data}'`

        conn.query(sql, data, (err, result) => {
            if(err) return res.send (err.sqlMessage)

            res.send(`http://localhost:1994/image_product/${result[0].image_product}`)
        })
    },
    show_imageProduct_browser: (req, res) => {
        res.sendFile(`${uploadImageProduct}/${req.params.photo}`)
    },
    create_product : (req, res) => {
        const {
            product_name,
            detail_product,
            price,
            category_name
        
        } = req.body
        const sql = `insert into products set product_name='${product_name}', detail_product='${detail_product}', price=${price}, category_name='${category_name}', image_product='${req.file.filename}'`
        // const sql2 = `set @product_id = (select max(id) from products)`
    
        conn.query(sql, (err, result) => {
            if(err) return res.send(err.sqlMessage)
            
            res.send(result)
    
        })
    },
    get_product: (req, res) => {
        const sql = `SELECT * FROM products`
        // const data = req.params.id

        conn.query(sql, (err, result) => {
            if (err) return res.send(err.sqlMessage)

            res.send(result)
        })
    },
    verifygetAll_product: (req, res) => {
        const sql = `SELECT * FROM products ORDER BY id DESC LIMIT 1`

        conn.query(sql, (err, result) => {
            if (err) return res.send(err.sqlMessage)

            res.send(result)
        })
    },
    get_productbyId : (req, res) => {
        const data = req.params.id
        const sql = `select * from products where id = ?`

        conn.query(sql, data, (err, result) => {
            if(err) return res.send(err)

            res.send(result)
            console.log(result)
        })

    },
    edit_product: (req, res) => {
        const data = [req.params.id, req.body]
        const sql =`update products set ? where id = ?`

        conn.query(sql, data, (err, result) =>{
            if(err) return res.send(err)

            res.send(result)
        })
    },
    delete_productbyId : (req, res) => {
        const data = req.params.id
        const sql = `delete from products where id = ?`

        conn.query(sql, data, (err, result) => {
            if(err) return res.send(err)

            res.send(result)
            console.log(result)
        })

    }
}