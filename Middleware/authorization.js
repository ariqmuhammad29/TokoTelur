

// fungsi authorization
exports.cekUser = (request, response, next) => {
    // fungsi ini digunakan untuk mengecek data user yang tersimpan di session
    // jika datanya tersimpan di session, maka boleh mengakses fitur yang diinginkan
    // jika datanya tidak tersimpan di session, maka akan dikembalikan di halaman login

    if (request.session.dataUser === undefined) {
        return response.redirect(`/auth`)
    } else {
        // lanjut ke fitur yang diinginkan
        next()
    }
}