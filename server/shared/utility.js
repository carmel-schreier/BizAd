module.exports = {

    getUserEmail(token) {
        let payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
        let userEmail = payload.email;
        return userEmail
    }

}