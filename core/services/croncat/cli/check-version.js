/**
    this utility inspired by:
    https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-cli
    https://github.com/npm/cli
 */
import updateNotifier from 'update-notifier'
import chalk from 'chalk' // colorize output
import isCI from 'is-ci' // avoid output if running in CI server

import pkg from '../package.json' assert { type: "json" }

// updateCheckInterval is measured in seconds
const UPDATE_CHECK_INTERVAL_SECONDS = 1;

/**
    check the current version of croncat CLI against latest as published on npm
 */
export async function checkVersion() {
    const notifier = updateNotifier({ pkg, updateCheckInterval: UPDATE_CHECK_INTERVAL_SECONDS });

    if (
        notifier.update &&
        notifier.update.latest !== pkg.version &&
        !isCI
    ) {
        const { type: diff, current, latest } = notifier.update;
        const update = normalizePhrasingOf(diff);
        const updateCommand = '{updateCommand}';
        const message = chalk`croncat CLI has a ${update} available {dim ${current}} → {green ${latest}}
Run {cyan ${updateCommand}} to avoid unexpected behavior`;

        const boxenOpts = {
            padding: 1,
            margin: 1,
            align: 'left',
            borderColor: 'yellow',
            borderStyle: 'round'
        };

        notifier.notify({ message, boxenOpts });
    }
};


/**
    semver-diff always returns undefined or 1 word
    but this doesn't read well in English ouput

    see: https://www.npmjs.com/package/semver-diff
 */
function normalizePhrasingOf(text) {
    let update = 'new version'; // new version available

    switch (text) {
    case 'major': // major update available
    case 'minor': // minor update available
        update = `${text} update`;
        break;
    case 'patch':
        update = text; // patch available
        break;
    case 'build':
        update = `new ${text}`; // new build available
        break;
    default: // [ prepatch | premajor | preminor | prerelease ] available
        update = text;
    }

    return update;
}
