const CONSTANTS = require("../../utils/constants");
const { EventTypes } = require("../../models/events/EventTypes");
const { Events } = require("../../models/events/Events");
const utils = require("../../utils/utils");

module.exports = {
  eventsApi: async (req, res, next) => {
    res.json( {
      [CONSTANTS.EVENTS_PAGE_RENDER_INPUTS.EventTypes]:
        await EventTypes.findAll({
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        }),
      [CONSTANTS.EVENTS_PAGE_RENDER_INPUTS.Events]: await Events.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      }).then(async (data) => {

        const groupedEventsMap = {};
        for (const event of data) {
          const eventTypeObj = await EventTypes.findByPk(event.eventTypeId);
          const eventTypeName = await eventTypeObj.getDataValue("name");
          const mediaFiles = utils.getFilesArrayInAFolder(event.mediaDirectory);
          if (!groupedEventsMap[eventTypeName]) {
            groupedEventsMap[eventTypeName] = [];
          }
          groupedEventsMap[eventTypeName].push({
            ...event.dataValues,
            eventType: eventTypeName,
            mediaFiles,
          });
        }
 
        return groupedEventsMap;
      }),
    });
    next();
  },
};
