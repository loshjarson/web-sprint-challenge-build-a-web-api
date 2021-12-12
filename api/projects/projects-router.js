const Projects = require('./projects-model');
const express = require("express")
const router = express.Router()
const mw = require('./projects-middleware')

router.get("/", (req,res) => {
    Projects.get()
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({message: "There was an error retrieving the projects"})
        })
})

router.get("/:id",mw.checkID, (req,res) => {
    Projects.get(req.params.id)
        .then(project => {
            res.status(200).json(project)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({message: "There was an error retrieving the projects"})
        })
})