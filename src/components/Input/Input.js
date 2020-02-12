import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImages } from '@fortawesome/free-solid-svg-icons';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import './Input.css';

const Input = ({ message, setMessage, sendMessage }) => {

    const displayForm = () => {
        if (message.type==="Image") {
            return "none";
        } else {
            return "";
        }
    }

    const getHeight = () => {
        if (message.type==="Image"){
            return "6rem";
        } else {
            return "3rem";
        }
    }

    const removeImg = () => {
        setMessage({type: "Message", payload: ""})
    }

    const handleImageChange = (e) => {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend= ()=> {
            setMessage({type: "Image", payload: reader.result})
        }
        reader.readAsDataURL(file) //converts file to base64 encoded string 
        //and upon completion triggeres the onloadend
    }

    const renderImageContainer = () =>{
        if (message.type==="Image"){
            return(
                <div className="imageContainer" style={{display: 'flex'}}>
                    <div className="image">
                        <img src={message.payload} />
                        <button className="removeImageButton"><FontAwesomeIcon onClick={()=>removeImg()} id="removeImageIcon" icon={faTrashAlt} /></button>
                    </div>
                </div>  
            )
        } else {return null}
    }

    return (
        <div className="mainInputContainer" style={{height: getHeight()}}>
            <div className="inputField">
                <form className="form" style={{display: displayForm()}}>
                    <input className="input"
                    type="text"
                    placeholder="Type a message..."
                    value={message.payload}
                    onChange={({ target: { value } }) => setMessage({type: "Message", payload: value})}
                    onKeyPress={event=>event.key === 'Enter' ? sendMessage(event) : null}/>
                </form>
                {renderImageContainer()}
            </div>
            <div className="buttonsContainer">
                <div className="fileUpload">
                    <label>
                        <input type="file" 
                        accept="image/png, image/jpeg, image/jpg"
                        onChange={(e)=>handleImageChange(e)}/>
                        <FontAwesomeIcon id="imageIcon" icon={faImages} />
                    </label>
                </div>
                <button className="sendButton" onClick={event=>sendMessage(event)}><FontAwesomeIcon id="sendIcon" icon={faPaperPlane} /></button>

            </div>
        </div>
    )
}

export default Input;