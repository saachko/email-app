import React, { useEffect } from 'react';
import { Alert } from 'react-bootstrap';

import SetState from '../utils/types';

interface NotificationProps {
  setNotificationShown: SetState<boolean>;
  variant: string;
  message: string;
}

function Notification({
  setNotificationShown,
  variant,
  message,
}: NotificationProps) {
  useEffect(() => {
    setTimeout(() => setNotificationShown(false), 3000);
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
