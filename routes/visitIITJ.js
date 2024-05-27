const visitIITJController = require("../controllers/visitIITJ");

const router = require('express').Router();
router.get(["/visitIITJ"], visitIITJController.visitIITJView);

module.exports = router;
