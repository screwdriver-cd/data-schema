'use strict';

const { assert } = require('chai');
const { config } = require('../..');
const { validate } = require('../helper');

describe('config commandFormat', () => {
    describe('habitat', () => {
        it('remote mode validates safely', () => {
            assert.isNull(validate('config.commandFormat.habitat.remote.yaml', config.commandFormat.habitat).error);
        });

        it('local mode validates safely', () => {
            assert.isNull(validate('config.commandFormat.habitat.local.yaml', config.commandFormat.habitat).error);
        });

        it('returns error when bad mode in habitat format', () => {
            assert.isNotNull(validate('config.commandFormat.habitat.bad.yaml', config.commandFormat.habitat).error);
        });
    });

    describe('docker', () => {
        it('validates safely', () => {
            assert.isNull(validate('config.commandFormat.docker.yaml', config.commandFormat.docker).error);
        });

        it('returns error when invalid key in docker format', () => {
            assert.isNotNull(validate('config.commandFormat.docker.bad.yaml', config.commandFormat.docker).error);
        });
    });

    describe('binary', () => {
        it('validates safely', () => {
            assert.isNull(validate('config.commandFormat.binary.yaml', config.commandFormat.binary).error);
        });

        it('returns error when no file in binary format', () => {
            assert.isNotNull(validate('config.commandFormat.binary.bad.yaml', config.commandFormat.binary).error);
        });
    });
});
