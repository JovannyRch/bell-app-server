const { Router } = require('express');
const create = require('./controllers/create');
const jwtGuard = require('../../middlewares/jwtGuard');
const router = Router();


router.post('/', jwtGuard, create);
module.exports = router;