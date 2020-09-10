const jsw = require("jsonwebtoken");

const genJWT = (userId, role) => {
    return new Promise((resolve, reject) => {
        const payload = {
            userId, role
        };

        jsw.sign(payload, process.env.JWT_KEY, {
            expiresIn: '7d'
        }, (err, token) => {
            if (err) {
                reject("Can not generate jsw");
            }
            else {
                resolve(token);
            }
        });
    }
    );
}


module.exports = genJWT;