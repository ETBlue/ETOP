import date2range from './date2range'

export default (csv, mapper = null, collector = null) => {
  if (!csv || csv.length === 0 || typeof csv !== 'object') {
    return {}
  }
  let result = {}
  const titles = csv[0]
  for (let i = 1; i < csv.length; i++) {
    const lineArray = csv[i]
    let resultItem = {}
    titles.forEach((title, titleIndex) => {
      // for works
      if (title.includes('_ids')) {
        if (lineArray[titleIndex].length === 0) {
          resultItem[title] = []
        } else {
          resultItem[title] = lineArray[titleIndex].split(';').map((tagId) => {
            const trimedTagId = tagId.trim()
            if (collector) {
              collector.add(trimedTagId)
            }
            if (mapper) {
              if (mapper[trimedTagId] === undefined) {
                mapper[trimedTagId] = new Set()
              }
              mapper[trimedTagId].add(lineArray[titles.indexOf('id')])
            }
            return trimedTagId
          })
        }
      // for all
      } else {
        resultItem[title] = lineArray[titleIndex]
      }
    })
    // for works
    if (resultItem.started ||
      resultItem.ended ||
      resultItem.updated) {
      resultItem.duration = date2range(resultItem.started, resultItem.ended, resultItem.updated)
    }
    // for all
    result[resultItem.id] = resultItem
  }
  console.log(result)
  return result
}
