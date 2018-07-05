export default (obj) => {
  if (!obj || typeof obj !== 'object') {
    return {}
  }
  let result = {}
  let orphans = []
  Object.keys(obj).forEach((tagId, tagIdIndex) => {
    // level one tags
    if (!obj[tagId].parent_id || obj[tagId].parent_id.length === 0) {
      result[tagId] = {}
    // level 2+ tags
    } else {
      if (!result[obj[tagId].parent_id]) {
        orphans.push(tagId)
      } else {
        result[obj[tagId].parent_id][tagId] = {}
      }
    }
  })

  const findOrphanParent = (orphanArray, parentTree) => {
    orphanArray.forEach((tagId, tagIdIndex) => {
      if (parentTree[obj[tagId].parent_id]) {
        parentTree[obj[tagId].parent_id][tagId] = {}
        orphanArray.splice(orphanArray.indexOf(tagId), 1)
      }
    })
  }
  const findOrphanParentRecursively = (orphanArray, parentTree) => {
    if (orphanArray.length > 0) {
      findOrphanParent(orphanArray, parentTree)
      Object.keys(parentTree).forEach((tagId, tagIdIndex) => {
        findOrphanParentRecursively(orphanArray, parentTree[tagId])
      })
    }
  }
  let loopCount = 0
  while (orphans.length > 0 && loopCount <= 500) {
    loopCount += 1
    findOrphanParentRecursively(orphans, result)
    if (loopCount === 500) {
      console.log(orphans)
    }
  }
  return result
}
