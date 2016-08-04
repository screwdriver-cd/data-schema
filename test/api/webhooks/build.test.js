'use strict';
const assert = require('chai').assert;
const api = require('../../../').api;
const validate = require('../../helper').validate;

describe('api webhooks build', () => {
    describe('validates', () => {
        it('meta and status', () => {
            assert.isNull(validate('webhooks.build.all.yaml', api.webhooks.build).error);
        });

        it('status and no meta', () => {
            assert.isNull(validate('webhooks.build.status.yaml', api.webhooks.build).error);
        });

        it('fails', () => {
            assert.isNotNull(validate('empty.yaml', api.webhooks.build).error);
        });
    });
});
