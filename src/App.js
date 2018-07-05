import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import Footer from './comp/Footer'
import Home from './comp/Home'
import Category from './comp/Category'
import Work from './comp/Work'

import SITE_SETTING from './const/SITE_SETTING'

const App = () => (
  <Router basename={`/${SITE_SETTING.repo}`}>
    <div className='App'>
      <Switch>
        <Route exact path='/' render={() => Home} />
        <Route path='/work/:workId?' render={({match}) => Work(match)} />
        <Route path='/:categoryId/:tagId?' render={({match}) => Category(match)} />
      </Switch>
      <Footer />
    </div>
  </Router>
)

export default App
