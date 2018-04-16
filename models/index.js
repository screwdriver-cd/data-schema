'use strict';

const banner = require('./banner');
const build = require('./build');
const event = require('./event');
const job = require('./job');
const pipeline = require('./pipeline');
const user = require('./user');
const secret = require('./secret');
const template = require('./template');
const templateTag = require('./templateTag');
const token = require('./token');
const trigger = require('./trigger');
const collection = require('./collection');
const command = require('./command');
const commandTag = require('./commandTag');

module.exports = {
    banner,
    build,
    event,
    job,
    pipeline,
    user,
    secret,
    template,
    templateTag,
    token,
    trigger,
    collection,
    command,
    commandTag
};
