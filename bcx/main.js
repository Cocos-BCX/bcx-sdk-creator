'use strict';

const fse = require('fs-extra');
const Path = require("path");

module.exports = {
    messages: {
        'install': function() {
            const srcFolder = Path.join(__dirname, 'plugin');
            const destFolder = Path.join(Editor.projectInfo.path, 'assets');
            fse.copySync(srcFolder, destFolder);
            Editor.log('BCX plugin is installed to assets');
        }
    },
};

