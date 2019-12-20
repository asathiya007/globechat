import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import {getPost} from "../../../actions/post";
import Spinner from "../../layout/Spinner/Spinner";
import {Link} from "react-router-dom";
import PostItem from "../../posts/PostItem/PostItem";
import CommentForm from "../CommentForm/CommentForm";
import CommentItem from "../CommentItem/CommentItem";

const Post = ({getPost, match, post: {post, loading}}) => {
    useEffect(() => {
        getPost(match.params.id); 
    }, [getPost, match.params.id]); 

    return loading || post === null ? <Spinner /> : <div className="mt3 w-70">
        <Link to="/posts" className="btn">
            Back to Posts
        </Link>
        <PostItem post={post} showActions={false}></PostItem>
        <CommentForm postId={post._id}/>
        <div className="comments">
            {
                post.comments.map(comment => (
                    <CommentItem key={comment._id} comment={comment} postId={post._id}/>
                ))
            }
        </div>
    </div>
}

Post.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    post: state.post
}); 

export default connect(mapStateToProps, {getPost})(Post);
