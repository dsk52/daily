import * as React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import PrivateRoute from 'utilities/PrivateRoute';
import { NotFound } from '../pages/NotFound';
import {Index} from '../pages/Index';
import { List } from '../pages/dialy/List'
import { AuthProvider } from 'providers/AuthProvider';

export const AppRouter: React.FC = () => (
  <Router>
    <Switch>
      <Route path='/dialy/list' component={List} />
    <Redirect path='/dialy' to="/dialy/list" />
      <AuthProvider>
        {/* <PrivateRoute path='/dialy/list' component={List} /> */}
        {/* <Redirect path='/dialy' to="/dialy/list" /> */}
        <Route exact={true} path={['/', '']}  component={Index}/>
      </AuthProvider>
      <Route path="*" component={NotFound} />
    </Switch>
  </Router>
)
