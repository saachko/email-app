import React from 'react';
import { Tab, Tabs } from 'react-bootstrap';

import { Message } from 'utils/interfaces';

import { emptyContainerText } from '../utils/constants';
import EmptyContainer from './EmptyContainer';

interface MailboxProps {
  receivedMessages: Message[];
  sentMessages: Message[];
}

function Mailbox({ receivedMessages, sentMessages }: MailboxProps) {
  return (
    <Tabs defaultActiveKey="received" className="mb-3" justify>
      <Tab eventKey="received" title="Inbox">
        {receivedMessages.length ? (
          <div>hello</div>
        ) : (
          <EmptyContainer text={emptyContainerText.received} />
        )}
      </Tab>
      <Tab eventKey="sent" title="Sent">
        {sentMessages.length ? (
          <div>bye</div>
        ) : (
          <EmptyContainer text={emptyContainerText.sent} />
        )}
      </Tab>
    </Tabs>
  );
}

export default Mailbox;
