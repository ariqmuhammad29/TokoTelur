const {response} = require(`express`)
const memberModel = require(`../models/member.model`)

exports.tampilanDataMember = async (request, response) => {
    try {
        let dataMember = await memberModel.ambilData()

        let sendData = {
            page: `member`,
            data: dataMember,
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

exports.tampilanTambahData = async (request, response) => {
    try {
        let sendData = {
            page:`form-member`,
            nama_member: ``,
            alamat:``,
            telepon: ``,
            targetRoute: `/member/add`,
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

exports.prosesTambahData = async (request, response) => {
    try {
        
        let newData = {
            nama_member: request.body.nama_member,
            alamat: request.body.alamat,
            telepon: request.body.telepon
        }

        
        await memberModel.tambahData(newData)

     
        return response.redirect(`/member`)

    } catch (error) {
        /** handling error */
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

exports.tampilanEdit = async (request, response) => {

    let selectedID = request.params.id

    
    let parameter = {
        id: selectedID 
    }

    
    let selectedData = await memberModel.ambilDataDenganParameter(parameter)

    
    let sendData = {
        page: `form-member`, 
        nama_member: selectedData[0].nama_member,
        alamat: selectedData[0].alamat,
        telepon: selectedData[0].telepon,
        targetRoute: `/member/edit/${selectedID}`,
        dataUser: request.session.dataUser
        
    }
    return response.render(`../views/index`, sendData)
}

exports.prosesUpdate = async (request, response) => {
    try {
        
        let selectedID = request.params.id

       
        let parameter = {
            id: selectedID 
        }

        let newData = {
            nama_member: request.body.nama_member,
            alamat: request.body.alamat,
            telepon: request.body.telepon
        }

        await memberModel.update(newData, parameter)

        return response.redirect(`/member`)

    } catch (error) {
        /** handling error */
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

exports.prosesHapusData = async (request, response) => {
    try {
        
        let selectedID = request.params.id

       
        let parameter = {
            id: selectedID 
        }

        
        await memberModel.hapusData(parameter)

        return response.redirect(`/member`)

    } catch (error) {
        /** handling error */
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

