import React from 'react';
import { Nav } from 'react-bootstrap';

import SetState from '../utils/types';

interface HeaderProps {
  setLoggedIn: SetState<boolean>;
  username: string;
}

function Header({ setLoggedIn, username }: HeaderProps) {
  const logOut = () => {
    localStorage.removeItem('currentUserId');
    setLoggedIn(false);
  };

  return (
    <Nav
      className="justify-content-between mb-4"
      activeKey="/auth-app"
      variant="pills"
    >
      <h3 className="text-primary">Welcome, {username}!</h3>
      <Nav.Item className="hover">
        <Nav.Link href="/auth-app" onClick={logOut}>
          Log out
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default Header;
