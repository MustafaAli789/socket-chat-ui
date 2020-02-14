import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Join from './components/Join/Join';
import Chat from './components/Chat/Chat';
import JoinRoom from './components/JoinRoom/JoinRoom';

const App = ()=>{
    const [profile, setProfile] = useState("https://ssbworld.com/images/character-profiles/rounded/Mario-Profile-Round.png")

    return (
        <Router>
            <Route path="/" exact render={(props)=><Join {...props} profile={profile} setProfile={setProfile} />} />
            <Route path="/chat" render={(props)=><Chat {...props} profile={profile} />} />
            <Route path="/joinRoom" render={(props)=><JoinRoom {...props} profile={profile} setProfile={setProfile} />} />
        </Router>
    )
}

export default App;