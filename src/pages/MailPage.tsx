import React from 'react';
import { Navigate } from 'react-router-dom';

import SetState from '../utils/types';

interface MailPageProps {
  isLoggedIn: boolean;
  setLoggedIn: SetState<boolean>;
}

function MailPage({ isLoggedIn, setLoggedIn }: MailPageProps) {
  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }
  return <div>MailPage</div>;
}

export default MailPage;
