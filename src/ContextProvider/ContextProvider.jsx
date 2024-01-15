import { createContext, useContext, useState } from "react";

const StateContext = createContext({
  user: null,
  token: null,
  adminStatus: null,
  host: null,
  setUser: () => {},
  setToken: () => {},
  setAdminStatus: () => {},
  setHost: () => {},
});

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [token, _setToken] = useState(localStorage.getItem("Shbro"));
  const [adminStatus, setAdminStatus] = useState(null);
  const [host, setHost] = useState(null);

  const setToken = (token) => {
    _setToken(token);
    if (token) {
      localStorage.setItem("Shbro", token);
    } else {
      localStorage.removeItem("Shbro");
    }
  };

  return (
    <StateContext.Provider
      value={{
        user,
        token,
        adminStatus,
        host,
        setUser,
        setToken,
        setAdminStatus,
        setHost,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
