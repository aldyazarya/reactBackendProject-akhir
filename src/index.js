const express = require ('express')
const cors = require ('cors')
const userRouter = require ('../src/routers/userRouter')
const addressRouter = require ('./routers/addressRouter')
const profileRouter = require ('./routers/profileRouter')

const app = express()
const port = 1994

app.use(express.json())
app.use(cors())

app.use(userRouter)
app.use(addressRouter)
app.use(profileRouter)

app.listen(port, () => {
    console.log("Running At Port:", port);
})