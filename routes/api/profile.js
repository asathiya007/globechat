const express = require("express");
const router = express.Router(); 
const tokenauth = require("../../middleware/tokenauth");
const Profile = require("../../models/Profile");

// @route   GET api/profile/
// @desc    get current user's profile
// @access  private
router.get("/", tokenauth, async (req, res) => {
    try {
        const profile = await Profile.findOne({user: req.user.id})
            .populate("user", ["name", "avatar"]); 

        if (!profile) {
            return res.status(400).json({msg: "there is no profile for that user"}); 
        }

        res.json(profile);
    } catch(err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
}); 

// @route   POST api/profile/
// @desc    create or update current user's profile
// @access  private
router.post("/",
    tokenauth,
    async (req, res) => {
        const {
            location,
            bio,
            phone, 
            email,
            youtube,
            facebook,
            twitter,
            instagram,
            linkedin
        } = req.body; 
        
        // build profile object 
        const profileFields = {}; 
        profileFields.user = req.user.id; 
        if (location || location === "") profileFields.location = location; 
        if (bio || bio === "") profileFields.bio = bio;
        if (phone || phone === "") profileFields.phone = phone;
        if (email) profileFields.email = email;

        // build profile social object 
        profileFields.social = {}; 
        if (youtube || youtube === "") profileFields.social.youtube = youtube; 
        if (facebook || facebook === "") profileFields.social.facebook = facebook; 
        if (twitter || twitter === "") profileFields.social.twitter = twitter; 
        if (instagram || instagram === "") profileFields.social.instagram = instagram; 
        if (linkedin || linkedin === "") profileFields.social.linkedin = linkedin; 

        try {
            let profile = await Profile.findOne({user: req.user.id}); 
            if (profile) {
                // update 
                profile = await Profile.findOneAndUpdate(
                    {user: req.user.id},
                    {$set: profileFields},
                    {new: true}
                ); 

                return res.json(profile);
            }

            // create 
            profile = new Profile(profileFields); 
            await profile.save(); 
            res.json(profile);
        } catch (err) {
            console.error(err.message);
            res.status(500).json("server error");
        }
    }
);

// @route   GET api/profile/all
// @desc    get all users' profiles 
// @access  private
router.get("/all", async (req, res) => {
    try {
        const profiles = await Profile.find()
            .populate("user", ["name", "avatar"]); 
        res.json({profiles}); 
    } catch (err) {
        console.error(err.message);
        res.status(500).json("server error");
    }
}); 

// @route   GET api/user/:id
// @desc    get user's profile by id 
// @access  public 
router.get("/user/:id", async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.id }).populate("user", ["name", "avatar"]);

        if (!profile) {
            return res.status(400).json({ msg: "profile not found" });
        }

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        if (err.kind === "ObjectId") {
            return res.status(400).json({msg: "profile not found"});
        }
        res.status(500).json("server error");
    }
}); 

module.exports = router; 