require("module-alias/register");
const fs = require("fs");
const path = require("path");
const program = require("commander");
const pkg = require("./package.json");

const OPERATION = {
  UPLOAD: "upload",
};

const isConfigExist = fs.existsSync(
  path.join(__dirname, "./config/config.json")
);
if (!isConfigExist) throw new Error("You should create config/config.json");

const config = require("@/config");

async function executeOperation() {
  switch (operation) {
    default:
      throw new Error("The program has not operation of " + operation);
    case OPERATION.UPLOAD:
      if (!config.oss) throw new Error("You should create config about oss");
      const OSSUploader = require(`@/src/${operation}`);
      const oss = new OSSUploader(config.oss);
      await oss.put();
      break;
  }
}

program
  .version(pkg.version, "-v --version")
  .command("upload")
  .description("upload file to oss")
  .action(() => {
    const OSSUploader = require(`@/src/upload`);
    const oss = new OSSUploader(config.oss);
    oss.watch();
  });

program.parse(process.argv);

// executeOperation();
