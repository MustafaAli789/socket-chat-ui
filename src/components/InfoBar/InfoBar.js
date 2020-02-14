import React, { useState } from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Divider from '@material-ui/core/Divider';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { faShareSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './InfoBar.css';

import closeIcon from '../../icons/closeIcon.png';
import onlineIcon from '../../icons/onlineIcon.png';

const InfoBar = ({ room, users }) =>{

    const [drawerOpen, setDrawerOpen] = useState(false);

    const usersList = users => {
        return (
            <div>
                <List>
                    <ListItem><ListItemText primary={<span style={{ fontWeight: 'bold' }}>Users Online</span>} /></ListItem>
                    <Divider />
                    {users.map((user, index)=><ListItem key={index}>
                        <ListItemIcon style={{minWidth: '30px'}}><FontAwesomeIcon icon={faCircle} style={{ color: '#2cf92c', fontSize: '10px' }} /></ListItemIcon>
                        <ListItemText primary={user.name} />
                    </ListItem>)}
                </List>
            </div>
        )
    }

    const copyRoomLink = () => {
        let url = 'https://socket-chat-client.herokuapp.com'
        let urlWithRoom = url+'/joinRoom?room='+room
        navigator.clipboard.writeText(urlWithRoom)
    }


    return (
        <div className="infoBar">
            <Drawer anchor="top" open={drawerOpen} onClose={()=>setDrawerOpen(false)}>
                {usersList(users)}
            </Drawer>
            <div className="leftInnerContainer">
                <FontAwesomeIcon className="onlineIcon" icon={faCircle} style={{ color: '#2cf92c', fontSize: '10px' }} />
                    <h3>{room}</h3>
            </div>
            <div className="rightInnerContainer">
                <FontAwesomeIcon id="shareIcon" icon={faShareSquare} onClick={()=>copyRoomLink()} />
                <FontAwesomeIcon id="icon" onClick={()=>setDrawerOpen(true)} icon={faUsers} />
                <a href="/"><FontAwesomeIcon icon={faTimes} style={{ color: 'white'}} /></a>
            </div>
        </div>
    )
}

export default InfoBar;