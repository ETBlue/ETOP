export default ({tagTree, tagObj, workObj}) => {
  if (!tagObj || typeof tagObj !== 'object' ||
    !tagTree || typeof tagTree !== 'object') {
    return {}
  }
  let result = {}
  Object.keys(tagTree).forEach((tagId, tagIdIndex) => {
    if (!tagObj[tagId]) {
      console.log(`oops, no ${tagId} in original data`)
      return
    }
    if (!result[tagObj[tagId].category_id]) {
      result[tagObj[tagId].category_id] = {}
    }
    result[tagObj[tagId].category_id][tagId] = tagTree[tagId]
  })
  return result
}
