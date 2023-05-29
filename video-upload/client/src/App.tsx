import "./App.css";
import { VideoPlayer } from "./components/VideoPlayer";
import { VideoUpload } from "./components/VideoUpload";

function App() {
  return (
    <>
      <VideoUpload />

      <section>
        <h2>Video Player</h2>
        <VideoPlayer />
      </section>
    </>
  );
}

export default App;
