import React from 'react'
import {
  Link
} from 'react-router-dom'

import Navbar from './Navbar'

import {
  categoryObj,
  tagObj,
  tagWorkMapper,
  workObj,
  tagCategory
} from '../func/data'

export default (match) => {
  const workId = match.params.workId
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
  const allTagList = Object.keys(categoryObj).map((categoryId, categoryIdIndex) => {
    let tagIds = workItemData[categoryId + '_tag_ids']
    if (!tagIds) {
      return null
    }
    if (categoryId === 'subject') {
      tagIds = Array.from(workItemData.complete_subject_tag_ids)
    }
    const tagList = tagIds.map((tagId, tagIdIndex) => {
      return (
        <Link to={`/${categoryId}/${tagId}`} className='ui horizontal basic label' key={`${tagId}-${tagIdIndex}`} >
          {tagObj[tagId].zh}
        </Link>
      )
    })
    return (
      <p key={`${categoryId}-${categoryIdIndex}`}>
        {categoryObj[categoryId].zh}：
        {tagList}
      </p>
    )
  })
  return (
    <div className='Work App-main'>
      <Navbar />
      <section className='App-body'>
        <div className='ui center aligned container'>
          <h2 className='ui icon header'>
            <i className={`circular ${mediaIcon} icon`} />
            <div className='content'>
              {workItemData.zh}
              <div className='sub header'>
                {workItemData.en}
              </div>
            </div>
          </h2>
          {parentWork}
          <hr className='ui hidden divider' />
          {allTagList}
          <hr className='ui hidden divider' />
          <p>
            <a href={workItemData.url} target='_blank' className='ui icon right labeled basic button' >
              <i className='right chevron icon' />
              成果網址
            </a>
          </p>
          <hr className='ui hidden divider' />
        </div>
      </section>
    </div>
  )
}
