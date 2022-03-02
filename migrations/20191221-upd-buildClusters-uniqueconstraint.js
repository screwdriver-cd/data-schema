/* eslint-disable new-cap */

'use strict';

const prefix = process.env.DATASTORE_SEQUELIZE_PREFIX || '';
const table = `${prefix}buildClusters`;

module.exports = {
    // eslint-disable-next-line no-unused-vars
    up: async (queryInterface, Sequelize) => {
        await queryInterface.sequelize.transaction(async transaction => {
            await queryInterface.removeConstraint(table, `${table}_name_key`, transaction);

            await queryInterface.addConstraint(table, {
                name: `${table}_name_scmContext_key`,
                fields: ['name', 'scmContext'],
                type: 'unique',
                transaction
            });
        });
    }
};
