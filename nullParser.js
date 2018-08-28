var tokens = [];

function parse(str) {
    
}

function parseNull(data) {
    if(data.startsWith('null'))
        return [null, data.slice(4)];
}

function parseBool(data) {
    if(data.startsWith('true'))
        return [true, data.slice(4)];
    else if(data.startsWith('false'))
        return [false, data.slice(5)];
}

function parseNumber(data) {
    var check = /^\d+/;
    if(data.match(check)) {
        var num = data.match(check);
        return [Number(num[0]), data.slice(num[0].length)];
    }    
}

function parseString(data) {

}

console.log(parseNumber('12345truefalsenull'));