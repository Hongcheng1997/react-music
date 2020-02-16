import React, { Component, lazy, Suspense } from 'react'
import Header from './components/header/header'
import MiniPlayer from './components/mini-player/mini-player'
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

  constructor(props) {
    super(props)
    this.state = {
      showPlay: false,
      currentTime: 0
    }
    this.handlePlay = this.handlePlay.bind(this)
  }

  render() {
    return (
      <Router>
        <div>
          <Header />
          <div className="container">
            <div className="nav">
              <Sidebar></Sidebar>
            </div>
            <div className="view">
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
          </div>
          <MiniPlayer handlePlay={this.handlePlay}></MiniPlayer>
          <div className={this.state.showPlay ? '' : 'hidden'}>
            <Player handlePlay={this.handlePlay}></Player>
          </div>
        </div>
      </Router>
    )
  }

  handlePlay() {
    this.setState(preState => {
      return {
        showPlay: !preState.showPlay
      }
    })
  }
}

export default App
