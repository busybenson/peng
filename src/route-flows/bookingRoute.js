import React from "react";
import { Route, Switch } from "react-router-dom";
import { useParams, useHistory } from "react-router";

const HomePage = React.lazy(() => import("../external-pages/HomePage"));
const CelebrityProfile = React.lazy(() =>
  import("../celebrity-ui/CelebrityProfile")
);
const Booking = React.lazy(() => import("../bookings/Booking"));

let routes = [
  {
    path: "/:slug_url",
    exact: true,
    Component: CelebrityProfile,
    destination: "/book"
  },
  {
    path: "/:slug_url/book",
    exact: true,
    Component: Booking,
    destination: "/booking-confirmed"
  }
];
// const Four_O4_Page = ({}) => <div>404 not found</div>;
const BookingFlow = () => {
  const history = useHistory();
  return (
    <Route
      path="/"
      exact
      render={routerProps => {
        return (
          <Switch>
            {routes.map((route, index) => {
              let { Component, destination, path, ...rest } = route;
              return (
                <Route {...rest} path={path} key={index}>
                  <React.Suspense fallback={<div>...Loading</div>}>
                    <Component
                      toNextPage={slug_url => {
                        history.push(`/${slug_url}${destination}`);
                      }}
                    />
                  </React.Suspense>
                </Route>
              );
            })}
            <Route path="/">
              <React.Suspense fallback={<div>...Loading</div>}>
                <HomePage />
              </React.Suspense>
            </Route>

            {/* <Route exact path="/:slug_url">
          <React.Suspense fallback={<div>...Loading</div>}>
            <CelebrityProfile />
          </React.Suspense>
        </Route> */}
          </Switch>
        );
      }}
    />
  );
};

export default BookingFlow;
