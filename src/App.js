import React, { Component, lazy, Suspense } from 'react'
import Header from './components/header/header'
import Player from './components/player/player'
import Sidebar from './components/sidebar/sidebar'
import './App.scss'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'

const Singer = lazy(() => import('./pages/singer/singer'))
const RankingList = lazy(() => import('./pages/ranking-list/ranking-list'))
const SongSheet = lazy(() => import('./pages/song-sheet/song-sheet'))
const SongSheetDetails = lazy(() => import('./pages/song-sheet-details/song-sheet-details'))

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header />
          <div className="container">
            <div className="title">音乐馆</div>
            <div className="barWrap">
              <Sidebar></Sidebar>
            </div>
            <Suspense fallback={<p className="loading">正在加载中...</p>}>
              <Switch>
                <Route path="/song-sheet" component={SongSheet} />
                <Route path="/song-sheet-details/:id" component={SongSheetDetails} />
                <Route path="/singer" component={Singer} />
                <Route path="/ranking-list" component={RankingList} />
                <Redirect to="/song-sheet" />
              </Switch>
            </Suspense>
          </div>
          <Player></Player>
        </div>
      </Router>
    )
  }
}

export default App
