import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

let socket;

const Chat = ({ location })=> { //location is a prop coming from react router

    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const ENDPOINT = 'localhost:5000';

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

    return (
        <h1>Chat</h1>
    )
}

export default Chat