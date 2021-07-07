'use strict';

const { assert } = require('chai');
const queue = require('../../plugins/queue');
const { validate } = require('../helper');

describe('executor test', () => {
    describe('start', () => {
        it('validates the start', () => {
            assert.isNull(validate('queue.start.yaml', queue.start).error);
        });

        it('fails the start for empty yaml', () => {
            assert.isNotNull(validate('empty.yaml', queue.start).error);
        });
    });
});
