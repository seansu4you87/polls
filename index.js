var server = require("./server.js");
var router = require("./router.js");
var handler = require("./handler.js");

var handle = {};
handle["/"] = handler.index;
handle["/plusyes"] = handler.plusYes;
handle["/plusno"] = handler.plusNo;
handle["/poll"] = handler.poll;
handle["/client.js"] = handler.writeFileToResponse;
handle["/jquery-1.2.6.min.js"] = handler.writeFileToResponse;

server.start(router.route, handle);