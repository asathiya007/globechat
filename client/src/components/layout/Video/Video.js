import React from 'react';
import vid from "../../../vid/earth.mp4";

const Video = () => {
    return (
        <video src={vid} autoPlay="autoplay" loop style={{
            width: "100vw",
            position: "fixed",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: -1
        }}></video>
    )
}

export default Video
