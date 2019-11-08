import React from 'react';
import { Provider } from 'unstated'
import { Router, Route, Switch } from 'react-router-dom'
import { Page } from './containers'
import { history } from './utils'
import './index.css';

const App = () => (
  <Provider>
    <Router history={history}>
      <Switch>
        {/* <Route exact path="/team" render={(props) => <Page {...props} isTeam={true} /> } /> */}
        <Route exact path="/team/:id" render={(props) => <Page {...props} isTeam={true} /> } />
        {/* <Route exact path="/" component={Page} /> */}
        <Route exact path="/:id" component={Page} />
      </Switch>
    </Router>
  </Provider>
)

export default App;
