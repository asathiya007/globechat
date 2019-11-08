const express = require("express");
const connectDB = require("./config/db");

const app = express();
app.use(express.json()); 

connectDB(); 

// @route   GET /
// @desc    globechat endpoint
// @access  public 
app.get("/", (req, res) => res.json({msg: "GlobeChat ready!"}));

// @route   GET /test
// @desc    test api running
// @access  public  
app.get("/test", (req, res) => res.json({msg: "api running"})); 

// other routes 
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/messages", require("./routes/api/messages"));

const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => console.log(`server running on port ${PORT}`));