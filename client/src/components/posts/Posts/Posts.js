import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import {getAllPosts} from "../../../actions/post";
import Spinner from "../../layout/Spinner/Spinner";
import PostItem from "../PostItem/PostItem";
import PostForm from "../PostForm/PostForm";

const Posts = ({getAllPosts, post: {posts, loading}}) => {
    useEffect(() => {
        getAllPosts(); 
    }, [getAllPosts]);

    return loading ? <Spinner/> : <div className="w-70">
        <h1 className="large white-text">Posts</h1>
        <p className="lead">
            <i className="fas fa-user"></i> Join the conversation!
        </p>
        <PostForm />
        <div className="posts">
            { posts.length > 0 ? posts.map(post => (
                <PostItem key={post._id} post={post}/>
            )) : <p>No posts yet, you can make the first post!</p>}
        </div>
    </div>
}

Posts.propTypes = {
    getAllPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    post: state.post
}); 

export default connect(mapStateToProps, {getAllPosts})(Posts);
