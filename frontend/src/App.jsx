import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Footer from './components/Footer';
import Navbar from './components/Navbar'

function App() {
  const [user, setUser] = useState(null);
  const [randomizerFunction, setRandomizerFunction] = useState(null);

  return (
    <>
    <Navbar user={user} onLogout={setUser}/>
      <Routes>
        <Route path="/" element={<Home setRandomizerFunction={setRandomizerFunction} />} />
      </Routes>
      <Footer onRandomize={randomizerFunction} />
    </>
  );
}

export default App;
