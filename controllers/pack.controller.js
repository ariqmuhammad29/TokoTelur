const {response} = require(`express`)
const packModel = require(`../models/pack.model`)

exports.tampilanDataPack = async (request, response) => {
    try {
        let DataPack = await packModel.ambilData()

        let sendData = {
            page: `pack`,
            data: DataPack,
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
            page:`form-pack`,
            nama_pack: ``,
            harga:``,
            targetRoute: `/pack/add`,
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
            nama_pack: request.body.nama_pack,
            harga: request.body.harga,
        }

        
        await packModel.tambahData(newData)

     
        return response.redirect(`/pack`)

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

    
    let selectedData = await packModel.ambilDataDenganParameter(parameter)

    
    let sendData = {
        page: `form-pack`, 
        nama_pack: selectedData[0].nama_pack,
        harga: selectedData[0].harga,
        targetRoute: `/pack/edit/${selectedID}`,
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
            nama_pack: request.body.nama_pack,
            harga: request.body.harga
        }

        await packModel.update(newData, parameter)

        return response.redirect(`/pack`)

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

        
        await packModel.hapusData(parameter)

        return response.redirect(`/pack`)

    } catch (error) {
        /** handling error */
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

