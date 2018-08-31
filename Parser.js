// Null parser
function parseNull (data) {
  if (data.startsWith('null')) {
    return [null, data.slice(4)]
  } else {
    return null
  }
}
// Boolean parser
function parseBool (data) {
  if (data.startsWith('true')) {
    return [true, data.slice(4)]
  } else if (data.startsWith('false')) {
    return [false, data.slice(5)]
  } else {
    return null
  }
}
// Number parser
function parseNumber (data) {
  let check = /[+-]?[0-9]*\.?[0-9]+(?:[Ee][+-]?[0-9]+)?/
  let num = data.match(check)
  if (data.startsWith(num)) {
    return [Number(num[0]), data.slice(num[0].length)]
  } else {
    return null
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
    } else {
      return null
    }
  }
}
// Array parser
function parseArray (data) {
  var b = []
  if (data.startsWith('[')) {
    data = parseWhiteSpace(data.slice(1))
    if (data.startsWith(']')) {
      return [b, data.slice(1)]
    }
    data = orchestrator(data)
    b.push(data[0])
    while (data[1].indexOf(']') !== 0) {
      if (data[1].indexOf(',') === 0) {
        data = orchestrator(data[1])
      }
      data = parseWhiteSpace(data[1])
      data = orchestrator(data)
      b.push(data[0])
    }
    data = data[1]
  }
  if (data.startsWith(']')) {
    return [b, data.slice(1)]
  }
}
// Object parser
function parseObject (data) {
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
}
// Whitespace parser
function parseWhiteSpace (data) {
  if (data.startsWith(' ')) {
    data = data.trim()
    return data
  } else {
    return data
  }
}
// Comma parser
function parseComma (data) {
  if (data.startsWith(',')) {
    return [',', data.slice(1)]
  } else return null
}
// Colon parser
function parseColon (data) {
  if (data.startsWith(':')) {
    return [':', data.slice(1)]
  } else return null
}
// Orchestrator function
function orchestrator (data) {
  let check = (parseObject(data) || parseArray(data) || parseNull(data) || parseBool(data) || parseComma(data) || parseColon(data) || parseNumber(data) || parseString(data))
  return check
}
// console.log(orchestrator('{"first":{"second":[1,2,[1,4]]}}'))
// console.log(JSON.stringify(orchestrator('{"first":{"second":[1,2,[1,4]]}}')))


