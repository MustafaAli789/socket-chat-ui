import React from 'react';

import ReactEmoji from 'react-emoji';

import './Message.css';

const Message = ({ message:{user, payload, type}, name }) => {
    let isSentByCurrentUser = false

    const trimmedName = name.trim().toLowerCase();

    const renderMessage = (i) => {
        if (type==="Message"){
            if (isSentByCurrentUser){
                return (
                    <p className='messageText colorWhite'>{ReactEmoji.emojify(payload)}</p>
                )
            } else {
                return (
                    <p className='messageText colorWhite'>{ReactEmoji.emojify(payload)}</p> 
                )
            }
        } else if (type==="Image") {
            if (isSentByCurrentUser){
                return(
                    <img className='imgMessage colorWhite' src={payload} />
                )
            }else {
                return(
                    <img className='imgMessage colorWhite' src={payload}/>
                )
            }
        }
    }

    return (
        trimmedName === user
            ? (
                <div className='messageContainer justifyEnd'>
                    <p className='sentText pr-10'>{trimmedName}</p>
                    <div className='messageBox backgroundBlue'>
                        {renderMessage()}
                    </div>
                </div>
            )
            : user !== 'admin'
                ?  (
                    <div className='messageContainer justifyStart'>
                        <div className='messageBox backgroundLight'>
                            {renderMessage()}
                        </div>
                        <p className='sentText pl-10'>{user}</p>
                    </div>
                ) : (
                    <div className='messageContainer justifyStart'>
                        <div className='messageBox backgroundAdmin'>
                            {renderMessage()}
                        </div>
                        <p className='sentText pl-10'>{user}</p>
                    </div>
                )
    )
}

export default Message;