import React, { useState, useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

const Copier = () => {
    const [data, setData] = useState('');
    const [receivedData, setReceivedData] = useState('');

    const { sendMessage, lastMessage, readyState } = useWebSocket('wss://lean-secret-spruce.glitch.me', {
        shouldReconnect: () => true,

    });

    useEffect(() => {
        if (lastMessage !== null) {
            if (lastMessage.data instanceof Blob) {
                const reader = new FileReader();
                reader.onload = () => {
                    setReceivedData(reader.result);
                };
                reader.readAsText(lastMessage.data);
            } else {
                setReceivedData(lastMessage.data);
            }
        }
    }, [lastMessage]);

    const handleChange = (e) => {
        const value = e.target.value;
        setData(value);
        sendMessage(value);
    };

    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState];

    return (
        <div>
            <h1>Copy Data Page</h1>
            <textarea
                value={data}
                onChange={handleChange}
                placeholder="Type or paste your data here"
                rows="10"
                cols="50"
            />
            <p>Received Data: {receivedData}</p>
            <p>Connection Status: {connectionStatus}</p>
        </div>
    );
};

export default Copier;
