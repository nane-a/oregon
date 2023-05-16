const express = require('express')
const AdminController = require('../controllers/AdminController')
const Auth = require('../middlewares/Auth')
const passport = require('passport')
const adminRouter = express.Router()

// for admin creating
// adminRouter.post('/admin-register', AdminController.register)

adminRouter.get(
    "/loggedUser",
    passport.authenticate("jwt", { session: false }),
    AdminController.loggedUser
);

adminRouter.post(
    "/login",
    passport.authenticate("local", {
        session: false,
    }),
    AdminController.login
);

adminRouter.post("/drivers", Auth(), AdminController.getDrivers)
adminRouter.post("/taxes", Auth(), AdminController.getTaxes)
adminRouter.post("/delete-driver", Auth(), AdminController.deleteDriver)
adminRouter.post("/about-driver", Auth(), AdminController.aboutDriver)
adminRouter.get("/logout", Auth(), AdminController.logoutUser)

module.exports = adminRouter
