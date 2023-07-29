'use strict';

const { assert } = require('chai');
const { models } = require('../..');
const { validate } = require('../helper');

describe('model template', () => {
    describe('base', () => {
        it('validates the base', () => {
            assert.isNull(validate('pipelineTemplate.yaml', models.templateMeta.base).error);
        });
    });

    describe('get', () => {
        it('validates the get with all fields', () => {
            assert.isNull(validate('templateMeta.get.allFields.yaml', models.templateMeta.get).error);
        });

        it('validates the get without optional fields', () => {
            assert.isNull(validate('templateMeta.get.withoutOptionalFields.yaml', models.templateMeta.get).error);
        });

        it('fails the get', () => {
            assert.isNotNull(validate('empty.yaml', models.templateMeta.get).error);
        });
    });
});
