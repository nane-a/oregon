const express = require('express')
const cors = require('cors')
const app = express()
const permitRouter = require('./routes/PermitRouter')
const paymentRouter = require('./routes/PaymentRouter')
const adminRouter = require('./routes/AdminRouter')
const passport = require('passport')
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const LocalStrategy = require("passport-local").Strategy
const { Admin } = require('./models')
const AuthController = require('./controllers/AdminController')
const chatRouter = require('./routes/ChatRouter')
const { Server } = require('socket.io')

require('dotenv').config()
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((admin, done) => {
    done(null, admin.id);
});

passport.deserializeUser(async (id, done) => {
    const admin = await Admin.findOne({ where: { id } });
    done(null, admin);
});

passport.use(
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password",
        },
        AuthController.isRegistered
    )
);

passport.use(
    new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: "jwt_secret",
        },
        AuthController.isLogged
    )
);

const whitelist = ["http://localhost:3000"]
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS"))
        }
    },
    credentials: true,
}

app.use(cors(corsOptions))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// -------------------------socket--------------------

const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('sendMessage', (message) => {
        console.log(`message received: ${message}`);
        io.emit('newMessage', message);
    });
});

// server.listen(3000, () => {
//     console.log('listening on *:3000');
// });

// ---------------socket--------------------

app.use("/permit", permitRouter)
app.use("/payment", paymentRouter)
app.use("/admin", adminRouter)
app.use("/chat", chatRouter)

app.listen(5000)