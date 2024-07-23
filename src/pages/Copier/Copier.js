import React, { useState, useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import "./Copier.scss"

const Copier = () => {
    const [data, setData] = useState('');
    const [receivedData, setReceivedData] = useState('');
    // const [file, setFile] = useState(null);
    const [receivedFile, setReceivedFile] = useState('');

    const dataServer = "wss://copier-ws-production.up.railway.app";
    const fileServer = "wss://lean-secret-spruce.glitch.me";

    // const { sendMessage: sendTextMessage, lastMessage, readyState: dataReadyState } = useWebSocket(dataServer, {
    const { sendMessage: sendTextMessage, lastMessage } = useWebSocket(dataServer, {
        shouldReconnect: () => true,
    });

    const { sendMessage: sendFileMessage, lastMessage: lastFileMessage, readyState: fileReadyState } = useWebSocket(fileServer, {
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

    useEffect(() => {
        if (lastFileMessage !== null) {
            if (lastFileMessage.data instanceof Blob) {
                const reader = new FileReader();
                reader.onload = () => {
                    setReceivedFile(reader.result);
                };
                reader.readAsDataURL(lastFileMessage.data);
            } else {
                setReceivedFile(lastFileMessage.data);
            }
        }
    }, [lastFileMessage]);

    const handleChange = (e) => {
        const value = e.target.value;
        setData(value);
        sendTextMessage(value);
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        // setFile(selectedFile);
        const reader = new FileReader();
        reader.onload = (event) => {
            sendFileMessage(event.target.result);
        };
        reader.readAsArrayBuffer(selectedFile);
    };

    // const dataConnectionStatus = {
    //     [ReadyState.CONNECTING]: 'Connecting',
    //     [ReadyState.OPEN]: 'Open',
    //     [ReadyState.CLOSING]: 'Closing',
    //     [ReadyState.CLOSED]: 'Closed',
    //     [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    // }[dataReadyState];

    const fileConnectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[fileReadyState];

    return (
        <div className='container'>
            <div className='text-sync'>
                <textarea
                    value={data}
                    onChange={handleChange}
                    placeholder="Type or paste your data here"
                    rows="10"
                    cols="70"
                    className='send custom-scrollbar'
                />
                <textarea
                    value={receivedData}
                    onChange={handleChange}
                    placeholder="Type or paste your data here"
                    rows="10"
                    cols="70"
                    className='receive custom-scrollbar'
                />
            </div>
            <div className='file-sync'>
                <label for="file-upload" class="dragndrop">
                    Custom Upload
                </label>
                <input id="file-upload" type="file" onChange={handleFileChange} />

                {console.log(receivedFile, 'fdfd')}
                <p>Received File: {receivedFile ? <a href={receivedFile} download="received_file">Download</a> : 'No file received'}</p>
                <p>File Connection Status: {fileConnectionStatus}</p>
            </div>


            {/* <p>Data Connection Status: {dataConnectionStatus}</p> */}
            {/* <div {...getRootProps({className: 'dropzone'})}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
            </div> */}

        </div>
    );
};

export default Copier;
