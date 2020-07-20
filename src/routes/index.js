const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', {
        title: 'Login'
    });
});

router.get('/about', (req, res) => {
    res.render('about', {
        title: 'Sobre'
    });
});

module.exports = router;