const express = require("express");
const tokenauth = require("../../middleware/tokenauth");
const {check, validationResult} = require("express-validator");
const Message = require("../../models/Message");

const router = express.Router(); 

// @route   GET api/messages/test
// @desc    test messages api endpoint
// @access  public
router.get("/test", (req, res) => res.json({msg: "testing messages route"}));

// @route   GET api/messages/
// @desc    get all messages
// @access  private
router.get("/", tokenauth, async (req, res) => {
    // get all messages, if possible  
    try {
        const messages = await Message.find().sort("-date");
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
            const message = new Message({
                text: req.body.text,
                user: req.user.id,
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
        const message = Message.findById(req.params.id);
        if (!message) {
            return res.status(400).json({msg: "message not found"});
        }

        // check user 
        if (req.user.id !== message.user.toString()) {
            return res.status(400).json({msg: "user not authorized"});
        }

        // remove message 
        await message.remove(); 
        res.json({msg: "message removed"});
    } catch (err) {
        console.error(err.message);
        res.status(500).json({msg: "server error"});
    }
});

module.exports = router; 