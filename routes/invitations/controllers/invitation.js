const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const invitation = async (req, res) => {
    const { body: { from, to } } = req;
    try {

    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

module.exports = invitation;