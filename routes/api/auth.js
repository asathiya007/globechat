const express = require("express");
const {check, validationResult} = require("express-validator");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const router = express.Router(); 

// @route   GET api/auth/test
// @desc    test auth api endpoint
// @access  public 
router.get("/test", (req, res) => res.json({msg: "auth route"}));

// @route   POST api/auth
// @desc    login user 
// @access  public
router.post("/",
    [
        check("email", "please provide a valid email").isEmail(),
        check("password", "please provide a password").not().isEmpty()
    ],
    async (req, res) => {
        // validate and extract input 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        const {email, password} = req.body; 

        // authenticate user and get token 
        try {
            // check if user exists 
            const user = await User.findOne({ email });
            if (!user) {
                return res.json(400).json({ msg: "invalid credentials" });
            }

            // check incorrect password 
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.json(400).json({msg: "invalid credentials"});
            }

            // create JWT 
            const payload = {
                user: {
                    id: user.id
                }
            }
            jwt.sign(
                payload,
                config.get("jwtKey"),
                {expiresIn: 3600},
                (err, token) => {
                    if (err) throw err; 
                    res.json({token});
                }
            ); 
        } catch (err) {
            console.error(err.message);
            res.status(500).json({msg: "server error"});
        }
    }
);

module.exports = router; 
