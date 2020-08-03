'use strict';

const Joi = require('@hapi/joi');
const Regex = require('../config/regex');

const SCHEMA_USER = Joi.object().keys({
    url: Joi.string()
        .uri()
        .allow('')
        .optional()
        .label('Link to Profile')
        .example('https://github.com/stjohnjohnson'),

    name: Joi.string()
        .required()
        .label('Display Name')
        .example('Dao Lam'),

    username: Joi.string()
        .required()
        .label('Username')
        .example('d2lam'),

    avatar: Joi.string()
        .uri()
        .allow('')
        .optional()
        .label('Link to Avatar')
        .example('https://avatars.githubusercontent.com/u/622065?v=3')
}).label('SCM User');

const REPO_NAME = Joi.string()
    .required()
    .label('Organization and repository name')
    .example('screwdriver-cd/screwdriver');

const ROOT_DIR = Joi.string().max(100).allow('').optional()
    .description('Root directory (relative to checkoutUrl)')
    .example('src/app/component');

const SCHEMA_REPO = Joi.object().keys({
    name: REPO_NAME,

    branch: Joi.string()
        .required()
        .label('Branch of the repository')
        .example('master'),

    url: Joi.string()
        .uri()
        .required()
        .label('Link to Repository')
        .example('https://github.com/screwdriver-cd/screwdriver/tree/master'),

    rootDir: ROOT_DIR
}).label('SCM Repository');

const SCHEMA_COMMAND = Joi.object().keys({
    name: Joi.equal('sd-checkout-code')
        .required()
        .label('Command name')
        .example('sd-checkout-code'),

    command: Joi.string()
        .required()
        .label('Checkout command to run')
}).label('SCM Command');

const SCHEMA_COMMIT = Joi.object().keys({
    message: Joi.string()
        .required()
        .label('Commit message')
        .example('Fixing a bug with signing'),

    author: SCHEMA_USER
        .required()
        .label('Author of the commit'),

    committer: SCHEMA_USER
        .optional()
        .label('Committer of the commit'),

    url: Joi.string()
        .uri()
        .required()
        .label('Link to commit')
        .example('https://github.com/screwdriver-cd/screwdriver/commit/8843d7f92416211de')
}).label('SCM Commit');

const SCHEMA_PR = Joi.object().keys({
    url: Joi.string()
        .uri()
        .label('Link to PR')
        .example('https://github.com/screwdriver-cd/screwdriver/pull/1'),
    title: Joi.string()
        .max(512)
        .label('Title of the pull request'),
    ref: Joi.string()
        .allow('')
        .optional()
        .label('Ref of the pull request'),
    prSource: Joi.string()
        .allow('')
        .optional()
        .label('Origin of the pull request'),
    prBranchName: Joi.string()
        .allow('')
        .optional()
        .label('Branch name of the pull request'),
    createTime: Joi.date().iso()
        .label('Creation Time of the pull request')
        .example('2018-10-10T21:35:31Z'),
    username: Joi.string()
        .label('Username')
        .example('d2lam'),
    userProfile: Joi.string()
        .uri()
        .label('Link to Profile')
        .example('https://github.com/anonymous'),
    baseBranch: Joi.string()
        .label('Base branch of the pull request')
        .example('master')
}).label('SCM Pull Request');

const SCHEMA_HOOK = Joi.object().keys({
    action: Joi.string()
        .when('type', {
            is: 'pr',
            then: Joi.valid('opened', 'reopened', 'closed', 'synchronized')
        })
        .when('type', { is: 'repo', then: Joi.valid('push', 'release', 'tag') })
        .when('type', { is: 'ping', then: Joi.allow('').optional(), otherwise: Joi.required() })
        .label('Action of the event'),

    branch: Joi.string()
        .when('type', { is: 'ping', then: Joi.allow('').optional(), otherwise: Joi.required() })
        .label('Branch of the repository'),

    checkoutUrl: Joi
        .string().regex(Regex.CHECKOUT_URL)
        .required()
        .label('Checkout URL for the application')
        .example('git@github.com:screwdriver-cd/data-schema.git#master')
        .example('https://github.com/screwdriver-cd/data-schema.git#master'),

    hookId: Joi.string()
        .allow('')
        .optional()
        .label('Uuid of the event'),

    lastCommitMessage: Joi.string()
        .allow('')
        .optional()
        .label('Last commit message'),

    prNum: Joi.number()
        .integer()
        .positive()
        .optional()
        .label('PR number'),

    prRef: Joi.string()
        .allow('')
        .optional()
        .label('PR reference of the repository'),

    ref: Joi.string()
        .when('action',
            {
                is: Joi.valid('release', 'tag'),
                then: Joi.required(),
                otherwise: Joi.optional()
            })
        .label('reference of the repository'),

    prSource: Joi.string()
        .allow('')
        .when('type', {
            is: 'pr',
            then: Joi.valid('fork', 'branch')
        })
        .optional()
        .label('PR original source'),

    prTitle: Joi.string()
        .allow('')
        .optional()
        .label('PR title'),

    scmContext: Joi
        .string().max(128)
        .required()
        .description('The SCM in which the repository exists')
        .example('github:github.com'),

    sha: Joi.string().hex()
        .when('action',
            {
                is: Joi.valid('release', 'tag'),
                then: Joi.optional().allow('')
            })
        .concat(Joi.string().hex()
            .when('type',
                {
                    is: 'ping',
                    then: Joi.optional().allow('')
                }))
        .required()
        .label('Commit SHA')
        .example('ccc49349d3cffbd12ea9e3d41521480b4aa5de5f'),

    type: Joi.string()
        .valid('pr', 'repo', 'ping')
        .required()
        .label('Type of the event'),

    username: SCHEMA_USER.extract('username'),

    commitAuthors: Joi.array()
        .items(Joi.string().allow(''))
        .optional()
        .label('Commit authors'),

    releaseId: Joi.string()
        .allow('')
        .optional()
        .label('Release id'),

    releaseName: Joi.string()
        .allow('')
        .optional()
        .label('Name of the event'),

    releaseAuthor: Joi.string()
        .allow('')
        .optional()
        .label('Author of the event')

}).label('SCM Hook');

module.exports = {
    command: SCHEMA_COMMAND,
    commit: SCHEMA_COMMIT,
    repo: SCHEMA_REPO,
    repoName: REPO_NAME,
    rootDir: ROOT_DIR,
    user: SCHEMA_USER,
    hook: SCHEMA_HOOK,
    pr: SCHEMA_PR
};
