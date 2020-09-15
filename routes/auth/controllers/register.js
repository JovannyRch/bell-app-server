const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const genJWT = require("../../../helpers/jwt");
const prisma = new PrismaClient();

const register = async (req, res) => {
    const { body: { name, email, password } } = req;

    try {

        //Validate unique user
        let user = await prisma.user.findOne({ where: { email } })
        if (user) {
            return res.status(400).json({ msg: "Email has been already registered" });
        }
        //Encrypt password
        const salt = bcrypt.genSaltSync();
        const passwordEncrypt = bcrypt.hashSync(password, salt);

        let newUser = await prisma.user.create({ data: { name, email, password: passwordEncrypt } });
        let token = await genJWT(newUser.id, newUser.role);
        delete newUser.registration;
        delete newUser.password;
        res.json({ user: newUser, token });
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}


module.exports = register