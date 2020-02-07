import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImages } from '@fortawesome/free-solid-svg-icons';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import './Input.css';

const Input = ({ message, setMessage, sendMessage }) => {

    const [imageSrc, setImageSrc] = useState('data:image/jpeg;base64,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');

    const displayImageContainer = () => {
        if (imageSrc.length>0){
            return "flex"
        } else {
            return "none"
        }
    }

    const displayForm = () => {
        if (imageSrc.length>0) {
            return "none";
        } else {
            return "";
        }
    }

    const getHeight = () => {
        if (imageSrc.length>0){
            return "6rem";
        } else {
            return "3rem";
        }
    }

    const removeImg = () => {
        setImageSrc('');
    }

    return (
        <div className="mainInputContainer" style={{height: getHeight()}}>
            <div className="inputField">
                <form className="form" style={{display: displayForm()}}>
                    <input className="input"
                    type="text"
                    placeholder="Type a message..."
                    value={message}
                    onChange={event=>setMessage(event.target.value)}
                    onKeyPress={event=>event.key === 'Enter' ? sendMessage(event) : null}/>
                </form>
                <div className="imageContainer" style={{display: displayImageContainer()}}>
                    <div className="image">
                        <img src={imageSrc} />
                        <button className="removeImageButton"><FontAwesomeIcon onClick={()=>removeImg()} id="removeImageIcon" icon={faTrashAlt} /></button>
                    </div>
                </div>
            </div>
            <div className="buttonsContainer">
                <button className="imageButton" onClick={()=>{}}><FontAwesomeIcon id="imageIcon" icon={faImages} /></button>
                <button className="sendButton" onClick={event=>sendMessage(event)}><FontAwesomeIcon id="sendIcon" icon={faPaperPlane} /></button>
            </div>
        </div>
    )
}

export default Input;