const {response} = require(`express`)
const adminModel = require(`../models/admin.model`)
const { request } = require("../routes/admin.route")
const crypt = require(`../crypt`)

exports.tampilanDataAdmin = async (request, response) => {
    try {
        let dataAdmin = await adminModel.ambilData()

        let sendData = {
            page: `admin`,
            data: dataAdmin,
            dataUser: request.session.dataUser

        } 

        return response.render(`../views/index`, sendData)
    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }


}

exports.showTambahData = async (request, response) => { 
    try {
        /**Prepare data yg akan di pasing ke view */
        let sendData = {    
            nama_admin:``,
            username:``,
            password:``,
            page:`form-admin`,
            targetRoute:`/admin/add`,
            deskripsi: crypt.deskripsi,
            dataUser: request.session.dataUser
        }
        return response.render('../views/index' , sendData)

    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

exports.prosesTambahData = async(request, response) => {
    try {
        /** membaca data dari yang di isikan user */
        let newData = { 
            nama_admin: request.body.nama_admin,
            username: request.body.username,
            password: crypt.enkripsi(request.body.password)
        }

        await adminModel.tambahData(newData)

        return response.redirect(`/admin`)
    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

exports.tampilanEdit = async (request, response) => {
    try {
        let id = request.params.id

        let parameter = {   
            id: id
        }

        let admin = await adminModel.ambilDataDenganParameter(parameter)

        let sendData = {
            nama_admin: admin[0].nama_admin,
            username: admin[0].username,
            password: admin[0].password,
            page: `form-admin`,
            targetRoute: `/admin/edit/${id}`,
            deskripsi: crypt.deskripsi,
            dataUser: request.session.dataUser
        }
        return response.render(`../views/index`, sendData)

    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

exports.prosesEditData = async (request, response) => {
    try {
        let newData = {
            nama_admin: request.body.nama_admin,
            username: request.body.username,
            password: crypt.enkripsi(request.body.password)
        }

        let id = request.params.id

        let parameter = {
            id: id
        }

        await adminModel.update(newData, parameter)

        return response.redirect(`/admin`)

    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

exports.prosesDeleteData = async (request, response) => {
    try {
        let id = request.params.id

        let parameter = {
            id: id
        }

        await adminModel.hapusData(parameter)

        return response.redirect(`/admin`)

    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}
