import React from 'react'
import { Link } from 'react-router-dom'

import {
  tagObj,
  tagWorkMapper
} from '../func/data'

import CATEGORY_ICON from '../const/CATEGORY_ICON'

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
const TagList = ({categoryId, tagTree, depth, urlTagId}) => {
  depthCount += 1
  const sortedTags = sortTagByCount({tagArray: Object.keys(tagTree)})
  const tagList = sortedTags.map((tagId, tagIdIndex) => {
    let subTags = null
    if (depthCount < depth) {
      const subTagList = TagList({categoryId, tagTree: tagTree[tagId], depth, urlTagId})
      subTags = subTagList
    }
    const count = tagWorkMapper[tagId].size
    const state = count === 0 ? 'disabled' : urlTagId === tagId ? 'active' : ''
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
      <Link to={`/${categoryId}/${tagId}`} className={`${state} description`}>
        {tagObj[tagId].en}
      </Link>
    )
    return (
      <div className='item' key={`${tagId}-${tagIdIndex}`}>
        <i className={`${CATEGORY_ICON[categoryId]} ${state} icon`} />
        <div className='content'>
          <Link to={`/${categoryId}/${tagId}`} className={`${state} header`}>
            <span className={`${state} tag-count ui horizontal ${size} label`}>
              {count}
            </span>
            {tagObj[tagId].zh}
          </Link>
          {description}
          {subTags}
        </div>
      </div>
    )
  })
  depthCount -= 1
  if (tagList.length === 0) {
    return null
  }
  let listStyle = ''
  if (depthCount === 0) {
    listStyle = 'ui relaxed'
  }
  return (
    <div className={`TagList ${listStyle} list`}>
      {tagList}
    </div>
  )
}

export default TagList
