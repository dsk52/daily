import * as React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'


import { NotFound } from '../pages/NotFound';
import { Index } from '../pages/Index';
import { Auth } from '../pages/auth/index'

const AppRouter: React.FC = () => (
  <Router>
    <Switch>
      <Route path="/auth" render={() => <Auth />} />
      <Route exact={true} path={['/', '']} render={() => <Index />}/>
      <Route path="*" render={() => <NotFound />} />
    </Switch>
  </Router>
)


export { AppRouter }
