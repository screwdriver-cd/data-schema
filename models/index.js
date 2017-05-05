'use strict';

const build = require('./build');
const event = require('./event');
const job = require('./job');
const pipeline = require('./pipeline');
const user = require('./user');
const secret = require('./secret');
const template = require('./template');
const token = require('./token');

module.exports = { build, event, job, pipeline, user, secret, template, token };
