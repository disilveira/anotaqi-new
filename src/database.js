const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://anotaqi:teste1234@cluster0.geaiu.mongodb.net/anotaqi_db?retryWrites=true&w=majority', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
    .then(db => console.log('Banco de dados conectado'))
    .catch(err => console.error(err));

