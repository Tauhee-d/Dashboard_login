const express =require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Registration routes

// router.post('/register',async(req,res)=> {
//     const {email,password,accountType} = req.body;
//     if(!email || !password || !accountType){
//         return res.status(422).json({ error: "fields requitred" });
//     }
//         try {
//             const emailExists = await User.findOne({email:email});
//             if(emailExists){
//                 return res.status(422).json({ error: "email is already exists" });
//             }
//             const register = new Registration(req.body)
//             const registerData = await register.save()
//             if(registerData){
//                 res.status(201).json({ message: "register successful" });
//             } else {
//                 res.status(500).json({ error: "failed to register " });
//             }
//         } catch (error) {
//             console.log(error.message);
//         }
// })

router.post("/signup", async (req, res) => {
    const { email, password,accountType } = req.body;
    if ( !email || !password || !accountType) {
      res.status(400).send({
        error: "missing required values",
      });
      return;
    }
    const filter = { email: email };
    try {
      const user = await User.findOne(filter);
      if (user) {
        res.status(406).send({
          error: "email already exists",
        });
        return;
      }
  
      bcrypt.hash(password, 15, function (err, hash) {
        if (err) {
          return res.send({
            message: "something wrong, Try later",
            error: err,
          });
        } else {
          const saveUser = new User({
              email: email,
              password: hash,
              accountType: accountType,
          });
          saveUser.save();
          res.status(201).send({
            message: "Registrattion Done",
          });
        }
      });
    } catch (err) {
      res.status(500).send({
        error: err.message,
      });
    }
  });

// Login Routes

// router.post('/login',async (req,res)=> {
//     const {email , password} = req.body;
//     if(!email || !password){
//         return res.status(422).json({ error: "fields requitred" });
//     }

// })


router.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).send({
        message: "missing required values",
      });
      return;
    }
    const filter = { email: email };
    try {
      const user = await User.findOne(filter);
      if (!user) {
        res.status(404).send({
          error: "no user with this email",
        });
        return;
      }
      bcrypt.compare(password, user.password, function (err, result) {
        if (result) {
          const token = jwt.sign({ id: user._id }, "secret", {
            expiresIn: "365 days",
          });
        //   res.json(user)
          
          res.status(200).send({
            token: token,
            message: "Sucessfull loged in",
            user: user.accountType,
          })
        } else {
          res.status(406).send({
            error: "password does not match",
          });
        }
      });
    } catch (error) {
      res.status(500).send({
        error: error.message,
      });
    }
  });
  



module.exports = router;
