import React, { Component, lazy, Suspense } from 'react'
import Header from './components/header/header'
import Sidebar from './components/sidebar/sidebar'
import './App.scss'
import 'element-theme-default'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'

const Discover = lazy(() => import('./pages/discover/discover'))

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header />
          <div className="content">
            <div className="sideBarWrap">
              <Sidebar />
            </div>
            <div className="main">
              <Suspense fallback={<p>1</p>}>
                <Switch>
                  <Route path="/discover" component={Discover} />
                  <Redirect to="/discover" />
                </Switch>
              </Suspense>
            </div>
          </div>
        </div>
      </Router>
    )
  }
}

export default App
