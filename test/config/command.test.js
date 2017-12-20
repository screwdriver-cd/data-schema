'use strict';

const assert = require('chai').assert;
const config = require('../../').config;
const validate = require('../helper').validate;

describe('config command', () => {
    describe('command', () => {
        it('validates safely', () => {
            assert.isNull(validate('config.command.yaml', config.command.schemaCommand).error);
        });

        it('returns error when invalid format in command', () => {
            assert.isNotNull(validate('config.command.bad.yaml',
                config.command.schemaCommand).error);
        });
    });
});
