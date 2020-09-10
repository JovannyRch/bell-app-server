const genJWT = require("../../../helpers/jwt");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const renew = async (req, res) => {
    const { body: { }, user } = req;
    try {
        const newToken = await genJWT(user.id, user.role);
        const userDB = await prisma.user.findOne({
            where: { id: user.id }
        });

        delete userDB.password;

        res.json({
            user: userDB,
            token: newToken,
        })
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

module.exports = renew;