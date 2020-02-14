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

    const renderProfileImage = () =>{
        return(
            <div className="profileImage">
                <img src={src} />
            </div>
        )
    }

    return (
        trimmedName === user
            ? (
                <div className='container'>
                    <div className="row">
                        <div className="col-11 pl-0 pr-2 d-flex justify-content-end">
                            <p className='sentText mb-0'>{trimmedName}</p>
                        </div>
                        <div className="col-1 pl-0 pr-0">
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-11 d-flex align-items-end pl-0 pr-0 justify-content-end">
                            <div className='messageBox backgroundBlue'>
                                {renderMessage()}
                            </div> 
                        </div>
                        <div className="col-1 d-flex align-items-end pr-0 pl-0 justify-content-center">
                            {renderProfileImage()}
                        </div>
                    </div> 
                </div>
            )
            : user !== 'admin'
                ?  (
                    <div className='container'>
                        <div className="row">
                            <div className="col-1 pl-0 pr-0"></div>
                            <div className="col-11 pl-2 pr-0">
                                <p className='sentText mb-0'>{user}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-1 d-flex align-items-end pr-0 pl-0 justify-content-center">
                                {renderProfileImage()}
                            </div>
                            <div className="col-11 d-flex align-items-end pl-0">
                                <div className='messageBox backgroundLight'>
                                    {renderMessage()}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className='container'>
                        <div className="row">
                            <div className="col-1 pl-0 pr-0"></div>
                            <div className="col-11 pl-2 pr-0">
                                <p className='sentText mb-0'>{user}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-1 d-flex align-items-end pr-0 pl-0 justify-content-center">
                                {renderProfileImage()}
                            </div>
                            <div className="col-11 d-flex align-items-end pl-0">
                                <div className='messageBox backgroundAdmin'>
                                    {renderMessage()}
                                </div>
                            </div>
                        </div>
                    </div>
                )
    )
}

export default Message;