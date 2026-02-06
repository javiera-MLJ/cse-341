const router = require('express').Router();
const passport = require("passport");

router.get('/', (req, res) => { 
    res.send('Hello, this is project 2 w3, thank you very much for your attention.'); });

router.get("/login", passport.authenticate("github"), (req, res) => {
});

router.get("/logout", (req, res, next) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        req.session.destroy(() => {
            res.redirect("/");
        });
    });
});


module.exports = router;