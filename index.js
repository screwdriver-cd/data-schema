'use strict';
const build = require('./model/build');
const job = require('./model/job');
const pipeline = require('./model/pipeline');
const platform = require('./model/platform');
const user = require('./model/user');
const pagination = require('./model/pagination');

module.exports = { build, job, pipeline, platform, user, pagination };
