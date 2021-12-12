const Actions = require('./actions-model');
const express = require("express")
const router = express.Router()
const mw = require('./actions-middlware')

router.get('/', (req, res) => {
    Actions.get()
        .then(actions => {
                res.status(200).json(actions);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: 'Error retrieving the actions',
            })
        })
})

router.get('/:id', mw.checkID, (req,res) => {
    Actions.get(req.params.id)
        .then(action => {
            res.status(200).json(action);           
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: 'Error retrieving the action',
            })
        })
})

router.post('/', mw.checkBody, mw.checkProjectID, (req,res) => {
    Actions.insert(req.body)
        .then(action => {
            res.status(201).json(action)
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: 'Error adding the action'
            })
        })
})

router.put('/:id', mw.checkID, mw.checkBody, (req,res) => {
    Actions.update(req.params.id, req.body)
        .then(action => {
            res.status(201).json(action)
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: 'Error adding the action'
            })
        })
})

router.delete('/:id', mw.checkID, (req,res) => {
    Actions.remove(req.params.id)
        .then(action => {
            res.status(204).json(null)
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: 'Error adding the action'
            })
        })
})

module.exports = router
