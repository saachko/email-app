import React, { useEffect } from 'react';

import '../styles/notification.scss';
import SetState from '../utils/types';

interface MessageNotificationProps {
  message: string;
  setNotificationShown: SetState<boolean>;
}

function MessageNotification({
  message,
  setNotificationShown,
}: MessageNotificationProps) {
  useEffect(() => {
    setTimeout(() => {
      setNotificationShown(false);
    }, 3000);
  }, [message]);

  return (
    <div className="container">
      <div className="animation">
        <div className="i-mail">
          <div className="mail-anim" />
        </div>
        <div className="line" />
        <div className="i-success">
          <div className="success-anim" />
        </div>
      </div>
      <div className="message">{message}</div>
    </div>
  );
}

export default MessageNotification;
