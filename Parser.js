function parse(str) {
    
}

//Null Parser
function parseNull(data) {
    if(data.startsWith('null'))
        return [null, data.slice(4)];
}

//Boolean Parser
function parseBool(data) {
    if(data.startsWith('true'))
        return [true, data.slice(4)];
    else if(data.startsWith('false'))
        return [false, data.slice(5)];
}

//Number Parser
function parseNumber(data) {
    var check = /[+-]?[0-9]*\.?[0-9]+(?:[Ee][+-]?[0-9]+)?/;
    if(data.match(check)) {
        var num = data.match(check);
        return [Number(num[0]), data.slice(num[0].length)];
    }    
}

//String Parser
function parseString(data) {

}

console.log(parseNumber('+4.HelloThere'));
