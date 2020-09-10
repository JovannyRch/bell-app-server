const { Router } = require('express');
const invitation = require('./controllers/invitation');
const router = Router();

router.use("/", invitation);

module.exports = router;