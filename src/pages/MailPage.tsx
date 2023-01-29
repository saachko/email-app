import React, { memo, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

import Header from '../components/Header';
import Mailbox from '../components/Mailbox';
import MessageForm from '../components/MessageForm';
import { getMessagesSentByUser, getUsers, receiveMessages } from '../utils/api';
import { Message, User } from '../utils/interfaces';
import SetState from '../utils/types';

interface MailPageProps {
  isLoggedIn: boolean;
  setLoggedIn: SetState<boolean>;
  currentUser: User | null;
}

function MailPage({ isLoggedIn, setLoggedIn, currentUser }: MailPageProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [receivedMessages, setReceivedMessages] = useState<Message[]>([]);
  const [sentMessages, setSentMessages] = useState<Message[]>([]);

  useEffect(() => {
    const currentUserId = localStorage.getItem('currentUserId');
    (async () => {
      if (currentUserId) {
        const data = await getUsers();
        setUsers(data);
        setReceivedMessages(await receiveMessages(JSON.parse(currentUserId)));
        setSentMessages(await getMessagesSentByUser(JSON.parse(currentUserId)));
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
      <div className="vh-75 d-flex flex-column flex-md-row justify-content-between gap-5">
        <MessageForm users={users} currentUser={currentUser} />
        <div className="w-72">
          <Mailbox
            receivedMessages={receivedMessages}
            sentMessages={sentMessages}
          />
        </div>
      </div>
    </>
  );
}

export default memo(MailPage);
