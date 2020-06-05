import * as React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'


import { NotFound } from '../pages/NotFound';
import { Index } from '../pages/Index';

const AppRouter: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route exact={true} path={['/', '']} render={() => <Index />}/>
      <Route path="*" render={() => <NotFound />} />
    </Switch>
  </BrowserRouter>
)


export { AppRouter }
