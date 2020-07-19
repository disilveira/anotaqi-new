const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('error_msg', 'Faça login para ver a página');
    res.redirect('/users/signin');
};

module.exports = helpers;