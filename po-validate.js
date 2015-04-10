var po2json = require("po2json"),
    fs      = require("fs"),
    red     = "\u001b[31m",
    green   = "\u001b[32m",
    reset   = "\u001b[0m";

if (process.argv.length !== 3) {
    console.log(red + "Usage: node po-validate.js POFILE" + reset);
    process.exit(1);
}

if (!fs.existsSync(process.argv[2]) || !fs.statSync(process.argv[2]).isFile()) {
    console.log(red + "Error: Can't find file - " + process.argv[2] + reset);
    process.exit(1);
}

var validateUnindexed = function(orig, trans) {
    var _ref1, _ref2;
    return ((_ref1 = orig.match(/%[sd@]/g)) != null ? _ref1.toString() : void 0) === ((_ref2 = trans.match(/%[sd@]/g)) != null ? _ref2.toString() : void 0);
};

var validateIndexed = function(orig, trans) {
    var _ref1, _ref2,
    _reg = /%[0-9]+\\?\$[sd@]/g;
    return ((_ref1 = orig.match(_reg)) != null ? _ref1.sort().toString() : void 0) === ((_ref2 = trans.match(_reg)) != null ? _ref2.sort().toString() : void 0);
};

// main
fs.readFile(process.argv[2], function (err, buffer) {
    var errors = {};
    var jsonData = po2json.parse(buffer, { fuzzy: false });
    for (var line in jsonData) {
        if (!Array.isArray(jsonData[line])) continue;
        if (jsonData[line][1] === "")       continue;

        if (!validateUnindexed(line, jsonData[line][1]) ||
            !validateIndexed(line, jsonData[line][1])) {

            errors[line] = jsonData[line][1];
        }
    }

    if (Object.keys(errors).length === 0) {
        console.log(green + "No Validation Error Detected!" + reset);
    } else {
        console.log(red + "Validation Error Detected!" + reset);
        for (var errorKey in errors) {
            console.log(red + "Error:\n", errorKey, "\n", errors[errorKey], "\n\n" + reset);
        }
    }
});
