import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from './pages/Home';
import Auth from './pages/Auth/Auth';
import Profile from './pages/Profile/Profile';
import Chat from './pages/Chat/Chat';

function App() {
  const [user, setUser] = useState(null);

  // Check for user data in localStorage on page load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/home" /> : <Navigate to="/auth" />}
        />
        <Route
          path="/home"
          element={user ? <Home /> : <Navigate to="/auth" />}
        />
        <Route
          path="/auth"
          element={user ? <Navigate to="/home" /> : <Auth />}
        />
        <Route
          path="/profile/:id"
          element={user ? <Profile /> : <Navigate to="/auth" />}
        />
        <Route
          path="/chat"
          element={user ? <Chat /> : <Navigate to="/auth" />}
        />
      </Routes>
    </div>
  );
}

export default App;
