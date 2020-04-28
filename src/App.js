import './App.scss';
import './index.css'
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './components/Home'
import Plan from './components/Plan';
import About from './components/About';
import TheParks from './components/TheParks';
import { render } from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faClock, faLaugh, faInfo, faUserCheck } from '@fortawesome/free-solid-svg-icons'

library.add(faClock, faLaugh, faInfo, faUserCheck)

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navigation />
          <Switch>
            <Route path="/" component={Home} exact />
            {/* Pass key value so component remounts when clicking on plan from plan page */}
            <Route path="/Plan" render={props => <Plan key={Date.now()} {...props} />} />
            <Route path="/About" component={About} />
            <Route path="/TheParks" component={TheParks} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

render(<App/>, document.getElementById('app'));
