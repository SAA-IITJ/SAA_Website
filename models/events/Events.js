const path = require("path");
const db = require("../../config/db");
const fs = require("fs").promises; // Use the promise-based fs module
const logger = require("../../utils/logger");
const { EventTypes } = require("./EventTypes");

const Events = db.ORM.define(
  "Events",
  {
    id: {
      type: db.DataTypes.UUID,
      defaultValue: db.DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: db.DataTypes.STRING,
      allowNull: false,
    },
    startDate: {
      type: db.DataTypes.DATEONLY,
    },
    endDate: {
      type: db.DataTypes.DATEONLY,
    },
    startTime: {
      type: db.DataTypes.TIME,
    },
    endTime: {
      type: db.DataTypes.TIME,
    },
    venue: {
      type: db.DataTypes.STRING,
    },
    description: { type: db.DataTypes.STRING },
    mediaDirectory: {
      validate:true,
      type: db.DataTypes.STRING,
    },
    eventTypeId: {
      type: db.DataTypes.UUID,
      allowNull: false,
      references: {
        model: "EventTypes",
        key: "id",
      },
      validate: {
        notNull: {
          msg: "Please select an event type",
        },
      },
    },
  },
  {
    hooks: {
      beforeCreate: async (instance, options) => {
        try {
          // Ensure eventTypeId is set
          if (!instance.eventTypeId) {
            throw new Error("eventTypeId is not set");
          }

          // Set mediaDirectory based on eventTypeId and id
          instance.mediaDirectory = `/media/events/${instance.name}-${instance.id}`;
          const dirPath = path.join(process.cwd(), instance.mediaDirectory);

          // Create directory if it doesn't exist
          try {
            await fs.access(dirPath);
            logger(
              `Directory ${instance.mediaDirectory} already exists`,
              "debug"
            );
          } catch (error) {
            if (error.code === "ENOENT") {
              const newPath = path.join(
                process.cwd(),
                "public",
                instance.mediaDirectory
              );
              await fs.mkdir(newPath, { recursive: true });
              logger(
                `New directory ${instance.mediaDirectory} created successfully`,
                "debug"
              );
            } else {
              throw error;
            }
          }
        } catch (error) {
          logger(`Error in beforeCreate hook: ${error.message}`, "error");
          throw error;
        }
      },
    },
  }
);

Events.belongsTo(EventTypes, { foreignKey: "eventTypeId", targetKey: "id" });
EventTypes.hasMany(Events, { foreignKey: "eventTypeId", sourceKey: "id" });

module.exports = { Events };
