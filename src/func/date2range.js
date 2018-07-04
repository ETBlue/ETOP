import moment from 'moment'

export default (start, end, update) => {
  let startDate = moment(start)
  let endDate = moment(end)
  const updateDate = moment(update)

  if (!startDate.isValid() &&
    !endDate.isValid() &&
    !updateDate.isValid()) {
    return {}
  }

  if (updateDate.isValid()) {
    if (endDate.isBefore(updateDate)) {
      endDate = updateDate
    }
    if (startDate.isAfter(updateDate)) {
      startDate = updateDate
    }
  }
  if (startDate.isValid() && endDate.isValid() && endDate.isBefore(startDate)) {
    console.log(`please check your data about ${start} and ${end}`)
    return {}
  }

  let result = {}
  const date2Result = (date) => {
    if (!result[date.get('year')]) {
      result[date.get('year')] = {}
    }
    if (!result[date.get('year')][date.get('month')]) {
      result[date.get('year')][date.get('month')] = {}
    }
  }
  if (startDate.isValid()) {
    date2Result(startDate)
  }
  if (endDate.isValid()) {
    date2Result(endDate)
  }
  if (startDate.isValid() && endDate.isValid()) {
    let counterDate = startDate.clone()
    while (counterDate.isBefore(endDate)) {
      date2Result(counterDate)
      counterDate.add(1, 'M')
    }
  }
  return result
}
