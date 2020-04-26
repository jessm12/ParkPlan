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
import { faClock, faChild, faHamburger, faUserCheck, faMapSigns} from '@fortawesome/free-solid-svg-icons'

library.add(faClock, faChild, faHamburger, faUserCheck, faMapSigns)

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navigation />
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/Plan" component={Plan} />
            <Route path="/About" component={About} />
            <Route path="/TheParks" component={TheParks} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

render(<App/>, document.getElementById('app'));
