const router = require("express").Router();
const bcrypt = require("bcryptjs");
const db = require("../database/dbConfig");
const jwt = require("jsonwebtoken")

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
  const secret = process.env.secret;
  const options = {
    expiresIn: "1d"
  };
  return jwt.sign(payload, secret, options);
}

// function findBy (user) {
//   return db("users").where({username: user})
// }

// router.post("/find", (req, res)=>{
//   let username = req.body.username
//   let password = req.body.password
//   //let { username, password } = req.body;
//   findUser(username).then(test=>{
//     res.status.json(test)
//   })
//   .catch(error => {
//     res.status(500).json({ Error: "User not found", username, password });
//   });
// })

function findUser(user) {
  return db("users").where({ username: user });
}

router.post("/login", (req, res) => {
  // implement login
  let username = req.body.username;
  let password = req.body.password;
  //let { username, password } = req.body;
  findUser(username)
    .first()
    .then(user => {
      //console.log("Hello from inside .then");
      //console.log(user);
      if (user && bcrypt.compareSync(password, user.password)) {
        //console.log("Hello from inside if");
        const token = generateToken(user);
        res.status(200).json({ Welcome: "Here's your token", token });
      } else {
        console.log("hello from inside else");
        res.status(401).json({ Error: "Password fail" });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ Error: "User not found", username, password, error });
    });
});

module.exports = router;
