const dotenv = require("dotenv");
dotenv.config();

let PORT = process.env.PORTlet;
let MONGODB_URI = process.env.MONGODB_URI;

module.exports = { MONGODB_URI, PORT };
