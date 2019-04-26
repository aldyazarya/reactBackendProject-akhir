const express = require ('express')
const userRouter = require ('../src/routers/userRouter')

const app = express()
const port = 1994

app.use(express.json())
app.use(userRouter)

app.listen(port, () => {
    console.log("Running At Port:", port);
})