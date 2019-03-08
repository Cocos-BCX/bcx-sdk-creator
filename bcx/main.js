'use strict';

const fse = require('fs-extra');
const Path = require("path");
const { shell } = require('electron')

module.exports = {
    messages: {
        'install': function() {
            const srcFolder = Path.join(__dirname, 'plugin');
            const destFolder = Path.join(Editor.projectInfo.path, 'assets');
            fse.copySync(srcFolder, destFolder);
            Editor.log('BCX plugin is installed to assets');
        },
        "help": function() {
            shell.openExternal('https://github.com/sdkbox/bcx-sdk-creator/blob/master/readme.md');
        }
    },
};

