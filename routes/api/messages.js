const express = require("express");
const tokenauth = require("../../middleware/tokenauth");
const {check, validationResult} = require("express-validator");
const Message = require("../../models/Message");
const User = require("../../models/User");

const router = express.Router(); 

// @route   GET api/messages/test
// @desc    test messages api endpoint
// @access  public
router.get("/test", (req, res) => res.json({msg: "testing messages route"}));

// @route   GET api/messages/
// @desc    get all messages from all users
// @access  private
router.get("/", tokenauth, async (req, res) => {
    // get all messages, if possible  
    try {
        const messages = await Message.find().sort("date");
        res.json({messages});
    } catch (err) {
        console.error(err.message); 
        res.status(500).json("server error");
    }
}); 

// @route   POST api/messages/
// @desc    send a message
// @access  private
router.post("/",
    [
        tokenauth,
        [
            check("text", "please provide message text").not().isEmpty()
        ],
    ], 
    async (req, res) => {
        // validate input
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        // send message, if possible 
        try {
            // get user info, if user exists 
            const user = await User.findById(req.user.id);
            if (!user) {
                return res.status(400).json({msg: "user not found"});
            }
            const {name, avatar} = user; 

            // create and send message 
            const message = new Message({
                user: req.user.id,
                name, 
                avatar, 
                text: req.body.text,
            });
            await message.save();
            res.json(message);
        } catch (err) {
            console.error(err.message);
            res.status(500).json({msg: "server error"});
        }
    }
); 

// @route   DELETE api/messages/:id
// @desc    delete a message 
// @access  private
router.delete("/:id", tokenauth, async (req, res) => {
    // find and delete the message, if possible 
    try {
        // get message, if exists 
        const message = await Message.findById(req.params.id);
        if (!message) {
            return res.status(400).json({msg: "message not found"});
        }

        // check user 
        if (req.user.id !== message.user.toString()) {
            return res.status(400).json({msg: "user not authorized"});
        }

        // remove message 
        await message.remove(); 
        res.json({msg: "message deleted"});
    } catch (err) {
        console.error(err.message);
        res.status(500).json({msg: "server error"});
    }
});

// @route   PUT api/messages/:id
// @desc    edit a message 
// @access  private
router.put("/:id",
    [
        tokenauth, 
        [
            check("text", "please provide message text").not().isEmpty()
        ]
    ],
    async (req, res) => {
        // validate input 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        // edit message, if possible 
        try {
            // edit and save message 
            const message = await Message.findById(req.params.id); 
            if (!message) {
                return res.status(400).json({msg: "message not found"});
            }
            message.text = req.body.text; 
            message.edited = true; 
            await message.save(); 
            res.json(message);
        } catch (err) {
            console.error(err.message);
            res.status(500).json({msg: "server error"});
        }
    }
);

// @route   DELETE api/messages/
// @desc    delete all messages - FOR DEV PURPOSES ONLY 
// @access  public
// router.delete("/", async (req, res) => {
//     // delete all messages 
//     try {
//         const messages = await Message.find();
//         for (const message of messages) {
//             await message.remove(); 
//         } 
//         res.json({msg: "all messages deleted"});
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).json("server error");
//     }
// }); 

module.exports = router; 