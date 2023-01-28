import React from 'react';
import { Navigate } from 'react-router-dom';

import Header from '../components/Header';
import Mailbox from '../components/Mailbox';
import MessageForm from '../components/MessageForm';
import { User } from '../utils/interfaces';
import SetState from '../utils/types';

interface MailPageProps {
  isLoggedIn: boolean;
  setLoggedIn: SetState<boolean>;
  currentUser: User | null;
}

function MailPage({ isLoggedIn, setLoggedIn, currentUser }: MailPageProps) {
  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <Header
        setLoggedIn={setLoggedIn}
        username={currentUser ? currentUser.username : ''}
      />
      <div>
        <MessageForm />
        <Mailbox />
      </div>
    </>
  );
}

export default MailPage;
