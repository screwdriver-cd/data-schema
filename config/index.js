'use strict';

const annotations = require('./annotations');
const base = require('./base');
const command = require('./command');
const commandFormat = require('./commandFormat');
const job = require('./job');
const parameters = require('./parameters');
const provider = require('./provider');
const regex = require('./regex');
const settings = require('./settings');
const template = require('./template');
const tokenConfig = require('./tokenConfig');
const workflowGraph = require('./workflowGraph');

module.exports = {
    annotations,
    base,
    command,
    commandFormat,
    job,
    parameters,
    provider,
    regex,
    settings,
    template,
    tokenConfig,
    workflowGraph
};
