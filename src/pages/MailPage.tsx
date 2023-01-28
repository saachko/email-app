import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

import Header from '../components/Header';
import Mailbox from '../components/Mailbox';
import MessageForm from '../components/MessageForm';
import { getUsers } from '../utils/api';
import { User } from '../utils/interfaces';
import SetState from '../utils/types';

interface MailPageProps {
  isLoggedIn: boolean;
  setLoggedIn: SetState<boolean>;
  currentUser: User | null;
}

function MailPage({ isLoggedIn, setLoggedIn, currentUser }: MailPageProps) {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const currentUserId = localStorage.getItem('currentUserId');
    (async () => {
      if (currentUserId) {
        const data = await getUsers();
        setUsers(data);
      }
    })();
  }, [currentUser]);

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <Header
        setLoggedIn={setLoggedIn}
        username={currentUser ? currentUser.username : ''}
      />
      <div className="d-flex flex-column flex-md-row justify-content-between gap-4">
        <MessageForm users={users} />
        <Mailbox />
      </div>
    </>
  );
}

export default MailPage;
