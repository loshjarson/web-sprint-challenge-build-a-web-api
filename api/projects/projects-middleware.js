const Project = require("./projects-model")


const checkID = (req,res,next) => {
    const { id } = req.params;
    Project.get(id)
        .then(project => {
            if (!project) {
                res.status(404).json({message: "that project does not exist"})
            } else {
                next()
            }
        })   
}

const checkBody = (req,res,next) => {
    const newProject = req.body;
    if (!newProject.name || !newProject.description ) {
        res.status(400).json({message: "new projects require name and description"})
    } else {
        next()
    }
    
}


module.exports = {
    checkID,
    checkBody,
}
