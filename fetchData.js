const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
require("dotenv").config({ path: ".env" });
// Replace with your GitHub repo URL
const repoUrl = process.env.DATA_REPO_URL;
console.log(repoUrl);
const localRepoName = process.env.DATA_REPO_NAME; // The name of the repo folder created after cloning
const currentFolder = __dirname;

const itemsToMove = ["public", "seed", "data.sqlite"];

function cloneRepo(repoUrl, localRepoPath) {
  return new Promise((resolve, reject) => {
    exec(`git clone ${repoUrl} ${localRepoPath}`, (error, stdout, stderr) => {
      if (error) {
        reject(`Error cloning repo: ${stderr}`);
      } else {
        resolve(`Repo cloned to ${localRepoPath}`);
      }
    });
  });
}

function moveItem(src, dest) {
  return new Promise((resolve, reject) => {
    fs.rename(src, dest, (error) => {
      if (error) {
        reject(`Error moving ${src} to ${dest}: ${error}`);
      } else {
        resolve(`Moved ${src} to ${dest}`);
      }
    });
  });
}

function deleteFolder(folderPath) {
  return new Promise((resolve, reject) => {
    fs.rm(folderPath, { recursive: true, force: true }, (error) => {
      if (error) {
        reject(`Error deleting folder ${folderPath}: ${error}`);
      } else {
        resolve(`Deleted folder ${folderPath}`);
      }
    });
  });
}

async function main() {
  const localRepoPath = path.join(currentFolder, localRepoName);

  try {
    console.log(await cloneRepo(repoUrl, localRepoPath));

    for (const item of itemsToMove) {
      const srcPath = path.join(localRepoPath, item);
      const destPath = path.join(currentFolder, item);
      console.log(await moveItem(srcPath, destPath));
    }

    console.log(await deleteFolder(localRepoPath));
    console.log("All tasks completed successfully!");
  } catch (error) {
    console.error(error);
  }
}

main()
  .then(() => console.log("Data fetched successfully"))
  .catch((err) => console.log("error fetching data"));
