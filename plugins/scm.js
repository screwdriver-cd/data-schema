'use strict';

const core = require('../core');
const Joi = require('joi');
const models = require('../models');
const Scm = require('../core/scm');
const Regex = require('../config/regex');

const checkoutUrl = models.pipeline.create.extract('checkoutUrl').required();
const hook = core.scm.hook.required();
const jobName = models.job.base.extract('name').optional();
const pipelineId = models.pipeline.base.extract('id').optional();
const prNum = core.scm.hook.extract('prNum').allow(null).optional();
const rootDir = Scm.rootDir.optional();
const scmContext = models.pipeline.base.extract('scmContext').optional();
const scmRepo = Scm.repo.optional();
const scmUri = models.pipeline.base.extract('scmUri').required();
const sha = models.build.base.extract('sha').required();
const token = models.user.base.extract('token').required();
const type = core.scm.hook.extract('type').required();
const username = models.user.base.extract('username').required();

const githubStatus = [
    'PENDING',
    'SUCCESS',
    'FAILURE'
];

const ADD_WEBHOOK = Joi.object().keys({
    scmUri,
    token,
    actions: Joi.array().items(Joi.string()),
    webhookUrl: Joi.string().uri({
        scheme: [
            'http',
            'https'
        ]
    }),
    scmContext
}).required();

const ADD_DEPLOY_KEY = Joi.object().keys({
    checkoutUrl: Joi
        .string().regex(Regex.CHECKOUT_URL),
    token,
    scmContext
});

const PARENT_CONFIG = Joi.object().keys({
    branch: Joi.string().required(),
    host: Joi.string().required(),
    org: Joi.string().required(),
    repo: Joi.string().required(),
    sha: Joi.string().required()
});
const GET_CHECKOUT_COMMAND = Joi.object().keys({
    branch: Joi.string().required(),
    host: Joi.string().required(),
    org: Joi.string().required(),
    repo: Joi.string().required(),
    sha: Joi.string().required(),
    prRef: Joi.string().optional(),
    prSource: Joi.string().optional(),
    prBranchName: Joi.string().optional(),
    commitBranch: Joi.string().optional(),
    manifest: Joi.string().optional(),
    parentConfig: PARENT_CONFIG.optional(),
    scmContext,
    rootDir
}).required();

const GET_PERMISSIONS = Joi.object().keys({
    scmUri,
    token,
    scmContext,
    scmRepo
}).required();

const GET_ORG_PERMISSIONS = Joi.object().keys({
    token,
    scmContext,
    organization: Joi.string().required(),
    username
}).required();

const GET_COMMIT_SHA = Joi.object().keys({
    scmUri,
    token,
    prNum,
    scmContext,
    scmRepo
}).required();

const GET_COMMIT_REF_SHA = Joi.object().keys({
    token,
    owner: Joi.string().required(),
    repo: Joi.string().required(),
    ref: Joi.string().required(),
    refType: Joi.string().required(),
    scmContext
}).required();

const ADD_PR_COMMENT = Joi.object().keys({
    scmUri,
    token,
    prNum: core.scm.hook.extract('prNum').required(),
    comment: Joi.string().required(),
    scmContext
}).required();

const UPDATE_COMMIT_STATUS = Joi.object().keys({
    scmUri,
    token,
    sha,
    buildStatus: Joi.string().valid(...githubStatus),
    jobName,
    url: Joi.string().uri().required(),
    pipelineId,
    scmContext,
    context: Joi.string().max(100).optional(),
    description: Joi.string().max(200).optional()
}).required();

const GET_FILE = Joi.object().keys({
    scmUri,
    token,
    path: Joi.string().required(),
    ref: Joi.string().optional(),
    scmContext,
    scmRepo
}).required();

const GET_CHANGED_FILES_INPUT = Joi.object().keys({
    type,
    payload: Joi.object().allow(null).required(),
    token,
    scmContext,
    scmUri: scmUri.optional(),
    prNum
}).required();

const GET_CHANGED_FILES_OUTPUT = Joi.alternatives().try(
    Joi.array().items(Joi.string()).required(),
    null
);

const PARSE_HOOK = Joi.alternatives().try(
    hook,
    null
);

const DECORATE_URL = Joi.object().keys({
    scmUri,
    token,
    scmContext,
    scmRepo
}).required();

const DECORATE_COMMIT = Joi.object().keys({
    scmUri,
    sha,
    token,
    scmContext
}).required();

