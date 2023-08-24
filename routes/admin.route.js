const express = require(`express`)

const app = express()

app.use(express.urlencoded({ extended:true }))

const adminController = require(`../controllers/admin.controller`) 
const authorization = require(`../middleware/authorization`)

app.get(`/`, authorization.cekUser ,adminController.tampilanDataAdmin)

app.get(`/add`, authorization.cekUser, adminController.showTambahData)

app.post(`/add`, authorization.cekUser, adminController.prosesTambahData)

app.get(`/edit/:id`, authorization.cekUser, adminController.tampilanEdit)

app.post(`/edit/:id`, authorization.cekUser, adminController.prosesEditData)

app.get(`/delete/:id`, authorization.cekUser, adminController.prosesDeleteData)

app.post(`/delete/:id`, authorization.cekUser, adminController.prosesDeleteData)

module.exports = app