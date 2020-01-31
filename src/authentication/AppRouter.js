import React from "react";
import {
  BrowserRouter,
  Route,
  StaticRouter,
  Switch,
  useLocation,
  useRouteMatch
} from "react-router-dom";
import { useHistory } from "react-router";
import { useDisclosure } from "@chakra-ui/core";

const isServer = typeof window === "undefined";

export const AppRoute = ({ path, children, exact = true }) => {
  return (
    <Route
      path={path}
      exact={exact}
      render={props => <>{React.cloneElement(children, { ...props })}</>}
    />
  );
};

export const AppRouter = ({ children }) => {
  const Router = isServer ? StaticRouter : BrowserRouter;
  return (
    <Router>
      <Switch>
        <Route path="/" render={props => React.cloneElement(children, props)} />
      </Switch>
    </Router>
  );
};

export const RouteWrapper = ({ children, path, exact }) => {
  if (path) {
    return (
      <AppRoute path={path} exact={exact}>
        {children}
      </AppRoute>
    );
  }
  return children;
};

export const useRouterDisclosure = path => {
  let location = useLocation();
  let history = useHistory();
  let { isOpen, onClose, onOpen } = useDisclosure();
  function overrideOnOpen() {
    if (path) {
      if (path) {
        history.push(path);
      }
    }
    onOpen();
  }
  function overrideOnClose() {
    if (path) {
      console.log(location.pathname);
      history.goBack();
    }
    onClose();
  }
  return {
    isOpen,
    onClose: overrideOnClose,
    onOpen: overrideOnOpen,
    onToggle: isOpen ? overrideOnClose : overrideOnOpen
  };
};

export const useRouteHook = path => {
  let location = useLocation();
  let match = useRouteMatch(path);

  return [location, match];
};
