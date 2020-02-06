/* eslint-disable new-cap */

'use strict';

const prefix = process.env.DATASTORE_SEQUELIZE_PREFIX || '';
const table = `${prefix}builds`;

module.exports = {
    // eslint-disable-next-line no-unused-vars
    up: async (queryInterface, Sequelize) => {
        try {
            await queryInterface.removeColumn(table, 'steps');
            // eslint-disable-next-line no-empty
        } catch (e) {}
    }
};

