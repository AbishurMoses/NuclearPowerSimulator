const Video = () => {
  return (
    <div>
      <video autoPlay muted className="myVideo" width="100vh" height="100vw">
        <source src="/src/components/Tunnel.mp4" type="video/mp4" />
        Sorry, your browser doesn't support videos.
      </video>
    </div>
  );
};

export default Video;