import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000', { transports: ['websocket', 'polling', 'flashsocket'] }); // Replace with your server URL

const HostViewPage = () => {
    const [selectedTimer, setSelectedTimer] = useState(null);
    const [shareableLink, setShareableLink] = useState('');
    const [countdown, setCountdown] = useState(0);
    const handleTimerSelection = (timer) => {
        setSelectedTimer(timer);
        setCountdown(timer);
        socket.emit('startTimer', timer, function (confirmation) {
            // send data
            // know we got it once the server calls this callback      
            // note -in this ex we dont need to send back any data 
            // - could just have called fn() at server side
            console.log(confirmation);
            setCountdown(timer)
        }); // Send selected timer value to the server
    };

    useEffect(() => {
        socket.on('timer', (timer) => {
            setCountdown(timer);
        });
    }, [])
    const generateUniqueLink = () => {
        const uniqueLink = `https://your-website.com/conference/${generateRandomId()}`;
        setShareableLink(uniqueLink);
    };

    const handleShareLink = () => {
        if (shareableLink) {
            navigator.clipboard.writeText(shareableLink)
                .then(() => {
                    console.log('Link copied to clipboard');
                })
                .catch((error) => {
                    console.error('Failed to copy link to clipboard', error);
                });
        }
    };

    const generateRandomId = () => {
        // Generate a random alphanumeric ID (e.g., using uuid package)
        // Replace this with your own logic or use a library for generating unique IDs
        // Example: return uuidv4();
        return 'abcd1234';
    };

    return (
        <div>
            <h2>Host View Page</h2>
            <div>
                <h3>Select Timer:</h3>
                <div>
                    <button onClick={() => handleTimerSelection(15)}>15 sec</button>
                    <button onClick={() => handleTimerSelection(30)}>30 sec</button>
                    <button onClick={() => handleTimerSelection(45)}>45 sec</button>
                    <button onClick={() => handleTimerSelection(60)}>60 sec</button>
                    {/* Add more timer options as needed */}
                </div>
            </div>
            {selectedTimer && (
                <div>
                    <h3>Selected Timer: {selectedTimer} sec</h3>
                    <h3>Countdown:{countdown}</h3>
                    <button onClick={generateUniqueLink}>Generate Unique Link</button>
                    {shareableLink && (
                        <div>
                            <p>Shareable Link:</p>
                            <input type="text" value={shareableLink} readOnly />
                            <button onClick={handleShareLink}>Share Link</button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default HostViewPage;
