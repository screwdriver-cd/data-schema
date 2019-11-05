/* eslint-disable new-cap */

'use strict';

const prefix = process.env.DATASTORE_SEQUELIZE_PREFIX || '';
const table = `${prefix}pipelines`;

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn(table, 'buildClusterName', {
            type: Sequelize.STRING(50)
        });
    }
};
