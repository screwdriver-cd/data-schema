'use strict';

const { assert } = require('chai');
const { config } = require('../..');
const { validate } = require('../helper');

describe('config workflowGraph', () => {
    describe('workflowGraph', () => {
        it('validates safely', () => {
            assert.isNull(validate('config.workflowGraph.yaml', config.workflowGraph.workflowGraph).error);
        });

        it('allows extra fields', () => {
            assert.isNull(validate('config.workflowGraph.unknown.yaml', config.workflowGraph.workflowGraph).error);
        });
    });
});
