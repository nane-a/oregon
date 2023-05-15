const express = require('express')
const AdminRouter = require('../controllers/AdminController')
const Auth = require('../middlewares/Auth')
const passport = require('passport')
const adminRouter = express.Router()

// for admin creating
// adminRouter.post('/admin-register', AdminRouter.register)

adminRouter.get(
    "/loggedUser",
    passport.authenticate("jwt", { session: false }),
    AdminRouter.loggedUser
);

adminRouter.post(
    "/login",
    passport.authenticate("local", {
        session: false,
    }),
    AdminRouter.login
);

adminRouter.post("/drivers", Auth(), AdminRouter.getDrivers)
adminRouter.post("/taxes", Auth(), AdminRouter.getTaxes)
adminRouter.post("/delete-driver", Auth(), AdminRouter.deleteDriver)
adminRouter.post("/about-driver", Auth(), AdminRouter.aboutDriver)
adminRouter.get("/logout", Auth(), AdminRouter.logoutUser)

module.exports = adminRouter
