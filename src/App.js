import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink
} from 'react-router-dom'

import Footer from './comp/Footer'
import Home from './comp/Home'

import csv2obj from './func/csv2obj'
import obj2tree from './func/obj2tree'
import tag2category from './func/tag2category'
import mapWorkTagFromTree from './func/mapWorkTagFromTree'
import minusSet from './func/minusSet'

import categoryCsv from './data/ETOP - data - category.csv'
import tagCsv from './data/ETOP - data - tag.csv'
import workCsv from './data/ETOP - data - work.csv'

import MAIN_CATEGORY from './const/MAIN_CATEGORY'
import SITE_SETTING from './const/SITE_SETTING'

const categoryObj = csv2obj(categoryCsv)
const tagObj = csv2obj(tagCsv)
const tagSet = new Set(Object.keys(tagObj))

let tagWorkMapper = {}
let workTagSet = new Set()
const workObj = csv2obj(workCsv, tagWorkMapper, workTagSet)

// make sure all tags have their place in the tag sheet
console.log(minusSet(workTagSet, tagSet))

const workTree = obj2tree(workObj)
const tagTree = obj2tree(tagObj)

mapWorkTagFromTree(tagTree, [], tagWorkMapper)

const tagCategory = tag2category(tagTree, tagObj)

const Category = (match) => {
  console.log(match.params.categoryId)
  const categoryNav = MAIN_CATEGORY.map((categoryId, categoryIdIndex) => (
    <NavLink to={`/${categoryId}`} className='item' key={`${categoryId}-${categoryIdIndex}`} >
      {categoryObj[categoryId].en}
    </NavLink>
  ))
  return (
    <div className='Category App-main'>
      <header className='App-header'>
        <div className='ui container'>
          <nav className='ui secondary menu'>
            <Link to='/' className='App-name item'>
              {SITE_SETTING.abbr.en}
            </Link>
            {categoryNav}
            <div className='right item'>
              <div className='ui action input'>
                <input type='text' placeholder='Search projects...' />
                <button className='ui icon button'>
                  <i className='icon search' />
                </button>
              </div>
            </div>
          </nav>
        </div>
      </header>
      <section className='App-body'>
        <div className='ui container'>
          {match.params.tagId}
        </div>
      </section>
    </div>
  )
}

const App = () => (
  <Router basename={`/${SITE_SETTING.repo}`}>
    <div className='App'>
      <Route exact path='/' render={() => Home({tagCategory, tagWorkMapper, tagObj, categoryObj})} />
      <Route path='/:categoryId/:tagId?' render={({match}) => Category(match)} />
      <Footer />
    </div>
  </Router>
)

export default App
