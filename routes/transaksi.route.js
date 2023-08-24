const express = require(`express`)

/** buat object utk express */
const app = express()

/** permission to read request user */
app.use(express.urlencoded( {extended:true} ))

const transaksiController = require(`../controllers/transaksi.controller`)
const authorization = require(`../Middleware/authorization`)

app.get(`/add`, authorization.cekUser, transaksiController.showFormTransaksi)

app.post(`/add`, authorization.cekUser, transaksiController.simpanTransaksi)

app.get(`/`, authorization.cekUser, transaksiController.showTransaksi)

app.get(`/delete/:id`, authorization.cekUser, transaksiController.hapusTransaksi)

app.post(`/delete/:id`, authorization.cekUser, transaksiController.hapusTransaksi)


module.exports = app