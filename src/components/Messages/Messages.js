import React from 'react';

import ScrollToBottom from 'react-scroll-to-bottom';
import './Messages.css';
import guestUser from './guestUser.png'

import Message from '../Message/Message'

const Messages = ({ messages, name, users }) => {
    return (
        <ScrollToBottom className='messages'>
            {messages.map((message, i)=>{
                let src=''
                if (message.user !== 'admin'){
                    let curUser = users.find(u => u.name === message.user)
                    console.log("USERS LENGTH: " + users.length + " Message.User: " + message.user)
                    users.forEach(u=>console.log(u))
                    src=curUser.profile
                } 
                if (src==='' || src === undefined) {
                    src = guestUser
                }
                return(
                    <div key={i} style={{ marginTop: '1rem' }}><Message message={message} name={name} src={src} /></div>
                )
            })}
        </ScrollToBottom>
    )
}

export default Messages;