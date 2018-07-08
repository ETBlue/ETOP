import React from 'react'
import {
  Link
} from 'react-router-dom'

import TagList from './TagList'
import Navbar from './Navbar'

import {
  categoryObj,
  tagObj,
  tagWorkMapper,
  workObj,
  tagCategory
} from '../func/data'

const WorkList = ({categoryId, tagId}) => {
  if (!categoryId) {
    console.log(`category id required`)
    return null
  }
  let currentTag
  let workIdSet = new Set()
  if (!tagId || !tagObj[tagId]) {
    Object.keys(tagCategory[categoryId]).forEach((topLevelTagId, topLevelTagIdIndex) => {
      for (let elem of tagWorkMapper[topLevelTagId]) {
        workIdSet.add(elem)
      }
    })
    currentTag = `All ${categoryObj[categoryId].en}`
  } else {
    workIdSet = tagWorkMapper[tagId]
    currentTag = tagObj[tagId].en
  }
  const workList = Array.from(workIdSet).map((workId, workIdIndex) => {
    const workItemData = workObj[workId]
    let parentWork = ''
    if (workItemData.parent_id.length > 0) {
      parentWork = (
        <p>
          所屬專案群：
          <Link to={`/work/${workItemData.parent_id}`}>
            {workObj[workItemData.parent_id].zh}
          </Link>
        </p>
      )
    }
    let mediaIcon = ''
    Object.keys(tagCategory.media).forEach((mediaTagId, mediaTagIdIndex) => {
      if (tagWorkMapper[mediaTagId].has(workId)) {
        mediaIcon = tagObj[mediaTagId].icon
      }
    })
    return (
      <article className='WorkListItem ui vertical segment' key={`${workId}-${workIdIndex}`}>
        <i className={`${mediaIcon} icon`} />
        <div className='content'>
          <Link to={`/work/${workId}`} className='ui small header'>
            {workItemData.zh}
            <div className='sub header'>
              {workItemData.en}
            </div>
          </Link>
          {parentWork}
        </div>
      </article>
    )
  })
  return (
    <div className='ten wide column'>
      <div className='message'>
        Showing {workIdSet.size} Works for {currentTag}
      </div>
      {workList}
    </div>
  )
}

export default (match) => {
  const categoryId = match.params.categoryId
  const tagId = match.params.tagId
  const tagList = TagList({categoryId, tagTree: tagCategory[categoryId], depth: 5, urlTagId: tagId})
  const workList = WorkList({categoryId, tagId})
  return (
    <div className='Category App-main'>
      <Navbar />
      <section className='App-body'>
        <div className='ui container'>
          <div className='ui two column stackable grid'>
            <div className='six wide column'>
              <h2 className='category ui small center aligned dividing header'>
                依{categoryObj[categoryId].zh}瀏覽
                <div className='sub header'>
                  Browse by {categoryObj[categoryId].en}
                </div>
              </h2>
              {tagList}
            </div>
            {workList}
          </div>
        </div>
      </section>
    </div>
  )
}
