import React from 'react'
import SITE_SETTING from '../const/SITE_SETTING'

const links = SITE_SETTING.links.map((linkItem, linkItemIndex) => (
  <a className='link' href={linkItem.url} target='_blank' key={`${linkItem}-${linkItemIndex}`}>
    <i className={`${linkItem.icon} icon`} />
    {linkItem.title}
  </a>
))

export default () => (
  <footer className='App-footer'>
    <div className='center aligned ui container'>
      {links}
    </div>
  </footer>
)
