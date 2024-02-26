'use strict';

const Joi = require('joi');

// List of data, eventually key-value pairs
const SCHEMA_ANNOTATIONS = Joi.object().optional();
// for check warnAnnotations
const RESERVED_JOB_ANNOTATIONS = [
    'screwdriver.cd/buildCluster',
    'screwdriver.cd/buildPeriodically',
    'screwdriver.cd/collapseBuilds',
    'screwdriver.cd/cpu',
    'screwdriver.cd/disk',
    'screwdriver.cd/diskSpeed',
    'screwdriver.cd/executor',
    'screwdriver.cd/ram',
    'screwdriver.cd/repoManifest',
    'screwdriver.cd/timeout',
    'screwdriver.cd/dockerEnabled',
    'screwdriver.cd/dockerCpu',
    'screwdriver.cd/dockerRam',
    'screwdriver.cd/coverageScope',
    'screwdriver.cd/terminationGracePeriodSeconds',
    'screwdriver.cd/displayName',
    'screwdriver.cd/mergeSharedSteps',
    'screwdriver.cd/manualStartEnabled',
    'screwdriver.cd/blockedBySameJob',
    'screwdriver.cd/blockedBySameJobWaitTime',
    'screwdriver.cd/jobDisabledByDefault',
    'screwdriver.cd/virtual'
];
const RESERVED_PIPELINE_ANNOTATIONS = [
    'screwdriver.cd/buildCluster',
    'screwdriver.cd/restrictPR',
    'screwdriver.cd/chainPR',
    'screwdriver.cd/pipelineDescription',
    'screwdriver.cd/useDeployKey'
];

/**
 * The definition of the annotations pieces
 * @type {Object}
 */
module.exports = {
    annotations: SCHEMA_ANNOTATIONS,
    reservedJobAnnotations: RESERVED_JOB_ANNOTATIONS,
    reservedPipelineAnnotations: RESERVED_PIPELINE_ANNOTATIONS
};
