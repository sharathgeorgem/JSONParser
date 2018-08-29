// Null parser
function parseNull (data) {
  if (data.startsWith('null')) {
    return [null, data.slice(4)]
  }
}
// Boolean parser
function parseBool (data) {
  if (data.startsWith('true')) {
    return [true, data.slice(4)]
  } else if (data.startsWith('false')) {
    return [false, data.slice(5)]
  }
}
// Number parser
function parseNumber (data) {
  let check = /[+-]?[0-9]*\.?[0-9]+(?:[Ee][+-]?[0-9]+)?/
  let num = data.match(check)
  if (num) {
    return [Number(num[0]), data.slice(num[0].length)]
  }
}
// String parser
function parseString (data) {
  if (data.startsWith('""')) {
    return ['', data.slice(2)]
  } else if (data.startsWith('"')) {
    let check = /"((\\["\\/\\b\\f\\n\\r\\t\\u[0-9A-Fa-f]{4}])*[^\u005C"]+)+((\\["\\/\\b\\f\\n\\r\\t\\u[0-9A-Fa-f]{4}])*[^\u005C"]*)*"/
    let num = data.match(check)
    if (num) {
      return [num[0], data.slice(num[0].length)]
    }
  }
}

console.log(parseString('"\n\tHello World\t\n"123456'))
console.log(parseBool('trueWaddup'))
console.log(parseNull('nullNothin\'much'))
console.log(parseNumber('123456HelloWorl\'d!'))

/*function parseArray (data) {
  if (data.startsWith('[')) {
    
  }
}*/

