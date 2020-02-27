'use strict';

const core = require('../core');
const Joi = require('joi');
const models = require('../models');
const Scm = require('../core/scm');

const buildStatus = Joi.reach(models.build.base, 'status').required();
const checkoutUrl = Joi.reach(models.pipeline.create, 'checkoutUrl').required();
const hook = core.scm.hook.required();
const jobName = Joi.reach(models.job.base, 'name').optional();
const pipelineId = Joi.reach(models.pipeline.base, 'id').optional();
const prNum = Joi.reach(core.scm.hook, 'prNum').allow(null).optional();
const rootDir = Scm.rootDir.optional();
const scmContext = Joi.reach(models.pipeline.base, 'scmContext').optional();
const scmRepo = Scm.repo.optional();
const scmUri = Joi.reach(models.pipeline.base, 'scmUri').required();
const sha = Joi.reach(models.build.base, 'sha').required();
const token = Joi.reach(models.user.base, 'token').required();
const type = Joi.reach(core.scm.hook, 'type').required();
const username = Joi.reach(models.user.base, 'username').required();

const ADD_WEBHOOK = Joi.object().keys({
    scmUri,
    token,
    webhookUrl: Joi.string().uri({
        scheme: [
            'http',
            'https'
        ]
    }),
    scmContext
}).required();

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
    prNum: Joi.reach(core.scm.hook, 'prNum').required(),
    comment: Joi.string().required(),
    scmContext
}).required();

const UPDATE_COMMIT_STATUS = Joi.object().keys({
    scmUri,
    token,
    sha,
    buildStatus,
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

module.exports = {
    /**
     * Properties for Scm Base that will be passed for the addWebhook method
     *
     * @property addWebhook
     * @type {Joi}
     */
    addWebhook: ADD_WEBHOOK,

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
    getBranchList: GET_BRANCH_LIST
};
