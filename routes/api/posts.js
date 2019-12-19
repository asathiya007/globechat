const express = require("express");
const tokenauth = require("../../middleware/tokenauth");
const Post = require("../../models/Post");
const User = require("../../models/User");
const File = require("../../models/File");
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
        const posts = await Post.find().sort("-date");
        res.json(posts);
    } catch (err) {
        console.error(err.message); 
        res.status(500).json("server error");
    }
}); 

// @route   GET api/posts/:id
// @desc    get all posts from all users
// @access  private
router.get("/:id", tokenauth, async (req, res) => {
    // get post with provided id 
    try {
        const post = await Post.findById(req.params.id);
        res.json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).json("server error");
    }
});     

// @route   POST api/posts/
// @desc    make a post
// @access  private
router.post("/",
    tokenauth, 
    async (req, res) => {
        // make post
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
                text: req.body.text,
                file: req.body.fileData
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

        // remove the file 
        const file = await File.findById(post.file);
        if (file) {
            await file.remove();
        } 

        // remove post 
        await post.remove(); 
        res.json({msg: "post deleted"});
    } catch (err) {
        console.error(err.message);
        res.status(500).json({msg: "server error"});
    }
});

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

// @route   GET /api/posts/displayfile/:id
// @desc    get the mimetype and the buffer data for a file 
// @access  private
router.get("/displayfile/:id", tokenauth, async (req, res) => {
    try {
        const file = await File.findById(req.params.id);
        if (!file) {
            return res.status(404).json("no file found");
        }

        const {mimetype, data} = file; 
        res.json({mimetype, data});
    } catch (err) {
        console.error(err.message);
        res.status(500).json("server error");
    }
}); 

// @route   POST /api/posts/comment/:id
// @desc    comment on a post  
// @access  private
router.post("/comment/:id", tokenauth, async(req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        const post = await Post.findById(req.params.id); 

        const comment = {
            user: req.user.id, 
            name: user.name,
            avatar: user.avatar,
            text: req.body.text,
            file: req.body.fileData 
        }
        post.comments.unshift(comment);
        await post.save(); 
        res.json(post.comments); 
    } catch (err) {
        console.error(err.message);
        res.status(500).json("server error");
    }
}); 

// @route   POST /api/posts/comment/:id/:comment_id
// @desc    delete a comment on a post  
// @access  private
router.delete("/comment/:id/:comment_id", tokenauth, async(req, res) => {
    try {
        // find post and comment 
        const post = await Post.findById(req.params.id);
        const comment = post.comments.find(comment => comment._id === req.params.comment_id); 

        // check comment
        if (!comment) {
            return res.status(404).json({msg: "comment does not exist"});
        }

        // check user 
        if (comment.user.toString() !== req.user.id) {
            return res.status(404).json({msg: "user not authorized"});
        }

        // remove file 
        const file = await File.findById(comment.file);
        if (file) {
            await file.remove();
        } 

        // remove comment 
        const comments = post.comments.filter(comment => comment._id !== req.params.comment_id); 
        post.comments = comments; 
        await post.save(); 
        res.json(post.comments);
    } catch (err) {
        console.error(err.message);
        res.status(500).json("server error");
    }
}); 


module.exports = router; 