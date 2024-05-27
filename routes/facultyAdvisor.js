const facultyAdvisorController = require("../controllers/facultyAdvisor");

const router = require('express').Router();
router.get(["/facultyAdvisor"], facultyAdvisorController.facultyAdvisorView);

module.exports = router;
