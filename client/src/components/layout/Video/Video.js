import React from 'react';
import vid from "../../../vid/earth.mp4";
import "./Video.css";

const Video = () => {
    return (
        <video src={vid} autoPlay muted loop className="video"></video>
    )
}

export default Video
