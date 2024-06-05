const CONSTANTS = require("../utils/constants");
module.exports = {
  givingBackView: async (req, res, next) => {
    res.render("givingBack",{ [CONSTANTS.HOME_PAGE_RENDER_INPUTS.NavLinks]:
      CONSTANTS.HOME_PAGE_NAVLINKS,} );
    next();
  },
};


