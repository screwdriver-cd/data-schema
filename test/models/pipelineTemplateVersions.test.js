'use strict';

const { assert } = require('chai');
const { models } = require('../..');
const { validate } = require('../helper');

describe('model template', () => {
    describe('base', () => {
        it('validates the base', () => {
            assert.isNull(validate('pipelineTemplateVersions.yaml', models.pipelineTemplateVersions.base).error);
        });
    });

    describe('get', () => {
        it('validates the get with all fields', () => {
            assert.isNull(
                validate('pipelineTemplateVersions.get.allFields.yaml', models.pipelineTemplateVersions.get).error
            );
        });

        it('validates the get without optional fields', () => {
            assert.isNull(
                validate('pipelineTemplateVersions.get.withoutOptionalFields.yaml', models.pipelineTemplateVersions.get)
                    .error
            );
        });

        it('fails the get', () => {
            assert.isNotNull(validate('empty.yaml', models.pipelineTemplateVersions.get).error);
        });
    });
});
