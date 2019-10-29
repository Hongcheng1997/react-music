import React, { Component, lazy, Suspense } from 'react'
import Header from './components/header/header'
import Play from './components/play/play'
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
const Singer = lazy(() => import('./pages/singer/singer'))
const RankingList = lazy(() => import('./pages/ranking-list/ranking-list'))
const SongSheet = lazy(() => import('./pages/song-sheet/song-sheet'))

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
                  <Route path="/singer" component={Singer} />
                  <Route path="/ranking-list" component={RankingList} />
                  <Route path="/song-sheet" component={SongSheet} />
                  <Redirect to="/discover" />
                </Switch>
              </Suspense>
            </div>
          </div>
          <Play></Play>
        </div>
      </Router>
    )
  }
}

export default App
