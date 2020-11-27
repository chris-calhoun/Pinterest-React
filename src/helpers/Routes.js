import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from '../views/Home';
import Boards from '../views/Boards';
import PinDetails from '../views/PinDetails';
import PinForm from '../views/PinForm';
import Pins from '../views/Pins';
import SingleBoard from '../views/SingleBoard';
import NotFound from '../views/NotFound';

export default function Routes({ authed }) {
  return (
      <Switch>
        <Route
          exact
          path='/'
          component={() => <Home authed={authed} />}
        />
        <PrivateRoute
          exact
          path='/pin-details'
          component={() => <PinDetails authed={authed} />}
        />
        <Route
          exact
          path='/pins'
          component={() => <Pins authed={authed} />}
        />
        <Route
          exact
          path='/pin-form'
          component={() => <PinForm authed={authed} />}
        />
        <Route
          exact
          path='/boards/:id'
          component={(props) => <SingleBoard authed={authed} {...props} />}
        />
        <PrivateRoute
          exact
          path='/boards'
          component={() => <Boards authed={authed} />}
        />
        <Route component={NotFound} />
      </Switch>
  );
}

const PrivateRoute = ({ component: Component, user, ...rest }) => {
  const routeChecker = (taco) => (user
    ? (<Component {...taco} user={user}/>)
    : (<Redirect to={{ pathname: '/', state: { from: taco.location } }}/>));
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};
