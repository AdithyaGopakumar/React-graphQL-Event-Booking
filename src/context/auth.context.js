import React from 'react';
export default React.createContext({
  token: null,
  user_id: null,
  login: (token, user_id, tokenExpiration) => { },
  logout: () => { },
})