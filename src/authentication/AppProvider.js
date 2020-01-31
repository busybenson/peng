import React, { createContext, useMemo, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { root_url } from "../celebrity-ui/hooks";

const getUserURL = `${root_url}/api/v1/auth/user`;
const logOutURL = `${root_url}/api/v1/rest-auth/logout/`;

const AppContext = createContext({
  useAuthDisclosure: () => {}
});

const AppProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authToken, setAuthToken] = useState("");
  const [user, setUser] = useState({});
  const [isLogin, setIsLogin] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [headerElem, setHeaderElem] = useState("");

  // Setup config with token - helper function

  const tokenConfig = authToken => {
    // Get token from state
    const token = authToken || localStorage.getItem("token");
    // Headers
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    // If token, add to headers config
    if (token) {
      config.headers["Authorization"] = `Token ${token}`;
    }

    return config;
  };

  ////////////////////

  const fetcher = (url, config = {}, ignoreError = false) => {
    const token = tokenConfig(authToken);
    config = { ...config, ...token };

    return fetch(url, config).then(response => {
      if (response.status < 400) {
        return response.json();
      }

      return ignoreError ? {} : [];
    });
  };

  useEffect(() => {
    if (!user.hasOwnProperty("username")) {
      fetcher(getUserURL)
        .then(response => {
          setUser(response);
          setIsLoggedIn(true);
        })
        .catch(error => {
          setUser({});
          setIsLoggedIn(false);
          setAuthToken("");
          localStorage.removeItem("token");
        });
    }
  }, []);

  const onLogout = () => {
    if (isLoggedIn) {
      fetcher(logOutURL).then(response => {
        setUser({});
        setIsLoggedIn(false);
        setAuthToken("");
        localStorage.removeItem("token");
      });
    }
  };

  const childContext = useMemo(() => {
    const useAuthDisclosure = () => {
      let history = useHistory();

      function onOpen(path, headerElem) {
        setIsOpen(true);
        history.push(`/${path}`);
        if (headerElem) setHeaderElem(headerElem);
        if (path === "login") {
          setIsLogin(true);
          if (!headerElem) setHeaderElem("Login to PENG");
        } else if (path === "signup") {
          setIsLogin(false);
          if (!headerElem) setHeaderElem("Signup to PENG");
        }
      }

      function onClose() {
        setIsOpen(false);
        history.goBack();
      }

      return {
        isOpen,
        onOpen,
        onClose,
        isLogin,
        headerElem
      };
    };

    return {
      useAuthDisclosure,
      setAuthToken,
      isLoggedIn,
      user,
      onLogout,
      fetcher
    };
  }, [isLogin, fetcher, user, isLoggedIn, isOpen, headerElem]);

  return (
    <AppContext.Provider value={childContext}>{children}</AppContext.Provider>
  );
};

export { AppProvider, AppContext };
