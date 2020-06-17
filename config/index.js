'use strict';

const annotations = require('./annotations');
const base = require('./base');
const command = require('./command');
const commandFormat = require('./commandFormat');
const job = require('./job');
const regex = require('./regex');
const template = require('./template');
const workflowGraph = require('./workflowGraph');
const parameters = require('./parameters');
const tokenConfig = require('./tokenConfig');

module.exports = {
    annotations,
    base,
    command,
    commandFormat,
    job,
    regex,
    template,
    workflowGraph,
    parameters,
    tokenConfig
};
