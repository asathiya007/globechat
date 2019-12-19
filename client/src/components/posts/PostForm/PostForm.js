import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {addPost} from "../../../actions/post";
import {connect} from "react-redux";
import axios from 'axios';
import "./PostForm.css";

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
            <form className="form my-1" onSubmit={async (e) => {
                e.preventDefault(); 
                const file = document.querySelector("#fileInput").files; 

                if (!file[0] && text === "") {
                    return; 
                }

                let fileData = null; 
                if (file[0]) {
                    fileData = new FormData(); 
                    fileData.append("file", file[0]);
                    const res = await axios.post("/uploads", fileData, {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    });  
                    fileData = res.data; 
                }

                addPost({ text, fileData });
                setText("");
                document.querySelector("#fileInput").value = "";
            }}>
                <textarea
                    name="text"
                    cols="30"
                    rows="3"
                    placeholder={greeting}
                    value={text}
                    style={{
                        background: "#F0F8FF",
                        resize: "none"
                    }}
                    onChange={e => setText(e.target.value)}
                ></textarea>
                <label htmlFor="fileInput" className="btn btn-light my-1">
                    <i className="fas fa-image"></i> Upload Image
                </label>
                <input type="file" name="fileInput" id="fileInput" className="btn btn-light my-1" />
                <input type="submit" className="btn btn-light my-1" value="Submit"/>
            </form>
        </div>
    )
}

PostForm.propTypes = {
    addPost: PropTypes.func.isRequired
}

export default connect(null, {addPost})(PostForm);
