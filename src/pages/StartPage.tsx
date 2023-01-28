import React from 'react';
import { Navigate } from 'react-router-dom';

import Greeting from '../components/Greeting';
import LoginForm from '../components/LoginForm';
import SetState from '../utils/types';

interface StartPageProps {
  isLoggedIn: boolean;
  setLoggedIn: SetState<boolean>;
}

function StartPage({ isLoggedIn, setLoggedIn }: StartPageProps) {
  if (isLoggedIn) {
    return <Navigate to="/mail" />;
  }
  return (
    <>
      <Greeting />
      <LoginForm isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />
    </>
  );
}

export default StartPage;
