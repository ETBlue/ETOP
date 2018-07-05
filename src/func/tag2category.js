export default (tree, obj) => {
  if (!obj || typeof obj !== 'object' ||
    !tree || typeof tree !== 'object') {
    return {}
  }
  let result = {}
  Object.keys(tree).forEach((tagId, tagIdIndex) => {
    if (!obj[tagId]) {
      console.log(`oops, no ${tagId} in original data`)
      return
    }
    if (!result[obj[tagId].category_id]) {
      result[obj[tagId].category_id] = {}
    }
    result[obj[tagId].category_id][tagId] = tree[tagId]
  })
  return result
}
