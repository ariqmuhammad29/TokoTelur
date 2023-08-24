const express = require(`express`)

const app = express()

app.use(express.urlencoded({ extended:true }))

const memberController = require(`../controllers/member.controller`)
const authorization = require(`../Middleware/authorization`)

app.get(`/`, authorization.cekUser ,memberController.tampilanDataMember)

app.get(`/add`, authorization.cekUser, memberController.tampilanTambahData)

app.post(`/add`, authorization.cekUser ,memberController.prosesTambahData)

app.get(`/edit/:id`, authorization.cekUser, memberController.tampilanEdit)

app.post(`/edit/:id`, authorization.cekUser, memberController.prosesUpdate)

app.get(`/delete/:id`, authorization.cekUser, memberController.prosesHapusData)

app.post(`/delete/:id`, authorization.cekUser, memberController.prosesHapusData)

module.exports = app