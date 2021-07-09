'use strict';

const { assert } = require('chai');
const { config } = require('../..');
const { validate } = require('../helper');

describe('config command', () => {
    describe('command', () => {
        it('validates safely', () => {
            assert.isNull(validate('config.command.yaml', config.command.schemaCommand).error);
        });

        it('returns error when invalid format in command', () => {
            assert.isNotNull(validate('config.command.bad.yaml', config.command.schemaCommand).error);
        });
    });
});
