import React from 'react';
import ReactDOM from 'react-dom';
import {  Router, Switch, Route } from 'react-router-dom'
import {createBrowserHistory} from "history";
import 'stylesheets/index.css';
import App from 'components/App';
import Record from './components/Record/Record'
// import registerServiceWorker from 'helpers/registerServiceWorker';

export const history = createBrowserHistory();
//https://github.com/notesolution/front-end-oc-task
ReactDOM.render(
  <Router history={history}>
    <Switch>
      <Route exact path='/' component={App} />
      <Route exact path='/record' component={Record} />
    </Switch>
</Router>, document.getElementById('root'));
// registerServiceWorker();

