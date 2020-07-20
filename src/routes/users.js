const express = require('express');
const router = express.Router();

const User = require('../models/User');
const passport = require('passport');

router.get('/users/signin', (req, res) => {
    res.render('users/signin', {
        title: 'Login'
    });
});

router.post('/users/signin', passport.authenticate('local', {
    successRedirect: '/notes',
    failureRedirect: '/users/signin',
    badRequestMessage: 'É necessário preencher todos os campos de login.',
    failureFlash: true
}));

router.get('/users/signup', (req, res) => {
    res.render('users/signup', {
        title: 'Criar conta'
    });
});

router.post('/users/signup', async (req, res) => {
    const { nome, email, senha, senha2 } = req.body;
    const errors = [];

    if(!nome || !email || !senha || !senha2){
        errors.push({ text: 'É necessário preencher todos os campos de registro' });
    }

    if(senha != senha2){
        errors.push({ text: 'As senhas digitadas não são iguais' });
    }

    if(senha.length < 6){
        errors.push({ text: 'A senha deve ter pelo menos 6 caracteres' });
    }

    if(errors.length > 0){
        res.render('users/signup', {
            errors,
            nome,
            email,
            senha,
            senha2
        })
    } else {
        const emailUser = await User.findOne({email: email});
        if(emailUser){
            req.flash('error_msg', 'Este e-mail já está registrado');
            res.redirect('/users/signup');
        } else {
            const newUser = new User({
                nome,
                email,
                senha
            });
            newUser.senha = await newUser.encryptSenha(senha);
            await newUser.save();
            req.flash('success_msg', 'Cadastro efetuado com sucesso! Faça login para utilizar o sistema.');
            res.redirect('/users/signin');
        }
    }
});

router.get('/users/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'Você foi desconectado com sucesso!');
    res.redirect('/');
});

module.exports = router;