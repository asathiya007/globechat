const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "user"
    }, 
    date: {
        type: Date, 
        default: Date.now
    }, 
    text: {
        type: String, 
        required: true 
    }
}); 

module.exports = Message = mongoose.model("message", MessageSchema); 