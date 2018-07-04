import React from 'react'
import { Link } from 'react-router-dom'

import MAIN_CATEGORY from '../const/MAIN_CATEGORY'
import CATEGORY_ICON from '../const/CATEGORY_ICON'
import SITE_SETTING from '../const/SITE_SETTING'

const ShortcutMenu = ({tagCategory, tagWorkMapper, tagObj, categoryObj}) => {
  const columns = MAIN_CATEGORY.map((categoryId, categoryIdIndex) => {
    const tagList = Object.keys(tagCategory[categoryId]).map((tagId, tagIdIndex) => {
      if (!tagWorkMapper[tagId]) {
        return null
      }
      const subTagList = Object.keys(tagCategory[categoryId][tagId]).map((subTagId, subTagIdIndex) => {
        if (!tagWorkMapper[subTagId]) {
          return null
        }
        const count = tagWorkMapper[subTagId].size
        const state = count === 0 ? 'disabled' : null
        const description = tagObj[subTagId].zh === tagObj[subTagId].en ? null : (
          <Link to='' className={`${state} description`}>
            {tagObj[subTagId].en}
          </Link>
        )
        return (
          <div className='item' key={`${subTagId}-${subTagIdIndex}`}>
            <i className={`${CATEGORY_ICON[categoryId]} ${state} icon`} />
            <div className='content'>
              <span className={`${state} tag-count ui horizontal mini label`}>
                {count}
              </span>
              <Link to='' className={`${state} header`}>
                {tagObj[subTagId].zh}
              </Link>
              {description}
            </div>
          </div>
        )
      })
      let subTags = null
      if (subTagList.length > 0) {
        subTags = (
          <div className='list'>
            {subTagList}
          </div>
        )
      }
      const count = tagWorkMapper[tagId].size
      const state = count === 0 ? 'disabled' : null
      const description = tagObj[tagId].zh === tagObj[tagId].en ? null : (
        <Link to='' className={`${state} description`}>
          {tagObj[tagId].en}
        </Link>
      )
      return (
        <div className='item' key={`${tagId}-${tagIdIndex}`}>
          <i className={`${CATEGORY_ICON[categoryId]} ${state} icon`} />
          <div className='content'>
            <span className={`${state} tag-count ui horizontal tiny label`}>
              {count}
            </span>
            <Link to='' className={`${state} header`}>
              {tagObj[tagId].zh}
            </Link>
            {description}
            {subTags}
          </div>
        </div>
      )
    })
    return (
      <div className='column' key={`${categoryId}-${categoryIdIndex}`}>
        <Link to={`/${categoryId}`} className='Home-category ui small center aligned dividing header'>
          依{categoryObj[categoryId].zh}瀏覽
          <div className='sub header'>
            Browse by {categoryObj[categoryId].en}
          </div>
        </Link>
        <div className='ui relaxed list'>
          {tagList}
        </div>
      </div>)
  })
  return (
    <nav className='ShortcutMenu ui three column stackable grid'>
      {columns}
    </nav>
  )
}

export default ({tagCategory, tagWorkMapper, tagObj, categoryObj}) => (
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
        {ShortcutMenu({tagCategory, tagWorkMapper, tagObj, categoryObj})}
      </div>
    </section>
  </div>
)
