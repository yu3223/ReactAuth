import React from 'react';
import { Menu, Search } from "semantic-ui-react";
import { Link } from 'react-router-dom';

import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

function Header() {
  const [user, setUser] = React.useState(null);
  const auth = getAuth();

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, [auth]);

  return (
    <Menu>
      <Menu.Item as={Link} to="/">React</Menu.Item>
      <Menu.Item>
        <Search />
      </Menu.Item>
      <Menu.Menu position="right">
        {user ? (
          <>
            <Menu.Item as={Link} to="/my">
              {user.email.split('@')[0]}
            </Menu.Item>
            <Menu.Item onClick={() => signOut(auth)}>
              登出
            </Menu.Item>
          </>
        ) : (
          <Menu.Item as={Link} to="/signin">
            註冊/登入
          </Menu.Item>
        )}
      </Menu.Menu>
    </Menu>
  );
}

export default Header;
