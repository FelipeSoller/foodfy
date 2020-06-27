const express = require('express')
const server = express()

server.get("/", function(req, res) {
    return res.send("HI...")
})

server.listen(5000, function() {
    console.log("server is running");
    
})