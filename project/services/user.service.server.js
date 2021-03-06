var app = require("../../express");
var userModel = require("../model/user/user.model.server");
var passport = require('passport');
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);
var googleConfig = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
};
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
passport.use(new GoogleStrategy(googleConfig, googleStrategy));

var bcrypt = require("bcrypt-nodejs");

var auth = authorized;
//html handlers
app.get("/api/project/user", findUser);
//app.post("/api/project/login", passport.authenticate('local'), login);
app.post("/api/project/login", login);
app.post("/api/project/user", registerUser);
app.put("/api/project/user/:userID", auth, updateUser);
app.delete("/api/project/user/:userID", auth, deleteUser);
app.get("/api/project/users/:userID", findUserById);
app.get("/api/project/users", findAllUsers);
app.post("/api/project/logout", logout);
app.delete("/api/project/users/:userID/book/remove/:volumeID", removeBookFromBookShelf);
app.get("/api/project/checkLogin", checkLogin);
app.get("/api/project/checkAdmin", checkAdmin);
app.put("/api/project/users/:userID/booKlub/follow", auth, followBooKlub);
app.delete("/api/project/users/:userID/booKlub/unfollow/:booKlubID", auth, unFollowBooKlub);
app.put("/api/project/users/:userID/follow", auth, followUser);
app.put("/api/project/users/:userID/unfollow", auth, unFollowUser);
app.get('/project/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
app.get('/project/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/project/#!/profile',
        failureRedirect: '/project/#!/login'
    }));

function googleStrategy(token, refreshToken, profile, done) {

    userModel
        .findUserByGoogleId(profile.id)
        .then(
            function (user) {
                if (user) {
                    return done(null, user);
                } else {
                    var email = profile.emails[0].value;
                    var emailParts = email.split("@");
                    var newGoogleUser = {
                        username: emailParts[0],
                        firstName: profile.name.givenName,
                        lastName: profile.name.familyName,
                        email: email,
                        google: {
                            id: profile.id,
                            token: token,
                            imgUrl: profile._json.image.url
                        }
                    };
                    return userModel.createUser(newGoogleUser);
                }
            },
            function (err) {
                if (err) {
                    return done(err);
                }
            }
        )
        .then(
            function (user) {
                return done(null, user);
            },
            function (err) {
                if (err) {
                    return done(err);
                }
            }
        );
}

function authorized(req, res, next) {
    if (!req.isAuthenticated()) {
        res.send(401);
    } else {
        next();
    }
};

function login(req, response) {

    var username = req.body.username;
    var password = req.body.password;

    userModel
        .findUserByUsername(username)
        .then(function (user) {

            if (!user) {
                response.send(null);
                return;
            }

            bcrypt.compare(password, user.password, function(err, res) {
                if (res) {
                    req.login(user, function (nothing) {
                        response.send(user);
                        return;
                    })
                } else {
                    response.send(null);
                    return;
                }
            });

        }, function (err) {
            if (err) {
                response.send(err);
            }
        });
}

function findUserById(req, response) {

    userModel
        .findUserById(req.params.userID)
        .then(function (user) {
            response.json(user);
            return;
        })
}
function findUser(req, response) {

    var body = req.body;

    var username = req.query.username;
    var password = req.query.password;


    if (username && password) {

        userModel.findUserByCredentials(username, password)
            .then(function (user) {
                response.json(user);
                return;
            }, function (err) {
                response.send("0");
                return;
            });

        return;

    } else if (username) {

        userModel.findUserByUsername(username)
            .then(function (user) {
                response.json(user);
                return;
            }, function (err) {
                response.send("0");
                return;
            });

        return;
    }

}

function registerUser(req, response) {

    var user = req.body;

    bcrypt.hash(user.password, null, null, function(err, hash) {

        user.password = hash;

        userModel
            .createUser(user)
            .then(function (user) {
                response.json(user);
                return;
            })
    });

}

function updateUser(req, response) {

    var userID = req.params.userID;
    var user = req.body;

    userModel
        .updateUser(userID, user)
        .then(function (status) {
            response.json(status);
            return;
        }, function (err) {
            response.sendStatus(404).send(err);
            return;
        });
}

function deleteUser(req, response) {

    var userID = req.params.userID;

    userModel
        .deleteUser(userID)
        .then(function (status) {
            response.json(status);
            return;
        }, function (err) {
            response.sendStatus(404).send(err);
            return;
        });
}

function serializeUser(user, done) {
    done(null, user);
}

function deserializeUser(user, done) {
    userModel
        .findUserById(user._id)
        .then(
            function (user) {
                done(null, user);
            },
            function (err) {
                done(err, null);
            }
        );
}

function logout(req, res) {
    req.logOut();
    res.sendStatus(200);
}

function checkLogin(req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
}

function checkAdmin(req, res) {
    res.send((req.isAuthenticated() && req.user.isAdmin) ? req.user : '0');
}

function removeBookFromBookShelf(req, response) {

    var userID = req.params.userID;
    var volumeID = req.params.volumeID;

    userModel
        .removeBookFromBookShelf(userID, volumeID)
        .then(function (user) {
            response.json(user);
            return;
        }, function (err) {
            response.send("0");
            return;
        });
}

function findAllUsers(req, response) {
    userModel
        .findAllUsers()
        .then(function (users) {
            response.json(users);
            return;
        }, function (err) {
            response.sendStatus(404).send(err);
            return;
        });
}

function followBooKlub(req, response) {

    var userID = req.params.userID;
    var booKlub = req.body;

    userModel
        .followBooKlub(userID, booKlub)
        .then(function (user) {
            response.json(user);
            return;
        }, function (err) {
            response.send("0");
            return;
        });
}

function unFollowBooKlub(req, response) {

    var userID = req.params.userID;
    var booKlubID = req.params.booKlubID;

    userModel
        .unFollowBooKlub(userID, booKlubID)
        .then(function (user) {
            response.json(user);
            return;
        }, function (err) {
            response.send("0");
            return;
        });
}

function followUser(req, response) {

    var otherUserID = req.params.userID;
    var curUser = req.body;

    userModel
        .followUser(curUser,otherUserID)
        .then(function (user) {
            response.json(user);
            return;
        }, function (err) {
            response.send("0");
            return;
        });

}

function unFollowUser(req, response) {

    var otherUserID = req.params.userID;
    var curUser = req.body;

    userModel
        .unFollowUser(curUser,otherUserID)
        .then(function (user) {
            response.json(user);
            return;
        }, function (err) {
            response.send("0");
            return;
        });

}



