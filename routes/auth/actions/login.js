const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient();

const login = async (req, res) => {
    const { body: { email, password } } = req;
    try {
        if (!email || !password) throw new Error("Input fields incomplete");
        let user = await prisma.user.findOne({
            where: {
                email
            }
        })
        res.json(user);
    } catch (error) {
        res.status(300).json({ msg: error.message });
    }

}


module.exports = login