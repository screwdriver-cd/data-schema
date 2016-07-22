'use strict';
const assert = require('chai').assert;
const model = require('../index');
const validate = require('./helper').validate;

describe('datastore test', () => {
    describe('get', () => {
        it('validates the get', () => {
            assert.isNull(validate('datastore.id.yaml', model.datastore.get).error);
        });

        it('fails the get for empty yaml', () => {
            assert.isNotNull(validate('empty.yaml', model.datastore.get).error);
        });
    });

    describe('update', () => {
        it('validates the update', () => {
            assert.isNull(validate('datastore.data.yaml', model.datastore.update).error);
        });

        it('fails the update', () => {
            assert.isNotNull(validate('empty.yaml', model.datastore.update).error);
        });
    });

    describe('save', () => {
        it('validates the save', () => {
            assert.isNull(validate('datastore.data.yaml', model.datastore.save).error);
        });

        it('fails the save', () => {
            assert.isNotNull(validate('empty.yaml', model.datastore.save).error);
        });
    });

    describe('remove', () => {
        it('validates the remove', () => {
            assert.isNull(validate('datastore.id.yaml', model.datastore.remove).error);
        });

        it('fails the remove', () => {
            assert.isNotNull(validate('empty.yaml', model.datastore.remove).error);
        });
    });

    describe('scan', () => {
        it('validates the update', () => {
            assert.isNull(validate('datastore.paginate.yaml', model.datastore.scan).error);
        });

        it('fails the update', () => {
            assert.isNotNull(validate('empty.yaml', model.datastore.scan).error);
        });
    });
});
