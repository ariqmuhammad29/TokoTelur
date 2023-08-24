const {response} = require(`express`)
const telurModel = require(`../models/telur.model`)


exports.tampilanDataTelur = async (request, response) => {
    try {
        let dataTelur = await telurModel.ambilData()

        let sendData = {
            page: `telur`,
            data: dataTelur,
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
            page:`form-telur`,
            jenis_telur: ``,
            stok:``,
            harga:``,
            targetRoute: `/telur/add`,
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
            jenis_telur: request.body.jenis_telur,
            harga: request.body.harga,
            stok: request.body.stok
        }

        
        await telurModel.tambahData(newData)

     
        return response.redirect(`/telur`)

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

    
    let selectedData = await telurModel.ambilDataDenganParameter(parameter)


    let sendData = {
        page: `form-telur`,
        jenis_telur: selectedData[0].jenis_telur,
        harga: selectedData[0].harga,
        stok: selectedData[0].stok,
        targetRoute: `/telur/edit/${selectedID}`,
        dataUser: request.session.dataUser
        
    }
    return response.render(`../views/index`, sendData)
}

exports.prosesUpdate = async (request, response) => {
    try {
        
        let selectedID = request.params.id

        /** store selected ID to object "parameter" */
        let parameter = {
            id: selectedID // 'id' is similar as column's name of table
        }

        /** reading obat's data from user that has sent */
        let newData = {
            jenis_telur: request.body.jenis_telur,
            harga: request.body.harga,
            stok: request.body.stok
        }

        /** call function for update to table of obat */
        await telurModel.update(newData, parameter)

        /** redirect to obat's page */
        return response.redirect(`/telur`)

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

        
        await telurModel.hapusData(parameter)

        return response.redirect(`/telur`)

    } catch (error) {
        /** handling error */
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}
