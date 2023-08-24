
// memanggil model
const transaksiModel = require(`../models/transaksi.model`)
const detailModel = require(`../models/detailTransaksi.model`)
const telurModel = require(`../models/telur.model`)
const packModel = require(`../models/pack.model`)
const memberModel = require(`../models/member.model`)

const { response, request } = require("../routes/transaksi.route")

// function untuk menampilkan form transaksi
exports.showFormTransaksi = async (request, response) => {
    try {
        // ambil data
        let telur = await telurModel.ambilData()
        let pack = await packModel.ambilData()
        let member = await memberModel.ambilData()
        // prepare data yang akan dipassing ke view
        let sendData = {
            dataTelur : telur, // array object
            dataPack : pack,
            dataMember : member,
            page : `form-transaksi`,
            tgl_transaksi: ``,
            dataTelurString: JSON.stringify(telur),
            dataPackString: JSON.stringify(pack),
            // JSON = JavaScriptObjectNotation
            dataUser : request.session.dataUser,
            cart: request.session.cart
        }

        return response.render(`../views/index`,sendData)
    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

exports.addToCart = async (request, response) => {
    try {
        // dapetin data obat berdasarkan id_obat
        let selectedTelur = await telurModel.ambilDataDenganParameter({
            id: request.body.id_telur
        })

        let selectedPack = await packModel.ambilDataDenganParameter({
            id: request.body.id_pack
        })

        // tampung / receive data yang dikirimkan
        let storeData = {
            id_telur: request.body.id_telur,
            jenis_telur: selectedTelur[0].jenis_telur,
            jumlah_telur: request.body.jumlah_telur,
            harga_telur: request.body.harga_telur,
            id_pack: request.body.id_pack,
            nama_pack: selectedPack[0].nama_pack,
            jumlah_pack: request.body.jumlah_pack,
            harga_pack: request.body.harga_pack
            
        }

        //** masukkan data ke keranjang menggunakan session */
        request.session.cart.push(storeData)
        // push() -> menambah data ke dalam array

        // direct ke halaman form transaksi
        return response.redirect(`/transaksi/add`)
    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

exports.hapusCart = async (request, response) => {
    try {

        // ambil seluruh data cart dari session
        let cart = request.session.cart

        // ambil id_obat yang akan dihapus dari cart
        let id_telur = request.params.id

        // cari tau posisi index dari data yang akan dihapus
        let index = cart.findIndex(item => item.id_telur == id_telur)

        // hapus data sesuai index yang ditemukan
        cart.splice(index, 1)
        // splice untuk menghapus data pada array

        // kembalikan lagi data cart-nya ke dalam session
        request.session.cart = cart

        // direct ke halaman transaksi
        return response.redirect(`/transaksi/add`)

    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

exports.simpanTransaksi = async (request, response) => {
    try {
        // tampung data yang dikirimkan
        let newTransaksi = {
            id_member: request.body.id_member,
            tgl_transaksi: request.body.tgl_transaksi,
            id_admin: request.session.dataUser.id
        }

        // simpan transaksi
        let resultTransaksi = await transaksiModel.add(newTransaksi)

        // menampung isi cart
        let cart = request.session.cart

        for (let i = 0; i < cart.length; i++) {
            // hapus data atau key nama_obat dari cart
            delete cart [i].jenis_telur

            delete cart[i].nama_pack

            // tambah id_transaksi ke dalam cart
            cart[i].id_transaksi = resultTransaksi.insertId

            // eksekusi simpan cart ke detail_transaksi
            await detailModel.add(cart[i])
            
        }

        // hapus cart-nya
        request.session.cart = []

        // direct ke halaman form-transaksi lagi
        return response.redirect(`/transaksi/add`)

    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

exports.showTransaksi = async (request, response) => {
    try {
        // ambil data transaksi
        let transaksi = await transaksiModel.findAll()

        // sisipkan data detail dari setiap transaksi
        for (let i = 0; i < transaksi.length; i++) {
            // ambil id transaksinya
            let id = transaksi[i].id

            // ambil data detailnya sesuai id
            let detail = await  detailModel.findByCriteria({ id_transaksi: id })
            
            // sisipin detail ke transaksinya
            transaksi[i].detail = detail

            console.log(detail);
        }

        // prepare data yang akan dikirimkan ke view
        let sendData = {
            page: `transaksi`,
            dataUser: request.session.dataUser,
            transaksi: transaksi
        }

        
        return response.render(`../views/index`, sendData)

    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}


exports.hapusTransaksi = async (request, response) => {
    try {
        // menampung data id yang akan dihapus
        let id = request.params.id

        // menghapus data detail transaksi
        await detailModel.delete({id_transaksi: id})

        // menghapus data transaksi
        await transaksiModel.delete({id: id})

        // kembali lagi ke halaman transaksi
        return response.redirect(`/transaksi`)

    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}