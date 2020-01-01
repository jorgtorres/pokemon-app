import React, { Component, useEffect } from "react";
import { navigate as reachNavigate } from "gatsby";
import { isLoggedIn } from "../api/auth";

interface PrivateRouteProps {
  path: string;
  component: React.ComponentType<any>;
  location?: Location;
}

const PrivateRoute = ({
  path,
  component: Component,
  location,
  ...rest
}: PrivateRouteProps) => {
  useEffect(() => {
    if (!isLoggedIn() && location?.pathname !== `/app/login`) {
      reachNavigate(`/app/login`);
    }
  }, [location?.pathname]);

  return <Component {...rest} />;
};

export default PrivateRoute;
