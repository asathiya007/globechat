const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const fileUpload = require('express-fileupload');
const tokenauth = require("./middleware/tokenauth");
const File = require("./models/File");
const path = require("path");

const app = express();
app.use(express.json()); 
app.use(cors());
app.use(fileUpload());

connectDB(); 

// @route   POST /uploads
// @desc    file upload endpoint
// @access  private 
app.post("/uploads", tokenauth, async (req, res) => {
    const {name, data, size, mimetype} = req.files.file;

    const file = new File({
        user: req.user.id, 
        name, 
        data,
        size, 
        mimetype
    }); 
    await file.save(); 
    res.json(file.id); 
}); 

// // @route   GET /
// // @desc    globechat endpoint
// // @access  public 
// app.get("/", (req, res) => res.json({msg: "GlobeChat ready!"}));

// // @route   GET /test
// // @desc    test api running
// // @access  public  
// app.get("/test", (req, res) => res.json({msg: "api running"})); 

// other routes 
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/profile", require("./routes/api/profile")); 

// serve static assets in production 
if (process.env.NODE_ENV === "production") {
    // set static folder 
    app.use(express.static("client/build"));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    }); 
}

const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => console.log(`server running on port ${PORT}`));