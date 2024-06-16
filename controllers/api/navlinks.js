const CONSTANTS = require("../../utils/constants");

module.exports = {
  navLinksApi: async (req, res, next) => {
    res.json({
      [CONSTANTS.HOME_PAGE_RENDER_INPUTS.NavLinks]:
        CONSTANTS.HOME_PAGE_NAVLINKS,
    });
    next();
  },
};
