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

// https://graph.facebook.com/oauth/access_token?client_id=145337692637557&client_secret=e80a4bb3e3fcc5711559003fe8b83aa3&grant_type=fb_exchange_token&fb_exchange_token=EAACELxGKyXUBACHrnghQeduX1VjJZC1Mk1IvkZAtpUd18ZBSJUDqCMAKXPxkuQjR8AdZCVBpVX4W5mXfztBN45XOPPa1uN7kss94X7gu7ErwKfhjA5DPRBbv2TO54Pk4vyMg2H8ceQ9zPNhhymUJWALKJTEgdeIZD
