const express = require(`express`)

const app = express()

const port = `7070`

app.set(`view engine`, `ejs`)
const session = require(`express-session`)

// session configuration
app.use(session({
    secret: `i love you`,
    resave: false,
    saveUninitialized: false
}))
// load routes
const telur = require(`./routes/telur.route`)
const pack = require(`./routes/pack.route`)
const member = require(`./routes/member.route`)
const admin = require(`./routes/admin.route`)
const auth = require(`./routes/auth.route`)
const transaksi = require(`./routes/transaksi.route`)
const cart = require(`./routes/cart.route`)

// define prefix
app.use(`/telur`,telur)
app.use(`/pack`,pack)
app.use(`/member`, member)
app.use(`/admin`, admin)
app.use(`/auth`,auth)
app.use(`/transaksi`, transaksi)
app.use(`/cart`, cart)




app.listen(port, () =>{
    console.log(`Server Telur is running on port ${port}`)
})