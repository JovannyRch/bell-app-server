const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient();

const register = async (req, res) => {
    res.json({ saludo: 'hola' });
}


module.exports = register