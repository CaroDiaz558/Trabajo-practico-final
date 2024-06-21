
function Authenticated(req, res, next) {
    if (req.session.loggedin) {
        return next();
    } else {
        req.flash('error_msg', 'Por favor inicia sesión para continuar');
        res.redirect('/usuarios/login');
    }
}

module.exports = {Authenticated};