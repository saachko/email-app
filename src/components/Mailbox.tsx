import React from 'react';
import { Tab, Tabs } from 'react-bootstrap';

import { Message } from 'utils/interfaces';

interface MailboxProps {
  receivedMessages: Message[];
  sentMessages: Message[];
}

function Mailbox({ receivedMessages, sentMessages }: MailboxProps) {
  return (
    <Tabs defaultActiveKey="received" className="mb-3" justify>
      <Tab eventKey="received" title="Inbox">
        <p>hello</p>
      </Tab>
      <Tab eventKey="sent" title="Sent">
        <p>bye</p>
      </Tab>
    </Tabs>
  );
}

export default Mailbox;
