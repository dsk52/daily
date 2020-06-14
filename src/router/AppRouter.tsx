import * as React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import PrivateRoute from 'utilities/PrivateRoute';
import { AuthProvider } from 'providers/AuthProvider';
import { NotFound } from '../pages/NotFound';
import {Index} from '../pages/Index';
import { List } from '../pages/dialy/List'
import { Add } from '../pages/dialy/Add'
import { Detail } from '../pages/dialy/Detail';
import { Update } from '../pages/dialy/Update'

export const AppRouter: React.FC = () => (
  <Router>
    <Switch>
      <Route path='/daily/add' component={Add} />
      <Route path='/daily/update/:id' component={Update} />
      <Route path='/daily/detail/:id' component={Detail} />
      <Route path='/daily/list' component={List} />
      <Redirect path='/daily' to="/daily/list" />
      <AuthProvider>
        {/* <PrivateRoute path='/dialy/list' component={List} /> */}
        {/* <Redirect path='/dialy' to="/dialy/list" /> */}
        <Route exact={true} path={['/', '']}  component={Index}/>
      </AuthProvider>
      <Route path="*" component={NotFound} />
    </Switch>
  </Router>
)
