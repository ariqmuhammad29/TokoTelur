const express = require(`express`)

/** buat object utk express */
const app = express()

/** permission to read request user */
app.use(express.urlencoded( {extended:true} ))

/** panggil dulu controller */
const authController = require(`../controllers/auth.controller`)

app.get(`/`, authController.showLogin)

app.post(`/`, authController.authentication)

app.get(`/logout`, authController.logout)

module.exports = app