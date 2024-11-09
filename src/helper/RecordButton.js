import React, { useState } from 'react';
import './RecordButton.css';

function RecordButton({ 
    onStartRecording, 
    onStopRecording 
  }) {
    const [isRecording, setIsRecording] = useState(false);
  
    const handleRecording = () => {
        if (!isRecording) {
          onStartRecording();
        } else {
          onStopRecording();
        }
        setIsRecording(!isRecording);
      };

    return (
        <div className={isRecording ? 'recording' : ''}>
        <div className="record-button" onClick={handleRecording} />
      </div>
    );
  }

export default RecordButton;

