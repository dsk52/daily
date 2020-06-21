import * as React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import IndexRoute from '../utilities/IndexRoute';
import PrivateRoute from '../utilities/PrivateRoute';
import { AuthProvider } from '../providers/AuthProvider';
import { NotFound } from '../pages/NotFound';
import { Index } from '../pages/Index';
import { List } from '../pages/daily/List'
import { Add } from '../pages/daily/Add'
import { Detail } from '../pages/daily/Detail';
import { Update } from '../pages/daily/Update'

export const AppRouter: React.FC = () => (
  <Router>
    <Switch>
      <AuthProvider>
        <IndexRoute exact path={['', '/']}  component={Index}/>
        <Redirect path='/daily' to="/daily/list" />
        <PrivateRoute path='/daily/list' component={List} />
        <PrivateRoute path='/daily/add' component={Add} />
        <PrivateRoute path='/daily/update/:id' component={Update} />
        <PrivateRoute path='/daily/detail/:id' component={Detail} />
      </AuthProvider>
      <Route path="*" component={NotFound} />
    </Switch>
  </Router>
)
