const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: 'aldy1612@gmail.com',
        clientId: '278513568892-97gt2c0up3urhql11kblbk9q3inccm0r.apps.googleusercontent.com',
        clientSecret: 'Z_doEL585K-qwnQpXJH7-EBk',
        refreshToken: '1/R8tkzLeKjK1q4-ye291m60HCyxy4zfccE66iBe_s4Gg'
    }
})


const sendVerify= (username, name, email) => {
    const mail = {
        from: 'Aldy Azarya <aldy1612@gmail.com>',
        to: email,
        subject: 'Verifikasi Email',
        html: `<h1><a href="http://localhost:1994/verify?username=${username}">Klik untuk verifikasi</a></h1>`
    }
    transporter.sendMail(mail, (err, res) => {
        if(err) return console.log(err.message);
        
        console.log("email berhasil terkirim");
        
    })
    
}

module.exports = {
    sendVerify
}