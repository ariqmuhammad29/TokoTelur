const express = require(`express`)

const app = express()

app.use(express.urlencoded({ extended:true }))

const packController = require(`../controllers/pack.controller`)
const authorization  = require("../middleware/authorization")

app.get(`/`, authorization.cekUser, packController.tampilanDataPack)

app.get(`/add`, authorization.cekUser, packController.tampilanTambahData)

app.post(`/add`, authorization.cekUser, packController.prosesTambahData)

app.get(`/edit/:id`, authorization.cekUser, packController.tampilanEdit)

app.post(`/edit/:id`, authorization.cekUser, packController.prosesUpdate)

app.get(`/delete/:id`, authorization.cekUser, packController.prosesHapusData)

app.post(`/delete/:id`, authorization.cekUser, packController.prosesHapusData)

module.exports = app