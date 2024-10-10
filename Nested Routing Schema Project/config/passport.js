const passport = require("passport")
const localSt = require("passport-local").Strategy
const adminSchema = require("../model/adminShema")

passport.use("local", new localSt(
    { usernameField: "email" },
    async (email, password, done) => {
        const user = await adminSchema.findOne({ email: email })
        if (user) {
            if (user.password == password) {
                done(null, user)
            } else {
                done(null, false)
            }
        } else {
            done(null, false)
        }
    }
))

passport.serializeUser((user, done) => {
    return done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    try {
        const user = await adminSchema.findById(id);
        if (user) {
            // console.log("User found:", user.email);
            return done(null, user);
        } else {
            // console.log("User not found");
            done(null, false);
        }
    } catch (error) {
        // console.log("Error in deserialization:", error);
        done(error, false);
    }
});


passport.checkAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next()
    } else {
        res.redirect("/")
    }
}

passport.setAuthUser = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.locals.user = req.user
    }
    next()
}

module.exports = passport