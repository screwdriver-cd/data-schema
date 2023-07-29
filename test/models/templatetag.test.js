'use strict';

const { assert } = require('chai');
const { models } = require('../..');
const { validate } = require('../helper');

describe('model template tag', () => {
    describe('base', () => {
        it('validates the base', () => {
            assert.isNull(validate('templatetag.yaml', models.templateTag.base).error);
        });

        [null, '', 'some_invalid_type', 'JOBS', 'PIPELINES'].forEach(validType => {
            it('validates the invalid states', () => {
                assert.isNotNull(
                    validate('templatetag.yaml', models.templateTag.base, { templateType: validType }).error
                );
            });
        });

        ['JOB', 'PIPELINE'].forEach(validType => {
            it('validates the valid states', () => {
                assert.isNull(validate('templatetag.yaml', models.templateTag.base, { templateType: validType }).error);
            });
        });

        it('validates the base with namespace', () => {
            assert.isNull(validate('templatetag.withNamespace.yaml', models.templateTag.base).error);
        });
    });
});
