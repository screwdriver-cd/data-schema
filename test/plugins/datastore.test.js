'use strict';

const assert = require('chai').assert;
const datastore = require('../../plugins/datastore');
const validate = require('../helper').validate;

describe('datastore test', () => {
    describe('get', () => {
        it('validates the get', () => {
            assert.isNull(validate('datastore.id.yaml', datastore.get).error);
        });

        it('fails the get for empty yaml', () => {
            assert.isNotNull(validate('empty.yaml', datastore.get).error);
        });
    });

    describe('update', () => {
        it('validates the update', () => {
            assert.isNull(validate('datastore.update.yaml', datastore.update).error);
        });

        it('fails the update', () => {
            assert.isNotNull(validate('empty.yaml', datastore.update).error);
        });
    });

    describe('save', () => {
        it('validates the save', () => {
            assert.isNull(validate('datastore.save.yaml', datastore.save).error);
        });

        it('fails the save', () => {
            assert.isNotNull(validate('empty.yaml', datastore.save).error);
        });
    });

    describe('remove', () => {
        it('validates the remove', () => {
            assert.isNull(validate('datastore.id.yaml', datastore.remove).error);
        });

        it('fails the remove', () => {
            assert.isNotNull(validate('empty.yaml', datastore.remove).error);
        });
    });

    describe('scan', () => {
        it('validates the update', () => {
            assert.isNull(validate('datastore.paginate.yaml', datastore.scan).error);
        });

        it('validates the update with all keys', () => {
            assert.isNull(validate('datastore.paginateFull.yaml', datastore.scan).error);
        });

        it('fails the update', () => {
            assert.isNotNull(validate('empty.yaml', datastore.scan).error);
        });
    });
});
