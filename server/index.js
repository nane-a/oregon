const express = require('express')
const cors = require('cors')
const app = express()
const permitRouter = require('./routes/PermitRouter')
const paymentRouter = require('./routes/PaymentRouter')
const adminRouter = require('./routes/AdminRouter')
const passport = require('passport')
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const LocalStrategy = require("passport-local").Strategy
const { Admin, Chat } = require('./models')
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

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// -------------------------socket--------------------



const http = require("http");
const { Op } = require('sequelize')

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    socket.on("join_room", async (data) => {
        socket.join(data);
        await Chat.update({ new_messages: false }, {
            where: {
                new_messages: true,
                [Op.or]: [
                    { from: data },
                ]
            }
        })
    });

    socket.on("send_message", async (data) => {
        await Chat.create({
            from: data.from,
            to: data.to,
            text: data.text,
            time: data.time,
            new_messages: true
        })
        socket.to(data.room).emit("receive_message", data);
    });
});

// ---------------socket--------------------

app.use("/permit", permitRouter)
app.use("/payment", paymentRouter)
app.use("/admin", adminRouter)
app.use("/chat", chatRouter)

server.listen(5000);
// app.listen(5000)