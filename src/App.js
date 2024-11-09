import React, { useEffect, useRef, useState } from "react";
import idle from "./resources/images/idle.png";
import listening from "./resources/images/listening.png";
import squawk from "./resources/images/squawk.png";
import sleepy from "./resources/images/sleepy.png";
import "./App.css";
import RecordButton from "./helper/RecordButton";
import LoadingScreen from "./helper/LoadingScreen";

// const { logToCloud } = require('./helper/logging/cloudLogger');

/**
 * Enum for common colors.
 * @readonly
 * @enum {}
 */
const ImageState = Object.freeze({
  IDLE: { src: idle },
  LISTENING: { src: listening },
  SQUAWK: { src: squawk },
  SLEEPY: { src: sleepy },
});

const AppStatus = Object.freeze({
  LOADING: "LOADING",
  READY: "READY",
  ERROR: "ERROR",
});

function App() {
  const [appStatus, setAppStatus] = useState(AppStatus.LOADING);
  const [imageState, setImageState] = useState(ImageState.IDLE);
  const [chunks, setChunks] = useState([]);
  const [mediaRecorder, setMediaRecorder] = useState(null);

  const handleStartRecording = () => {
    setImageState(ImageState.LISTENING);
    mediaRecorder.start();
    console.log("Recorder started.");
  };

  const handleStopRecording = () => {
    mediaRecorder.stop();
    console.log("Recorder stopped.");
  };

  const playAudio = async () => {
    const audioBlob = new Blob(chunks, { type: "audio/wav" });
    if (audioBlob.size === 0) return;
    const audioURL = URL.createObjectURL(audioBlob);

    const audioContext = new AudioContext();
    const sourceNode = audioContext.createBufferSource();
    sourceNode.playbackRate.value = 1.5;
    sourceNode.connect(audioContext.destination);

    const response = await fetch(audioURL);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

    sourceNode.buffer = audioBuffer;
    setImageState(ImageState.SQUAWK);
    sourceNode.start();

    sourceNode.onended = () => {
      setImageState(ImageState.IDLE);
    };
  };

  const initMediaRecorder = async () => {
    try {
      const constraints = { audio: true };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      const mediaRecorderInstance = new MediaRecorder(stream);

      mediaRecorderInstance.ondataavailable = (e) => {
        setChunks([e.data]);
      };
      
      setMediaRecorder(mediaRecorderInstance);
      setAppStatus(AppStatus.READY);
    } catch (error) {
      console.log("Error occurred: ", error);
      // await logToCloud(error)
      setImageState(ImageState.SLEEPY)
      setAppStatus(AppStatus.ERROR);
    }
  };

  useEffect(() => {
    playAudio()
  }, [chunks]);

  if (appStatus === AppStatus.LOADING) {
    initMediaRecorder();
    return (
      <div className="App">
        <header className="App-header">
          <LoadingScreen />
        </header>
      </div>
    );
  }

  if (appStatus === AppStatus.ERROR) {
    return (
      <div className="App">
        <header className="App-header">
          <img
            src={imageState.src}
            className="App-logo"
            alt="birdie"
          />
        </header>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <img onClick={playAudio} src={imageState.src} className="App-logo" alt="birdie" style={{"pointer-events": "all"}}/>
        <RecordButton
          onStartRecording={handleStartRecording}
          onStopRecording={handleStopRecording}
        />
      </header>
    </div>
  );
}

export default App;
