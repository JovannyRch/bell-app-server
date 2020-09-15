const { Router } = require('express');
const create = require('./controllers/create');
const get = require('./controllers/get');

const jwtGuard = require('../../middlewares/jwtGuard');
const router = Router();


router.get('/', jwtGuard, get);
router.post('/', jwtGuard, create);
module.exports = router;