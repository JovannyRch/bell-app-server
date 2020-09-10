const { Router } = require('express');
const register = require('./controllers/register');
const { check } = require('express-validator');
const fieldValidator = require('../../middlewares/fieldValidator');
const login = require('./controllers/login');
const renew = require('./controllers/renew');
const jwtGuard = require('../../middlewares/jwtGuard');
const router = Router();

router.post('/login', [
    check('email', 'Email field is required').notEmpty(),
    check('password', 'Password field is required').notEmpty(),
    fieldValidator
], login)

router.post('/register', [
    check('email', 'Email field is required').notEmpty(),
    check('email', 'Invalid email format').isEmail(),
    check('password', 'Password field is required').notEmpty(),
    fieldValidator
], register)

router.get('/renew', jwtGuard, renew);

module.exports = router;