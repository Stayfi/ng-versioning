var replace = require("replace-in-file");
var semver = require("semver");
var pjson = require("./package.json");
var fs = require("fs");

var major = 0;
var minor = 0;
var fix = 0;
var versionNumber;
var fgGreen = "\x1b[32m";
var clReset = "\x1b[0m";
var fgRed = "\x1b[31m\x1b[1m";
var fgYellow = "\x1b[93m";
var fgBlue = "\x1b[34m";

var args = process.argv.slice(2);

if (!args.length || args.length < 2) {
    help();
} else {
    menu(args);
}

if (versionNumber) {
    updateFile("package.json", "'", "");
    updateFile("src/environments/environment.ts", "\"", "DEV");
    updateFile("src/environments/environment.prod.ts", "\"", "");
}

function menu(args) {
    switch (args[0]) {
        case "bump":
            extractSemver(pjson.version);
            switch (args[1]) {
                case "major":
                    major++;
                    break;
                case "minor":
                    minor++;
                    break;
                case "fix":
                    fix++;
                    break;
            }
            versionNumber = major + "." + minor + "." + fix;
            break;
        case "set":
            if (semver.valid(args[1])) {
                extractSemver(args[1]);
                versionNumber = major + "." + minor + "." + fix;
            } else {
                notSemVer(args[1]);
            }
            break;
    }
}

function updateFile(file, versionFilter, prefix) {
    if (fs.stat(file, function(err, stats) {
            if (err) {
                console.log(fgRed + file + fgYellow + " not found" + clReset);
            } else {
                var newVersion = versionNumber + ((prefix !== "") ? "-" + prefix : "");
                var from = /("version"\s*:\s*")([^"]+)(")/;
                var to = "\"version\": \"" + newVersion + "\"";
                if (versionFilter == "\"") {
                    from = /(version\s*:\s*')([^']+)(')/;
                    to = "version: '" + newVersion + "'";
                }
                if (!err && stats.isFile()) {
                    var options = {
                        files: file,
                        from: from,
                        to: to,
                        allowEmptyPaths: false
                    };
                    try {
                        changedFile = replace.sync(options);
                        console.log(fgGreen + changedFile[0] + clReset + " updated to version : " + fgBlue + newVersion + clReset);
                    } catch (error) {
                        console.error(fgRed + "Error occurred:" + clReset, error);
                    }
                }
            }
        }));
}

function help() {
    return console.log([
        "ngVersioning",
        "Options:",
        " bump <major/minor/fix>      bump version",
        " set <version>               set version"
    ].join("\n"));
}

function notSemVer(version) {
    return console.log(fgRed + version + " is not a valid semver number" + clReset + "\n");
}

function extractSemver(version) {
    var _ver = version.split(".");
    major = _ver[0];
    minor = _ver[1];
    fix = _ver[2];
}