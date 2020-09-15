const { PrismaClient } = require("@prisma/client");
const bcrypt = require('bcrypt');
const genJWT = require("../../../helpers/jwt");
const prisma = new PrismaClient();

const login = async (req, res) => {
    const { body: { email, password } } = req;

    try {

        let user = await prisma.user.findOne({
            where: {
                email
            }
        })
        //Verify password
        const verification = bcrypt.compareSync(password, user.password);
        if (!verification) {
            return res.status(400).json({
                ok: false,
                msg: 'Credentials not found'
            });
        }
        //Gen jwt
        const token = await genJWT(user.id, user.role);
        delete user.password;
        delete user.registration;
        return res.json({
            user,
            token
        });
    } catch (error) {
        return res.status(300).json({ msg: error.message });
    }

}


module.exports = login