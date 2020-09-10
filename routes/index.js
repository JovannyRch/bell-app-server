const { Router } = require('express');
const login = require('./auth/actions/login');
const register = require('./auth/actions/register');
const router = Router();

router.post('/login', login)
router.post('/register', register)

module.exports = router;