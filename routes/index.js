const { Router } = require('express');
const router = Router();
const auth = require('./auth');
const invitation = require('./invitations');
const groups = require('./groups');

router.use("/auth", auth);
router.use("/invitation", invitation);
router.use("/groups", groups);

module.exports = router;