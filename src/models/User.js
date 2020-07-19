const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

UserSchema.methods.encryptSenha = async (senha) => {
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hash(senha, salt);
    return hash;
};

UserSchema.methods.matchSenha = async function (senha) {
    return await bcrypt.compare(senha, this.senha);
};

module.exports = mongoose.model('User', UserSchema);