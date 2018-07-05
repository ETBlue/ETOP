import React from 'react'
import {
  Link,
  NavLink
} from 'react-router-dom'

import {
  categoryObj
} from '../func/data'

import MAIN_CATEGORY from '../const/MAIN_CATEGORY'
import SITE_SETTING from '../const/SITE_SETTING'

const categoryNav = MAIN_CATEGORY.map((categoryId, categoryIdIndex) => (
  <NavLink to={`/${categoryId}`} className='item' key={`${categoryId}-${categoryIdIndex}`} >
    {categoryObj[categoryId].abbr}
  </NavLink>
))

export default () => (
  <header className='Navbar App-header'>
    <div className='ui container'>
      <nav className='ui secondary stackable menu'>
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
)