const DECORATE_AUTHOR = Joi.object().keys({
    username,
    token,
    scmContext
}).required();

const PARSE_URL = Joi.object().keys({
    checkoutUrl,
    rootDir,
    token,
    scmContext
}).required();

const GET_BRANCH_LIST = Joi.object().keys({
    scmUri,
    token,
    scmContext
}).required();

const OPEN_PR = Joi.object().keys({
    checkoutUrl,
    token,
    files: Joi.array().items(
        Joi.object().keys({
            name: Joi.string().required(),
            content: Joi.string().required()
        })
    ).min(1).required(),
    scmContext,
    title: Joi.string().required(),
    message: Joi.string().required()
}).required();

module.exports = {
    /**
     * Properties for Scm Base that will be passed for the addWebhook method
     *
     * @property addWebhook
     * @type {Joi}
     */
    addWebhook: ADD_WEBHOOK,

    /**
     * Properties for Scm Base that will be passed for the addDeployKey method
     *
     * @property addDeployKey
     * @type {Joi}
     */
    addDeployKey: ADD_DEPLOY_KEY,

    /**
     * Properties for Scm Base that will be passed for the getPermissions method
     *
     * @property getPermissions
     * @type {Joi}
     */
    getPermissions: GET_PERMISSIONS,

    /**
     * Properties for Scm Base that will be passed for the getOrgPermissions method
     *
     * @property getOrgPermissions
     * @type {Joi}
     */
    getOrgPermissions: GET_ORG_PERMISSIONS,

    /**
     * Properties for Scm Base that will be passed for the getCommitSha method
     *
     * @property getCommitSha
     * @type {Joi}
     */
    getCommitSha: GET_COMMIT_SHA,

    /**
     * Properties for Scm Base that will be passed for the getCommitSRefha method
     *
     * @property getCommitRefSha
     * @type {Joi}
     */
    getCommitRefSha: GET_COMMIT_REF_SHA,

    /**
     * Properties for Scm Base that will be passed for the addPrComment method
     *
     * @property addPrComment
     * @type {Joi}
     */
    addPrComment: ADD_PR_COMMENT,

    /**
     * Properties for Scm Base that will be passed for the updateCommitStatus method
     *
     * @property updateCommitStatus
     * @type {Joi}
     */
    updateCommitStatus: UPDATE_COMMIT_STATUS,

    /**
     * Properties for Scm Base that will be passed out of the parseHook method
     *
     * @property parseHookOutput
     * @type {Joi}
     */
    parseHookOutput: PARSE_HOOK,

    /**
     * Properties for Scm Base that will be passed into the getChangedFiles method
     *
     * @property getChangedFilesInput
     * @type {Joi}
     */
    getChangedFilesInput: GET_CHANGED_FILES_INPUT,

    /**
     * Properties for Scm Base that will be passed out of the getChangedFiles method
     *
     * @property getChangedFilesOutput
     * @type {Joi}
     */
    getChangedFilesOutput: GET_CHANGED_FILES_OUTPUT,

    /**
     * Properties for Scm Base that will be passed for the getFile method
     *
     * @property getFile
     * @type {Joi}
     */
    getFile: GET_FILE,

    /**
     * Properties for Scm Base that will be passed for the decorateUrl method
     *
     * @property decorateUrl
     * @type {Joi}
     */
    decorateUrl: DECORATE_URL,

    /**
     * Properties for Scm Base that will be passed for the decorateCommit method
     *
     * @property decorateCommit
     * @type {Joi}
     */
    decorateCommit: DECORATE_COMMIT,

    /**
     * Properties for Scm Base that will be passed for the decorateAuthor method
     *
     * @property decorateAuthor
     * @type {Joi}
     */
    decorateAuthor: DECORATE_AUTHOR,

    /**
     * Properties for Scm Base that will be passed for the parseUrl method
     *
     * @property parseUrl
     * @type {Joi}
     */
    parseUrl: PARSE_URL,

    /**
     * Properties for Scm Base that will be passed for the getCheckoutCommand method
     *
     * @property getCheckoutCommand
     * @type {Joi}
     */
    getCheckoutCommand: GET_CHECKOUT_COMMAND,

    /**
     * Properties for Scm Base that will be passed for the getBranchList method
     *
     * @property getBranchList
     * @type {Joi}
     */
    getBranchList: GET_BRANCH_LIST,

    /**
     * Properties for Scm Base that will be passed for the openPr method
     *
     * @property openPr
     * @type {Joi}
     */
    openPr: OPEN_PR
};
