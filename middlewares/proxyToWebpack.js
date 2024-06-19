const path = require("path");
const { DYNAMIC_PAGES } = require("../utils/constants");
module.exports = (req, res, next) => {
  var exit = false
  if (process.env.NODE_ENV === "development") {
    DYNAMIC_PAGES.forEach((ele) => {
      if (path.resolve(req.originalUrl) === path.resolve(`/${ele}`)) {
        res.redirect(`http://localhost:${process.env.WEBPACK_PORT}/${ele}`);
        exit = true
        return;
      }
    });
    if(exit){
      return;
    }
  }
  next();
};
