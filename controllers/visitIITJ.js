

const CONSTANTS = require("../utils/constants");
module.exports = {
  visitIITJView: async (req, res, next) => {
    res.render("visitIITJ",{ [CONSTANTS.HOME_PAGE_RENDER_INPUTS.NavLinks]:
      CONSTANTS.HOME_PAGE_NAVLINKS,} );
    next();
  },
};


