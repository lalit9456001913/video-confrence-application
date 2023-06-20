import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000',{ transports: ['websocket', 'polling', 'flashsocket'] }); // Replace with your server URL

const ParticipantViewPage = () => {
  const [participantName, setParticipantName] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [isRaisedHand, setIsRaisedHand] = useState(false);

  useEffect(() => {
    // Prompt participant to enter their name before joining
    // if(!participantName.length){
    //     const name = window.prompt('Please enter your name:');
    //     if (name) {
    //       setParticipantName(name);
    //     }
    // }
    

    // Listen for timer and raise hand events from the server
    socket.on('timer', (timer) => {
      setCountdown(timer);
      if (timer === 0) {
        // Play sound when the timer reaches 0
        playSound();
      }
    });

    socket.on('raiseHand', () => {
      setIsRaisedHand(true);
    });
  }, []);

  const playSound = () => {
    const audio = new Audio('/dummy-laugh-voiced.mp3'); // Replace with the path to your sound file
    audio.play();
  };

  // Handle raise hand button click
  const handleRaiseHand = () => {
    setIsRaisedHand(true);
    socket.emit('raiseHand');
  };

  return (
    <div>
        {participantName}
      <h2>Participant View Page {countdown} </h2>
      {countdown > 0 && <h3>Countdown: {countdown} sec</h3>}
      <button onClick={handleRaiseHand} disabled={isRaisedHand}>
        {isRaisedHand ? 'Hand Raised' : 'Raise Hand'}
      </button>
    </div>
  );
};

export default ParticipantViewPage;


