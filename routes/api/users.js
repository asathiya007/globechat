const express = require("express");
const {check, validationResult} = require("express-validator");
const gravatar = require("gravatar");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const tokenauth = require("../../middleware/tokenauth");

const router = express.Router(); 

// @route   GET api/users
// @desc    test users api endpoint
// @access  public 
router.get("/", (req, res) => res.json({msg: "users route"})); 

// @route   POST api/users/register
// @desc    register user 
// @access  public 
router.post("/register", 
    [
        check("name", "please provide a name").not().isEmpty(),
        check("email", "please provide an email").isEmail(),
        check("password", "password must be at least 7 characters long").isLength({min: 7})
    ],
    async (req, res) => {
        // validate and extract input 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        let {name, email, password} = req.body; 

        try {
            // check if user exists 
            let user = await User.findOne({email});
            if (user) {
                return res.status(400).json({msg: "user with provided email already exists"});
            }

            // get new user gravatar 
            const avatar = gravatar.url(email, {
                s: "200",
                r: "pg",
                d: "mm"
            });

            // encrypt password 
            const salt = await bcrypt.genSalt(10);
            password = await bcrypt.hash(password, salt); 

            // create and save new user document 
            user = new User({
                name, email, password, avatar
            }); 
            await user.save(); 

            // create JWT 
            const payload = {
                user: {
                    id: user.id
                }
            }; 
            jwt.sign(
                payload, 
                config.get("jwtKey"), 
                {expiresIn: 3600},
                (err, token) => {
                    if (err) throw err; 
                    res.json({ token }); 
                })
        } catch (err) { 
            console.error(err.message);
            res.status(500).json({msg: "server error"}); 
        }
    }
);

// @route   GET api/users/current
// @desc    get current user data 
// @access  private 
router.get("/current", tokenauth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({msg: "server error"});
    }
}); 

module.exports = router; 