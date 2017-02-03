module.exports = function(app, passport) {

    // route for home page


    // route for login form
    // route for processing the login form
    // route for signup form
    // route for processing the signup form


    // =====================================
    // FACEBOOK ROUTES =====================
    // =====================================
    // route for facebook authentication and login
    app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email', 'user_friends'] }));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook'), function(req, res) {
          res.redirect('/');
        });

    // route for logging out
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/login');
    });



};
