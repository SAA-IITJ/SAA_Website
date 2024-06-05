const givingBackController = require("../controllers/givingBack");
const router = require("express").Router();
router.get(["/givingBack"], givingBackController.givingBackView);

module.exports = router;
