const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const get = async (req, res) => {
    const { body: { } } = req;
    try {

        const myGroups = await prisma.group.findMany({
            where: {}
        });
        res.json(groups);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

module.exports = get;