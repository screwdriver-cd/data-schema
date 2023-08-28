'use strict';

const { assert } = require('chai');
const { api } = require('../..');
const { validate } = require('../helper');

describe('api get pipelineUsage', () => {
    const schema = api.pipelineUsage.get;

    it('accepts response', () => {
        assert.isNull(validate('api.pipelineUsage.yaml', schema).error);
    });

    it('accepts null lastRun', () => {
        assert.isNull(validate('api.pipelineUsage.null-date.yaml', schema).error);
    });

    it('rejects null name', () => {
        assert.isOk(validate('api.pipelineUsage.null-name.yaml', schema).error);
    });

    it('accepts empty array', () => {
        assert.isNull(validate('api.pipelineUsage.empty-array.yaml', schema).error);
    });
});
