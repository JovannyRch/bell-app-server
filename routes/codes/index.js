const { Router } = require('express');
const { generate } = require('./controller');

const jwtGuard = require('../../middlewares/jwtGuard');
const router = Router();


router.get('/', jwtGuard, get);
router.post('/', jwtGuard, create);
module.exports = router;