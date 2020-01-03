import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import {addComment} from "../../../actions/post";
import "./CommentForm.css";
import axios from "axios";

const CommentForm = ({postId, addComment}) => {
    const [text, setText] = useState("");

    const greetings = [
        "What do you think?",
        "Thoughts?",
        "Leave your remarks!",
        "Leave a comment!"
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

                addComment(postId, { text, fileData });
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
                        resize: "none"
                    }}
                    onChange={e => setText(e.target.value)}
                ></textarea>
                <label htmlFor="fileInput" className="btn btn-light my-1">
                    <i className="fas fa-image"></i> Upload Image
                </label>
                <input type="file" name="fileInput" id="fileInput" className="btn btn-light my-1" />
                <input type="submit" className="btn btn-light my-1" value="Submit" />
            </form>
        </div>
    )
}

CommentForm.propTypes = {
    addComment: PropTypes.func.isRequired
}

export default connect(null, {addComment})(CommentForm);
