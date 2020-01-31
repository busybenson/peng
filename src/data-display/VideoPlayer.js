import React from "react";
import ReactPlayer from "react-player";

const VideoPlayer = React.forwardRef((props, ref) => {
  const { width = "100%", ...rest } = props;
  return <ReactPlayer ref={ref} width={width} {...rest} />;
});

export default VideoPlayer;
