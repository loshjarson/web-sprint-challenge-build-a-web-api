const express = require('express');
const server = express();
const dotenv = require("dotenv").config()
const cors = require("cors")
const path = require("path")

const actionsRouter = require("./actions/actions-router")
const projectsRouter = require("./projects/projects-router")




server.use(cors())
server.use(express.json())
server.use(express.static(path.join(__dirname,"client/build")))
server.use("/api/actions", actionsRouter)
server.use("/api/projects", projectsRouter)

server.use("/api/*", (_,res)=> {
    res.json({data: "This is the API data"})
})



console.log(__dirname)
console.log(__filename)

module.exports = server;
