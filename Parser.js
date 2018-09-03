// Null parser
function parseNull (data) {
  if (data.startsWith('null')) return [null, data.slice(4)]
  return null
}
// Boolean parser
function parseBool (data) {
  if (data.startsWith('true')) return [true, data.slice(4)]
  if (data.startsWith('false')) return [false, data.slice(5)]
  return null
}
// Number parser
function parseNumber (data) {
  let num = /^[-]?[0-9]+(\.[0-9]+(?:[Ee][+-]?[0-9]+)?)?/.exec(data)
  if (num) return [Number(num[0]), data.slice(num[0].length)]
  return null
}
// String parser
function parseString (data) {
  let str = /^"(([^"\\\u0000-\u001F])*((\\[\\"/bnrtf])*(\\\u[0-9A-Za-z]{4})*)*)*"/.exec(data)
  if (str) return [str[1], data.slice(str[0].length)]
  return null
}
// Array parsers
function parseArray (data) {
  if (!data.startsWith('[')) return null
  data = data.slice(1)
  let arr = []
  while (!data.startsWith(']')) {
    data = parseWhiteSpace(data)
    data = parseValue(data)
    arr.push(data[0])
    data = data[1]
    if (data.startsWith(',')) data = parseSeparator(data)
  }
  return [arr, data.slice(1)]
}
// Object parser
function parseObject (data) {
  if (!data.startsWith('{')) return null
  data = data.slice(1)
  let obj = {}
  while (!data.startsWith('}')) {
    data = parseWhiteSpace(data)
    if (data.startsWith(',')) return null
    data = parseValue(data)
    let key = data[0]
    data = parseWhiteSpace(data[1])
    if (data.startsWith(':')) data = parseSeparator(data)
    data = parseWhiteSpace(data)
    data = parseValue(data)
    let value = data[0]
    obj[key] = value
    data = parseWhiteSpace(data[1])
    if (data.startsWith(',')) data = parseSeparator(data)
  }
  return [obj, data.slice(1)]
}
// Whitespace parser
function parseWhiteSpace (data) {
  let first = data.search(/\S/)
  if (first === -1) return ''
  return data.slice(first)
}
// Separator parser
function parseSeparator (data) { return data.slice(1) }
// FactoryParser
function factoryParser (...parsers) {
  return function (data) {
    for (let parser of parsers) {
      data = parseWhiteSpace(data)
      let result = parser(data)
      if (result !== null) return result
    }
    return null
  }
}
// Value parser
const parseValue = factoryParser(parseNull, parseBool, parseNumber, parseString, parseArray, parseObject)
// Main function
function main (data) {
  let valid = parseValue(data)
  if (valid) return valid
  return 'Invalid JSON'
}
const fs = require('fs')
fs.readFile('text.json', (err, data) => {
  if (err) throw err
  console.log(JSON.stringify(main(data.toString())))
})
