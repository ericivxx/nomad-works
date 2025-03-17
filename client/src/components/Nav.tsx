import React from 'react';
import { useAuth } from 'replit-auth'; // Assuming Replit Auth is used

const AuthButton = () => {
  const { user, signIn, signOut } = useAuth();

  if (user) {
    return (
      <button onClick={signOut}>Sign Out</button>
    );
  } else {
    return (
      <button onClick={signIn}>Sign In</button>
    );
  }
};

export default AuthButton;