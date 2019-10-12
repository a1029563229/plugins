require("module-alias/register");
const fs = require("fs");
const path = require("path");
const program = require("commander");
const OPERATION = {
  UPLOAD: "upload"
};

program.option("-o, --operation [operation]", "operation").parse(process.argv);

const { operation } = program;
const isConfigExist = fs.existsSync(
  path.join(__dirname, "./config/config.json")
);
if (!operation) throw new Error("You need input operation, like “upload”");
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

executeOperation();