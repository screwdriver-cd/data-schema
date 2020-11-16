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

        it('validates the update with multiple search fields', () => {
            assert.isNull(validate('datastore.search.multipleFields.yaml', datastore.scan).error);
        });

        it('validates the update with multiple search keywords', () => {
            assert.isNull(validate('datastore.search.multipleKeywords.yaml', datastore.scan).error);
        });

        it('validates the update with all keys', () => {
            assert.isNull(validate('datastore.paginateFull.yaml', datastore.scan).error);
        });

        it('validates the exclude and groupBy options', () => {
            assert.isNull(validate('datastore.groupBy.yaml', datastore.scan).error);
        });

        it('validates the startTime and endTime options', () => {
            assert.isNull(validate('datastore.startTime.yaml', datastore.scan).error);
        });

        it('validates the aggregationField option', () => {
            assert.isNull(validate('datastore.aggregationField.yaml', datastore.scan).error);
        });

        it('fails the update', () => {
            assert.isNotNull(validate('empty.yaml', datastore.scan).error);
        });
    });

    describe('query', () => {
        it('validates the query', () => {
            assert.isNull(validate('datastore.query.yaml', datastore.query).error);
        });

        it('validates the query with replacements', () => {
            assert.isNull(validate('datastore.query.replacements.yaml', datastore.query).error);
        });

        it('validates the query with rawResponse', () => {
            assert.isNull(validate('datastore.query.rawResponse.yaml', datastore.query).error);
        });

        it('fails the query', () => {
            assert.isNotNull(validate('empty.yaml', datastore.query).error);
        });
    });
});
