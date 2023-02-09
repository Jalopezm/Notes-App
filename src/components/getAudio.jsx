import React, { useState, useEffect } from "react";

export default function NewAudioNote() {
  const [record, setRecord] = useState(null);
  const [stop, setStop] = useState(null);
  const [soundClips, setSoundClips] = useState(null);

  useEffect(() => {
    setRecord(document.querySelector(".record"));
    setStop(document.querySelector(".stop"));
    setSoundClips(document.querySelector(".sound-clips"));
  }, []);

  if (navigator.mediaDevices.getUserMedia) {
    console.log('getUserMedia supported.');
  
    const constraints = { audio: true };
    let chunks = [];
  
    let onSuccess = function(stream) {
      const mediaRecorder = new MediaRecorder(stream);
    
      record.onclick = function() {
        mediaRecorder.start();
        console.log(mediaRecorder.state);
        console.log("recorder started");
        record.style.background = "red";
  
        stop.disabled = false;
        record.disabled = true;
      }
  
      stop.onclick = function() {
        mediaRecorder.stop();
        console.log(mediaRecorder.state);
        console.log("recorder stopped");
        record.style.background = "";
        record.style.color = "";
        // mediaRecorder.requestData();
  
        stop.disabled = true;
        record.disabled = false;
      }
  
      mediaRecorder.onstop = function(e) {
        console.log("data available after MediaRecorder.stop() called.");
  
        const clipName = prompt('Enter a name for your sound clip?','My unnamed clip');
  
        const clipContainer = document.createElement('article');
        const clipLabel = document.createElement('p');
        const audio = document.createElement('audio');
        const deleteButton = document.createElement('button');
  
        clipContainer.classList.add('clip');
        audio.setAttribute('controls', '');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete';
  
        if(clipName === null) {
          clipLabel.textContent = 'My unnamed clip';
        } else {
          clipLabel.textContent = clipName;
        }
  
        clipContainer.appendChild(audio);
        clipContainer.appendChild(clipLabel);
        clipContainer.appendChild(deleteButton);
        soundClips.appendChild(clipContainer);
  
        audio.controls = true;
        const blob = new Blob(chunks, { 'type' : 'audio/ogg; codecs=opus' });
        chunks = [];
        const audioURL = window.URL.createObjectURL(blob);
        audio.src = audioURL;
        console.log("recorder stopped");
  
        deleteButton.onclick = function(e) {
          e.target.closest(".clip").remove();
        }
  
        clipLabel.onclick = function() {
          const existingName = clipLabel.textContent;
          const newClipName = prompt('Enter a new name for your sound clip?');
          if(newClipName === null) {
            clipLabel.textContent = existingName;
          } else {
            clipLabel.textContent = newClipName;
          }
        }
      }
  
      mediaRecorder.ondataavailable = function(e) {
        chunks.push(e.data);
      }
    }
  
    let onError = function(err) {
      console.log('The following error occured: ' + err);
    }
  
    navigator.mediaDevices.getUserMedia(constraints).then(onSuccess, onError);
  
  } else {
     console.log('getUserMedia not supported on your browser!');
  }
  return (
    <>
      <section className="main-controls">
        <div id="buttons">
          <button className="record">Record</button>
          <button className="stop">Stop</button>
        </div>
      </section>
    </>
  );
}