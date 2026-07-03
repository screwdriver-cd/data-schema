'use strict';

const { assert } = require('chai');
const { models } = require('../..');
const { validate } = require('../helper');

describe('model user', () => {
    describe('base', () => {
        it('validates the base', () => {
            assert.isNull(validate('user.yaml', models.user.base).error);
        });
    });

    describe('create', () => {
        it('validates the create', () => {
            assert.isNull(validate('user.create.yaml', models.user.create).error);
        });

        it('fails the create', () => {
            assert.isNotNull(validate('empty.yaml', models.user.create).error);
        });
    });

    describe('get', () => {
        it('validates the get', () => {
            assert.isNull(validate('user.get.yaml', models.user.get).error);
        });

        it('fails the get', () => {
            assert.isNotNull(validate('empty.yaml', models.user.get).error);
        });

        it('fails the get when there are unknow fields in the user settings', () => {
            assert.isNotNull(validate('user.get.invalid-settings.yaml', models.user.get).error);
        });
    });

    describe('update', () => {
        it('validates the update', () => {
            assert.isNull(validate('user.update.yaml', models.user.update).error);
        });

        it('fails the update', () => {
            assert.isNotNull(validate('empty.yaml', models.user.update).error);
        });

        it('fails the update with displayJobLength=null', () => {
            assert.isNotNull(validate('user.update.displayJobLength-null.yaml', models.user.update).error);
        });

        it('fails the update with displayJobLength=19', () => {
            assert.isNotNull(validate('user.update.displayJobLength-19.yaml', models.user.update).error);
        });

        it('validates the update with displayJobLength=20', () => {
            assert.isNotNull(validate('user.update.displayJobLength-20.yaml', models.user.update).error);
        });

        it('validates the update with displayJobLength=99', () => {
            assert.isNotNull(validate('user.update.displayJobLength-99.yaml', models.user.update).error);
        });

        it('fails the update with displayJobLength=100', () => {
            assert.isNotNull(validate('user.update.displayJobLength-100.yaml', models.user.update).error);
        });

        it('fails the update with invalid timestampFormat', () => {
            assert.isNotNull(validate('user.update.invalidTimestampFormat.yaml', models.user.update).error);
        });

        it('fails the update with invalid allowNotification', () => {
            assert.isNotNull(validate('user.update.invalidAllowNotification.yaml', models.user.update).error);
        });
    });
});
