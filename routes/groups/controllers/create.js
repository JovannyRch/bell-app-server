const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const create = async (req, res) => {
    const { body: { name }, user } = req;
    try {

        let group = await prisma.group.create({
            data: {
                name,
                user: {
                    connect: {
                        id: user.id
                    }
                }
            }
        })

        res.json(group);
    } catch (error) {
        console.log(error);
        res.status(500)
    }
}

module.exports = create;