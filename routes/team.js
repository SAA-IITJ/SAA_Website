const teamController = require("../controllers/team");

const router = require("express").Router();
router.get(["/studentTeam"], teamController.teamView);

module.exports = router;
