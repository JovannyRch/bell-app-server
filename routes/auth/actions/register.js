const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();

const register = async (req, res) => {
    const { body: { name, email, password } } = req;

    try {

        //Validate unique user
        let user = await prisma.user.findOne({ where: { email } })
        if (user) {
            return res.status(400).json({ msg: "Email is already registered" });
        }
        //Encrypt password
        const salt = bcrypt.genSaltSync();
        const passwordEncrypt = bcrypt.hashSync(password, salt);

        let newUser = await prisma.user.create({ data: { name, email, password: passwordEncrypt } });
        res.json(newUser);
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}


module.exports = register