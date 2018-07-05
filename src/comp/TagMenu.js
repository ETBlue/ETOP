import React from 'react'
import { Link } from 'react-router-dom'

import {
  tagObj,
  tagWorkMapper
} from '../func/data'

const sortTagByCount = ({tagArray}) => {
  return tagArray.sort((tagA, tagB) => {
    if (tagWorkMapper[tagA] === undefined) {
      tagWorkMapper[tagA] = new Set()
    }
    if (tagWorkMapper[tagB] === undefined) {
      tagWorkMapper[tagB] = new Set()
    }
    return tagWorkMapper[tagB].size - tagWorkMapper[tagA].size
  })
}

let depthCount = 0
const TagMenu = ({categoryId, tagTree, depth}) => {
  depthCount += 1
  const sortedTags = sortTagByCount({tagArray: Object.keys(tagTree)})
  const tagMenu = sortedTags.map((tagId, tagIdIndex) => {
    let subTags = null
    if (depthCount < depth) {
      const subTagMenu = TagMenu({categoryId, tagTree: tagTree[tagId], depth})
      subTags = subTagMenu
    }
    const count = tagWorkMapper[tagId].size
    const state = count === 0 ? 'disabled' : ''
    let size
    switch (depthCount) {
      case 1:
        size = 'tiny'
        break
      case 2:
        size = 'mini'
        break
      default:
        size = 'super mini'
    }
    const description = tagObj[tagId].zh === tagObj[tagId].en ? '' : (
      <span className='description'>
        {tagObj[tagId].en}
      </span>
    )
    return (
      <div className={`${state} item`} key={`${tagId}-${tagIdIndex}`}>
        <Link to={`/${categoryId}/${tagId}`} className={`${size} link`}>
          <span className={`tag-count ui horizontal ${size} label`}>
            {count}
          </span>
          {tagObj[tagId].zh}
          {description}
        </Link>
        {subTags}
      </div>
    )
  })
  depthCount -= 1
  if (tagMenu.length === 0) {
    return null
  }
  let menuStyle = ''
  if (depthCount === 0) {
    menuStyle = 'ui vertical secondary'
  }
  return (
    <div className={`TagMenu ${menuStyle} menu`}>
      {tagMenu}
    </div>
  )
}

export default TagMenu
