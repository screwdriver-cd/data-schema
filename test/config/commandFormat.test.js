'use strict';

const assert = require('chai').assert;
const config = require('../../').config;
const validate = require('../helper').validate;

describe('config commandFormat', () => {
    describe('habitat', () => {
        it('validates safely', () => {
            assert.isNull(validate('config.commandFormat.habitat.yaml',
                config.commandFormat.habitat).error);
        });

        it('returns error when bad mode in habitat format', () => {
            assert.isNotNull(validate('config.commandFormat.habitat.bad.yaml',
                config.commandFormat.habitat).error);
        });
    });

    describe('docker', () => {
        it('validates safely', () => {
            assert.isNull(validate('config.commandFormat.docker.yaml',
                config.commandFormat.docker).error);
        });

        it('returns error when no image in docker format', () => {
            assert.isNotNull(validate('config.commandFormat.docker.bad.yaml',
                config.commandFormat.docker).error);
        });
    });

    describe('binary', () => {
        it('validates safely', () => {
            assert.isNull(validate('config.commandFormat.binary.yaml',
                config.commandFormat.binary).error);
        });

        it('returns error when no file in binary format', () => {
            assert.isNotNull(validate('config.commandFormat.binary.bad.yaml',
                config.commandFormat.binary).error);
        });
    });
});
