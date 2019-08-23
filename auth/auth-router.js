const router = require("express").Router();
const bcrypt = require("bcryptjs");
const db = require("../database/dbConfig");

// Base URL -> api/auth

function hashPW(req, res, next) {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 5);
  user.password = hash;
  next();
}

router.get("/", (req, res) => {
  db("users")
    .then(allUsers => {
      res.status(200).json(allUsers);
    })
    .catch(error => {
      res.status(500).json({ Error: "could not retrieve users" });
    });
});

router.post("/register", hashPW, (req, res) => {
  // implement registration
  let newUser = req.body;
  db("users")
    .insert(newUser)
    .then(newU => {
      res.status(200).json(newU);
    })
    .catch(error => {
      res.status(500).json({ Error: "Failed to register" });
    });
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  };
  const secret = process.env.secret
  const options = {
    expiresIn: "1d"
  }
  return jwt.sign(payload, secret, options)
}

router.post("/login", (req, res) => {
  // implement login
  let {username, password} = req.body
  db("users")
    .where( username )
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ Welcome: "Here's your token", token });
      } else {
        res.status(401).json({ Error: "Password fail" });
      }
    })
    .catch(error => {
      res.status(500).json({ Error: "User not found" });
    });
});

module.exports = router;
