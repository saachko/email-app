import React, { useEffect } from 'react';
import { Alert } from 'react-bootstrap';

import SetState from '../utils/types';

interface NotificationProps {
  setNotificationShown: SetState<boolean>;
  setNotificationVariant: SetState<string>;
  variant: string;
  message: string;
}

function Notification({
  setNotificationShown,
  setNotificationVariant,
  variant,
  message,
}: NotificationProps) {
  useEffect(() => {
    setTimeout(() => {
      setNotificationShown(false);
      setNotificationVariant('');
    }, 3000);
  }, [variant, message]);

  return (
    <Alert
      key={variant}
      variant={variant}
      onClose={() => setNotificationShown(false)}
      dismissible
    >
      {message}
    </Alert>
  );
}

export default Notification;
