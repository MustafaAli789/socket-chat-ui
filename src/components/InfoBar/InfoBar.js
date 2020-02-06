import React, { useState } from 'react';
import { Dropbox } from '@icons-pack/react-simple-icons';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import './InfoBar.css';

import closeIcon from '../../icons/closeIcon.png';
import onlineIcon from '../../icons/onlineIcon.png';

const InfoBar = ({ room, users }) =>{

    const [drawerOpen, setDrawerOpen] = useState(false);

    const usersList = users => {
        return (
            <div>
                <List>
                    {users.map((user, index)=><ListItem key={index}>
                        <ListItemText primary={user.name} />
                    </ListItem>)}
                </List>
            </div>
        )
    }

    return (
        <div className="infoBar">
            <Drawer anchor="top" open={drawerOpen} onClose={()=>setDrawerOpen(false)}>
                {usersList(users)}
            </Drawer>
            <div className="leftInnerContainer">
                <img className="onlineIcon" src={onlineIcon} alt="online" />
                    <h3>{room}</h3>
            </div>
            <div className="rightInnerContainer">
                <Dropbox id="icon" onClick={()=>setDrawerOpen(true)} />
                <a href="/"><img src={closeIcon} alt="close" /></a>
            </div>
        </div>
    )
}

export default InfoBar;