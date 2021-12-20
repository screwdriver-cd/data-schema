/* eslint-disable new-cap */

'use strict';

const prefix = process.env.DATASTORE_SEQUELIZE_PREFIX || '';
const table = `${prefix}collections`;

module.exports = {
    // eslint-disable-next-line no-unused-vars
    up: async (queryInterface, Sequelize) => {
        try {
            await queryInterface.addConstraint(table, ['userId', 'name'], {
                name: `${table}_userId_name_key`,
                type: 'unique'
            });
            // eslint-disable-next-line no-empty
        } catch (e) {}
    }
};
