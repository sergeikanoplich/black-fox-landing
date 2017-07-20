import React from 'react';
import { Router, browserHistory } from 'react-router';
import routes from '../../config/routes';

const AppContainer = () => (
  <Router
    history={browserHistory}
    routes={routes}
  />
);

export default AppContainer;
