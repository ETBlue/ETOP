export default (setA, setB) => {
  var result = new Set(setA)
  for (var elem of setB) {
    result.delete(elem)
  }
  return result
}
