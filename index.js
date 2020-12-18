let 
    env = process.env.NODE_ENV || "local";
  let   server = require("./server/")( env );

module.exports = server;    