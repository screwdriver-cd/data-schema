'use strict';

const { assert } = require('chai');
const { config } = require('../..');
const { validate } = require('../helper');

describe('config template', () => {
    describe('template', () => {
        it('validates safely', () => {
            assert.isNull(validate('config.template.yaml', config.template.template).error);
        });

        it('validates safely with namespace', () => {
            assert.isNull(validate('config.template.withNamespace.yaml', config.template.template).error);
        });

        it('returns error when no config key in template', () => {
            assert.isNotNull(validate('config.template.bad.yaml', config.template.template).error);
        });

        it('returns error when config.image or config.steps not in template', () => {
            assert.isNotNull(validate('config.template.badConfig.yaml', config.template.template).error);
        });

        it('returns error when template namespace has bad format', () => {
            assert.isNotNull(validate('config.template.badWithNamespace.yaml', config.template.template).error);
        });

        it('returns error when template name has more than one slash', () => {
            assert.isNotNull(validate('config.template.badName.yaml', config.template.template).error);
        });

        it('returns error when template namespace exists and name has a slash', () => {
            assert.isNotNull(validate('config.template.badNameWithSlash.yaml', config.template.template).error);
        });
    });
});
