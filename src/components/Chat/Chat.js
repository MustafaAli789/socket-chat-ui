import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import './Chat.css'

import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';

let socket;

const Chat = ({ location })=> { //location is a prop coming from react router

    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState({});
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const ENDPOINT = 'https://socket-chat-api.herokuapp.com/';

    useEffect(()=>{ //simulates component did mount/component did update -- the react hook method of lifecyle methods
        const { name, room } = queryString.parse(location.search);

        //theres a server running on port 5000 listening for socket connections
        //the line below is creating a socket and connecting to the port on which the server is running
        //essentially telling socket what to connect to
        socket = io(ENDPOINT);

        setName(name);
        setRoom(room);

       socket.emit('join', { name, room }, ()=>{
       }); //emits an event called join that backend will recognize and take action upon

       return () => { //simulates component did unmount
           socket.emit('disconnect');
           socket.off(); //turns specific instance of client socket off
       }
    }, [ENDPOINT, location.search]); //only if the two values in array change is the useEffect called again and the component rerendered

    useEffect(()=>{
        socket.on('message', (message)=>{
            setMessages([...messages, message])
        })
    }, [messages])

    useEffect(()=>{
        socket.on('roomData', (roomData)=>{
            setUsers(roomData.users)
        })
    }, [users])

    const sendMessage = (event) => {
        event.preventDefault(); //prevent page from reloading agian

        if (message.type === "Message") {
            if (message.payload.length>0)
                socket.emit('sendMessage', {type: "Message", payload: message.payload}, ()=>{setMessage({type: "Message", payload: ""})})
        } else if (message.type==="Image"){
            if (message.payload.length>0)
                socket.emit('sendMessage', {type: "Image", payload: message.payload}, ()=>{setMessage({type: "Message", payload: ""})})
        }
        
    }

    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room} users={users}/>
                <Messages messages={messages} name={name} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
        </div>
    )
}

export default Chat