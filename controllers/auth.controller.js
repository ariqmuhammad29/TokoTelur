const adminModel = require(`../models/admin.model`)

const crypt = require(`../crypt`)
const { request, response } = require("../routes/admin.route")

exports.showLogin = async (request, response) => {
    try {
        return response.render(`../views/pages/login`)
    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}


exports.authentication = async (request, response) => { 
    try {
        let username = request.body.username
        let password = request.body.password

        let result = await adminModel.ambilDataDenganParameter({username:username})
    
        if(result.length > 0) { 
            
            if (password === crypt.deskripsi(result[0].password)) {

                request.session.dataUser = result[0]

                request.session.cart = []

                return response.redirect(`/telur`)
            } else {
                return response.redirect(`/auth`)
            }
        } else {    
            return response.redirect(`/auth`)
        }
    } catch (error) {
        /** handling error */
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

exports.logout = async (request, response) => {
    try {
        request.session.dataUser = undefined

        return response.redirect(`/auth`)
    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}
