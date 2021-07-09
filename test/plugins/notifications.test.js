'use strict';

const Joi = require('joi');
const { assert } = require('chai');
const notifications = require('../../plugins/notifications');
const { validate } = require('../helper');

describe('notifications test', () => {
    describe('schemaBuildData', () => {
        it('validates the schemaBuildData', () => {
            const schemaBuildData = Joi.object().keys({
                ...notifications.schemaBuildData
            });

            assert.isNull(validate('notifications.schemaBuildData.yaml', schemaBuildData).error);
        });

        it('fails the schemaBuildData for empty yaml', () => {
            const schemaBuildData = Joi.object().keys({
                ...notifications.schemaBuildData
            });

            assert.isNotNull(validate('empty.yaml', schemaBuildData).error);
        });
    });
});
