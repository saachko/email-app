import React, { memo, useState } from 'react';
import { Navigate } from 'react-router-dom';

import Greeting from '../components/Greeting';
import LoginForm from '../components/LoginForm';
import Notification from '../components/Notification';
import { User } from '../utils/interfaces';
import SetState from '../utils/types';

interface StartPageProps {
  isLoggedIn: boolean;
  setLoggedIn: SetState<boolean>;
  setCurrentUser: SetState<User | null>;
}

function StartPage({
  isLoggedIn,
  setLoggedIn,
  setCurrentUser,
}: StartPageProps) {
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationVariant, setNotificationVariant] = useState('');
  const [isNotificationShown, setNotificationShown] = useState(false);

  if (isLoggedIn) {
    return <Navigate to="/mail" />;
  }
  return (
    <div className="d-flex flex-column main justify-content-between">
      <div>
        <Greeting />
        <LoginForm
          setLoggedIn={setLoggedIn}
          setCurrentUser={setCurrentUser}
          setNotificationShown={setNotificationShown}
          setNotificationMessage={setNotificationMessage}
          setNotificationVariant={setNotificationVariant}
        />
      </div>
      {isNotificationShown && (
        <Notification
          variant={notificationVariant}
          message={notificationMessage}
          setNotificationShown={setNotificationShown}
        />
      )}
    </div>
  );
}

export default memo(StartPage);
