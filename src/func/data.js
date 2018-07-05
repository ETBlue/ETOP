import csv2obj from './csv2obj'
import obj2tree from './obj2tree'
import tag2category from './tag2category'
import mapWorkTagFromTree from './mapWorkTagFromTree'
import minusSet from './minusSet'

import categoryCsv from '../data/ETOP - data - category.csv'
import tagCsv from '../data/ETOP - data - tag.csv'
import workCsv from '../data/ETOP - data - work.csv'

const categoryObj = csv2obj(categoryCsv)
const tagObj = csv2obj(tagCsv)
const tagSet = new Set(Object.keys(tagObj))
let tagWorkMapper = {}
let workTagSet = new Set()
const workObj = csv2obj(workCsv, tagWorkMapper, workTagSet)

// make sure all tags have their place in the tag sheet
if (minusSet(workTagSet, tagSet).size > 0) {
  console.log(minusSet(workTagSet, tagSet))
}

const workTree = obj2tree(workObj)
const tagTree = obj2tree(tagObj)

mapWorkTagFromTree(tagTree, [], tagWorkMapper)

const tagCategory = tag2category(tagTree, tagObj)

export {
  categoryObj,
  tagObj,
  tagSet,
  tagWorkMapper,
  workTagSet,
  workObj,
  workTree,
  tagTree,
  tagCategory
}
