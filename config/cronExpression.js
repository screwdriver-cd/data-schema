'use strict';

const cronParser = require('cron-parser');
const Joi = require('joi');

const sdCron = Joi.extend(joi => ({
    type: 'string',
    base: joi.string(),
    rules: {
        cron: {
            validate(value, helpers) {
                try {
                    const fields = value.trim().split(/\s+/);

                    if (fields.length !== 5) {
                        throw new Error(`${value} does not have exactly 5 fields`);
                    }

                    if (fields[2] !== '?' && fields[4] !== '?') {
                        throw new Error(`${value} cannot contain both days of month and week`);
                    }

                    const newCronExp =
                        `${fields[0]} ${fields[1]} ` +
                        `${fields[2] === '?' ? '*' : fields[2]} ` +
                        `${fields[3]} ${fields[4] === '?' ? '*' : fields[4]}`;

                    cronParser.parseExpression(newCronExp);
                } catch (err) {
                    return helpers.error('string.cron', { v: value, err: err.message });
                }

                return value;
            }
        }
    }
}));

module.exports = sdCron;
