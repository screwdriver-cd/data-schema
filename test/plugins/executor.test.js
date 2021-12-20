'use strict';

const { assert } = require('chai');
const executor = require('../../plugins/executor');
const { validate } = require('../helper');

describe('executor test', () => {
    describe('start', () => {
        it('validates the start', () => {
            assert.isNull(
                validate('executor.start.yaml', executor.start, {
                    tokenGen: () => {}
                }).error
            );
        });

        it('validates the start with no annotations', () => {
            assert.isNull(validate('executor.startNoAnnotations.yaml', executor.start).error);
        });

        it('fails the start for empty yaml', () => {
            assert.isNotNull(validate('empty.yaml', executor.start).error);
        });
    });

    describe('stop', () => {
        it('validates the stop', () => {
            assert.isNull(validate('executor.stop.yaml', executor.stop).error);
        });

        it('fails the stop', () => {
            assert.isNotNull(validate('empty.yaml', executor.stop).error);
        });
    });

    describe('status', () => {
        it('validates the status', () => {
            assert.isNull(validate('executor.status.yaml', executor.status).error);
        });

        it('fails the status', () => {
            assert.isNotNull(validate('empty.yaml', executor.status).error);
        });
    });
});
