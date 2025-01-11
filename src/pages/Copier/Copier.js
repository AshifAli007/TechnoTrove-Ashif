import React, { useState, useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import "./Copier.scss"
import { useDropzone } from 'react-dropzone';
import { FaCloudUploadAlt } from "react-icons/fa";
import { BsFileEarmarkText } from "react-icons/bs";
import { BsFileEarmarkArrowDown } from "react-icons/bs";
import { GiHummingbird } from "react-icons/gi";








const Copier = () => {
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
        onDrop: (files) => {
            console.log(files, 'dropzone files')
            let selectedFile = files[0]
            const reader = new FileReader();
            reader.onload = (event) => {
                sendFileMessage(event.target.result);
            };
            reader.readAsArrayBuffer(selectedFile);
        }
    });
    const files = acceptedFiles.map(file => (
        <div key={file.path}>
            {file.path} - {file.size} bytes
        </div>
    ));
    const [data, setData] = useState('');
    const [receivedData, setReceivedData] = useState('');
    // const [file, setFile] = useState(null);
    const [receivedFile, setReceivedFile] = useState('');

    // const dataServer = "wss://copier-ws-production.up.railway.app";
    const dataServer = "wss://lean-secret-spruce.glitch.me";
    const fileServer = "wss://lean-secret-spruce.glitch.me";

    const { sendMessage: sendTextMessage, lastMessage, readyState: dataReadyState } = useWebSocket(dataServer, {
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

    const dataConnectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[dataReadyState];

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
                    placeholder="Send data using this textbox only"
                    rows="10"
                    cols="60"
                    className='send custom-scrollbar'
                />
                <div>
                    <textarea
                        value={receivedData}
                        onChange={handleChange}
                        placeholder="Use this box to recieve data and copying only"
                        rows="10"
                        cols="60"
                        className='receive custom-scrollbar'
                        style={{ height: '100%' }}
                    />
                </div>
                <GiHummingbird size={35} style={{ position: 'relative', top: '5px', right: '15px', color: dataConnectionStatus !== 'Closed' && dataConnectionStatus !== 'Closing' ? 'rgb(111, 211, 131)' : 'red' }} />



            </div>
            <div className='file-sync'>
                <div className='dropbox'>
                    <div className='zone' onChange={handleFileChange} {...getRootProps({ className: 'dropzone' })}>
                        <input {...getInputProps()} />
                        <p>Drag 'n' drop some files here, or click to select files</p>
                        <FaCloudUploadAlt className='upload-icon' size={80} />
                        <p style={{ paddingTop: '0px' }}>{files}</p>
                    </div>


                </div>
                <div className='reciever'>
                    <GiHummingbird size={35} style={{ position: 'absolute', top: '5px', right: '5px', color: fileConnectionStatus !== 'Closed' && fileConnectionStatus !== 'Closing' ? 'rgb(111, 211, 131)' : 'red' }} />


                    {receivedFile ?
                        <div className='download-zone'>
                            <div>
                                <a href={receivedFile} download="received_file">
                                    <BsFileEarmarkArrowDown
                                        size={100}
                                        style={{
                                            color: 'rgb(111 211 131)',
                                            boxShadow: '0px 0px 30px rgb(186 238 229)',
                                            borderRadius: '10px',
                                            cursor: 'pointer'
                                        }}
                                    />
                                </a>
                            </div>
                            <p>
                                File recieved, click above to download
                            </p>
                        </div> :
                        <div className='download-zone'>
                            <div>
                                <BsFileEarmarkText size={100} style={{ color: 'grey' }} />
                            </div>
                            <p>
                                No file recieved
                            </p>

                        </div>
                    }
                </div>

            </div>


            {/* <p>Data Connection Status: {dataConnectionStatus}</p> */}


        </div>
    );
};

export default Copier;
