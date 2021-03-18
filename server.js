const http = require("http");
const app = require("./app");


const server = http.createServer(app);
process.env.PORT = 3000;
const port = process.env.PORT;
server.listen(port, () => {
    console.log(`server runs on ${port}`);
});