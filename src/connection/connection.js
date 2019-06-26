const mysql = require ('mysql')

const conn =  mysql.createConnection({
    // connectionLimit: 10,
    user: 'root',
    password: 'mysql123',
    host: 'localhost',
    database: 'projectAkhir',
    port: '3306'
})

module.exports = conn