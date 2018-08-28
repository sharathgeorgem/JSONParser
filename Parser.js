function parseNull (data) {
  if (data.startsWith('null')) {
    return [null, data.slice(4)]
  }
}

function parseBool (data) {
  if (data.startsWith('true')) {
    return [true, data.slice(4)]
  } else if (data.startsWith('false')) {
    return [false, data.slice(5)]
  }
}

function parseNumber (data) {
  let check = /[+-]?[0-9]*\.?[0-9]+(?:[Ee][+-]?[0-9]+)?/
  let num = data.match(check)
  if (num) {
    return [Number(num[0]), data.slice(num[0].length)]
  }
}

function parseString (data) {
  if (data.startsWith('""')) {
    return ['', data.slice(2)]
  } else if (data.startsWith('"')) {
    let check = /"((\\["\\/\\b\\f\\n\\r\\t\\u])*[^\u005C"]+)+((\\["\\/\\b\\f\\n\\r\\t\\u])*[^\u005C"]*)*"/
    let num = data.match(check)
    console.log(num)
    if (num) {
      return [String(num[0]), data.slice(num[0].length)]
    }
  }
}

console.log(parseString('"\nmanchester\n\tunited\t"123456'))

