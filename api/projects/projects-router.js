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

router.post("/", mw.checkBody, (req,res) =>{
    Projects.insert(req.body)
        .then(project => {
            res.status(201).json(project)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({message: "There was an error retrieving the projects"})
        })
})

router.put("/:id", mw.checkID, mw.checkBody, (req,res) => {
    Projects.update(req.params.id,req.body)
        .then(project => {
            res.status(201).json(project)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({message: "There was an error retrieving the projects"})
        })
})

router.delete("/:id",mw.checkID, (req,res) => {
    Projects.remove(req.params.id)
        .then(project => {
            res.status(204).json(null)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({message: "There was an error retrieving the projects"})
        })
})

router.get("/:id/actions",mw.checkID, (req,res) => {
    Projects.getProjectActions(req.params.id)
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({message: "There was an error retrieving the projects"})
        })
})

module.exports = router