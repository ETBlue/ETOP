import React from 'react'
import { Link } from 'react-router-dom'

import TagList from './TagList'

import {
  categoryObj,
  tagCategory
} from '../func/data'

import MAIN_CATEGORY from '../const/MAIN_CATEGORY'
import SITE_SETTING from '../const/SITE_SETTING'

const ShortcutMenu = () => {
  const columns = MAIN_CATEGORY.map((categoryId, categoryIdIndex) => {
    const tagList = TagList({categoryId, tagTree: tagCategory[categoryId], depth: 2})
    return (
      <div className='column' key={`${categoryId}-${categoryIdIndex}`}>
        <Link to={`/${categoryId}`} className='category ui small center aligned dividing header'>
          依{categoryObj[categoryId].zh}瀏覽
          <div className='sub header'>
            Browse by {categoryObj[categoryId].en}
          </div>
        </Link>
        {tagList}
      </div>)
  })
  return (
    <nav className='ShortcutMenu ui three column stackable grid'>
      {columns}
    </nav>
  )
}

export default (
  <div className='Home App-main'>
    <header className='App-header Home-header'>
      <div className='ui center aligned container'>
        <hr className='ui hidden divider' />
        <h1 className='ui header App-name'>
          {SITE_SETTING.name.en}
        </h1>
        <p className='App-intro'>
          {SITE_SETTING.description.en}
        </p>
        <hr className='ui hidden divider' />
        <div className='ui large action input'>
          <input type='text' placeholder='Search projects...' />
          <button className='ui icon button'>
            <i className='icon search' />
          </button>
        </div>
        <hr className='ui hidden divider' />
      </div>
    </header>
    <section className='App-body'>
      <div className='ui container'>
        <ShortcutMenu />
      </div>
    </section>
  </div>
)
