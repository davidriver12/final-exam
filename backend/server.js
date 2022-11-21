const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const bodyParser = require("body-parser");
const userRouter = require('./routes/userRouter');

const app = express();
const User = require("./models/user");

mongoose.connect("mongodb+srv://m001-student:Biocool1@cluster0.mqw6ajo.mongodb.net/facebook?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
},
() => {
    console.log("Mongoose is connected")
});

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))

app.use(session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true
}));

app.use(cookieParser("secretcode"))
app.use(passport.initialize());
app.use(passport.session());
require('./passportConfig')(passport);

app.use("/users", userRouter);

//Routes
app.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) throw err;
        if (!user) res.send("No user exists");
        else {
            req.logIn(user, err => {
                if (err) throw err;
                res.send('Succesfully Authenticated');
                console.log(req.user);
            })
        }
    })(req, res, next);
})
app.post("/register", (req, res) => {
    User.findOne({ username: req.body.username}, async(err, doc) => {
        if (err) throw err;
        if (doc) res.send("User Already Exists");
        if(!doc) {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const newUser = new User ({
                username: req.body.username,
                password: hashedPassword,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                full_name: req.body.full_name,
                friend_requests: req.body.friend_requests,
                friend_list: req.body.friend_list,
                profile_picture: req.body.profile_picture,
                profile_info: req.body.profile_info,
            });
            await newUser.save();
            res.send("User created");
        }
    })
})
app.get("/user", (req, res) => {
    res.send(req.user);
})

app.listen(4000, () => {
    console.log('Server has started!');
})