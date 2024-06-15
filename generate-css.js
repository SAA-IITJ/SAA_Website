const fs = require("fs");
const { exec } = require("child_process");
const path = require("path");
const logger = require("./utils/logger");

const templatesDir = path.join(__dirname, "views");
const outputDir = path.join(__dirname, "public", "stylesheets");
const inputCss = path.join(__dirname, "public", "stylesheets", "tailwind.css");

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// List of main templates (add more as needed)
const templates = ["home", "team", "events","facultyAdvisor","givingBack","visitIITJ"];

templates.forEach((template) => {
  const mainTemplatePath = path.join(templatesDir, `${template}.ejs`);
  const partialsPath = path.join(templatesDir, template, "**/*.ejs");
  const outputCssPath = path.join(outputDir, `${template}.css`);

  // Create temporary Tailwind configuration file
  const tempConfigPath = path.join(
    __dirname,
    `tailwind.tmp.${template}.config.js`
  );
  const tempConfigContent = `
  module.exports = {
    safelist: [
      "!duration-[0ms]",
      "!delay-[0ms]",
      'html.js :where([class*="taos:"]:not(.taos-init))',
    ],
    content: {
      relative: true,
      transform: (content) => content.replace(/taos:/g, ""),
      files: [
        "${mainTemplatePath}",
        "${partialsPath}",
        "./views/common/*.ejs",
        "./node_modules/flowbite/**/*.js"
      ],
    },
    theme: {
      extend: {},
    },
    plugins: [require("flowbite/plugin"),require("taos/plugin")],
  };
  
  `;
  fs.writeFileSync(tempConfigPath, tempConfigContent);

  // Execute PostCSS to generate the CSS file
  exec(
    `npx tailwindcss build ${inputCss} -o ${outputCssPath} --config ${tempConfigPath} --minify`,
    (err, stdout, stderr) => {
      // Delete the temporary Tailwind configuration file
      fs.unlinkSync(tempConfigPath);

      if (err) {
        logger(`Error generating CSS for ${template}: ${stderr}`, "error");
      } else {
        logger(`Generated ${outputCssPath}`, "success");
      }
    }
  );
});