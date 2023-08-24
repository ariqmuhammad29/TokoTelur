const express = require(`express`)

/** buat object utk express */
const app = express()

/** permission to read request user */
app.use(express.urlencoded( {extended:true} ))

const transaksiController = require(`../controllers/transaksi.controller`)
const authorization = require(`../Middleware/authorization`)

app.post(`/`, authorization.cekUser, transaksiController.addToCart)

app.get(`/:id`, authorization.cekUser, transaksiController.hapusCart)

module.exports = app