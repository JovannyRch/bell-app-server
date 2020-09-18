const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const gfg = () => {
    var minm = 100000;
    var maxm = 999999;
    return Math.floor(Math
        .random() * (maxm - minm + 1)) + minm;
}

const generate = async (req, res) => {
    const { body: { groupId }, user } = req;
    try {
        let codes = [];

        for (let i = 0; i < 10; i++) {
            const code = new Date().getTime() / 1000;

            let coupon = await prisma.code.create({
                data: {
                    groupId,
                    code,
                }
            });
            codes.push(coupon.code);
        }


        res.json(codes);
    } catch (error) {
        console.log(error);
        res.status(500)
    }
}

module.exports = {
    generate,
};