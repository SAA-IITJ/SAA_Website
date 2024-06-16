const CONSTANTS = require("../utils/constants");
const { EventTypes } = require("../models/events/EventTypes");
const { Events } = require("../models/events/Events");
const utils = require("../utils/utils");
const path = require("path");
const fs = require("fs");
module.exports = {
  eventsView: async (req, res, next) => {
    
    const fileName = path.join(
      __dirname,
      "../public/dynamicPages/events/index.html"
    );

    console.log(fileName);
    fs.readFile(fileName, (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Internal Server Error");
      }

      res.setHeader("Content-Type", "text/html");
      res.status(200).send(data);
    });
  },
};
