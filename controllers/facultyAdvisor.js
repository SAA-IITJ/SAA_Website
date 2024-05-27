module.exports = {
  facultyAdvisorView: async (req, res, next) => {
    res.render("facultyAdvisor", {
      [CONSTANTS.HOME_PAGE_RENDER_INPUTS.NavLinks]:
        CONSTANTS.HOME_PAGE_NAVLINKS,
    });
    next();
  },
};
