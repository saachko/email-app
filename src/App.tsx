import React from 'react';
import { Route, Routes } from 'react-router-dom';

import MailPage from './pages/MailPage';
import NotFound from './pages/NotFound';
import StartPage from './pages/StartPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<StartPage />} />
      <Route path="/mail" element={<MailPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
