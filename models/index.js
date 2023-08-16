'use strict';

const banner = require('./banner');
const build = require('./build');
const buildCluster = require('./buildCluster');
const step = require('./step');
const event = require('./event');
const job = require('./job');
const pipeline = require('./pipeline');
const pipelineTemplateVersions = require('./pipelineTemplateVersions');
const user = require('./user');
const secret = require('./secret');
const stage = require('./stage');
const stageBuild = require('./stageBuild');
const template = require('./template');
const templateMeta = require('./templateMeta');
const templateTag = require('./templateTag');
const token = require('./token');
const trigger = require('./trigger');
const collection = require('./collection');
const command = require('./command');
const commandTag = require('./commandTag');

module.exports = {
    banner,
    build,
    buildCluster,
    step,
    event,
    job,
    pipeline,
    pipelineTemplateVersions,
    user,
    secret,
    stage,
    stageBuild,
    template,
    templateMeta,
    templateTag,
    token,
    trigger,
    collection,
    command,
    commandTag
};
