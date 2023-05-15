const passport = require("passport");

module.exports = () => {
    return function (req, res, next) {
        if (
            passport.authenticate("jwt", {
                session: false,
            })
        ) {
            return next();
        } else {
            res.send({ error: "Admin isn't login" });
        }
    };
};