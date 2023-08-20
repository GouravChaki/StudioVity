const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

// Generate a secure random secret key
const generateSecretKey = async () => {
  // generate a secret key using crypto library
  const SecretKey = crypto.randomBytes(32).toString("hex"); // 32 bytes = 256 bits

  //to load existing .env values from .env file
  const envPath = path.join(__dirname, "../.env");
  const envC = require("dotenv").parse(fs.readFileSync(envFilePath));

  // Update the generated secret key into  the environmental variable
  envConfig.SecretKey = SecretKey;

  const updatedEnv = Object.keys(envC).map((key) => `${key}=${envConfig[key]}`).join("\n\n");

  // this method ensures that previous environment file values are restored along-with the new key generated
  fs.writeFileSync(envPath, updatedEnv);
};
generateSecretKey();
module.exports = generateSecretKey;
