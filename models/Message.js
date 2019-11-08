const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }, 
    name: {
        type: String, 
        required: true
    }, 
    avatar: {
        type: String
    },
    date: {
        type: Date, 
        default: Date.now
    }, 
    text: {
        type: String, 
        required: true 
    }, 
    edited: {
        type: Boolean, 
        default: false
    }
}); 

module.exports = Message = mongoose.model("message", MessageSchema); 