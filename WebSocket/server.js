const websocket = require("websocket").server;
const http = require("http");
const PORT = 5000;
const server = http.createServer();
const ws = new websocket({ httpServer: server });
server.listen(PORT, () => {
    console.log("Server is runing..");
});

let clients = [];
let messages = [];
ws.on("request", (request) => {
    let connection = request.accept(null, request.origin);

    let uid = Math.floor(Math.random() * 10).toString() + Math.floor(Math.random() * 10).toString() + new Date().toString();
    clients[uid] = connection;
    connection.sendUTF(JSON.stringify(messages));

    connection.on("message", (message) => {
        if (message.type === "utf8") {
            messages.push(JSON.parse(message.utf8Data));
            for (key in clients) {
                clients[key].sendUTF(JSON.stringify(messages));
            }
        }

    })
})