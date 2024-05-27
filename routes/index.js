const router = require("express").Router();

router.use("/", require("./home"));
router.use("/", require("./team"));
router.use("/", require("./events"));
router.use("/", require("./visitIITJ"));
router.use("/", require("./facultyAdvisor"));
module.exports = router;
