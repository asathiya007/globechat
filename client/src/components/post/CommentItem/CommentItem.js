import React, {Fragment, useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import Moment from "react-moment";
import {removeComment, likeComment, loveComment, laughComment} from "../../../actions/post";
import axios from "axios";

const CommentItem = ({
    removeComment, 
    likeComment,
    loveComment,
    laughComment,
    comment: {
        _id, 
        text, 
        name, 
        avatar, 
        user,
        date,
        file,
        likes,
        loves,
        laughs
    }, 
    postId,
    auth,
    post
}) => {
    const [fileData, setFileData] = useState({});
    const [isImage, toggleIsImage] = useState(false);

    useEffect(() => {
        const processFile = async () => {
            if (file) {
                const res = await axios.get(`/api/posts/displayfile/${file}`);
                if (res.data.mimetype.toString().includes("image")) {
                    const { data, mimetype } = res.data;
                    const newData = new Buffer(data).toString("base64");
                    setFileData({ data: newData, mimetype });
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
                        }} />
                    )
                }
                <p className="post-date">
                    <Moment format="YYYY/MM/DD">{date}</Moment>
                </p>
                <Fragment>
                    <button onClick={e => likeComment(postId, _id)} type="button" className="btn btn-light">
                        <i className="fas fa-thumbs-up"></i>
                        {
                            likes.length > 0 && (
                                <span>{" " + likes.length}</span>
                            )
                        }
                    </button>
                    <button onClick={e => loveComment(postId, _id)} type="button" className="btn btn-light">
                        <i className="fas fa-heart"></i>
                        {
                            loves.length > 0 && (
                                <span>{" " + loves.length}</span>
                            )
                        }
                    </button>
                    <button onClick={e => laughComment(postId, _id)} type="button" className="btn btn-light">
                        <i className="fas fa-laugh-beam"></i>
                        {
                            laughs.length > 0 && (
                                <span>{" " + laughs.length}</span>
                            )
                        }
                    </button>
                </Fragment>
                {
                    !auth.loading && user === auth.user._id && (
                        <button
                            onClick={e => removeComment(postId, _id)}
                            type="button"
                            className="btn btn-danger"
                        >
                            <i className="fas fa-times"></i>
                        </button>
                    )
                }
            </div>
        </div>
    )
}

CommentItem.propTypes = {
    removeComment: PropTypes.func.isRequired,
    postId: PropTypes.string.isRequired,
    auth: PropTypes.object.isRequired,
    comment: PropTypes.object.isRequired,
    likeComment: PropTypes.func.isRequired,
    loveComment: PropTypes.func.isRequired,
    laughComment: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    post: state.post
});

export default connect(mapStateToProps, {removeComment, likeComment, loveComment, laughComment})(CommentItem);
