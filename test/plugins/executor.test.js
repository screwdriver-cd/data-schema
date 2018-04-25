'use strict';

const assert = require('chai').assert;
const executor = require('../../plugins/executor');
const validate = require('../helper').validate;
const joi = require('joi');
const pipelineMock = {
    id: 123,
    scmUri: 'github.com:12345:branchName',
    scmContext: 'github:github.com',
    createTime: '2038-01-19T03:14:08.131Z',
    admins: {
        foobar: true
    }
};
const jobMock = {
    id: 1234,
    pipelineId: 123,
    name: 'deploy',
    state: 'ENABLED'
};
const tokenGen = () => true;

describe('executor test', () => {
    describe('start', () => {
        it('validates the start', () => {
            assert.isNull(validate('executor.start.yaml', executor.start).error);
        });

        it('validates the start with no annotations', () => {
            assert.isNull(validate('executor.startNoAnnotations.yaml', executor.start).error);
        });

        it('fails the start for empty yaml', () => {
            assert.isNotNull(validate('empty.yaml', executor.start).error);
        });
    });

    describe('stop', () => {
        it('validates the stop', () => {
            assert.isNull(validate('executor.stop.yaml', executor.stop).error);
        });

        it('fails the stop', () => {
            assert.isNotNull(validate('empty.yaml', executor.stop).error);
        });
    });

    describe('startPeriodic', () => {
        it('validates the startPeriodic', () => {
            assert.isNull(joi.validate({
                pipeline: pipelineMock,
                job: jobMock,
                tokenGen,
                update: false
            }, executor.startPeriodic).error);
        });

        it('fails the start for empty object', () => {
            assert.isNotNull(joi.validate({}, executor.startPeriodic).error);
        });
    });

    describe('stopPeriodic', () => {
        it('validates the stopPeriodic', () => {
            assert.isNull(joi.validate({ jobId: 1 }, executor.stopPeriodic).error);
        });

        it('fails the stopPeriodic', () => {
            assert.isNotNull(joi.validate({}, executor.stopPeriodic).error);
        });
    });

    describe('status', () => {
        it('validates the status', () => {
            assert.isNull(validate('executor.status.yaml', executor.status).error);
        });

        it('fails the status', () => {
            assert.isNotNull(validate('empty.yaml', executor.status).error);
        });
    });
});
