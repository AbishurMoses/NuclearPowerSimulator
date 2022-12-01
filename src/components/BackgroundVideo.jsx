const Video = () => {
  return (
    <div>
      <video autoPlay muted className="myVideo" width="100%" height="100%">
        <source src="/src/components/Tunnel.mp4" type="video/mp4" />
        Sorry, your browser doesn't support videos.
      </video>
      {/* <p style={{zIndex: "2", position: "absolute", fontSize: "50px", justifyContent: "center", alignItems: "center", width: "100%", height: "100%", }}>
        NUCLEAR REACTOR
      </p> */}
    </div>
  );
};

export default Video;