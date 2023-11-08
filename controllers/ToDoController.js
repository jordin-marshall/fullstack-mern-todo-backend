const ToDoModel = require('../models/ToDoModel')

module.exports.getToDo = async(req, res) => {
    const toDos = await ToDoModel.find()
    res.send(toDos)
}

module.exports.saveToDo = async(req, res) => {

    const toDos = await ToDoModel.find()

    if(toDos.length >= 5) {
        return res.json({success: false, errors: 'You can only have a max of 6 items'});
    }

    const { text } = req.body

    ToDoModel.create({text})
        .then((data) => {
            console.log("Added Successfully...");
            console.log("data: ", data);
            res.send(data)
        })
}

module.exports.updateToDo = async (req, res) => {
    const {_id, text} = req.body

    ToDoModel.findByIdAndUpdate(_id, {text})
        .then(() => res.send(201).send("Updated Successfully"))
        .catch((err) => console.log("error: ", err))
}

module.exports.deleteToDo = async (req, res) => {
    const {_id, text} = req.body

    ToDoModel.findByIdAndDelete(_id, {text})
        .then(() => res.sendStatus(201).send("Deleted Successfully"))
        .catch((err) => console.log("error: ", err))
}