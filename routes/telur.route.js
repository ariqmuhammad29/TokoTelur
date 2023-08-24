const express = require(`express`)

const app = express()

app.use(express.urlencoded({ extended:true }))

const telurController = require(`../controllers/telur.controller`)
const authorization = require(`../Middleware/authorization`)

app.get(`/`, authorization.cekUser, telurController.tampilanDataTelur)

app.get(`/add`, authorization.cekUser, telurController.tampilanTambahData)

app.post(`/add`, authorization.cekUser, telurController.prosesTambahData)

app.get(`/edit/:id`, authorization.cekUser, telurController.tampilanEdit)

app.post(`/edit/:id`, authorization.cekUser, telurController.prosesUpdate)

app.get(`/delete/:id`, authorization.cekUser, telurController.prosesHapusData)

app.post(`/delete/:id`, authorization.cekUser, telurController.prosesHapusData)

module.exports = app