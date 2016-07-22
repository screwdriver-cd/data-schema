'use strict';
const assert = require('chai').assert;
const executor = require('../../plugins/executor');
const validate = require('../helper').validate;

describe('executor test', () => {
    describe('start', () => {
        it('validates the get', () => {
            assert.isNull(validate('executor.start.yaml', executor.start).error);
        });

        it('fails the get for empty yaml', () => {
            assert.isNotNull(validate('empty.yaml', executor.start).error);
        });
    });

    describe('stop', () => {
        it('validates the update', () => {
            assert.isNull(validate('executor.stop.yaml', executor.stop).error);
        });

        it('fails the update', () => {
            assert.isNotNull(validate('empty.yaml', executor.stop).error);
        });
    });

    describe('stream', () => {
        it('validates the save', () => {
            assert.isNull(validate('executor.stream.yaml', executor.stream).error);
        });

        it('fails the save', () => {
            assert.isNotNull(validate('empty.yaml', executor.stream).error);
        });
    });
});
