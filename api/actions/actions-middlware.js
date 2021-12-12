const Actions = require('./actions-model');
const Projects = require('../projects/projects-model')


const checkID = (req, res, next) => {
    const { id } = req.params;
    Actions.get(id)
        .then(action => {
            if(!action || action === null) {
                res.status(404).json({message: "that action does not exist"})
            } else {
                req.action = action;
                next()
            }
        })
}

const checkProjectID = (req,res,next) => {
    const projectID = req.body.project_id
    Projects.get(projectID)
        .then(project => {
            if(!project) {
                res.status(404).json({message: "project ID does not exist"})
            } else {
                next()
            }

        })
}

const checkBody = (req,res,next) => {
    const newAction = req.body;
    if(!newAction.project_id || !newAction.description || !newAction.notes) {
        res.status(400).json({message: "new actions must include project_id, description and notes"})
    } else {
        next()
    }
}

module.exports = {
    checkID,
    checkProjectID,
    checkBody,
}