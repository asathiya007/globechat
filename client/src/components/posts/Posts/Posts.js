import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import {getAllPosts} from "../../../actions/post";
import Spinner from "../../layout/Spinner/Spinner";

const Posts = ({getAllPosts, post: {posts, loading}}) => {
    useEffect(() => {
        getAllPosts(); 
    }, [getAllPosts]);

    return (
        <div>
            
        </div>
    )
}

Posts.propTypes = {
    getAllPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    post: state.post
}); 

export default connect(mapStateToProps, {getAllPosts})(Posts);
