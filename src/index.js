const express  = require('express')
const port = require('./config')
const cors = require('cors')
require('./config/mongoose')

const User = require ('./models/user')

const app = express()
app.use(cors())
app.use(express.json())

app.post('/users', async (req,res) => {
    const user = new User(req.body)

    try {
        await user.save()
        res.status(200).send(user)
    } catch (e) {
        res.status(400).send(e.message)
    }
})


app.post('/users/login', async (req, res) => {
    const {username, password} = req.body

    try {
        const user = await User.findByCredentials(username, password) //function buatan sendiri
        res.status(200).send(user)
    } catch (e) {
        res.status(404).send(e)
    }
})


app.listen(port, () => console.log("API Running on port" + port))