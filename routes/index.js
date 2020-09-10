const { Router } = require('express');
const login = require('./auth/actions/login');
const register = require('./auth/actions/register');
const { check } = require('express-validator');
const fieldValidator = require('../middlewares/fieldValidator');
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

module.exports = router;