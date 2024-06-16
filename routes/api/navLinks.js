const {navLinksApi} = require("../../controllers/api/navlinks");
const router = require('express').Router()

router.get('/api/navlinks',navLinksApi)
module.exports = router