const {eventsApi} = require("../../controllers/api/events");
const router = require('express').Router()

router.get('/api/events',eventsApi)
module.exports = router