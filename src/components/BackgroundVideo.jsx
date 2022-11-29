const Video = () => {
    return (
      <video loop autoPlay className="myVideo" width="100%">
        <source src="/src/components/Tunnel.mp4" type="video/mp4" />
        Sorry, your browser doesn't support videos.
      </video>
    );
  };
  
  export default Video;