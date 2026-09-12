import { createContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const MyAuth = createContext();
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  return (
    <MyAuth.Provider value={{ user, setUser, accessToken, setAccessToken }}>
      {children}
    </MyAuth.Provider>
  );
};
