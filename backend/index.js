require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("./db");
const userdb = require("./model/userSchema");

const PORT = 6010;

const session = require("express-session");
const passport = require("passport");
const OAuth2Strategy = require("passport-google-oauth2").Strategy;
const LocalStrategy = require("passport-local").Strategy;

const clientid = process.env.clientid;
const clientsecret = process.env.clientsecret;

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

// app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//setup session
app.use(
  session({
    secret: process.env.mongoDB_secret,
    resave: false,
    saveUninitialized: true,
  })
);

//setup passport
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new OAuth2Strategy(
    {
      clientID: clientid,
      clientSecret: clientsecret,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("profile ", profile);
      try {
        let user = await userdb.findOne({ googleId: profile.id });

        if (!user) {
          user = new userdb({
            googleId: profile.id,
            username: profile.displayName,
            email: profile.emails[0].value,
            image: profile.photos[0].value,
          });

          // console.log(user)

          await user.save();
        }
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

// passport.use(new LocalStrategy(
//     function (email, password, done) {
//         console.log(email, password)
//         userdb.findOne({ email: email }, function (err, user) {
//             if (err) { return done(err); }
//             if (!user) { return done(null, false, { message: 'Incorrect username' }); }
//             // if (!user.password == password) { return done(null, false, {message: 'Incorrect password'}); }
//             if (!bcrypt.compareSync(password, user.password)) {
//                 return done(null, false, { message: 'Incorrect password' });
//             }

//             return done(null, user);
//         });
//     }
// ));

passport.use(
  new LocalStrategy(
    { usernameField: "email" }, // Specify the field containing the username (email in this case)
    async (email, password, done) => {
      try {
        const user = await userdb.findOne({ email });

        if (!user) {
          return done(null, false, { message: "Incorrect email" });
        }

        if (!user.verifyPassword(password)) {
          return done(null, false, { message: "Incorrect password" });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

// passport.serializeUser((user, done) => {
//     if (user) {
//         return done(null, user)
//     }
//     return done(null, false)
// })

// passport.deserializeUser((user, done) => {
//     return done(null, user)
// })

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await userdb.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// app.post('/user/login',
//     passport.authenticate('local', { failureRedirect: '/login' }),
//     function (req, res) {
//         res.redirect('/dashboard');
//         res.json(req.user)
//     });

function isAuthenticated(req, res, done) {
  if (req.user) {
    return done();
  }
  return res.redirect("/");
}

// app.post('/user/login', (req, res) => {
//     passport.authenticate('local', {
//         failureRedirect: '/login',
//         // failureFlash: true // Add this line to enable flash messages for failure
//     })(req, res, (err) => {
//         if (err) {
//             console.error(err);
//             res.status(500).json({ message: 'Internal Server Error' });
//         } else {
//             // Successful login
//             res.status(200).json({ user: req.user });
//         }
//     });
// });

app.post(
  "/user/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
    failureFlash: true, // Enable flash messages for failure
  })
);

app.post("/user/signup", async (req, res) => {
  try {
    const existingUser = await userdb.findOne({ email: req.body.email });
    console.log(existingUser);
    if (existingUser) {
      // User already exists, handle accordingly (e.g., redirect to dashboard)
      return res.json({ message: "User already exists" });
    }

    const newUser = await userdb.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    // Successfully created a new user, handle accordingly
    // In this case, I'm assuming you want to log in the new user immediately after signup
    req.login(newUser, (err) => {
      if (err) {
        return res.status(500).json({ message: "Internal Server Error" });
      }
      return res.status(200).json({ user: newUser });
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/login", (req, res) => {
  res.send("okkk");
});

//initial google Oauth login
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000/dashboard",
    failureRedirect: "http://localhost:3000/login",
  })
);

//logout
app.get("/logout", async (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      console.log(err);
      return next(err);
    }
    req.user = {};
    res.send("logout");
  });
});

//get user
app.get("/login/success", async (req, res) => {
  if (req.user) {
    console.log(req.user);
    res.status(200).json({ message: "user Login", user: req.user });
  } else {
    res.status(400).json({ message: "Not Authorized" });
  }
});

// const LoginStrategy = require("./LoginStrategy")
// const SignupStrategy = require("./SignupStrategy")

// passport.use("local-login", LoginStrategy)
// passport.use("local-registry", SignupStrategy)

// Signup
app.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the email is already registered
    const existingUser = await userdb.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create a new user
    const newUser = new userdb({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // Serialize the user before responding
    req.login(newUser, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
      }
      return res
        .status(201)
        .json({ message: "Signup successful", user: req.user });
    });

    // res.status(201).json({ message: "Signup successful" });
    // return done(null, user)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// // Login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the email exists
    const existingUser = await userdb.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the password is correct
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token for authentication
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Serialize the user before responding
    req.login(existingUser, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
      }
      // res.status(200).json({ user: req.user, token });

      res.status(200).json({ user: existingUser, token });
      console.log("user: ", req.user);
    });

    // res.status(200).json({ user: existingUser, token });
    // return done(null, user)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// //Login passport authentication
// app.post("/api/login", function (req, res) {
//     passport.authenticate("local-login", function (error, user, info) {
//         if (error) {
//             return res.status(500).json({
//                 message: error || "Something happend",
//                 error: error.message || "Server error",
//             });
//         }

//         req.logIn(user, function (error, data) {
//             if (error) {
//                 return res.status(500).json({
//                     message: error || "Something happend",
//                     error: error.message || "Server error",
//                 });
//             }
//         });

//         user.isAuthenticated = true;
//         return res.json(user);
//     })(req, res);
// });

// //Register passport authentication
// app.post("/api/signup", (req, res) => {
//     passport.authenticate("local-register", function (error, user, info) {
//         if (error) {
//             return res.status(500).json({
//                 message: error || "Something happend",
//                 error: error.message || "Server error",
//             });
//         }
//         req.logIn(user, function (error, data) {
//             if (error) {
//                 return res.status(500).json({
//                     message: error || "Something happend",
//                     error: error.message || "Server error",
//                 });
//             }
//             return res.json(user);
//         });
//     })(req, res);
// });

// // get user details
// app.get("/api/getDetails", (req, res) => {
//     User.findOne(
//         { email: req.session.passport.user.email },
//         function (err, user) {
//             if (err) console.log(err);

//             const { username } = user;

//             res.status(200).send({
//                 username,
//             });
//         }
//     );
// });

app.get("/", async (req, res) => {
  // res.send("Hello...")
  if (req.user) {
    console.log(req.user);
    res.status(200).json({ message: "user Login", user: req.user });
  } else {
    res.status(400).json({ message: "Not Authorized" });
  }
});



/**chat routing */

app.use('/api/chat', require('./routes/chat'))
// app.use('/api/chat',require('./routes/chat'))
app.use('/api/feedback',require('./routes/feedback'))
// app.use('/api/votes', require('./routes/feedback'))

app.use('/api/review', require('./routes/reiew'))

app.listen(PORT, () => {
  console.log(`Backend is running on port ${PORT}..`);
});
