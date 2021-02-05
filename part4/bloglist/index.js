const app = require("./app");
const http = require("http");
const config = require("./utils/config");

const PORT = process.env.PORT || 3001;
const server = http.createServer(app);
server.listen(PORT, console.log(`Server running in port ${PORT}`));
