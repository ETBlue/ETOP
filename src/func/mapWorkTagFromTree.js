const mapThisLevel = (path, mapper) => {
  const tag = path.pop()
  if (path.length === 0) {
    return
  }
  if (mapper[path[path.length - 1]] === undefined) {
    mapper[path[path.length - 1]] = new Set()
  }
  if (mapper[tag] === undefined) {
    mapper[tag] = new Set()
  }
  for (let elem of mapper[tag]) {
    mapper[path[path.length - 1]].add(elem)
  }
}

const mapWorkTagFromTree = (tree, path, mapper) => {
  Object.keys(tree).forEach((tagId, tagIdIndex) => {
    path.push(tagId)
    if (Object.keys(tree[tagId]).length > 0) {
      mapWorkTagFromTree(tree[tagId], path, mapper)
    } else {
      mapThisLevel(path, mapper)
    }
  })
  mapThisLevel(path, mapper)
}

export default mapWorkTagFromTree
