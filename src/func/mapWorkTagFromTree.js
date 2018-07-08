const mapThisLevel = ({path, tagWorkMapper}) => {
  const tag = path.pop()
  if (path.length === 0) {
    return
  }
  if (tagWorkMapper[path[path.length - 1]] === undefined) {
    tagWorkMapper[path[path.length - 1]] = new Set()
  }
  if (tagWorkMapper[tag] === undefined) {
    tagWorkMapper[tag] = new Set()
  }
  for (let elem of tagWorkMapper[tag]) {
    tagWorkMapper[path[path.length - 1]].add(elem)
  }
}

const mapWorkTagFromTree = ({tagTree, path, tagWorkMapper}) => {
  Object.keys(tagTree).forEach((tagId, tagIdIndex) => {
    path.push(tagId)
    if (Object.keys(tagTree[tagId]).length > 0) {
      mapWorkTagFromTree({tagTree: tagTree[tagId], path, tagWorkMapper})
    } else {
      mapThisLevel({path, tagWorkMapper})
    }
  })
  mapThisLevel({path, tagWorkMapper})
}

export default mapWorkTagFromTree
