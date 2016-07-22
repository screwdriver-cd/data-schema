'use strict';
const build = require('./model/build');
const job = require('./model/job');
const pipeline = require('./model/pipeline');
const platform = require('./model/platform');
const user = require('./model/user');
const pagination = require('./model/pagination');
const datastore = require('./model/datastore');

module.exports = { build, job, pipeline, platform, user, pagination, datastore };
