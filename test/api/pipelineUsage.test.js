'use strict';

const { assert } = require('chai');
const { api } = require('../..');
const { validate } = require('../helper');

describe('api get pipelineUsage', () => {
    const schema = api.pipelineUsage.get;

    describe('basic', () => {
        it('accepts response', () => {
            assert.isNull(validate('api.pipelineUsage.yaml', inputSchema).error);
        });

        it('accepts null lastRun', () => {
            assert.isNull(validate('api.pipelineUsage.null-date.yaml', inputSchema).error);
        });

        it('rejects null name', () => {
            assert.isOk(validate('api.pipelineUsage.null-name.yaml', inputSchema).error);
        });
    });
});
