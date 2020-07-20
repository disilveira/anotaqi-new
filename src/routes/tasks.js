const express = require('express');
const router = express.Router();
const Note = require('../models/Notes');
const Task = require('../models/Task');
const { isAuthenticated } = require('../helpers/auth');

router.get('/tasks/:id', isAuthenticated, async (req, res) => {
    const note = await Note.findById(req.params.id).lean();
    const tasks = await Task.find({note: req.params.id, user: req.user.id}).sort({date: 'desc'}).lean();
    res.render('tasks/index', {
        note,
        tasks
    });
});

router.put('/task/finish/:id/:note', isAuthenticated, async (req, res) => {
    const task = req.params.id;
    const note = req.params.note;
    await Task.findByIdAndUpdate(task, { status: 1 });
    req.flash('success_msg', 'Tarefa concluída com sucesso!');
    res.redirect('/tasks/' + note);
});

router.delete('/task/delete/:id/:note', isAuthenticated, async (req, res) => {
    const task = req.params.id;
    const note = req.params.note;
    await Task.findByIdAndDelete(task);
    req.flash('success_msg', 'Tarefa excluída com sucesso!');
    res.redirect('/tasks/' + note);
});

router.post('/tasks/register/:id', isAuthenticated, async (req, res) => {
    const { tarefa } = req.body;
    const user = req.user.id;
    const note = req.params.id;
    const errors = [];

    if(!tarefa){
        errors.push({ text: '' });
    }

    if(errors.length > 0){
        req.flash('error_msg', 'É necessário digitar alguma tarefa');
        res.redirect('/tasks/' + note);
    } else {
        const newTask = new Task({
            tarefa,
            user,
            note
        });
        await newTask.save();
        req.flash('success_msg', 'Tarefa criada com sucesso!');
        res.redirect('/tasks/' + note);
    }

});

module.exports = router;