const express = require("express");
const tokenauth = require("../../middleware/tokenauth");
const {check, validationResult} = require("express-validator");
const Post = require("../../models/Post");
const User = require("../../models/User");
const router = express.Router(); 

// @route   GET api/posts/test
// @desc    test posts api endpoint
// @access  public
router.get("/test", (req, res) => res.json({msg: "testing posts route"}));

// @route   GET api/posts/
// @desc    get all posts from all users
// @access  private
router.get("/", tokenauth, async (req, res) => {
    // get all posts, if possible  
    try {
        const posts = await Post.find().sort("date");
        res.json({posts});
    } catch (err) {
        console.error(err.message); 
        res.status(500).json("server error");
    }
}); 

// @route   POST api/posts/
// @desc    make a post
// @access  private
router.post("/",
    [
        tokenauth,
        [
            check("text", "please provide text").not().isEmpty()
        ],
    ], 
    async (req, res) => {
        // validate input
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        // make post, if possible 
        try {
            // get user info, if user exists 
            const user = await User.findById(req.user.id);
            if (!user) {
                return res.status(400).json({msg: "user not found"});
            }
            const {name, avatar} = user; 

            // create and send post 
            const post = new Post({
                user: req.user.id,
                name, 
                avatar, 
                text: req.body.text
            });
            await post.save();
            res.json(post);
        } catch (err) {
            console.error(err.message);
            res.status(500).json({msg: "server error"});
        }
    }
); 

// @route   DELETE api/posts/:id
// @desc    delete a post
// @access  private
router.delete("/:id", tokenauth, async (req, res) => {
    // find and delete the post, if possible 
    try {
        // get post, if exists 
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(400).json({msg: "post not found"});
        }

        // check user 
        if (req.user.id !== post.user.toString()) {
            return res.status(400).json({msg: "user not authorized"});
        }

        // remove post 
        await post.remove(); 
        res.json({msg: "post deleted"});
    } catch (err) {
        console.error(err.message);
        res.status(500).json({msg: "server error"});
    }
});

// @route   PUT api/posts/:id
// @desc    edit a post 
// @access  private
router.put("/:id",
    [
        tokenauth, 
        [
            check("text", "please provide text").not().isEmpty()
        ]
    ],
    async (req, res) => {
        // validate input 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        // edit post, if possible 
        try {
            // edit and save post 
            const post = await Post.findById(req.params.id); 
            if (!post) {
                return res.status(400).json({msg: "post not found"});
            }
            post.text = req.body.text; 
            post.edited = true; 
            await post.save(); 
            res.json(post);
        } catch (err) {
            console.error(err.message);
            res.status(500).json({msg: "server error"});
        }
    }
);

// @route   DELETE api/posts/
// @desc    delete all posts - FOR DEV PURPOSES ONLY 
// @access  public
// router.delete("/", async (req, res) => {
//     // delete all posts
//     try {
//         const posts = await Post.find();
//         for (const post of posts) {
//             await post.remove(); 
//         } 
//         res.json({msg: "all posts deleted"});
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).json("server error");
//     }
// }); 

// @route   PUT api/posts/like/:id
// @desc    like a post 
// @access  private
router.put("/like/:id", tokenauth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        // obtain new likes 
        const newLikes = post.likes.filter(like => like.user.toString() !== req.user.id);

        // if the post has not been liked, like it, else unlike it 
        if (post.likes.length === newLikes.length) {
            post.likes.unshift({ user: req.user.id });
        } else {
            post.likes = newLikes;
        }

        // unlove and unlaugh at the post
        const newLoves = post.loves.filter(love => love.user.toString() !== req.user.id);
        post.loves = newLoves; 
        const newLaughs = post.laughs.filter(laugh => laugh.user.toString() !== req.user.id);
        post.laughs = newLaughs; 

        await post.save();
        res.json({likes: post.likes, loves: post.loves, laughs: post.laughs});
    } catch (err) {
        console.error(err.message);
        res.status(500).json("server error");
    }
}); 

// @route   PUT api/posts/like/:id
// @desc    love a post 
// @access  private
router.put("/love/:id", tokenauth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        // obtain new loves 
        const newLoves = post.loves.filter(love => love.user.toString() !== req.user.id);

        // if the post has not been loved, like it, else unlove it 
        if (post.loves.length === newLoves.length) {
            post.loves.unshift({ user: req.user.id });
        } else {
            post.loves = newLoves;
        }

        // unlike and unlaugh at the post
        const newLikes = post.likes.filter(like => like.user.toString() !== req.user.id);
        post.likes = newLikes;
        const newLaughs = post.laughs.filter(laugh => laugh.user.toString() !== req.user.id);
        post.laughs = newLaughs; 

        await post.save();
        res.json({ likes: post.likes, loves: post.loves, laughs: post.laughs });
    } catch (err) {
        console.error(err.message);
        res.status(500).json("server error");
    }
});

// @route   PUT api/posts/laugh/:id
// @desc    laugh at a post 
// @access  private
router.put("/laugh/:id", tokenauth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        // obtain new laughs 
        const newLaughs = post.laughs.filter(laugh => laugh.user.toString() !== req.user.id);

        // if the post has not been laughed at, like it, else unlaugh at it 
        if (post.laughs.length === newLaughs.length) {
            post.laughs.unshift({ user: req.user.id });
        } else {
            post.laughs = newLaughs;
        }

        // unlike and unlove at the post
        const newLikes = post.likes.filter(like => like.user.toString() !== req.user.id);
        post.likes = newLikes;
        const newLoves = post.loves.filter(love => love.user.toString() !== req.user.id);
        post.loves = newLoves;

        await post.save();
        res.json({ likes: post.likes, loves: post.loves, laughs: post.laughs });
    } catch (err) {
        console.error(err.message);
        res.status(500).json("server error");
    }
});

module.exports = router; 