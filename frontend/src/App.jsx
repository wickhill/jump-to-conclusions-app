import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Signin from "./components/Signin";
import Signup from './components/Signup';
import UpdateUserProfile from './components/UpdateUserProfile';
import History from './pages/History';
import Achievements from './pages/Achievements';

function App() {
  const [user, setUser] = useState(null);
  const [randomizerFunction, setRandomizerFunction] = useState(null);

  return (
    <div id="root">
      <Navbar user={user} onLogout={() => setUser(null)} />
      <Routes>
        <Route path="/" element={<Home setRandomizerFunction={setRandomizerFunction} />} />
        <Route path="/signin" element={<Signin onSignin={setUser} />} />
        <Route path="/signup" element={<Signup onSignup={setUser} />} />
        {user && (
          <>
            <Route path="/updateProfile" element={<UpdateUserProfile user={user} setUser={setUser} />} />
            <Route path="/:id/history" element={<History />} />
            <Route path="/:id/achievements" element={<Achievements user={user} />} />
          </>
        )}
      </Routes>
      <Footer onRandomize={randomizerFunction} />
    </div>
  );
}

export default App;
