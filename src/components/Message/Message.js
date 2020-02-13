import React from 'react';

import ReactEmoji from 'react-emoji';

import './Message.css';

const Message = ({ message:{user, payload, type}, name, src }) => {
    let isSentByCurrentUser = false

    const trimmedName = name.trim().toLowerCase();

    isSentByCurrentUser = user === trimmedName

    const renderMessage = () => {
        if (type==="Message"){
            if (isSentByCurrentUser){
                return (
                    <p className='messageText colorWhite'>{ReactEmoji.emojify(payload)}</p>
                )
            } else {
                return (
                    <p className='messageText colorDark'>{ReactEmoji.emojify(payload)}</p> 
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

    const renderProfileImage = (style) =>{
        return(
            <div  style={style} className="profileImage">
                <img src={src} />
            </div>
        )
    }

    return (
        trimmedName === user
            ? (
                <div className='messageContainer justifyEnd'>
                    <p className='sentText pr-10'>{trimmedName}</p>
                    <div className='messageBox backgroundBlue'>
                        {renderMessage()}
                    </div>
                    {renderProfileImage({marginLeft: '1rem'})}
                </div>
            )
            : user !== 'admin'
                ?  (
                    <div className='messageContainer justifyStart'>
                        {renderProfileImage({marginRight: '1rem'})}
                        <div className='messageBox backgroundLight'>
                            {renderMessage()}
                        </div>
                        <p className='sentText pl-10'>{user}</p>
                    </div>
                ) : (
                    <div className='messageContainer justifyStart'>
                        {renderProfileImage({marginRight: '1rem'})}
                        <div className='messageBox backgroundAdmin'>
                            {renderMessage()}
                        </div>
                        <p className='sentText pl-10'>{user}</p>
                    </div>
                )
    )
}

export default Message;