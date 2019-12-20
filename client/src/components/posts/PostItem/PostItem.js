import React, {Fragment, useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import "./PostItem.css";
import Moment from "react-moment";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {likePost, lovePost, laughPost, deletePost} from "../../../actions/post";
import axios from "axios";

const PostItem = ({
    likePost, 
    lovePost, 
    laughPost, 
    deletePost, 
    auth, 
    post: {_id, text, name, avatar, user, file, likes, loves, laughs, comments, date},
    showActions
 }) => {

    const [fileData, setFileData] = useState({});
    const [isImage, toggleIsImage] = useState(false);

    useEffect(() => {
        const processFile = async() => {
            if (file) {
                const res = await axios.get(`/api/posts/displayfile/${file}`);
                if (res.data.mimetype.toString().includes("image")) {
                    const {data, mimetype} = res.data; 
                    const newData = new Buffer(data).toString("base64");
                    setFileData({data: newData, mimetype}); 
                    toggleIsImage(true);
                }
            }
        }
           
        processFile(); 
    }, [file]);

    return (
        <div className="post background-dark br4 p-1 my-1">
            <div>
                <Link to={`profile/${user._id}`}>
                    <img
                        className="round-img"
                        src={avatar}
                        alt="profile pic"
                    />
                    <h4>{name}</h4>
                </Link>
            </div>
            <div>
                <p className="my-1">
                    {text}
                </p>
                {
                    isImage && (
                        <img src={`data:${fileData.mimetype};base64,${fileData.data}`} alt="user file" style={{
                            width: "85%"
                        }}/>
                    )
                }
                <p className="post-date">
                    <Moment format="YYYY/MM/DD">{date}</Moment>
                </p>
                {
                    showActions && (
                        <Fragment>
                            <button onClick={e => likePost(_id)} type="button" className="btn btn-light">
                                <i className="fas fa-thumbs-up"></i>
                                {
                                    likes.length > 0 && (
                                        <span>{" " + likes.length}</span>
                                    )
                                }
                            </button>
                            <button onClick={e => lovePost(_id)} type="button" className="btn btn-light">
                                <i className="fas fa-heart"></i>
                                {
                                    loves.length > 0 && (
                                        <span>{" " + loves.length}</span>
                                    )
                                }
                            </button>
                            <button onClick={e => laughPost(_id)} type="button" className="btn btn-light">
                                <i className="fas fa-laugh-beam"></i>
                                {
                                    laughs.length > 0 && (
                                        <span>{" " + laughs.length}</span>
                                    )
                                }
                            </button>
                            <Link to={`/posts/${_id}`} className="btn btn-primary">
                                Comments {
                                    comments.length > 0 && (
                                        <span className='comment-count'>{comments.length}</span>
                                    )
                                }
                            </Link>
                            {
                                !auth.loading && user === auth.user._id && (
                                    <button
                                        onClick={e => deletePost(_id)}
                                        type="button"
                                        className="btn btn-danger"
                                    >
                                        <i className="fas fa-times"></i>
                                    </button>
                                )
                            }
                        </Fragment>
                    )
                }
            </div>
        </div>
    )
}

PostItem.defaultProps = {
    showActions: true
}

PostItem.propTypes = {
    auth: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
    likePost: PropTypes.func.isRequired,
    lovePost: PropTypes.func.isRequired,
    laughPost: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {likePost, lovePost, laughPost, deletePost})(PostItem);
