import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {addPost} from "../../../actions/post";
import {connect} from "react-redux";

const PostForm = ({addPost}) => {

    const [text, setText] = useState("");

    const greetings = [
        "What's on your mind?",
        "How's your day been?",
        "Best part of your day?",
        "Exciting plans tonight?"
    ]; 
    const greeting = greetings[Math.floor(Math.random() * greetings.length)]; 

    return (
        <div className="post-form background-dark br4 pt2 ph3">
            <form className="form my-1" onSubmit={e => {
                e.preventDefault(); 
                addPost({text}); 
                setText("");
            }}>
                <textarea
                    name="text"
                    cols="30"
                    rows="5"
                    placeholder={greeting}
                    required
                    value={text}
                    style={{
                        background: "#F0F8FF"
                    }}
                    onChange={e => setText(e.target.value)}
                ></textarea>
                <input type="submit" className="btn btn-light my-1" value="Submit" />
            </form>
        </div>
    )
}

PostForm.propTypes = {
    addPost: PropTypes.func.isRequired
}

export default connect(null, {addPost})(PostForm);
