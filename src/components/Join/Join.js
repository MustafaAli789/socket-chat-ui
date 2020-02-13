import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


import './Join.css';

const Join = (props)=> {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    const handleImageChange = (e) => {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend= ()=> {
            props.setProfile(reader.result)
        }
        reader.readAsDataURL(file) //converts file to base64 encoded string 
        //and upon completion triggeres the onloadend
    }

    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading">Join</h1>
                <div className="profilePickerContainer">
                    <div className="editImageContainer">
                        <img id="profileImage" src={props.profile}/>
                        <label className="editImageLabel">
                            <input type="file" 
                            accept="image/png, image/jpeg, image/jpg"
                            onChange={(e)=>handleImageChange(e)}/>
                            <FontAwesomeIcon id="editIcon" icon={faEdit} />
                        </label>
                    </div>  
                </div>
                <div><input placeholder="Name" className="joinInput" type="text" onChange={(event)=>setName(event.target.value)} /></div>
                <div><input placeholder="Room" className="joinInput mt-20" type="text" onChange={(event)=>setRoom(event.target.value)} /></div>
                <Link onClick={event=>(!name || !room) ? event.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
                    <button id="signInButton" className="button mt-20" type="submit">Sign In</button>
                </Link>
            </div>
        </div>
    )
}

export default Join