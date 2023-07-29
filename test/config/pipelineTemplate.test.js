'use strict';

const { assert } = require('chai');
const { config } = require('../..');
const { validate } = require('../helper');

describe('config pipelineTemplate', () => {
    describe('pipelineTemplate', () => {
        it('validates safely', () => {
            assert.isNull(validate('config.pipelineTemplate.yaml', config.pipelineTemplate.template).error);
        });

        it('returns error when no config key in template', () => {
            assert.isNotNull(validate('config.pipelineTemplate.bad.yaml', config.pipelineTemplate.template).error);
        });

        it('returns error when template namespace has bad format', () => {
            assert.isNotNull(
                validate('config.pipelineTemplate.badWithNamespace.yaml', config.pipelineTemplate.template).error
            );
        });

        it('returns error when template name has a slash', () => {
            assert.isNotNull(
                validate('config.pipelineTemplate.badWithName.yaml', config.pipelineTemplate.template).error
            );
        });
    });
});
