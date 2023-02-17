import React, { useState, useRef } from "react";

export default function NewAudioNote({ onLoaded }) {
  const [isRecording, setIsRecording] = useState(false);
  const [blob, setBlob] = useState(null);
  const mediaRecorderRef = useRef(new MediaRecorder(new MediaStream()));

  const startRecording = () => {
    let chunks = [];
   setBlob(null)
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.start();

      
      mediaRecorderRef.current.addEventListener("dataavailable", (event) => {
        chunks.push(event.data);
      });
      mediaRecorderRef.current.addEventListener("stop", () => {
        const blob = new Blob(chunks, { type: "audio/wav" });
        setBlob(blob);
        onLoaded(blob);
        chunks = [];
      });

      setIsRecording(true);
    });
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setIsRecording(false);
  };

  return (
    <>
      <button onClick={isRecording ? stopRecording : startRecording}>
        {isRecording ? "Stop recording" : "Start recording"}
      </button>
      {blob ? <audio className="audio" controls src={URL.createObjectURL(blob)} /> : null}
    </>
  );
}
