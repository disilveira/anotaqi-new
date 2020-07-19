const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/User');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'senha'
}, async (email, senha, done) => {
    const user = await User.findOne({ email: email });
    if(!user){
        return done(null, false, { message: 'Usuário não encontardo' });
    } else {
        const match = await user.matchSenha(senha);
        if(match){
            return done(null, user);
        } else {
            return done(null, false, { message: 'A senha digitada está incorreta' });
        }
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});