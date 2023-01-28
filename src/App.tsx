import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import MailPage from './pages/MailPage';
import NotFound from './pages/NotFound';
import StartPage from './pages/StartPage';
import { getUserById } from './utils/api';
import { User } from './utils/interfaces';

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const currentUserId = localStorage.getItem('currentUserId');
    if (currentUserId) {
      (async () => {
        const user = await getUserById(JSON.parse(currentUserId));
        setCurrentUser(user);
        setLoggedIn(true);
      })();
    } else {
      setLoggedIn(false);
    }
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <StartPage
            isLoggedIn={isLoggedIn}
            setLoggedIn={setLoggedIn}
            setCurrentUser={setCurrentUser}
          />
        }
      />
      <Route
        path="/mail"
        element={<MailPage isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
