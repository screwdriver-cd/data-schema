'use strict';
const assert = require('chai').assert;
const config = require('../../').config;
const validate = require('../helper').validate;

describe('config workflow', () => {
    describe('workflow', () => {
        it('validates safely', () => {
            assert.isNull(validate('config.workflow.yaml', config.workflow.workflow).error);
        });
    });
});
