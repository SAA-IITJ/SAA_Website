const CONSTANTS = require("../utils/constants");
const { TeamMembers } = require("../models/team/Team");
const {
  getTeamPagePositionType,
  getTeamPageTeamType,
} = require("../utils/utils");
module.exports = {
  facultyAdvisorView: async (req, res, next) => {
    res.render("facultyAdvisor", {
      [CONSTANTS.HOME_PAGE_RENDER_INPUTS.NavLinks]:
        CONSTANTS.HOME_PAGE_NAVLINKS,
      [CONSTANTS.TEAM_PAGE_RENDER_INPUTS.TeamMembers]:
        await TeamMembers.findAll({
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        }).then((data) => {
          return data.map((ele) => {
            return {
              ...ele.dataValues,
              position: getTeamPagePositionType(ele.dataValues.position),
              teamType: getTeamPageTeamType(ele.dataValues.teamType),
            };
          });
        }),
    });
    next();
  },
};
