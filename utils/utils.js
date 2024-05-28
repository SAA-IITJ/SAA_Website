const constants = require("./constants");
const path = require("path");
const fs = require("fs");
const logger = require("./logger");

const teamPagePositionTypesLength = Object.keys(
  constants.TEAM_PAGE_POSITION_TYPES
).length;

const teamPageTeamTypesLength = Object.keys(
  constants.TEAM_PAGE_TEAM_TYPES
).length;

const getTeamPagePositionType = (num) =>
  constants.TEAM_PAGE_POSITION_TYPES[num];

const getTeamPageTeamType = (num) => constants.TEAM_PAGE_TEAM_TYPES[num];

// For getting files in subfolder from root of the project
const getFilesArrayInAFolder = (subDirPath) => {
  const directoryPath = path.join(process.cwd(), "public", subDirPath);

  try {
    // Read the directory contents
    const files = fs.readdirSync(directoryPath);

    // Return full paths of the files
    
    const result =  files.map((file) => path.join(subDirPath, file));
    logger(result, "success")
    return result
  } catch (error) {
    // Handle error, e.g., directory not found
    logger(
      `Error reading directory: ${directoryPath} - error - ${error}`,
      "error"
    );
    return [];
  }
};

module.exports = {
  teamPagePositionTypesLength,
  teamPageTeamTypesLength,
  getTeamPagePositionType,
  getTeamPageTeamType,
  getFilesArrayInAFolder,
};
