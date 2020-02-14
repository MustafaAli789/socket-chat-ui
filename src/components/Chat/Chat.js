import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import './Chat.css'

import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';

let socket;

const Chat = ({ location, profile })=> { //location is a prop coming from react router

    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState({});
    const [messages, setMessages] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [connectedUsers, setConnectedUsers] = useState([]);

    const ENDPOINT = 'https://socket-chat-api.herokuapp.com/';

    useEffect(()=>{ //simulates component did mount/component did update -- the react hook method of lifecyle methods
        const { name, room } = queryString.parse(location.search);

        console.log(profile)

        //theres a server running on port 5000 listening for socket connections
        //the line below is creating a socket and connecting to the port on which the server is running
        //essentially telling socket what to connect to
        socket = io(ENDPOINT);

        setName(name);
        setRoom(room);

       socket.emit('join', { name, room, profile }, (error)=>{
           if(error){
               alert(error)
           }
       }); //emits an event called join that backend will recognize and take action upon
    }, [ENDPOINT, location.search]); //only if the two values in array change is the useEffect called again and the component rerendered

    useEffect(()=>{
        socket.on('message', (message)=>{
            setMessages([...messages, message])
        })

        socket.on('roomData', (roomData)=>{
            setConnectedUsers(roomData.users)

            let users = allUsers;

            //adding new users to the state
            roomData.users.forEach(user=>{
                if (users.find(e => e.name === user.name) === undefined) {
                    users.push(user)
                }
            })

            setAllUsers(users)
        })

        return () => {
            socket.emit('disconnect');
            socket.off();
          }
        
    }, [messages])

    const sendMessage = (event) => {
        event.preventDefault(); //prevent page from reloading agian

        let messagePayload = message.payload
        let messageType = message.type
        setMessage({type: "Message", payload: ""})

        if (messageType === "Message") {
            if (messagePayload.length>0)
                socket.emit('sendMessage', {type: "Message", payload: messagePayload}, ()=>{})
        } else if (message.type==="Image"){
            if (messagePayload.length>0)
                socket.emit('sendMessage', {type: "Image", payload: messagePayload}, ()=>{setMessage({type: "Message", payload: ""})})
        }
        
    }

    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room} users={connectedUsers}/>
                <Messages messages={messages} name={name} users={allUsers} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
        </div>
    )
}

export default Chat