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
  let str = /^"([^"]*)"/.exec(data)
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
    if (data[1].startsWith(',')) data = parseComma(data[1])
    else data = data[1]
  }
  return [arr, data.slice(1)]
}
// Whitespace parser
function parseWhiteSpace (data) {
  let first = data.search(/\S/)
  if (first === -1) return ''
  return data.slice(first)
}
// Comma parser
function parseComma (data) { return data.slice(1) }
// Colon parser
function parseColon (data) { return data.slice(1) }
// factoryParser
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
const parseValue = factoryParser(parseNull, parseBool, parseNumber, parseString, parseArray/*, parseObject */)

console.log(parseValue('  [       1, -0.651,3,"hel\\\nlo     ",4,5,     6, "hello", null, true, false]sup'))

// Object parser
/* function parseObject (data) {
  var a = {}
  if (data.startsWith('{')) {
    data = parseWhiteSpace(data.slice(1))
    if (data.startsWith('}')) {
      return [a, data.slice(1)]
    }
    while (data.indexOf('}') !== 0) {
      if (data.indexOf(',') === 0) {
        data = orchestrator(data)
        data = data[1]
        data = parseWhiteSpace(data)
      }
      if (data.indexOf('\'') === 0) {
        data = parseWhiteSpace(data.slice(1))
      }
      data = orchestrator(data)
      a[data[0]] = null
      let key = data[0]
      if (data[1].indexOf('\'') === 0) {
        data = parseWhiteSpace(data[1].slice(1))
      }
      data = orchestrator(data[1])
      data = parseWhiteSpace(data[1])
      data = orchestrator(data)
      a[key] = data[0]
      data = data[1]
    }
  }
  if (data.startsWith('}')) {
    return [a, data.slice(1)]
  }
} */
// console.log(orchestrator('{"first":{"second":[1,2,[1,4]]}}'))
// console.log(JSON.stringify(orchestrator('{"first":{"second":[1,2,[1,4]]}}')))
/* const fs = require('fs')
fs.readFile('text.json', (err, data) => {
  if (err) throw err
  console.log(JSON.stringify(orchestrator(data.toString())))
}) */

// console.log(orchestrator('"hello"'))


