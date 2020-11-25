import React from 'react';
import Boards from './Boards';
import Auth from '../components/Auth';
import Loader from '../components/Loader';

export default function Home({ authed }) {
  const loadComponent = () => {
    let component = '';
    if (authed === null) {
      component = <Loader />;
    } else if (authed) {
      component = <Boards />;
    } else {
      component = <Auth />;
    }
    return component;
  };

  return (
    <div>
      <h1>Welcome to React-Pinterest</h1>
      {loadComponent()}
    </div>
  );
}
