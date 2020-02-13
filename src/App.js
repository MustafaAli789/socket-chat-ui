import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Join from './components/Join/Join';
import Chat from './components/Chat/Chat';

const App = ()=>{
    const [profile, setProfile] = useState("https://ssbworld.com/images/character-profiles/rounded/Mario-Profile-Round.png")

    return (
        <Router>
            <Route path="/" exact render={(props)=><Join {...props} profile={profile} setProfile={setProfile} />} />
            <Route path="/chat" render={(props)=><Chat {...props} profile={profile} />} />
        </Router>
    )
}

export default App;