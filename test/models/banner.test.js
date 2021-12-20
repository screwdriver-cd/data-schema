'use strict';

const { assert } = require('chai');
const { models } = require('../..');
const { validate } = require('../helper');

describe('banner create', () => {
    describe('base', () => {
        it('validates the base', () => {
            assert.isNull(validate('banner.yaml', models.banner.base).error);
        });
    });

    describe('create', () => {
        it('validates the create', () => {
            assert.isNull(validate('banner.create.yaml', models.banner.create).error);
        });

        it('fails the create', () => {
            assert.isNotNull(validate('empty.yaml', models.banner.create).error);
        });
    });
    describe('get', () => {
        it('validates the get', () => {
            assert.isNull(validate('banner.get.yaml', models.banner.get).error);
        });

        it('fails the get', () => {
            assert.isNotNull(validate('empty.yaml', models.banner.get).error);
        });
    });
    describe('list', () => {
        it('validates the list', () => {
            assert.isNull(validate('banner.list.yaml', models.banner.list).error);
        });

        it('fails the list', () => {
            assert.isNotNull(validate('empty.yaml', models.banner.list).error);
        });
    });
    describe('update', () => {
        it('validates the update', () => {
            assert.isNull(validate('banner.update.yaml', models.banner.update).error);
        });

        it('fails the update', () => {
            assert.isNotNull(validate('empty.yaml', models.banner.update).error);
        });
    });
});
