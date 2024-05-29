import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
// import Signin from './components/Signin';
// import Signup from './components/Signup';
// import UpdateUserProfile from './components/UpdateUserProfile';
// import AchievementsPage from './pages/AchievementsPage';
// import Navbar from './components/Navbar';
// import Footer from './components/Footer';

function App() {
  const [user, setUser] = useState(null);

  return (
    <>
      {/* <Navbar user={user} onLogout={() => setUser(null)} /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/signin" element={<Signin onSignin={setUser} />} />
        <Route path="/signup" element={<Signup onSignup={setUser} />} />
        {user && (
          <>
            <Route path="/profile" element={<UpdateUserProfile user={user} setUser={setUser} />} />
            <Route path="/achievements" element={<AchievementsPage user={user} />} />
          </>
        )} */}
      </Routes>
      {/* <Footer /> */}
    </>
  );
}

export default App;
