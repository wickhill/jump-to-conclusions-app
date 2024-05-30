import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Footer from './components/Footer';

function App() {
  const [user, setUser] = useState(null);
  const [randomizerFunction, setRandomizerFunction] = useState(null);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home setRandomizerFunction={setRandomizerFunction} />} />
      </Routes>
      <Footer onRandomize={randomizerFunction} />
    </>
  );
}

export default App;
