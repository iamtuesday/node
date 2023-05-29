export const VideoPlayer = () => {
  const id = "Claves del Ã©xito - Discurso Arnold Schwarzenegger";

  return (
    <video
      src={`http://localhost:4000/videos?id=${id}`}
      width="800"
      height="600"
      controls
      autoPlay
      id="video-player"
    />
  );
};
