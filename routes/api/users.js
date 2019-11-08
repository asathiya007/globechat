const express = require("express");
const {check, validationResult} = require("express-validator");
const gravatar = require("gravatar");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const tokenauth = require("../../middleware/tokenauth");

const router = express.Router(); 

// @route   GET api/users/test
// @desc    test users api endpoint
// @access  public 
router.get("/test", (req, res) => res.json({msg: "testing users route"})); 

// @route   POST api/users/
// @desc    register user 
// @access  public 
router.post("/", 
    [
        check("name", "please provide a valid name").not().isEmpty(),
        check("email", "please provide a valid email").isEmail(),
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

// @route   GET api/users/
// @desc    get current user data 
// @access  private 
router.get("/", tokenauth, async (req, res) => {
    try {
        // get user 
        const user = await User.findById(req.user.id).select("-password");

        // check if user exists 
        if (!user) {
            return res.status(400).json({msg: "user not found"});
        }

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({msg: "server error"});
    }
}); 

// @route   GET api/users/all
// @desc    get all user data - FOR DEV PURPOSES ONLY
// @access  public 
// router.get("/all", async (req, res) => {
//     try {
//         const users = await User.find().select("-password");
//         res.json({users});
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).json({msg: "server error"});
//     }
// });

// @route   DELETE api/users/
// @desc    delete current user
// @access  private 
router.delete("/", tokenauth, async(req, res) => {
    try {
        await User.findByIdAndDelete(req.user.id);
        res.json({msg: "removed user"});
    } catch (err) {
        console.error(err.message);
        res.status(500).json({msg: "server error"});
    }
}); 

module.exports = router; 