const express = require('express');
const router = express.Router();
const Note = require('../models/Notes');
const Task = require('../models/Task');
const { isAuthenticated } = require('../helpers/auth');

router.get('/notes/register', isAuthenticated, (req, res) => {
    res.render('notes/register', {
        title: 'Criar uma nota'
    });
});

router.post('/notes/register', isAuthenticated, async (req, res) => {
    const { titulo, descricao } = req.body;
    const errors = [];

    if (!titulo) {
        errors.push({ text: 'É necessário preencher um título para a nota' });
    }

    if (!descricao) {
        errors.push({ text: 'É necessário preencher uma descrição para a nota' });
    }

    if (errors.length > 0) {
        res.render('notes/register', {
            errors,
            titulo,
            descricao
        });
    } else {
        const newNote = new Note({
            titulo,
            descricao
        });
        newNote.user = req.user.id;
        await newNote.save();
        req.flash('success_msg', 'Nota cadastrada com sucesso!');
        res.redirect('/notes');
    }

});

router.get('/notes', isAuthenticated, async (req, res) => {
    const notes = await Note.find({ user: req.user.id }).sort({ date: 'desc' }).lean();
    res.render('notes/list', { notes, title: 'Minhas Notas' });
});

router.get('/notes/json', isAuthenticated, async (req, res) => {
    const task = await Task.find();
    res.json(task);
});

router.get('/notes/edit/:id', isAuthenticated, async (req, res) => {
    const note = await Note.findById(req.params.id).lean();
    res.render('notes/edit', {
        note,
        title: 'Editar Nota'
    })
});

router.put('/notes/edit/:id', isAuthenticated, async (req, res) => {
    const { titulo, descricao } = req.body;
    await Note.findByIdAndUpdate(req.params.id, { titulo, descricao });
    req.flash('success_msg', 'Nota atualizada com sucesso!');
    res.redirect('/notes');
});

router.delete('/notes/delete/:id', isAuthenticated, async (req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    await Task.deleteMany({ note: req.params.id });
    req.flash('success_msg', 'Nota excluída com sucesso!');
    res.redirect('/notes');
});

module.exports = router;